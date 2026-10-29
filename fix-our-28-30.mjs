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

function generate28() {
    const ex = [];
    const misconceptions = [
        "Assumed all rectangles are similar because their angles are equal.",
        "Checked only one pair of sides instead of all corresponding sides.",
        "Set up the ratio as Small/Large = Large/Small instead of a consistent proportion.",
        "Added the difference between sides instead of multiplying by a scale factor.",
        "Failed to check if corresponding angles were equal before declaring polygons similar.",
        "Multiplied the two known sides of the same polygon together."
    ];
    for(let i=0; i<16; i++) {
        const isSimilar = i % 2 === 0;
        const s1 = (i % 3) + 2;
        const s2 = s1 + 3;
        const sf = 2;
        const s1_new = s1 * sf;
        const s2_new = s2 * sf + (isSimilar ? 0 : 1);
        ex.push({
            id: `28-${i}`,
            dok: 2,
            type: "multiple_choice",
            text: `Polygon A has side lengths ${s1} and ${s2}. Polygon B has side lengths ${s1_new} and ${s2_new}. Assuming all angles are equal, are these polygons similar?`,
            options: ["Yes", "No"],
            correctAnswer: isSimilar ? "Yes" : "No",
            misconception: misconceptions[i % misconceptions.length],
            correct_answer: `Check if the ratio of corresponding sides is constant. ${s1_new}/${s1} compared to ${s2_new}/${s2}.`
        });
    }
    return {
        topic: "[Open-Up U2 L7] Similar Polygons (8.G.4)",
        do_now: "Decide if each statement is true for All, Some, or None: 1) Two rectangles are similar. 2) Two squares are similar. Be prepared to explain your reasoning.",
        direct_instruction: "## Vocabulary\n---\n**Similar Polygons:** Polygons where all corresponding angles are congruent and all corresponding side lengths are proportional.\n\n## Direct Instruction\n---\nToday we are looking at **Similar Polygons**, aligning exactly with Open Up Lesson 7.\n\nJust because two shapes have the same angles doesn't mean they are similar (think of a short, wide rectangle vs a tall, skinny one). To prove polygons are similar, you must verify that EVERY pair of corresponding sides has the exact same scale factor.\n\nIn **Example 1**, we will test if two rectangles are similar by checking the ratios of their lengths and widths. \n\nIn **Example 2**, we will use this property to find a missing side length, knowing that if the polygons are similar, their side ratios must be equal.",
        exit_ticket: "Are all rhombuses similar? Explain your reasoning.",
        structured_exemplars: ex
    };
}

function generate29() {
    const ex = [];
    const misconceptions = [
        "Assumed triangles were congruent instead of just similar.",
        "Found only one matching angle and assumed similarity.",
        "Did not verify that the third angles would also be equal.",
        "Thought side lengths had to be equal for AA similarity.",
        "Incorrectly calculated the missing angle in the triangle.",
        "Confused the AA Similarity rule with SAS congruence."
    ];
    for(let i=0; i<16; i++) {
        const angle1 = (i % 4) * 10 + 30; // 30, 40, 50, 60
        const angle2 = 80;
        const isSimilar = i % 2 === 0;
        const angle3 = 180 - angle1 - angle2;
        const givenAngle = isSimilar ? angle3 : angle3 + 10;
        
        ex.push({
            id: `29-${i}`,
            dok: 2,
            type: "multiple_choice",
            text: `Triangle A has angles measuring ${angle1}° and ${angle2}°. Triangle B has angles measuring ${angle2}° and ${givenAngle}°. Are the triangles similar?`,
            options: ["Yes, by Angle-Angle Similarity", "No, they do not have two matching angles"],
            correctAnswer: isSimilar ? "Yes, by Angle-Angle Similarity" : "No, they do not have two matching angles",
            misconception: misconceptions[i % misconceptions.length],
            correct_answer: `Find the missing angle in Triangle A (${angle3}°). Check if Triangle B has at least two matching angles.`
        });
    }
    return {
        topic: "[Open-Up U2 L8] Similar Triangles (8.G.4)",
        do_now: "Triangle ABC has angles of 40° and 60°. What is the measure of the third angle? How do you know?",
        direct_instruction: "## Vocabulary\n---\n**Angle-Angle (AA) Similarity:** If two angles of one triangle are congruent to two angles of another triangle, then the two triangles are similar.\n\n## Direct Instruction\n---\nToday we explore a powerful shortcut: **Angle-Angle Similarity**, aligning exactly with Open Up Lesson 8.\n\nFor most polygons, you have to check all angles AND all sides to prove they are similar. But triangles are special! If you can prove that just TWO angles in a triangle match two angles in another triangle, the third angles must also match (because they always add to 180). This locks the shape, guaranteeing they are similar!\n\nIn **Example 1**, we will calculate missing angles to prove two triangles are similar using the AA rule.\n\nIn **Example 2**, we will look at overlapping triangles or triangles inside regular pentagons, identifying parallel lines and shared angles to prove similarity.",
        exit_ticket: "Triangle 1 has angles 50° and 70°. Triangle 2 has angles 50° and 60°. Are they similar? Explain.",
        structured_exemplars: ex
    };
}

