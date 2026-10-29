const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const updateData = {
  objective_3m: 'SWBAT understand and verify experimentally the properties of rotations, reflections, and translations that create congruent figures.',
  do_now: 'What are the three different ways a figure can be moved?',
  direct_instruction: `## What are different ways a figure can be moved?
---
There are three ways to move a figure from one place to another. These movements are called **transformations**.
1. You can slide the figure (**translation**).
2. You can reflect the figure (**reflection**).
3. You can rotate the figure (**rotation**).

---
## Translation
---
A **translation**, or slide, moves every point of a figure the same distance and in the same direction. The figure moves left, right, up, or down. 

---
## Reflection
---
A **reflection**, or flip, flips a figure over an imaginary line that can be horizontal, vertical, or slanted. The line is called a **line of reflection**. Imagine folding on the line of reflection. The original figure and its image would match exactly. Corresponding points on the original figure and its image are the same distance from the line of reflection.

---
## Rotation
---
A **rotation**, or turn, moves a figure around a fixed point. The fixed point is called the **center of rotation**. The figure turns in either a clockwise or counterclockwise direction. A 360-degree rotation turns a full circle.

---
## Properties of Transformations
---
When a figure is translated, reflected, or rotated, what is the same about the original figure and its image? The image is the same size and shape as the original figure! The lengths of the sides are the same and the measures of the angles are the same. Parallel lines are still parallel. The only difference is the location or orientation.`,
  exit_ticket: 'When a figure is translated, reflected, or rotated, what properties of the figure remain the same? What changes?',
  structured_exemplars: [
    {
      question: "When a figure is translated, reflected, or rotated, what's the same about the original figure and its image? What's different?",
      correct_answer: "The image is the same size and shape as the original figure, but in a different location or orientation.",
      misconception: "Thinking translation changes the size of the shape."
    },
    {
      question: "Triangle ABC is translated to form Triangle A'B'C'. How do the lengths of the sides in the original figure compare to the lengths of the sides in its image?",
      correct_answer: "They are the exact same length.",
      misconception: "Thinking the length changes when the shape moves."
    },
    {
      question: "Are parallel lines in the original figure still parallel in the image after a transformation?",
      correct_answer: "Yes, parallel lines are still parallel.",
      misconception: "Thinking rotation makes parallel lines intersect."
    },
    {
      question: "The blue triangle is a rotation of the red triangle. If AB = 5cm, BC = 4cm, AC = 3cm, what are the lengths of the rotated triangle's sides?",
      correct_answer: "The sides are still 5cm, 4cm, and 3cm.",
      misconception: "Thinking rotation stretches or shrinks the sides."
    },
    {
      question: "If angle A in a triangle is 53 degrees, what is the measure of the corresponding angle in the rotated image of the triangle?",
      correct_answer: "53 degrees.",
      misconception: "Thinking angle measures change when rotated."
    },
    {
      question: "Explain whether a figure flipped over a vertical line is a reflection. Why or why not?",
      correct_answer: "Yes, every point in the blue figure is the same distance away from the line of reflection as the corresponding point in the red figure.",
      misconception: "Confusing rotation and reflection."
    },
    {
      question: "Imagine spinning a flag clockwise around in a circle about point O. What is always true about the distance between O and any point on the flag in each of the images of rotation?",
      correct_answer: "Their distance remains the same.",
      misconception: "Thinking the point moves further away from the center of rotation."
    },
    {
      question: "Identify the type of transformation that creates a repeating border pattern by sliding a triangle to the right repeatedly.",
      correct_answer: "Translation.",
      misconception: "Confusing translation and reflection."
    },
    {
      question: "If a line segment MN is translated 4 units down and 3 units to the right to form PQ, which statement describes the length of PQ?",
      correct_answer: "The length is the same as the length of MN.",
      misconception: "Thinking translation changes the size of the line."
    },
    {
      question: "A right triangle with angles measuring 45, 45, and 90 undergoes a reflection. Are the angle measures still 45, 45, and 90?",
      correct_answer: "Yes.",
      misconception: "Thinking reflection changes angle measures."
    },
    {
      question: "A right triangle with angles measuring 45, 45, and 90 undergoes a rotation. Are the angle measures still 45, 45, and 90?",
      correct_answer: "Yes.",
      misconception: "Thinking rotation changes angle measures."
    },
    {
      question: "A right triangle with angles measuring 45, 45, and 90 undergoes a translation. Are the angle measures still 45, 45, and 90?",
      correct_answer: "Yes.",
      misconception: "Thinking translation changes angle measures."
    },
    {
      question: "Triangle XZY is a rotation of scalene triangle ABC. If angle X corresponds to angle A, which statement is correct?",
      correct_answer: "m∠X = m∠A",
      misconception: "Matching the wrong corresponding angles due to the rotation."
    },
    {
      question: "Trapezoid EFGH is the result of a reflection on Trapezoid ABCD. If CD is parallel to AB, then GH is _____ to _____.",
      correct_answer: "GH is parallel to EF.",
      misconception: "Thinking parallel lines will intersect after a reflection."
    },
    {
      question: "A student claims that a 180 degree rotation of a shape is the exact same as sliding it. Is the student correct?",
      correct_answer: "No, a translation moves every point in the same direction, while a rotation turns the figure around a center, changing its orientation.",
      misconception: "Confusing rotation and translation."
    },
    {
      question: "Which of the three transformations (translation, rotation, reflection) requires a 'line' to perform?",
      correct_answer: "Reflection (it requires a line of reflection).",
      misconception: "Thinking rotation uses a line instead of a center point."
    }
  ]
};

async function run() {
  const { error } = await supabase.from('lesson_plans')
    .update(updateData)
    .eq('date_start', '2026-09-09');
    
  if (error) {
    console.error('Error updating plan:', error);
  } else {
    console.log('Successfully updated 9/9 lesson plan with iReady L18 PDF content!');
  }
}

run();
