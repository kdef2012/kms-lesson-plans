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
        const s1 = 2 + i; // 2 through 17
        const s2 = s1 + 3 + (i % 2); // Varying offset
        const sf = (i % 3) + 2; // 2, 3, or 4
        
        const s1_new = s1 * sf;
        const s2_new = s2 * sf + (isSimilar ? 0 : (i % 2 === 0 ? 1 : -1));
        
        ex.push({
            id: `28-${i}`,
            dok: 2,
            type: "multiple-choice",
            question: `Polygon A has side lengths ${s1} and ${s2}. Polygon B has side lengths ${s1_new} and ${s2_new}. Assuming all angles are equal, are these polygons similar?`,
            options: ["Yes", "No"],
            correctAnswer: isSimilar ? "Yes" : "No",
            misconception: misconceptions[i % misconceptions.length],
            correct_answer: `Check if the ratio of corresponding sides is constant. ${s1_new}/${s1} compared to ${s2_new}/${s2}.`
        });
    }
    return { structured_exemplars: ex };
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
        // Generate completely unique angle pairs
        const angle1 = 30 + i * 2; 
        const angle2 = 80 - i;
        const isSimilar = i % 2 === 0;
        const angle3 = 180 - angle1 - angle2;
        const givenAngle = isSimilar ? angle3 : angle3 + (i % 3 + 1) * 2; // offset by 2, 4, or 6 degrees
        
        ex.push({
            id: `29-${i}`,
            dok: 2,
            type: "multiple-choice",
            question: `Triangle A has angles measuring ${angle1}° and ${angle2}°. Triangle B has angles measuring ${angle2}° and ${givenAngle}°. Are the triangles similar?`,
            options: ["Yes, by Angle-Angle Similarity", "No, they do not have two matching angles"],
            correctAnswer: isSimilar ? "Yes, by Angle-Angle Similarity" : "No, they do not have two matching angles",
            misconception: misconceptions[i % misconceptions.length],
            correct_answer: `Find the missing angle in Triangle A (${angle3}°). Check if Triangle B has at least two matching angles.`
        });
    }
    return { structured_exemplars: ex };
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
        const vert = 3 + i * 2; 
        const horiz = 4 + i;
        const sf = (i % 3) + 2; 
        const type = i % 2 === 0 ? "quotient" : "missing";
        
        if (type === "quotient") {
            ex.push({
                id: `30-${i}`, dok: 2, type: "open-ended",
                question: `In a triangle, the vertical side is ${vert * sf} and the horizontal side is ${horiz * sf}. What is the quotient of the vertical side divided by the horizontal side? (Simplify your fraction)`,
                sample_answer: `${vert}/${horiz}`,
                misconception: misconceptions[i % misconceptions.length],
                correct_answer: `Divide ${vert * sf} by ${horiz * sf} and simplify to get ${vert}/${horiz}.`
            });
        } else {
            ex.push({
                id: `30-${i}`, dok: 2, type: "open-ended",
                question: `Triangle A has a vertical side of ${vert} and horizontal of ${horiz}. Triangle B is similar and has a horizontal side of ${horiz * sf}. Use side quotients to find the vertical side of Triangle B.`,
                sample_answer: `${vert * sf}`,
                misconception: misconceptions[i % misconceptions.length],
                correct_answer: `The quotient is ${vert}/${horiz}. Set up ${vert}/${horiz} = x/${horiz * sf} and solve for x.`
            });
        }
    }
    return { structured_exemplars: ex };
}

async function run() {
  await updatePlan("2026-09-28", generate28());
  await updatePlan("2026-09-29", generate29());
  await updatePlan("2026-09-30", generate30());
}
run();