function generate30() {
    const ex = [];
    const misconceptions = [
        "Calculated the quotient as Horizontal/Vertical instead of Vertical/Horizontal.",
        "Divided corresponding sides of different triangles instead of sides within the same triangle.",
        "Made a calculation error when setting up the division.",
        "Assumed the quotient would change if the triangle was scaled up.",
        "Compared non-corresponding vertical and horizontal sides.",
        "Forgot that side length quotients are constant in similar triangles."
    ];
    for(let i=0; i<16; i++) {
        const vert = (i % 3) + 2; // 2, 3, 4
        const horiz = (i % 4) + 3; // 3, 4, 5, 6
        const sf = (i % 2) + 2; // 2, 3
        const type = i % 2 === 0 ? "quotient" : "missing";
        
        if (type === "quotient") {
            ex.push({
                id: `30-${i}`, dok: 2, type: "open_ended",
                text: `In a triangle, the vertical side is ${vert * sf} and the horizontal side is ${horiz * sf}. What is the quotient of the vertical side divided by the horizontal side? (Simplify your fraction)`,
                sample_answer: `${vert}/${horiz}`,
                misconception: misconceptions[i % misconceptions.length],
                correct_answer: `Divide ${vert * sf} by ${horiz * sf} and simplify to get ${vert}/${horiz}.`
            });
        } else {
            ex.push({
                id: `30-${i}`, dok: 2, type: "open_ended",
                text: `Triangle A has a vertical side of ${vert} and horizontal of ${horiz}. Triangle B is similar and has a horizontal side of ${horiz * sf}. Use side quotients to find the vertical side of Triangle B.`,
                sample_answer: `${vert * sf}`,
                misconception: misconceptions[i % misconceptions.length],
                correct_answer: `The quotient is ${vert}/${horiz}. Set up ${vert}/${horiz} = x/${horiz * sf} and solve for x.`
            });
        }
    }
    return {
        topic: "[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)",
        do_now: "Evaluate the quotients: 1) 2/3 2) 4/6 3) 6/9. What do you notice?",
        direct_instruction: "## Vocabulary\n---\n**Side Length Quotient:** The result of dividing two side lengths within the same triangle (e.g., Vertical / Horizontal).\n\n## Direct Instruction\n---\nToday we are looking at **Quotients within Similar Triangles**, aligning exactly with Open Up Lesson 9.\n\nUsually, we compare a side on the small triangle to a side on the large triangle to find the scale factor. But today, we are dividing sides *within the same triangle*!\n\nIf you have a 2-3-4 triangle, and a similar 4-6-8 triangle, the quotient of the two shortest sides in the first triangle is 2/3. In the second triangle, it is 4/6, which simplifies to 2/3! The quotients are identical.\n\nIn **Example 1**, we will calculate quotients within the same triangle (Vertical $\\div$ Horizontal).\n\nIn **Example 2**, we will use the fact that these quotients are constant to solve for missing side lengths in similar right triangles on a coordinate grid.",
        exit_ticket: "Why is the quotient of the vertical side divided by the horizontal side the same for any two similar right triangles?",
        structured_exemplars: ex
    };
}

async function run() {
  await updatePlan("2026-09-28", generate28());
  await updatePlan("2026-09-29", generate29());
  await updatePlan("2026-09-30", generate30());
}
run();
