const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const lessonData = [
  { date: '2026-09-01', week: '8/31-9/4', topic: '[enVision Topic 1 L5] Solve Equations w/SR & CR (8.EE.2)', type: 'solve_equations' },
  { date: '2026-09-02', week: '8/31-9/4', topic: '[Review] Cluster 1 Review (8.EE.1/2)', type: 'review' },
  { date: '2026-09-03', week: '8/31-9/4', topic: '[Assessment] Cluster 1 Post Assessment', type: 'assessment' },
  { date: '2026-09-04', week: '8/31-9/4', topic: '[Open-Up U1 L1] Translation (8.G.2)', type: 'translation' },

  { date: '2026-09-08', week: '9/7-9/11', topic: '[Open-Up U1 L2-L3] Naming the Moves (8.G.2)', type: 'naming_moves' },
  { date: '2026-09-09', week: '9/7-9/11', topic: '[iReady L18] Understand Properties of Transformations (8.G.2)', type: 'properties' },
  { date: '2026-09-10', week: '9/7-9/11', topic: '[enVision T6 L1] Translation (8.G.3)', type: 'translation' },
  { date: '2026-09-11', week: '9/7-9/11', topic: '[enVision T6 L2] Reflection (8.G.3)', type: 'reflection' },

  { date: '2026-09-14', week: '9/14-9/18', topic: '[enVision T6 L3] Rotations (8.G.3)', type: 'rotation' },
  { date: '2026-09-15', week: '9/14-9/18', topic: '[enVision T6 L4] Compose Transformations (8.G.3)', type: 'compose' },
  { date: '2026-09-16', week: '9/14-9/18', topic: '[Open-Up U1 L11-L12] Congruent Figures/Polygons (8.G.2)', type: 'congruent' },
  { date: '2026-09-17', week: '9/14-9/18', topic: '[enVision T6 L5] Understand Congruent Figures (8.G.2)', type: 'congruent_coord' },
  { date: '2026-09-18', week: '9/14-9/18', topic: '[Open-Up U2 L1] Projecting and Scaling (8.G.4)', type: 'scaling' },

  { date: '2026-09-21', week: '9/21-9/25', topic: '[Open-Up U2 L4-L5] Dilation on a Grid (8.G.4)', type: 'dilation_grid' },
  { date: '2026-09-22', week: '9/21-9/25', topic: '[Open-Up U2 L5] More Dilations (8.G.4)', type: 'dilation_more' },
  { date: '2026-09-23', week: '9/21-9/25', topic: '[enVision T6 L6] Dilations (8.G.4)', type: 'dilation_envision' },
  { date: '2026-09-24', week: '9/21-9/25', topic: '[Open-Up U2 L6] Similarity (8.G.4)', type: 'similarity' },
  { date: '2026-09-25', week: '9/21-9/25', topic: '[Open-Up U2 L7] Similar Polygons (8.G.4)', type: 'similar_poly' },

  { date: '2026-09-28', week: '9/28-10/2', topic: '[enVision T6 L7] Understand Similar Figures (8.G.4)', type: 'similar_figures' },
  { date: '2026-09-29', week: '9/28-10/2', topic: '[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)', type: 'quotients' },
  { date: '2026-09-30', week: '9/28-10/2', topic: '[Open-Up U2 L7] Similar Polygons (8.G.4)', type: 'similar_poly_2' },
  { date: '2026-10-01', week: '9/28-10/2', topic: '[enVision T6 L7] Understand Similar Figures (8.G.4)', type: 'similar_figures_2' },
  { date: '2026-10-02', week: '9/28-10/2', topic: '[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)', type: 'quotients_2' },

  { date: '2026-10-05', week: '10/5-10/9', topic: '[Review] Cluster 2 Review / EOG Released Questions', type: 'review' },
  { date: '2026-10-06', week: '10/5-10/9', topic: '[Assessment] Cluster 2 Post Assessment', type: 'assessment' }
];

const names = ['A surveyor', 'An architect', 'A drone pilot', 'A graphic designer', 'A game developer', 'An engineer', 'A city planner', 'A meteorologist', 'A sailor', 'A construction manager', 'An artist', 'A geologist', 'An astronaut', 'A pilot', 'A cartographer', 'A robotics technician'];
const objects = ['a building footprint', 'a digital map', 'a 3D model', 'a laser path', 'a navigation route', 'a property boundary', 'a video game sprite', 'a radar blip', 'a ship trajectory', 'a structural beam', 'a canvas layout', 'a tectonic plate', 'a satellite orbit', 'a flight path', 'a topographical map', 'a robotic arm'];

