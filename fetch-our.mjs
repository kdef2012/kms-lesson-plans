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

async function fetchLessonData(lessonNum) {
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
            exemplars.push({
               type: "open_ended",
               text: text.substring(0, 800),
               sample_answer: ""
            });
         }
      }
  } else {
     exemplars.push({ type: "open_ended", text: doNow, sample_answer: "" });
  }
  
  // Make sure we have 16 exemplars for the print function to not break, padding if necessary
  while(exemplars.length < 16) {
     exemplars.push({ type: "open_ended", text: "Practice problem. Describe your reasoning.", sample_answer: "" });
  }

  const directInstruction = $('.im-c-row__body .im-c-content').filter((i, el) => $(el).text().includes('CFU') || $(el).text().includes('Activity Synthesis') || $(el).text().includes('Launch')).first().text().substring(0, 500);

  return {
    do_now: doNow,
    structured_exemplars: exemplars,
    direct_instruction: "**CFU**: What is the core mathematical concept here?\n" + directInstruction
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
     const data = await fetchLessonData(m.l);
     await updatePlan(m.date, data);
  }
}
run();
