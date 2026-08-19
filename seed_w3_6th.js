import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans (Week 3 6th Grade)...');
  await supabase.from('lesson_plans').delete().in('date_start', ['2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28']);

  const lessonPlans = [];

  // Day 11 (8/24)
  lessonPlans.push({
    date_start: '2026-08-24', week_label: '8/24-8/28',
    topic: 'Surface Area of Prisms (Open-Up U1 L12, 18 + Envision T7-6)',
    objective_3m: 'Students will calculate the surface area of rectangular and triangular prisms by finding the area of each face and adding them together.',
    standard: '6.G.4',
    do_now: '**Vocabulary Primer:**\n- **Surface Area:** The total area of the OUTSIDE of a 3D object.\n- **Face:** A flat side of a 3D object.\n\n**Do Now:** How is painting a box different from filling a box with water? Which one is surface area?',
    direct_instruction: '## Unfolding a Box\nTo find the surface area of a 3D prism, we imagine unfolding it flat into a 2D shape called a NET. \nA rectangular prism has 6 faces: Top/Bottom, Front/Back, Left/Right.\n\n---\n\n## The "Find and Add" Method\nInstead of a confusing formula, just find the area of every single flat side. \n1. Draw out the 6 rectangles.\n2. Find the area of each ($b \\times h$).\n3. Add them all up!\n\n* **Turn and Talk (2 min):** Why are the Top and Bottom faces of a rectangular prism always the exact same area?',
    group_practice: 'Box Wrapping: Students are given physical cardboard boxes. They must measure the faces, calculate the total surface area, and cut out exactly that much wrapping paper.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Find the surface area of a cube with side length 3.', correct_answer: 'One face = 9. Six faces = 54 sq units.', misconception: '3*3*3 = 27 (Finding Volume).\n\nIntervention: "We are painting the outside, not filling it up!"' },
      { question: 'A rectangular prism has dimensions 2, 4, and 5. Find the surface area.', correct_answer: 'Top/Bottom: 4*5=20 (x2=40). Front/Back: 2*5=10 (x2=20). Sides: 2*4=8 (x2=16). Total: 76.', misconception: 'Only adding 3 faces together (20+10+8=38).\n\nIntervention: "Does a box only have 3 sides?"' },
      { question: 'How many faces does a triangular prism have?', correct_answer: '5. (2 triangles, 3 rectangles).', misconception: '6.\n\nIntervention: Count them on a physical object.' },
      { question: 'A triangular prism has 2 identical triangular bases (area 6 each) and 3 rectangular sides (areas 10, 10, 12). Surface Area?', correct_answer: '6+6+10+10+12 = 44.', misconception: 'Forgetting one of the triangles.\n\nIntervention: "Triangular prisms have TWO bases."' },
      { question: 'Find the surface area of a cube with side 5.', correct_answer: '25 * 6 = 150.', misconception: '5 * 6 = 30.\n\nIntervention: Area of one face is 5x5, not just 5.' },
      { question: 'True or False: The front and back faces of a rectangular prism are always identical.', correct_answer: 'True.', misconception: 'False.\n\nIntervention: Look at a cereal box.' },
      { question: 'A prism has dimensions 10 by 1 by 1. Surface Area?', correct_answer: 'Sides are 10 (x4=40). Ends are 1 (x2=2). Total = 42.', misconception: '10*1*1 = 10.\n\nIntervention: Volume vs Surface Area.' },
      { question: 'Find the area of the Top face of a 6x3x2 prism (Length 6, Width 3, Height 2).', correct_answer: 'Top is Length x Width. 6 x 3 = 18.', misconception: '6 x 2 = 12.\n\nIntervention: The height goes up and down, it is not part of the top.' },
      { question: 'If a cube has a surface area of 600, what is the area of ONE face?', correct_answer: '600 / 6 = 100.', misconception: '600 / 2 = 300.\n\nIntervention: A cube has 6 faces.' },
      { question: 'What is the side length of the cube from the previous question?', correct_answer: '10 (since 10x10=100).', misconception: '50.\n\nIntervention: What number times ITSELF equals 100?' }
    ],
    criteria_for_success: 'Accurately identify all faces of a prism and calculate the total surface area.',
    exit_ticket: 'Calculate the surface area of a rectangular prism with dimensions 3, 4, and 10.',
    checks_for_understanding: [{ cfu: 'Why do we multiply by 2 when finding the surface area of the Front face?', method: 'Cold Call' }]
  });

  // Day 12 (8/25)
  lessonPlans.push({
    date_start: '2026-08-25', week_label: '8/24-8/28',
    topic: 'Surface Area of Pyramids (Envision T7-5 + Open-Up U1 L14, 15)',
    objective_3m: 'Students will calculate the surface area of square and triangular pyramids using nets.',
    standard: '6.G.4',
    do_now: '**Vocabulary Primer:**\n- **Pyramid:** A 3D shape with a polygon base and triangle sides that meet at a point.\n- **Net:** A 2D pattern that folds into a 3D shape.\n\n**Do Now:** Draw what a square pyramid would look like if you unfolded it flat on the table.',
    direct_instruction: '## The Star Net\nWhen you unfold a square pyramid, it looks like a 4-pointed star! It has ONE square base in the middle, and FOUR triangle faces pointing outward.\n\n---\n\n## Solving Pyramids\nTo find the surface area, we do the exact same thing we did for prisms: Find the area of the base, find the area of the triangles ($1/2 \\times b \\times h$), and add them all up!\n\n* **Turn and Talk (2 min):** Why does a square pyramid have 4 triangles, but a triangular pyramid only has 3?',
    group_practice: 'Net Matching: Students match 3D pyramid pictures to their unfolded 2D nets, then calculate the surface area of each.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'A square pyramid has a base of 4x4. The 4 triangular sides have a base of 4 and height of 5. Surface area?', correct_answer: 'Base = 16. One Tri = 1/2*4*5 = 10. Four Tris = 40. Total = 56.', misconception: 'Forgetting to half the triangle (4*5=20, times 4 = 80). \n\nIntervention: "Triangles are HALF a parallelogram!"' },
      { question: 'A triangular pyramid has 4 IDENTICAL faces. The area of one face is 12. Surface area?', correct_answer: '12 * 4 = 48.', misconception: '12 * 3 = 36.\n\nIntervention: A triangular pyramid has a base AND 3 sides. 1 + 3 = 4 faces total.' },
      { question: 'A square pyramid base is 10x10. The triangles have height 8. Surface area?', correct_answer: 'Base = 100. Tri = 1/2*10*8=40. Four Tris = 160. Total = 260.', misconception: 'Base = 40.\n\nIntervention: Area of a square is base times height (10x10), not perimeter (10x4).' },
      { question: 'A rectangular pyramid has a base of 6x4. The triangles on the long side have height 5. The triangles on the short side have height 6. Surface area?', correct_answer: 'Base = 24. Long tris (2) = 1/2*6*5=15 (x2=30). Short tris (2) = 1/2*4*6=12 (x2=24). Total = 78.', misconception: 'Assuming all 4 triangles are identical.\n\nIntervention: "Is the base a perfect square? No. So the triangles are different!"' },
      { question: 'How many faces does a square pyramid have?', correct_answer: '5.', misconception: '4.\n\nIntervention: Don\'t forget the bottom!' },
      { question: 'A pyramid has a pentagon base (5 sides). How many triangle faces will it have?', correct_answer: '5.', misconception: '4.\n\nIntervention: "Every side of the base needs a triangle attached to it."' },
      { question: 'Square base = 5x5. Triangle height = 6. Surface Area?', correct_answer: '25 + (4 * 15) = 85.', misconception: 'Calculation error.\n\nIntervention: Break it down step by step.' },
      { question: 'If the total surface area of a square pyramid is 96, and the 4 triangles have a combined area of 60, what is the area of the base?', correct_answer: '96 - 60 = 36.', misconception: 'Dividing 96 / 5.\n\nIntervention: "The whole thing is 96. If we take away the triangles (60), what is left?"' },
      { question: 'What is the side length of the base from the previous question?', correct_answer: '6 (since 6x6=36).', misconception: '9.\n\nIntervention: 9x9 = 81.' },
      { question: 'A triangular pyramid has a base area of 10 and 3 side triangles of area 15 each. Total?', correct_answer: '10 + 15 + 15 + 15 = 55.', misconception: '10 + 15 = 25.\n\nIntervention: Read carefully: 3 side triangles.' }
    ],
    criteria_for_success: 'Draw nets for pyramids and use them to calculate total surface area.',
    exit_ticket: 'Find the surface area of a square pyramid with base side length 8 and triangle height 10.',
    checks_for_understanding: [{ cfu: 'How is a pyramid different from a prism?', method: 'Turn & Talk' }]
  });

  // Day 13 (8/26)
  lessonPlans.push({
    date_start: '2026-08-26', week_label: '8/24-8/28',
    topic: 'Polyhedra Nets (Envision T1-7)',
    objective_3m: 'Students will identify the 3D solid that can be formed from a given 2D net.',
    standard: '6.G.4',
    do_now: '**Vocabulary Primer:**\n- **Polyhedron:** A 3D solid with flat faces.\n\n**Do Now:** Draw a net that will fold into a cube.',
    direct_instruction: '## Visualizing the Fold\nLooking at a flat net and imagining it folding up is a difficult visual-spatial skill! We have to look for the BASES to identify the shape.\n\n---\n\n## Prisms vs Pyramids\nIf a net has a bunch of RECTANGLES in a row, it will fold into a PRISM. If it has a bunch of TRIANGLES pointing to a center, it will fold into a PYRAMID.\n\n* **Turn and Talk (2 min):** If you see a net with 2 hexagons and 6 rectangles, what shape is it?',
    group_practice: 'Origami Challenge: Students are given strange nets and must predict what shape they make before cutting them out and folding them to check.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'What shape is made from a net with 6 identical squares?', correct_answer: 'A cube.', misconception: 'Square prism.\n\nIntervention: A cube is a special square prism where all faces are equal.' },
      { question: 'What shape is made from a net with 2 identical triangles and 3 rectangles?', correct_answer: 'Triangular Prism.', misconception: 'Triangular Pyramid.\n\nIntervention: "Pyramids don\'t have rectangles!"' },
      { question: 'What shape is made from a net with 1 square and 4 triangles?', correct_answer: 'Square Pyramid.', misconception: 'Square Prism.\n\nIntervention: "Look at the sides. Triangles mean it comes to a point (pyramid)."' },
      { question: 'What shape is made from a net with 2 pentagons and 5 rectangles?', correct_answer: 'Pentagonal Prism.', misconception: 'Hexagonal Prism.\n\nIntervention: Count the sides of the base shape.' },
      { question: 'Will a net with 5 squares arranged in a straight line fold into a closed box?', correct_answer: 'No, a cube needs 6 squares, and they can\'t all be in a straight line (they would overlap).', misconception: 'Yes.\n\nIntervention: Cut it out and try to fold it.' },
      { question: 'What shape is made from 4 identical triangles?', correct_answer: 'Triangular Pyramid (also called a Tetrahedron).', misconception: 'Triangular Prism.\n\nIntervention: Prisms need rectangles.' },
      { question: 'Identify: 1 hexagon, 6 triangles.', correct_answer: 'Hexagonal Pyramid.', misconception: 'Hexagonal Prism.\n\nIntervention: Triangles = Pyramid.' },
      { question: 'If you fold a cube net, which face is OPPOSITE the bottom base?', correct_answer: 'The top face (which is usually separated by one square in the net).', misconception: 'The one right next to it.\n\nIntervention: "Adjacent faces touch. Opposite faces don\'t touch."' },
      { question: 'Identify: 2 squares, 4 rectangles.', correct_answer: 'Rectangular Prism.', misconception: 'Cube.\n\nIntervention: "A cube has all identical squares."' },
      { question: 'How many faces does an octagonal prism have?', correct_answer: '10. (2 octagons + 8 rectangles).', misconception: '8.\n\nIntervention: "Don\'t forget the top and bottom!"' }
    ],
    criteria_for_success: 'Correctly identify at least 4 out of 5 3D shapes from their 2D nets.',
    exit_ticket: 'Draw the net of a triangular prism and label its faces.',
    checks_for_understanding: [{ cfu: 'How can you tell the difference between a prism net and a pyramid net?', method: 'Turn & Talk' }]
  });

  // Day 14 (8/27)
  lessonPlans.push({
    date_start: '2026-08-27', week_label: '8/24-8/28',
    topic: 'End of Unit Review / EOG Prep',
    objective_3m: 'Students will synthesize their knowledge of area and surface area to solve complex real-world problems.',
    standard: '6.G.1, 6.G.4',
    do_now: '**Vocabulary Primer:**\n- **Review:** To look over again.\n\n**Do Now:** Write down the area formula for a rectangle, a parallelogram, and a triangle.',
    direct_instruction: '## Test Taking Strategies\nWhen taking the EOG or a unit test, don\'t just stare at the screen! Draw the shapes on your scratch paper. \n\n---\n\n## Highlighting the Goal\nAlways underline what the question is asking for. Are they asking for the Area of the floor? Or the Surface Area of the whole room? Or the Perimeter of the fence?\n\n* **Turn and Talk (2 min):** What is the easiest mistake to make when finding the area of a triangle?',
    group_practice: 'EOG Relay Race: Teams compete to solve state-test-aligned word problems on whiteboards.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'A triangular sign has a base of 15in and height of 10in. What is the area?', correct_answer: '75 sq in.', misconception: '150.\n\nIntervention: Don\'t forget the 1/2 for triangles!' },
      { question: 'A rectangular pool is 20ft by 30ft. A 3ft wide concrete deck goes all the way around it. What is the area of the deck?', correct_answer: 'Total area (26x36) = 936. Pool area = 600. Deck = 336.', misconception: '3*20 + 3*30.\n\nIntervention: Draw the "donut" shape.' },
      { question: 'What is the surface area of a cube with edge length 1/2 inch?', correct_answer: 'Face = 1/4. Total = 6/4 = 1.5 sq in.', misconception: '1/2 * 6 = 3.\n\nIntervention: You have to square the side length first! 1/2 * 1/2 = 1/4.' },
      { question: 'Find the area of a parallelogram with base 5.2 and height 4.', correct_answer: '20.8', misconception: 'Adding them.\n\nIntervention: Area is multiplication.' },
      { question: 'A pyramid has a 6x6 base. Triangles have height 4. Surface area?', correct_answer: '36 + 4*(12) = 84.', misconception: '4*(24)=96.\n\nIntervention: Triangle area is 1/2 bh.' },
      { question: 'A trapezoid has bases 10 and 6, and height 4. Area?', correct_answer: 'Decompose into a 6x4 rectangle and two 2x4 triangles. Area = 24 + 4 + 4 = 32. (Or use formula 1/2(16)*4 = 32).', misconception: '10*4 = 40.\n\nIntervention: It is not a perfect rectangle.' },
      { question: 'A box is 5x5x5. You want to wrap it in paper. How much paper?', correct_answer: 'Surface area = 25 * 6 = 150.', misconception: '125 (volume).\n\nIntervention: Wrapping paper goes on the outside (Surface Area).' },
      { question: 'Area of a triangle is 40. Base is 8. Height?', correct_answer: '10.', misconception: '5.\n\nIntervention: 1/2 * 8 * 5 = 20. We need 40.' },
      { question: 'Which is larger: area of a 4x4 square, or area of a triangle with base 8 and height 4?', correct_answer: 'They are equal! Square = 16. Triangle = 1/2*8*4 = 16.', misconception: 'Square is larger.\n\nIntervention: Do the math for both.' },
      { question: 'Draw a net for a triangular prism.', correct_answer: '3 rectangles in a row, with a triangle attached to the top and bottom of the middle rectangle.', misconception: 'Drawing 4 triangles.\n\nIntervention: That is a pyramid.' }
    ],
    criteria_for_success: 'Score at least 80% on the review packet.',
    exit_ticket: 'What topic do you need to study the most tonight before the test?',
    checks_for_understanding: [{ cfu: 'Thumbs up/down: I feel ready for the test tomorrow.', method: 'Visual Check' }]
  });

  // Day 15 (8/28)
  lessonPlans.push({
    date_start: '2026-08-28', week_label: '8/24-8/28',
    topic: 'Unit 1 Assessment',
    objective_3m: 'Students will demonstrate mastery of area, surface area, and geometric nets on a formal assessment.',
    standard: '6.G.1, 6.G.4',
    do_now: '**Vocabulary Primer:**\n- **Mastery:** Complete understanding of a skill.\n\n**Do Now:** Take 5 minutes to review your notes silently.',
    direct_instruction: '## Test Expectations\n- Voice level 0.\n- Keep eyes on your own paper/screen.\n- Use your scratch paper for ALL calculations. Do not do mental math on a test!\n\n---\n\n## When You Finish\nWhen you complete the test, check over your answers. If you are 100% finished, close your laptop and silently read a book or complete the early-finisher anchor activity.',
    group_practice: 'Assessment Block. No group practice today.',
    independent_practice: 'Unit 1 Formal Assessment (Testing Environment).',
    structured_exemplars: [
      { question: 'Test Question 1', correct_answer: 'A', misconception: 'None' },
      { question: 'Test Question 2', correct_answer: 'B', misconception: 'None' },
      { question: 'Test Question 3', correct_answer: 'C', misconception: 'None' },
      { question: 'Test Question 4', correct_answer: 'D', misconception: 'None' },
      { question: 'Test Question 5', correct_answer: 'A', misconception: 'None' },
      { question: 'Test Question 6', correct_answer: 'B', misconception: 'None' },
      { question: 'Test Question 7', correct_answer: 'C', misconception: 'None' },
      { question: 'Test Question 8', correct_answer: 'D', misconception: 'None' },
      { question: 'Test Question 9', correct_answer: 'A', misconception: 'None' },
      { question: 'Test Question 10', correct_answer: 'B', misconception: 'None' }
    ],
    criteria_for_success: 'Students score 80% or higher on the Unit Assessment.',
    exit_ticket: 'How do you feel you did on this test? What was the hardest part?',
    checks_for_understanding: [{ cfu: 'Are there any final questions before we begin?', method: 'Whole Group' }]
  });

  console.log(`Inserting Week 3 plans...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) console.error(`Error inserting ${plan.date_start}:`, error);
  }
};

run();
