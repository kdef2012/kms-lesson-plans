import fetch from "node-fetch";
import * as cheerio from "cheerio";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

async function updatePlan(date, updates) {
  const res = await fetch(`${supabaseUrl}?date_start=eq.${date}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updates)
  });
  if (!res.ok) console.error(`Failed to update ${date}: ${res.statusText}`);
  else console.log(`Updated ${date} successfully`);
}

function createVisualDilation(id, text, sf) {
  return {
    id: `guided-${id}`,
    dok: 2,
    text: text,
    type: "interactive-graph",
    question: text,
    visualData: {
      type: "geometry-transformation",
      gridSize: 10,
      originalPolygon: [{x:1,y:1}, {x:3,y:1}, {x:3,y:4}]
    },
    correctPoints: [{x:1,y:1}, {x:3,y:1}, {x:3,y:4}].map(p => ({ x: p.x * sf, y: p.y * sf })),
    misconception: "Added the scale factor instead of multiplying.",
    correct_answer: `Multiply all coordinates by ${sf}.`
  };
}

async function fetchLessonData(lessonNum, dateStr) {
  const url = `https://curriculum.illustrativemathematics.org/MS/teachers/3/2/${lessonNum}/index.html`;
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const studentFacingBlocks = [];
  $('.im-theme--green .im-c-content').each((i, el) => {
    studentFacingBlocks.push($(el).text().trim());
  });
  
  const doNow = studentFacingBlocks[0]?.substring(0, 500) || "Do Now activity missing.";
  const exemplars = [];
  
  if (studentFacingBlocks.length > 1) {
      for(let i=1; i<studentFacingBlocks.length; i++) {
         const text = studentFacingBlocks[i];
         if (text.length > 20) {
            exemplars.push(createVisualDilation(`${lessonNum}-${i}`, text.substring(0, 800), 2));
         }
      }
  } else {
     exemplars.push(createVisualDilation(`${lessonNum}-1`, doNow, 2));
  }
  
  while(exemplars.length < 16) {
     exemplars.push(createVisualDilation(`${lessonNum}-${exemplars.length+1}`, "Practice problem. Describe your reasoning.", 2));
  }

  const directInstruction = $('.im-c-row__body .im-c-content').filter((i, el) => $(el).text().includes('CFU') || $(el).text().includes('Activity Synthesis') || $(el).text().includes('Launch')).first().text().substring(0, 500);

  return {
    do_now: doNow,
    structured_exemplars: exemplars,
    direct_instruction: "**CFU**: What is the core mathematical concept here?\n" + directInstruction,
    exit_ticket: ["What did you learn today about dilations and similarity? Explain in your own words."],
    independent_practice: ["Students will complete the rigorous EOG-ready problems digitally on TicketOut."],
    checks_for_understanding: [
      createVisualDilation(`${lessonNum}-c1`, "Group practice problem 1", 3),
      createVisualDilation(`${lessonNum}-c2`, "Group practice problem 2", 0.5)
    ]
  };
}

async function run() {
  const mappings = [
    { date: "2026-09-22", l: 4 },
    { date: "2026-09-23", l: 5 },
    { date: "2026-09-24", l: 6 },
    { date: "2026-09-25", l: 7 },
    { date: "2026-09-28", l: 8 },
    { date: "2026-09-29", l: 9 }
  ];
  
  for(let m of mappings) {
     const data = await fetchLessonData(m.l, m.date);
     await updatePlan(m.date, data);
  }
}
run();
