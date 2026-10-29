import fetch from "node-fetch";

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

function genPoints(topic, index) {
    const shapes = [
        [{x:1,y:1}, {x:3,y:1}, {x:3,y:4}],
        [{x:-2,y:1}, {x:1,y:1}, {x:1,y:3}, {x:-2,y:3}],
        [{x:0,y:2}, {x:2,y:0}, {x:0,y:-2}, {x:-2,y:0}],
        [{x:-3,y:-3}, {x:-1,y:-3}, {x:-1,y:-1}],
        [{x:1,y:2}, {x:4,y:2}, {x:2,y:4}],
        [{x:-4,y:2}, {x:-2,y:2}, {x:-2,y:5}, {x:-4,y:5}]
    ];
    return shapes[index % shapes.length];
}

function createVisualSimilar(id, isSimilar) {
    const sf = 2;
    const pts1 = genPoints(25, parseInt(id.split('-')[1]));
    const pts2 = pts1.map(p => ({ x: p.x * sf + (isSimilar ? 0 : 1), y: p.y * sf }));
    return {
        id: `guided-${id}`,
        dok: 2,
        text: `Polygon A has vertices at ${JSON.stringify(pts1)}. Polygon B has vertices at ${JSON.stringify(pts2)}. Are they similar?`,
        type: "multiple_choice",
        options: ["Yes", "No"],
        correctAnswer: isSimilar ? "Yes" : "No",
        misconception: "Looked at difference instead of ratio.",
        correct_answer: "Check if the ratio of corresponding sides is constant."
    };
}

const lessons = {
  "2026-09-30": {
    do_now: "Solve for x: \\( \\frac{10}{15} = \\frac{12}{x} \\).",
    direct_instruction: "## Vocabulary\n---\n**Quotient:** The answer to a division problem.\n**Slope:** The ratio of the vertical change to the horizontal change.\n\n## Direct Instruction\n---\nToday we look at quotients (ratios) in similar triangles!\n\nWhen you draw two different right triangles on the same line, their horizontal and vertical side lengths might be different, but the ratio of vertical to horizontal (the quotient) is always exactly the same.\n\nIn **Example 1**, we will calculate the ratio for a small triangle. In **Example 2**, we calculate it for a large triangle. You will see that because they are similar triangles, the quotients are identical. This is why the slope of a line is constant!",
    exit_ticket: "A small right triangle on a line has a vertical side of 2 and horizontal of 3. A larger similar triangle on the same line has a vertical side of 8. What is its horizontal side?",
    independent_practice: "Students will complete the rigorous EOG-ready problems digitally on TicketOut.",
    structured_exemplars: Array.from({length: 16}, (_, i) => {
        const vert1 = (i % 3) + 2;
        const horiz1 = (i % 4) + 3;
        const sf = (i % 2) + 2;
        const vert2 = vert1 * sf;
        const horiz2 = horiz1 * sf;
        return {
            id: `30-${i}`, dok: 2, type: "open_ended",
            text: `A small right triangle has vertical side ${vert1} and horizontal side ${horiz1}. A similar larger right triangle has vertical side ${vert2}. What is its horizontal side?`,
            sample_answer: `${horiz2}`
        };
    })
  },
  "2026-10-01": {
    do_now: "Review: What are the two requirements for polygons to be similar?",
    direct_instruction: "## Vocabulary\n---\n**Proportional:** Having a constant ratio.\n\n## Direct Instruction\n---\nToday we continue with similar polygons. We will practice setting up proportions using corresponding sides: $\\frac{Side 1}{Corresponding Side 1} = \\frac{Side 2}{Corresponding Side 2}$.\n\nIn **Example 1**, we will identify which sides correspond. In **Example 2**, we cross-multiply and solve for $x$.",
    exit_ticket: "Triangle A has sides 6, 8, 10. Triangle B has corresponding sides 9, 12, and x. Find x.",
    independent_practice: "Students will complete the rigorous EOG-ready problems digitally on TicketOut.",
    structured_exemplars: Array.from({length: 16}, (_, i) => {
        const sf = 1.5;
        const s1 = 4, s2 = 6, s3 = 8;
        return {
            id: `01-${i}`, dok: 2, type: "open_ended",
            text: `Polygon 1 has side lengths ${s1}, ${s2}. Polygon 2 is similar. The side corresponding to ${s1} is ${s1*sf}. What is the side corresponding to ${s2}?`,
            sample_answer: `${s2*sf}`
        };
    })
  },
  "2026-10-02": {
    do_now: "Describe a dilation that maps the point (1, 1) to (5, 5).",
    direct_instruction: "## Vocabulary\n---\n**Similarity Transformation:** A sequence of transformations that maps one similar figure to another.\n\n## Direct Instruction\n---\nToday we practice describing sequences of transformations. To show two figures are similar, we must describe the exact dilation, translation, reflection, or rotation used.\n\nIn **Example 1**, we will map a small triangle to a larger one by dilating first. In **Example 2**, we will describe the translation needed.",
    exit_ticket: "Describe a sequence of transformations that maps a 1x1 square to a 3x3 square.",
    independent_practice: "Students will complete the rigorous EOG-ready problems digitally on TicketOut.",
    structured_exemplars: Array.from({length: 16}, (_, i) => createVisualSimilar(`02-${i}`, i % 2 === 0))
  },
  "2026-10-05": {
    do_now: "Calculate the ratio of 4/6 and 10/15. Are they equal?",
    direct_instruction: "## Vocabulary\n---\n**Constant of Proportionality:** The constant ratio between two proportional quantities.\n\n## Direct Instruction\n---\nToday we review Quotients in Similar Triangles to ensure mastery. We will prove that any two points on a line can form a right triangle, and the quotient of the vertical and horizontal sides will always equal the slope of the line.\n\nIn **Example 1**, we draw triangles on a graph and count the rise and run. In **Example 2**, we set up the proportion.",
    exit_ticket: "Why do all right triangles drawn on the same line have the same ratio of vertical to horizontal sides?",
    independent_practice: "Students will complete the rigorous EOG-ready problems digitally on TicketOut.",
    structured_exemplars: Array.from({length: 16}, (_, i) => {
        return {
            id: `05-${i}`, dok: 2, type: "multiple_choice",
            text: `Triangle A has a vertical side of 3 and horizontal of 4. Triangle B is on the same line. If its horizontal side is 12, what is its vertical side?`,
            options: ["6", "9", "12"], correctAnswer: "9"
        };
    })
  }
};

async function run() {
  for(let date in lessons) {
     const plan = lessons[date];
     plan.independent_practice = [plan.independent_practice];
     plan.exit_ticket = [plan.exit_ticket];
     await updatePlan(date, plan);
  }
}
run();
