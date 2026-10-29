const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: plans } = await supabase.from('lesson_plans').select('id, date_start, topic').gte('date_start', '2026-09-21');
  
  for (const plan of plans) {
    let newDI = '';
    
    if (plan.topic.includes('Dilation on a Grid') || plan.topic.includes('More Dilations')) {
      newDI = `## Conceptualizing Dilations\n---\nWe will begin with a visual model from **Open Up Resources Unit 2**. How do we resize an image on a computer? When we drag the corner, the image stretches but maintains its proportions. This is a **dilation**. We will model stretching a triangle on a coordinate grid from the origin. Scholars will observe that corresponding angles remain the same, but side lengths change.\n\n---\n## Procedural Rules for Dilations\n---\nUsing a coordinate grid example, we will discover the algebraic rule for dilations centered at the origin. If the scale factor is $k$, the rule is $(x, y) \\rightarrow (kx, ky)$. We will model multiplying both coordinates by a scale factor of 2 (enlargement) and 1/2 (reduction). \n\n---\n## Independent Practice\n---\n*Note: Students will complete their independent practice digitally.*`;
    } else if (plan.topic.includes('Dilations')) {
      newDI = `## Applying Dilations\n---\nWe will use **Savvas Envision** examples to solidify our understanding of dilations. We will analyze a pre-image and image and work backward to determine the scale factor. I will ask: "How do we find the scale factor if we know the length of the image and the pre-image?" (Image length / Pre-image length).\n\n---\n## Visual Representation\n---\nWe will graph a figure, apply a negative scale factor, and observe how it affects the figure's location and orientation. Scholars will record the coordinates in their guided notes and verify that multiplying by a negative scale factor also rotates the figure 180 degrees.\n\n---\n## Independent Practice\n---\n*Note: Students will complete their independent practice digitally.*`;
    } else if (plan.topic.includes('Similarity') || plan.topic.includes('Similar Polygons')) {
      newDI = `## Defining Similarity\n---\nUsing **Open Up Resources Unit 2**, we will define what it means for two figures to be similar. Two figures are similar if there is a sequence of rigid transformations and dilations that maps one onto the other. We will model this using tracing paper and a ruler. \n\n---\n## Proportional Relationships\n---\nWe will analyze the side lengths of two similar polygons. Scholars will set up ratios comparing corresponding sides and discover that all ratios are equal. I will model setting up a proportion to solve for an unknown side length: $\\frac{\\text{Side 1}}{\\text{Side 2}} = \\frac{\\text{Side 3}}{x}$.\n\n---\n## Independent Practice\n---\n*Note: Students will complete their independent practice digitally.*`;
    } else if (plan.topic.includes('Similar Figures')) {
      newDI = `## Exploring Similar Figures\n---\nUsing **Savvas Envision**, we will determine if two given figures are similar. Scholars will check two conditions: 1) Are all corresponding angles congruent? 2) Are all corresponding side lengths proportional? We will model checking both conditions systematically. \n\n---\n## Justification and Explanation\n---\nScholars will write similarity statements, e.g., $\\triangle ABC \\sim \\triangle XYZ$. We will emphasize that the order of the letters matters, just like in congruence statements. We will practice justifying our answers using mathematical vocabulary (scale factor, corresponding parts, proportional).\n\n---\n## Independent Practice\n---\n*Note: Students will complete their independent practice digitally.*`;
    } else if (plan.topic.includes('Quotients')) {
      newDI = `## Analyzing Quotients in Triangles\n---\nWe will use **Open Up Resources Unit 2 Lesson 9** to explore the quotients of side lengths in similar triangles. We will measure the sides of nested similar triangles and calculate the quotients (ratios) of their vertical and horizontal sides. \n\n---\n## Connecting to Slope\n---\nScholars will discover that for any two points on a line, the quotient of the vertical distance and the horizontal distance (the slope) is constant because the triangles formed are similar. I will ask: "How does similarity prove that the slope of a line is constant?"\n\n---\n## Independent Practice\n---\n*Note: Students will complete their independent practice digitally.*`;
    } else {
      newDI = `## Reviewing Cluster 2 Concepts\n---\nToday we will review the key concepts from Cluster 2: dilations, similarity, and proportional reasoning. We will work through released EOG questions to analyze how these concepts are tested. I will model breaking down a complex word problem and identifying the relevant geometric properties.\n\n---\n## Assessment Preparation\n---\nScholars will practice identifying sequences of transformations that prove similarity and solving for missing side lengths using proportions. We will review common misconceptions, such as adding a scale factor instead of multiplying.\n\n---\n## Independent Practice\n---\n*Note: Students will complete their independent practice digitally.*`;
    }
    
    await supabase.from('lesson_plans').update({ direct_instruction: newDI }).eq('id', plan.id);
  }
  
  console.log('Successfully replaced all generic Direct Instructions with specific curricular references!');
}

run();
