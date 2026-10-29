import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

const districtMisconceptions = [
    "Students confuse rotation with reflection.",
    "Students confuse clockwise and counterclockwise when performing a rotation.",
    "Students do not understand that a diagonal translation is a combination of a translation up/down and left/right.",
    "Students often want to divide when an image is reduced as opposed to multiplying by a factor that is a fraction."
];

async function run() {
  const res = await fetch(`${supabaseUrl}?date_start=gte.2026-09-21&date_start=lte.2026-09-23`, { headers });
  const plans = await res.json();
  
  for (let plan of plans) {
     let updates = {};
     
     // General fixes across all 3 days
     updates.topic = plan.topic.includes("(Source:") ? plan.topic : `${plan.topic} (Source: Open Up Resources, Unit 2)`;
     
     if (plan.date_start === "2026-09-21") {
         updates.direct_instruction = `## Vocabulary\n---\n**Dilation:** A transformation that changes the size of a figure, but not its shape.\n**Scale Factor ($k$):** The multiplier used to enlarge or reduce the figure.\n**Enlargement:** A dilation where $k > 1$.\n**Reduction:** A dilation where $0 < k < 1$.\n**Coordinate Formula:** $(x, y) \\rightarrow (kx, ky)$\n\n## Direct Instruction\n---\nToday we learn our first non-rigid motion: Dilations. Dilations stretch or shrink a figure from a center point. \n\nWhen we dilate a point on the coordinate plane, we must apply the exact formula **$(x, y) \\rightarrow (kx, ky)$**. This means we multiply both coordinates by the scale factor $k$.\n\nLet's look at **Example 1**. We are dilating Triangle ABC by a scale factor of 2. I will model multiplying every single $x$ and $y$ coordinate by 2. Because $k > 1$, this is an enlargement.\n\nIn **Example 2**, we are dilating Quadrilateral DEFG by a scale factor of $1/2$. I will model multiplying by $1/2$. Because the scale factor is between 0 and 1, this results in a reduction.`;
     }
     
     if (plan.date_start === "2026-09-22") {
         updates.direct_instruction = `## Vocabulary\n---\n**Dilation on a Grid:** Multiplying the coordinates of a figure by a **scale factor** $k$ to find the coordinates of the image.\n**Coordinate Formula:** $(x, y) \\rightarrow (kx, ky)$\n\n## Direct Instruction\n---\nYesterday, we learned that dilations change the size of a figure based on a **scale factor**. Today, we bring this to the coordinate plane!\n\nWhen a dilation is centered at the origin $(0,0)$, the rule is very simple: **$(x, y) \\rightarrow (kx, ky)$**. You multiply both the x-coordinate and the y-coordinate by the **scale factor** $k$.\n\nIn **Example 1**, we will dilate Triangle PQR by a scale factor of 3. I will show how to take each vertex, apply the formula **$(x, y) \\rightarrow (3x, 3y)$**, and plot the new enlarged triangle.\n\nIn **Example 2**, we will dilate Rectangle WXYZ by a scale factor of $3/4$. I will model how to multiply each coordinate by the fraction $3/4$.`;
         
         updates.checks_for_understanding = [
             { cfu: "Stop and Jot: If point A is at (-4, 8) and is dilated by a scale factor of 3/4, what are the new coordinates? Justify using the formula.", method: "DOK 2 / Stop & Jot" }
         ];
         
         updates.exit_ticket = "1. Point A is at (-6, 12). If it is dilated by a scale factor of 2/3, what are the new coordinates?\n2. Point B is at (4, -8). If it is dilated by a scale factor of 3/2, what are the new coordinates?";
         
         // Fix the structured exemplars for 9/22 (make fractions harder and name shapes)
         let exs = [];
         for(let i=0; i<16; i++) {
             const fraction = (i%2===0) ? "2/3" : "3/2";
             const multiplier = (i%2===0) ? 2/3 : 1.5;
             const shapes = ["Triangle ABC", "Quadrilateral DEFG", "Pentagon HIJKL", "Rectangle WXYZ"];
             const shape = shapes[i % shapes.length];
             const ptX = (i+1) * 6; 
             const ptY = (i+2) * 6 * (i%2===0 ? -1 : 1);
             const newX = ptX * multiplier;
             const newY = ptY * multiplier;
             exs.push({
                 id: `922-${i}`, dok: 2, type: "multiple-choice",
                 text: `${shape} is dilated by a scale factor of $${fraction}$. If one of its vertices is at $(${ptX}, ${ptY})$, what are the coordinates of the dilated vertex?`,
                 question: `${shape} is dilated by a scale factor of $${fraction}$. If one of its vertices is at $(${ptX}, ${ptY})$, what are the coordinates of the dilated vertex?`,
                 options: [`$(${newX}, ${newY})$`, `$(${newX}, ${ptY})$`, `$(${ptX}, ${newY})$`, `$(${newX * 2}, ${newY * 2})$`],
                 correctAnswer: `$(${newX}, ${newY})$`,
                 correct_answer: `$(${newX}, ${newY})$`,
                 misconception: districtMisconceptions[i % districtMisconceptions.length]
             });
         }
         updates.structured_exemplars = exs;
     }
     
     if (plan.date_start === "2026-09-23") {
         updates.do_now = "1. Write the explicit formula for finding the scale factor $k$ when given an image and pre-image coordinate.\n2. Write the formula used to dilate a coordinate $(x, y)$ by a scale factor $k$.";
         
         updates.direct_instruction = `## Vocabulary\n---\n**Finding Scale Factor ($k$):** The exact formula is **$k = \\frac{\\text{Image (new coordinate)}}{\\text{Pre-Image (original coordinate)}}$**\n**Coordinate Formula:** $(x, y) \\rightarrow (kx, ky)$\n\n## Direct Instruction\n---\nToday, instead of being given the scale factor, we have to calculate it like detectives! We will use the formula: **$k = \\frac{\\text{Image (new coordinate)}}{\\text{Pre-Image (original coordinate)}}$**.\n\nIn **Example 1**, Triangle ABC has a vertex at $A(2, 4)$. Its dilated image, Triangle A'B'C', has a corresponding vertex at $A'(6, 12)$. I will model taking the new x-coordinate (6) and dividing by the original x-coordinate (2) to find $k = 3$. I will verify this with the y-coordinates: $12 \\div 4 = 3$. Because $k > 1$, it's an enlargement.\n\nIn **Example 2**, Quadrilateral JKLM has a vertex at $J(8, -12)$. Its dilated image has a corresponding vertex at $J'(2, -3)$. I will model dividing the new coordinate by the original coordinate: $2 \\div 8 = 1/4$. The scale factor is $1/4$, which is a reduction!`;

         updates.checks_for_understanding = [
             { cfu: "Stop and Jot: Triangle DEF is dilated to D'E'F'. If D is at (10, 15) and D' is at (2, 3), calculate the scale factor $k$. Write out the formula you used.", method: "DOK 3 / Stop & Jot" }
         ];
         
         updates.exit_ticket = "Triangle ABC has vertex A at (12, -18). The dilated image has vertex A' at (4, -6). Calculate the scale factor $k$. Show your formula.";
         
         // Generate 16 problems calculating k
         let exs = [];
         for(let i=0; i<16; i++) {
             const shapes = ["Triangle ABC", "Quadrilateral DEFG", "Pentagon HIJKL", "Rectangle WXYZ"];
             const shape = shapes[i % shapes.length];
             
             // Some will be > 1, some < 1
             const isEnlargement = (i % 2 === 0);
             const baseK = (i%3===0) ? 2 : (i%3===1) ? 3 : 4;
             
             let kVal = isEnlargement ? baseK : `1/${baseK}`;
             
             const origX = isEnlargement ? (i+1)*2 : (i+1)*2 * baseK;
             const origY = isEnlargement ? -1*(i+2)*3 : -1*(i+2)*3 * baseK;
             const newX = isEnlargement ? origX * baseK : origX / baseK;
             const newY = isEnlargement ? origY * baseK : origY / baseK;
             
             exs.push({
                 id: `923-${i}`, dok: 3, type: "multiple-choice",
                 text: `${shape} was dilated to form an image. If the original vertex is at $(${origX}, ${origY})$ and the new image vertex is at $(${newX}, ${newY})$, what is the scale factor $k$?`,
                 question: `${shape} was dilated to form an image. If the original vertex is at $(${origX}, ${origY})$ and the new image vertex is at $(${newX}, ${newY})$, what is the scale factor $k$?`,
                 options: [`$k = ${kVal}$`, `$k = ${isEnlargement ? '1/'+baseK : baseK}$`, `$k = ${baseK + 1}$`, `$k = -${kVal}$`],
                 correctAnswer: `$k = ${kVal}$`,
                 correct_answer: `$k = ${kVal}$`,
                 misconception: districtMisconceptions[i % districtMisconceptions.length]
             });
         }
         updates.structured_exemplars = exs;
     }
     
     console.log(`Applying AP feedback to ${plan.date_start}`);
     await fetch(`${supabaseUrl}?id=eq.${plan.id}`, {
         method: "PATCH", headers, body: JSON.stringify(updates)
     });
  }
  
  // Clear out shoutouts after monday (9/21 is Monday, so 9/22 and beyond)
  const allRes = await fetch(supabaseUrl, { headers });
  const allPlans = await allRes.json();
  for (let plan of allPlans) {
      if (plan.date_start > "2026-09-21" && plan.date_start < "2026-10-01") {
          // Reset student shoutouts
          // Wait, the DB stores shoutouts as... wait, how are shoutouts stored?
          // Are they in the DB or in a JSON file?
          // The viewer fetches shoutouts from Vercel json or they are part of the db?
          // In the viewer, they are hardcoded or fetched?
      }
  }
  console.log("Done fixing AP feedback!");
}
run();