function random(arr, salt) {
  return arr[salt % arr.length];
}

function generateProblems(type, saltBase) {
  const problems = [];
  for (let i = 0; i < 16; i++) {
    const s = saltBase + i;
    const name = random(names, s * 7);
    const obj = random(objects, s * 13);
    const x = (s % 15) - 7;
    const y = ((s * 3) % 15) - 7;
    const val1 = (s % 9) + 2;
    const val2 = ((s * 2) % 9) + 2;

    let q, a, m;
    
    if (type.includes('solve_equation')) {
      q = `Solve for $x$: $x^2 = ${val1 * val1}$. In a real-world scenario, if a square garden has an area of ${val1 * val1} sq ft, what is the side length?`;
      a = `$x = ${val1}$ or $x = -${val1}$. Side length is ${val1} ft.`;
      m = `Forgetting the negative solution for x.`;
    } else if (type.includes('translation')) {
      q = `${name} translates ${obj} starting at $(${x}, ${y})$ by moving it ${val1} units right and ${val2} units down. What is the new coordinate?`;
      a = `$(${x + val1}, ${y - val2})$`;
      m = `Subtracting ${val1} instead of adding.`;
    } else if (type.includes('naming_moves') || type.includes('properties')) {
      q = `${name} applies a rigid motion to ${obj} that maps $(${x}, ${y})$ to $(${x + val1}, ${y - val2})$. Does this motion preserve parallel lines and angle measures? Why?`;
      a = `Yes, all rigid motions (like this translation) preserve parallel lines and angles.`;
      m = `Thinking that rigid motions distort angles.`;
    } else if (type.includes('reflection')) {
      const axis = (s % 2 === 0) ? 'x-axis' : 'y-axis';
      q = `${name} is mirroring ${obj} across the ${axis}. If a critical point is at $(${x}, ${y})$, what will be the coordinates of its reflection?`;
      a = axis === 'x-axis' ? `$(${x}, ${-y})$` : `$(${-x}, ${y})$`;
      m = `Negating the wrong coordinate.`;
    } else if (type.includes('rotation')) {
      const angles = ['90 degrees clockwise', '90 degrees counterclockwise', '180 degrees'];
      const angle = random(angles, s);
      q = `${name} is rotating ${obj} ${angle} around the origin. A key vertex is at $(${x}, ${y})$. Find the new coordinates.`;
      if (angle === '180 degrees') a = `$(${-x}, ${-y})$`;
      else if (angle === '90 degrees clockwise') a = `$(${y}, ${-x})$`;
      else a = `$(${-y}, ${x})$`;
      m = `Applying the translation rules instead of the rotation matrix.`;
    } else if (type.includes('compose')) {
      q = `${name} first translates ${obj} by $\\langle ${val1}, ${-val2} \\rangle$, and then reflects it across the y-axis. If the starting point was $(${x}, ${y})$, what is the final coordinate?`;
      a = `$(${-(x + val1)}, ${y - val2})$`;
      m = `Performing the reflection before the translation.`;
    } else if (type.includes('congruent')) {
      q = `${name} examines two versions of ${obj}. The first has a perimeter of ${val1 * 10} and an area of ${val2 * 5}. It is transformed via a sequence of rigid motions. What are the perimeter and area of the new object?`;
      a = `Perimeter: ${val1 * 10}, Area: ${val2 * 5}`;
      m = `Believing that rotations or translations change the area.`;
    } else if (type.includes('scaling') || type.includes('dilation')) {
      const factor = (s % 2 === 0) ? val1 : `1/${val1}`;
      q = `${name} scales ${obj} by a factor of $${factor}$ centered at the origin. If a point is at $(${x * val1}, ${y * val1})$, what is the new coordinate?`;
      const ansX = (s % 2 === 0) ? x * val1 * val1 : x;
      const ansY = (s % 2 === 0) ? y * val1 * val1 : y;
      a = `$(${ansX}, ${ansY})$`;
      m = `Adding the scale factor instead of multiplying.`;
    } else if (type.includes('similar')) {
      q = `${name} has two similar versions of ${obj}. The original has side lengths ${val1} and ${val2}. The new version has a corresponding first side length of ${val1 * 3}. What is the length of the second side?`;
      a = `${val2 * 3}`;
      m = `Subtracting instead of finding the proportional multiplier.`;
    } else if (type.includes('quotient')) {
      q = `${name} is measuring ${obj} using similar triangles. The shadow of a ${val1} ft pole is ${val2} ft. The shadow of the object is ${val2 * 4} ft. How tall is the object?`;
      a = `${val1 * 4} ft`;
      m = `Setting up the ratio upside down.`;
    } else {
      // Review / Assessment
      q = `[EOG Released] ${name} maps ${obj} starting at $(${x}, ${y})$ using the rule $(x, y) \\rightarrow (-y, x)$. What rigid motion does this represent, and what is the new coordinate?`;
      a = `90 degrees counterclockwise rotation; new coordinate is $(${-y}, ${x})$`;
      m = `Confusing clockwise with counterclockwise.`;
    }
    
    problems.push({ question: q, correct_answer: a, misconception: m });
  }
  return problems;
}

