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

function createVisualDilation(id, sf, pts) {
  return {
    id: `guided-${id}`,
    dok: 2,
    text: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
    type: "interactive-graph",
    question: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
    visualData: {
      type: "geometry-transformation",
      gridSize: 10,
      originalPolygon: pts
    },
    correctPoints: pts.map(p => ({ x: p.x * sf, y: p.y * sf })),
    misconception: "Added the scale factor instead of multiplying.",
    correct_answer: `Multiply all coordinates by ${sf}.`
  };
}

function createVisualSimilar(id, isSimilar) {
    return {
      id: `guided-${id}`,
      dok: 2,
      text: "Are these two polygons similar? Determine if there is a scale factor that maps one to the other.",
      type: "multiple_choice",
      options: ["Yes", "No"],
      correctAnswer: isSimilar ? "Yes" : "No",
      misconception: "Looked at difference instead of ratio.",
      correct_answer: "Check if the ratio of corresponding sides is constant."
    }
}

const commonIP = "Students will complete the rigorous EOG-ready problems digitally on TicketOut.";

const lessons = {
  "2026-09-22": {
    do_now: "Plot point A(2, 3) on a coordinate plane. If you multiply both coordinates by 3, what is the new point A'?",
    direct_instruction: "## Vocabulary\n---\n**Dilation:** A transformation that changes size.\n**Scale Factor ($k$):** The multiplier.\n\n## Direct Instruction\n---\nToday we continue with dilations, but on a coordinate grid. We will learn that dilating a point $(x, y)$ centered at the origin $(0,0)$ with scale factor $k$ results in the point $(kx, ky)$. We will practice graphing these enlargements.",
    exit_ticket: "A triangle has a vertex at (4, -2). It is dilated by a scale factor of 2 centered at the origin. What are the coordinates of the new vertex?",
    structured_exemplars: [
      createVisualDilation("22-1", 2, [{x:1,y:1}, {x:3,y:1}, {x:3,y:4}]),
      createVisualDilation("22-2", 3, [{x:-1,y:1}, {x:-2,y:2}, {x:-1,y:3}, {x:1,y:2}])
    ],
    checks_for_understanding: [
      createVisualDilation("22-3", 4, [{x:1,y:0}, {x:2,y:0}, {x:1,y:2}]),
      createVisualDilation("22-4", 2, [{x:-2,y:-2}, {x:2,y:-2}, {x:0,y:3}])
    ]
  },
  "2026-09-23": {
    do_now: "A shape is dilated by a scale factor of 1/2. Will the new shape be larger or smaller than the original?",
    direct_instruction: "## Vocabulary\n---\n**Reduction:** A dilation where $0 < k < 1$.\n\n## Direct Instruction\n---\nWe saw enlargements yesterday. Today we look at fractional scale factors. When $k$ is between 0 and 1, the image is smaller and closer to the center of dilation. The rule $(x, y) \\rightarrow (kx, ky)$ still applies! Let's model multiplying coordinates by 1/2 and 1/3.",
    exit_ticket: "A point (-6, 9) is dilated by a scale factor of 1/3 centered at the origin. What is the image point?",
    structured_exemplars: [
      createVisualDilation("23-1", 0.5, [{x:4,y:2}, {x:8,y:2}, {x:6,y:8}]),
      createVisualDilation("23-2", 0.25, [{x:-4,y:-8}, {x:8,y:-4}, {x:4,y:4}])
    ],
    checks_for_understanding: [
      createVisualDilation("23-3", 0.5, [{x:-6,y:2}, {x:-2,y:2}, {x:-2,y:-4}]),
      createVisualDilation("23-4", 1/3, [{x:3,y:6}, {x:9,y:6}, {x:6,y:-3}])
    ]
  },
  "2026-09-24": {
    do_now: "Find the scale factor that maps the point (2, 5) to the point (8, 20).",
    direct_instruction: "## Vocabulary\n---\n**Scale Factor:** The ratio of the image side length to the corresponding pre-image side length.\n\n## Direct Instruction\n---\nToday we will solidify our understanding of dilations on the coordinate plane. We will practice identifying the scale factor given a pre-image and an image, by setting up the ratio $k = \\frac{image}{pre-image}$. We will also practice dilating figures across all four quadrants.",
    exit_ticket: "Triangle ABC has vertices A(1, 1), B(2, 3), and C(4, 1). Triangle A'B'C' has vertices A'(3, 3), B'(6, 9), and C'(12, 3). What is the scale factor of the dilation?",
    structured_exemplars: [
      createVisualDilation("24-1", 2, [{x:-3,y:1}, {x:-1,y:1}, {x:-1,y:-2}, {x:-3,y:-2}]),
      createVisualDilation("24-2", 0.5, [{x:-8,y:6}, {x:-2,y:6}, {x:-2,y:2}])
    ],
    checks_for_understanding: [
      createVisualDilation("24-3", 1.5, [{x:2,y:2}, {x:4,y:2}, {x:2,y:6}]),
      createVisualDilation("24-4", 0.5, [{x:2,y:-4}, {x:8,y:-4}, {x:8,y:0}, {x:2,y:0}])
    ]
  },
  "2026-09-25": {
    do_now: "Are all squares similar? Are all rectangles similar? Explain your reasoning.",
    direct_instruction: "## Vocabulary\n---\n**Similar:** Two figures are similar if there is a sequence of rigid transformations and dilations that maps one onto the other.\n\n## Direct Instruction\n---\nNow that we understand dilations, we can define similarity. If we can dilate, translate, rotate, and reflect a figure to perfectly land on another, they are similar! Corresponding angles are congruent, and corresponding side lengths are proportional.",
    exit_ticket: "Rectangle A is 3 by 5. Rectangle B is 6 by 10. Are they similar? What is the scale factor?",
    structured_exemplars: [
      createVisualSimilar("25-1", true),
      createVisualSimilar("25-2", false)
    ],
    checks_for_understanding: [
      createVisualSimilar("25-3", true),
      createVisualSimilar("25-4", false)
    ]
  },
  "2026-09-28": {
    do_now: "Triangle A has side lengths 3, 4, and 5. Triangle B is similar with a scale factor of 3. What are the side lengths of Triangle B?",
    direct_instruction: "## Vocabulary\n---\n**Proportion:** An equation stating that two ratios are equal.\n\n## Direct Instruction\n---\nToday we will use the properties of similar polygons to find missing side lengths. We will set up proportions using corresponding sides: $\\frac{Side 1}{Corresponding Side 1} = \\frac{Side 2}{Corresponding Side 2}$. We will practice cross-multiplying and solving for $x$.",
    exit_ticket: "Two triangles are similar. Triangle 1 has sides 5 and 8. The corresponding sides on Triangle 2 are 15 and x. Find x.",
    structured_exemplars: [
      createVisualSimilar("28-1", true),
      createVisualSimilar("28-2", true)
    ],
    checks_for_understanding: [
      createVisualSimilar("28-3", true),
      createVisualSimilar("28-4", true)
    ]
  },
  "2026-09-29": {
    do_now: "List the four transformations we have learned. Which ones preserve size and shape?",
    direct_instruction: "## Vocabulary\n---\n**Rigid Motion:** Preserves size and shape.\n**Non-Rigid Motion:** Changes size (dilation).\n\n## Direct Instruction\n---\nToday we synthesize all transformations. We will describe the exact sequence of transformations (e.g., 'Translate up 2, then Dilate by a scale factor of 3') that proves two figures are similar. Order matters! We will practice writing clear, precise descriptions.",
    exit_ticket: "Describe a sequence of transformations that maps a 2x2 square centered at the origin to a 4x4 square centered at (0, 5).",
    structured_exemplars: [
      createVisualSimilar("29-1", true),
      createVisualSimilar("29-2", false)
    ],
    checks_for_understanding: [
      createVisualSimilar("29-3", true),
      createVisualSimilar("29-4", false)
    ]
  }
};

async function run() {
  for(let date in lessons) {
     const plan = lessons[date];
     plan.independent_practice = [commonIP];
     plan.exit_ticket = [plan.exit_ticket];
     await updatePlan(date, plan);
  }
}
run();
