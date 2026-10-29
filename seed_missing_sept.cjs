const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const days = [
  {
    date_start: '2026-09-08',
    week_label: '9/7-9/11',
    topic: '[enVision T6 L2] Reflection',
    objective_3m: 'SWBAT master the concepts in [enVision T6 L2] Reflection with 80% accuracy on their rigorous exit ticket.',
    standard: '8.G.3',
    do_now: '1. What are the coordinates of the image of $(1, 2)$ after a translation $3$ units right?\n2. Translate $(-4, 5)$ by the vector $\\langle 2, -1 \\rangle$.',
    direct_instruction: '## What is a Reflection?\n---\nA **reflection** is a transformation that "flips" a figure over a line, called the **line of reflection**.\n\nKey Concept: The original figure and its image are **congruent** and have opposite orientations. Every point is the **same distance** from the line of reflection as its corresponding point on the image.\n\n---\n## Reflecting over the x-axis\nWhen you reflect a point $(x, y)$ over the **x-axis**, the x-coordinate stays the same and the y-coordinate becomes opposite: $(x, y) \\rightarrow (x, -y)$.\n\n---\n## Reflecting over the y-axis\nWhen you reflect a point $(x, y)$ over the **y-axis**, the y-coordinate stays the same and the x-coordinate becomes opposite: $(x, y) \\rightarrow (-x, y)$.',
    structured_exemplars: Array(16).fill(null).map((_, i) => ({
      question: `Find the image of $( ${i+1}, ${-i} )$ after a reflection across the x-axis.`,
      correct_answer: `$( ${i+1}, ${i} )$`,
      misconception: 'Negating the wrong coordinate.'
    })),
    exit_ticket: 'Reflect the triangle with vertices $A(1, 1), B(4, 1), C(4, 5)$ across the y-axis. Give the coordinates of the image.'
  },
  {
    date_start: '2026-09-09',
    week_label: '9/7-9/11',
    topic: '[enVision T6 L3] Rotations',
    objective_3m: 'SWBAT master the concepts in [enVision T6 L3] Rotations with 80% accuracy.',
    standard: '8.G.3',
    do_now: 'Reflect $(-5, 3)$ across the x-axis.',
    direct_instruction: '## What is a Rotation?\n---\nA **rotation** turns a figure about a fixed point called the **center of rotation**. The figure is rotated by a specific **angle** and **direction** (clockwise or counterclockwise).\n\n---\n## Common Rotations about the Origin\n- **90° counterclockwise**: $(x, y) \\rightarrow (-y, x)$\n- **180°**: $(x, y) \\rightarrow (-x, -y)$\n- **90° clockwise**: $(x, y) \\rightarrow (y, -x)$',
    structured_exemplars: Array(16).fill(null).map((_, i) => ({
      question: `Rotate the point $( ${i+2}, ${i*2} )$ 90 degrees counterclockwise around the origin.`,
      correct_answer: `$( ${-i*2}, ${i+2} )$`,
      misconception: 'Applying the wrong rotation rule.'
    })),
    exit_ticket: 'Rotate a point $(3, 4)$ 180 degrees. What are the new coordinates?'
  },
  {
    date_start: '2026-09-10',
    week_label: '9/7-9/11',
    topic: '[enVision T6 L4] Compose Transformations',
    objective_3m: 'SWBAT master the concepts in [enVision T6 L4] Compose Transformations with 80% accuracy.',
    standard: '8.G.3',
    do_now: 'Rotate $(-2, 7)$ 90 degrees clockwise.',
    direct_instruction: '## Composition of Transformations\n---\nA **composition of transformations** is a combination of two or more transformations. You perform them in the order specified.\n\n---\n## Example\nTranslate a triangle 2 units up, then reflect it across the y-axis.\n\nStep 1: $(x, y) \\rightarrow (x, y+2)$\nStep 2: $(x, y) \\rightarrow (-x, y)$',
    structured_exemplars: Array(16).fill(null).map((_, i) => ({
      question: `Translate point $( ${i}, ${i+1} )$ up 2 units, then reflect across the y-axis.`,
      correct_answer: `$( ${-i}, ${i+3} )$`,
      misconception: 'Doing the transformations in the wrong order.'
    })),
    exit_ticket: 'Translate $(1, -1)$ left 3, then rotate 180 degrees.'
  },
  {
    date_start: '2026-09-11',
    week_label: '9/7-9/11',
    topic: '[Open-Up U1 L11-L12] Congruent Figures/Polygons',
    objective_3m: 'SWBAT master the concepts in [Open-Up U1 L11-L12] Congruent Figures with 80% accuracy.',
    standard: '8.G.2',
    do_now: 'What is a rigid transformation?',
    direct_instruction: '## Congruent Figures\n---\nTwo figures are **congruent** if there is a sequence of rigid transformations (translations, reflections, rotations) that maps one figure exactly onto the other.\n\n---\n## Properties\nCongruent figures have the **same size and shape**. Corresponding angles are equal, and corresponding side lengths are equal.',
    structured_exemplars: Array(16).fill(null).map((_, i) => ({
      question: `If $\\triangle ABC \\cong \\triangle DEF$ and $m\\angle A = ${30+i}^\\circ$, what is $m\\angle D$?`,
      correct_answer: `$${30+i}^\\circ$`,
      misconception: 'Confusing corresponding parts.'
    })),
    exit_ticket: 'Explain why a translation followed by a rotation produces a congruent figure.'
  },
  {
    date_start: '2026-09-14',
    week_label: '9/14-9/18',
    topic: '[enVision T6 L5] Understand Congruent Figures',
    objective_3m: 'SWBAT master the concepts in [enVision T6 L5] Understand Congruent Figures with 80% accuracy.',
    standard: '8.G.2',
    do_now: 'Are two squares with different side lengths congruent?',
    direct_instruction: '## Showing Congruence\n---\nTo show two figures are congruent, you must describe the specific sequence of rigid motions that maps the pre-image to the image.\n\n---\n## Example\n"Translate $\\triangle ABC$ 4 units right, then reflect across the x-axis to obtain $\\triangle A\'B\'C\'$."',
    structured_exemplars: Array(16).fill(null).map((_, i) => ({
      question: `A figure is translated ${i+1} units up. Is the new figure congruent to the original?`,
      correct_answer: `Yes, translations are rigid transformations.`,
      misconception: 'Thinking translation changes size.'
    })),
    exit_ticket: 'Describe a sequence of transformations that maps $(1,1)$ to $(1,-1)$.'
  },
  {
    date_start: '2026-09-15',
    week_label: '9/14-9/18',
    topic: '[Open-Up U2 L1] Projecting and Scaling',
    objective_3m: 'SWBAT master the concepts in [Open-Up U2 L1] Projecting and Scaling with 80% accuracy.',
    standard: '8.G.4',
    do_now: 'What happens to the perimeter of a rectangle if you double its side lengths?',
    direct_instruction: '## Scaling\n---\n**Scaling** a figure changes its size by a **scale factor**. This is NOT a rigid transformation.\n\n---\n## Scale Factor\nIf the scale factor is $k > 1$, the figure gets larger (enlargement). If $0 < k < 1$, the figure gets smaller (reduction).',
    structured_exemplars: Array(16).fill(null).map((_, i) => ({
      question: `A square with side length ${i+2} is scaled by a factor of 3. What is the new side length?`,
      correct_answer: `${(i+2)*3}`,
      misconception: 'Adding instead of multiplying.'
    })),
    exit_ticket: 'A photo is 4 by 6 inches. It is scaled by a factor of 0.5. What are the new dimensions?'
  }
];

async function run() {
  const dates = days.map(d => d.date_start);
  await supabase.from('lesson_plans').delete().in('date_start', dates);
  const { error } = await supabase.from('lesson_plans').insert(days);
  if (error) console.error(error);
  else console.log('Successfully seeded missing days 9/8 to 9/15');
}
run();
