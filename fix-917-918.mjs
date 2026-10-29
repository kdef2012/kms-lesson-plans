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

const congruentMisconceptions = [
    "Assumed figures were congruent just by appearance without verifying rigid motions.",
    "Believed that a dilation preserves congruence.",
    "Matched the wrong corresponding vertices when writing the congruence statement.",
    "Thought the orientation had to be the same for figures to be congruent.",
    "Failed to identify the sequence of rigid motions correctly.",
    "Compared non-corresponding side lengths."
];

function generate17() {
    const ex = [];
    for (let i = 0; i < 16; i++) {
        const shape = i % 2 === 0 ? "Triangle" : "Rectangle";
        const trans = i % 3 === 0 ? "Translate right 4 units and down 2 units" : (i % 3 === 1 ? "Rotate 90 degrees clockwise" : "Reflect across the y-axis");
        ex.push({
            id: `17-${i}`,
            dok: 2,
            type: "open_ended",
            text: `Polygon A is mapped to Polygon B by the following sequence: ${trans}. Are Polygon A and Polygon B congruent? Why or why not?`,
            sample_answer: `Yes, because ${trans.toLowerCase()} is a rigid motion, and rigid motions preserve size and shape.`,
            misconception: congruentMisconceptions[i % congruentMisconceptions.length]
        });
    }
    return {
        do_now: "Draw a triangle on your paper. Now draw a second triangle next to it that looks identical but is rotated sideways. Are they the exact same triangle? Explain.",
        direct_instruction: "## Vocabulary\n---\n**Congruent:** Two figures are congruent if there is a sequence of rigid motions (translations, rotations, reflections) that maps one perfectly onto the other.\n**Rigid Motion:** A transformation that does not change size or shape.\n\n## Direct Instruction\n---\nToday we are formalizing what it means for two shapes to be 'identical'. In geometry, we call this **Congruence**.\n\nIf you can slide (translate), turn (rotate), or flip (reflect) a shape and it lands perfectly on top of another shape, those two shapes are congruent! \n\nIn **Example 1**, we will look at two triangles on a grid and determine the exact sequence of rigid motions needed to map one to the other. \n\nIn **Example 2**, we will look at two polygons where one is slightly larger. Because a dilation (resizing) is required, they are NOT congruent. Dilations are non-rigid motions!",
        exit_ticket: "Rectangle 1 is translated up 5 units and reflected across the x-axis to create Rectangle 2. Are they congruent? Explain how you know.",
        independent_practice: "Students will complete the rigorous EOG-ready problems digitally on TicketOut.",
        structured_exemplars: ex
    };
}

function generate18() {
    const ex = [];
    for (let i = 0; i < 16; i++) {
        const side1 = (i % 5) + 3;
        const side2 = side1 + 2;
        ex.push({
            id: `18-${i}`,
            dok: 2,
            type: "open_ended",
            text: `Triangle ABC is congruent to Triangle DEF. If side AB is ${side1} cm and side BC is ${side2} cm, what is the length of side DE?`,
            sample_answer: `${side1} cm`,
            misconception: congruentMisconceptions[i % congruentMisconceptions.length]
        });
    }
    
    // Mix in some angle questions for variety
    ex[3].text = "Polygon WXYZ is congruent to Polygon PQRS. If angle W is 45 degrees, what is the measure of angle P?";
    ex[3].sample_answer = "45 degrees";
    ex[7].text = "Polygon WXYZ is congruent to Polygon PQRS. If angle W is 90 degrees, what is the measure of angle P?";
    ex[7].sample_answer = "90 degrees";
    
    return {
        do_now: "If I slide, turn, and flip a square, does its area change? Does its perimeter change? Why or why not?",
        direct_instruction: "## Vocabulary\n---\n**Corresponding Parts:** Angles and sides in the same relative position in two congruent figures.\n**Congruence Statement:** A mathematical statement like $\\triangle ABC \\cong \\triangle DEF$ that tells us exactly which vertices correspond to each other.\n\n## Direct Instruction\n---\nYesterday, we learned that rigid motions create congruent figures. Today, we will use that fact to solve for missing side lengths and angles!\n\nWhen two figures are congruent, all of their **corresponding parts** are equal. This means matching sides have the same length, and matching angles have the same measure.\n\nIn **Example 1**, we will look at a congruence statement: $\\triangle ABC \\cong \\triangle DEF$. The order of the letters is critical! A corresponds to D, B corresponds to E, and C corresponds to F. If I know side AB is 5 cm, then side DE MUST also be 5 cm.\n\nIn **Example 2**, we will use this property to find missing angles in complex overlapping congruent polygons.",
        exit_ticket: "$\\triangle QRS \\cong \\triangle TUV$. If angle R is 60 degrees and side QS is 10 inches, what is the measure of angle U and the length of side TV?",
        independent_practice: "Students will complete the rigorous EOG-ready problems digitally on TicketOut.",
        structured_exemplars: ex
    };
}

async function run() {
  await updatePlan("2026-09-17", generate17());
  await updatePlan("2026-09-18", generate18());
}
run();
