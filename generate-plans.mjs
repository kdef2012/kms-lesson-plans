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

function genPolygon(pts, sf) {
  return {
    originalPolygon: pts,
    transformedPolygon: pts.map(p => ({ x: p.x * sf, y: p.y * sf }))
  };
}

function generateDilationsGrid() {
  const ex = [];
  for(let i=0; i<16; i++) {
    const sf = (i%3)+2; // 2, 3, or 4
    const pts = [{x:1,y:1}, {x:1,y:3}, {x:2,y:1}];
    ex.push({
      type: "visual",
      text: `Dilate the triangle by a scale factor of ${sf} centered at the origin.`,
      visualData: genPolygon(pts, sf)
    });
  }
  return {
    do_now: "Plot the points A(1, 2) and B(3, 4) on a coordinate plane. Multiply both coordinates by 2. What are the new coordinates?",
    direct_instruction: "**CFU**: How do you dilate a point on a coordinate grid when the center is the origin?\nTo dilate a figure on a coordinate grid centered at the origin, you multiply the x and y coordinates of each vertex by the scale factor $k$. Rule: $(x, y) \\rightarrow (kx, ky)$",
    objective_3m: "SWBAT perform dilations on a coordinate grid centered at the origin.",
    structured_exemplars: ex
  };
}

function generateMoreDilations() {
  const ex = [];
  for(let i=0; i<16; i++) {
    const sf = 0.5;
    const pts = [{x:2,y:4}, {x:4,y:4}, {x:4,y:2}];
    ex.push({
      type: "visual",
      text: `Dilate the triangle by a scale factor of 1/2 centered at the origin.`,
      visualData: genPolygon(pts, sf)
    });
  }
  return {
    do_now: "What happens to a shape when it is dilated by a scale factor less than 1?",
    direct_instruction: "**CFU**: Is the image larger or smaller?\nWhen the scale factor $k$ is between 0 and 1, the dilation is a reduction. Multiply coordinates by $k$.",
    objective_3m: "SWBAT perform dilations with fractional scale factors.",
    structured_exemplars: ex
  };
}

function generateEnvisionDilations() {
  const ex = [];
  for(let i=0; i<16; i++) {
    const sf = i % 2 === 0 ? 3 : 0.25;
    const pts = [{x:4,y:4}, {x:4,y:8}, {x:8,y:4}];
    ex.push({
      type: "visual",
      text: `Dilate the triangle by a scale factor of ${sf}.`,
      visualData: genPolygon(pts, sf)
    });
  }
  return {
    do_now: "Define scale factor in your own words.",
    direct_instruction: "**CFU**: What is the rule for dilation?\nReview: Dilations enlarge or reduce figures. Rule: $(x, y) \\rightarrow (kx, ky)$.",
    objective_3m: "SWBAT apply dilations to various polygons on the coordinate plane.",
    structured_exemplars: ex
  };
}

function generateSimilarity() {
  const ex = [];
  for(let i=0; i<16; i++) {
    ex.push({
      type: "multiple_choice",
      text: `Are these two rectangles similar? Rectangle A is 2x4. Rectangle B is ${2*(i+2)}x${4*(i+2)}.`,
      options: ["Yes", "No"],
      correctAnswer: "Yes"
    });
  }
  return {
    do_now: "What makes two shapes identical? What makes them similar?",
    direct_instruction: "**CFU**: What does similar mean?\nTwo figures are similar if one can be obtained from the other by a sequence of rigid transformations and dilations.",
    objective_3m: "SWBAT define and identify similar figures.",
    structured_exemplars: ex
  };
}

function generateSimilarPolygons() {
  const ex = [];
  for(let i=0; i<16; i++) {
    ex.push({
      type: "open_ended",
      text: `Triangle ABC is similar to DEF. AB=${i+2}, BC=${i+4}. If DE=${(i+2)*3}, what is EF?`,
      sample_answer: `${(i+4)*3}`
    });
  }
  return {
    do_now: "If a 3x5 photo is enlarged by a factor of 4, what are the new dimensions?",
    direct_instruction: "**CFU**: How do we find missing sides?\nIn similar polygons, corresponding sides are proportional.",
    objective_3m: "SWBAT find missing side lengths in similar polygons using proportions.",
    structured_exemplars: ex
  };
}

function generateSimilarFigures() {
  const ex = [];
  for(let i=0; i<16; i++) {
    ex.push({
      type: "open_ended",
      text: `Describe the sequence of transformations that maps Figure A to Figure B (Scale factor ${i%2===0 ? 2 : 3}, translated right ${i+1}).`,
      sample_answer: `Dilate by a scale factor of ${i%2===0 ? 2 : 3}, then translate right ${i+1}.`
    });
  }
  return {
    do_now: "What transformations preserve size? Which do not?",
    direct_instruction: "**CFU**: Does translation change similarity?\nWe can prove two figures are similar by describing a sequence of transformations mapping one to the other.",
    objective_3m: "SWBAT use transformations to explain why two figures are similar.",
    structured_exemplars: ex
  };
}

function generateQuotients() {
  const ex = [];
  for(let i=0; i<16; i++) {
    ex.push({
      type: "multiple_choice",
      text: `Find the slope of the line using the similar triangles shown. Rise is ${i*2+2}, run is ${i*3+3}.`,
      options: ["2/3", "3/2", "1", "1/2"],
      correctAnswer: "2/3"
    });
  }
  return {
    do_now: "Find the slope of a line passing through (0,0) and (3,2).",
    direct_instruction: "**CFU**: Why is slope constant?\nThe ratio of the vertical leg to the horizontal leg of any right triangle on a line is constant (the slope) because the triangles are similar.",
    objective_3m: "SWBAT explain why the slope $m$ is the same between any two distinct points on a non-vertical line using similar triangles.",
    structured_exemplars: ex
  };
}

async function run() {
  await updatePlan("2026-09-22", generateDilationsGrid());
  await updatePlan("2026-09-23", generateMoreDilations());
  await updatePlan("2026-09-24", generateEnvisionDilations());
  await updatePlan("2026-09-25", generateSimilarity());
  await updatePlan("2026-09-28", generateSimilarPolygons());
  await updatePlan("2026-09-29", generateSimilarFigures());
  await updatePlan("2026-09-30", generateQuotients());
  await updatePlan("2026-10-01", generateSimilarPolygons());
  await updatePlan("2026-10-02", generateSimilarFigures());
  await updatePlan("2026-10-05", generateQuotients());
}

run();