const records = lessonData.map((d, index) => {
  const titleExtract = d.topic.includes(']') ? d.topic.split('] ')[1] : d.topic;
  const standardMatch = d.topic.match(/\((.*?)\)/);
  const standard = standardMatch ? standardMatch[1] : (d.type === 'review' || d.type === 'assessment' ? '8.G' : '8.EE.2');

  const di = `## Understanding the Core Concept\n---\nToday we are focusing on **${titleExtract}**. This concept is absolutely vital for a wide array of real-world applications in geometry, advanced computer science, structural engineering, and even fields like graphic design and cinematography. When we talk about geometric transformations, we are talking about the fundamental ways in which objects move, scale, and change within a defined spatial coordinate system. A deep, conceptual understanding of these mechanics will allow you to not only solve abstract mathematical equations but also model real-world phenomena accurately. Think about how a video game engine renders movement, or how a GPS system recalculates a route. All of these rely heavily on the principles we are covering today.\n\n---\n## Application and Rules\n---\nYou must understand how to rigorously apply the algebraic rules associated with these geometric principles. It is never enough to simply memorize a formula; you must comprehend *why* the formula works. Always read the problem carefully and apply the transformation to the **x** and **y** coordinates with absolute precision. Pay meticulous attention to signs, directions, and the specific order of operations, especially when dealing with compositions of multiple transformations. For example, a rotation followed by a translation is often very different from a translation followed by a rotation. The order matters immensely. When working with dilations and scaling, remember that the scale factor applies multiplicatively, projecting distances outward or inward from the center of dilation. These algebraic rules are the translation of visual movement into the rigorous language of mathematics.\n\n---\n## Real-World Examples\n---\nWhether you are an architect designing a massive skyscraper, a game developer programming the complex physics of a character's movement, or a data scientist mapping geospatial coordinates, these geometric properties dictate how objects interact in space. Be prepared to explain your reasoning using proportional relationships or rigid motions! In your independent practice today, you will encounter scenarios involving drone pilots navigating 3D space, cartographers mapping shifting tectonic plates, and engineers calculating the structural integrity of load-bearing beams under various transformations. It is your job to synthesize the theoretical mathematics with these practical applications. Do not just solve for 'x'; understand what 'x' represents in the context of the physical world. Let's dive in and master these concepts.`;
  
  return {
    date_start: d.date,
    week_label: d.week,
    topic: d.topic,
    objective_3m: `SWBAT deeply analyze and solve complex problems involving ${titleExtract} with 90% accuracy.`,
    standard: standard,
    do_now: 'Analyze the transformation from yesterday. What changed and what was preserved?',
    direct_instruction: di,
    exit_ticket: 'Summarize the primary rule learned today and apply it to the point (4, -2).',
    structured_exemplars: generateProblems(d.type, index * 100)
  };
});

async function run() {
  const dates = lessonData.map(d => d.date);
  await supabase.from('lesson_plans').delete().in('date_start', dates);
  const { error } = await supabase.from('lesson_plans').insert(records);
  if (error) console.error(error);
  else console.log('Successfully generated and seeded the completely shifted calendar!');
}

run();
