const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function generateDirectInstruction(topic) {
  return `
**${topic}**

In this lesson, we will explore the mathematical foundations of **dilations** and **similarity**. A **dilation** is a transformation that produces an image that is the same shape as the original, but is a different size. The **center of dilation** is a fixed point in the plane about which all points are expanded or contracted. 

---

When we perform a dilation, every point on the original figure is moved along a straight line originating from the **center of dilation**. The distance each point moves is determined by the **scale factor**, often denoted by the variable $k$. If $k > 1$, the dilation is an **enlargement**. If $0 < k < 1$, the dilation is a **reduction**. If $k = 1$, the figure remains unchanged, which we call an **isometry** or **congruence transformation**.

---

Let's consider dilations on a coordinate grid. If the **center of dilation** is the origin $(0,0)$, the rule for a dilation with scale factor $k$ is $(x, y) \\rightarrow (kx, ky)$. This means we simply multiply the $x$ and $y$ coordinates of every vertex by the **scale factor**. 

**Similarity** is directly tied to dilations. Two figures are **similar** if one can be obtained from the other by a sequence of rigid transformations and dilations. **Similar polygons** have corresponding angles that are **congruent** and corresponding side lengths that are **proportional**. 

---

Let's look at a real-world example: **blueprints**. An architect creates a blueprint of a house using a **scale factor**. The blueprint is a **reduction** of the actual house. The angles of the rooms on the blueprint are exactly the same as the actual rooms, meaning they are **congruent**. The lengths of the walls on the blueprint are **proportional** to the actual walls. 

When we calculate **quotients in similar triangles**, we are checking for this proportionality. The ratio of any two corresponding side lengths in similar triangles will always be equal. This constant ratio is the **scale factor** connecting the two figures. 

---

To master this concept, you must precisely identify corresponding parts. **Corresponding angles** match up and are equal. **Corresponding sides** match up and their lengths form equal ratios. You will apply these principles to solve complex problems involving **microscopes**, **scale models**, and **photography**. 

Remember, when setting up a proportion, consistency is key. You must compare "small triangle to large triangle" consistently across your equation. With a solid grasp of these **proportional relationships**, you will be able to determine unknown side lengths and verify whether two geometric figures are truly **similar**.
  `.trim();
}

function generateProblems(topic) {
  const problems = [];
  const contexts = ['microscope', 'blueprint', 'photography', 'scale model', 'coordinate grid', 'shadow', 'map', 'architecture'];
  
  for (let i = 0; i < 16; i++) {
    const context = contexts[i % contexts.length];
    const k = (Math.floor(Math.random() * 4) + 2); 
    const isReduction = i % 2 === 0;
    const scaleFactor = isReduction ? `1/${k}` : `${k}`;
    
    problems.push({
      question: `A ${context} uses a scale factor of $${scaleFactor}$. If the original length is $${k * 5}$ units, what is the length of the image after dilation? Explain your reasoning using proportional relationships.`,
      correct_answer: isReduction ? "5 units" : `${k * k * 5} units`,
      misconception: "Students may add the scale factor instead of multiplying, or invert the scale factor when setting up the proportion."
    });
  }
  return problems;
}

const days = [
  { date_start: '2026-09-16', topic: '[Open-Up U2 L4-L5] Dilation on a Grid (8.G.4)' },
  { date_start: '2026-09-17', topic: '[Open-Up U2 L5] More Dilations (8.G.4)' },
  { date_start: '2026-09-18', topic: '[enVision T6 L6] Dilations (8.G.4)' },
  { date_start: '2026-09-21', topic: '[Open-Up U2 L6] Similarity (8.G.4)' },
  { date_start: '2026-09-22', topic: '[Open-Up U2 L7] Similar Polygons (8.G.4)' },
  { date_start: '2026-09-23', topic: '[enVision T6 L7] Understand Similar Figures (8.G.4)' },
  { date_start: '2026-09-24', topic: '[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)' },
  { date_start: '2026-09-25', topic: '[Open-Up U2 L7] Similar Polygons (8.G.4)' },
  { date_start: '2026-09-28', topic: '[enVision T6 L7] Understand Similar Figures (8.G.4)' },
  { date_start: '2026-09-29', topic: '[Open-Up U2 L9] Quotients in Similar Triangles (8.G.4)' },
  { date_start: '2026-09-30', topic: '[Review] Cluster 2 Review / EOG Released Questions' },
  { date_start: '2026-10-01', topic: '[Assessment] Cluster 2 Post Assessment' }
];

async function seed() {
  console.log('Generating rigorous lesson plans...');
  
  const records = days.map(day => {
    return {
      date_start: day.date_start,
      week_label: 'September Part 2',
      topic: day.topic,
      objective_3m: `SWBAT master the concepts in ${day.topic} with 80% accuracy on their rigorous exit ticket.`,
      standard: '8.G.4',
      direct_instruction: generateDirectInstruction(day.topic),
      structured_exemplars: generateProblems(day.topic),
      do_now: `Review fundamental concepts related to ${day.topic}. Identify the scale factor $k$ given a pre-image and image.`,
      exit_ticket: `Determine if the figures are similar. If so, describe a sequence of transformations including a dilation that maps one onto the other.`
    };
  });

  const dates = days.map(d => d.date_start);

  console.log('Deleting old records for these dates...');
  const { error: deleteError } = await supabase
    .from('lesson_plans')
    .delete()
    .in('date_start', dates);

  if (deleteError) {
    console.error('Delete error:', deleteError);
    return;
  }

  console.log('Inserting new rigorous records...');
  const { error: insertError } = await supabase
    .from('lesson_plans')
    .insert(records);

  if (insertError) {
    console.error('Insert error:', insertError);
  } else {
    console.log('Successfully seeded 12 rigorous lesson plans!');
  }
}

seed();
