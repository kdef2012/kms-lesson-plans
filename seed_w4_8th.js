import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans (Week 4 8th Grade)...');
  await supabase.from('lesson_plans').delete().in('date_start', ['2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04']);

  const lessonPlans = [];

  // Day 16 (8/31)
  lessonPlans.push({
    date_start: '2026-08-31', week_label: '8/31-9/4',
    topic: 'Evaluating Square & Cube Roots (Envision T1-4)',
    objective_3m: 'Students will evaluate perfect square roots and perfect cube roots, distinguishing between the two operations.',
    standard: '8.EE.2',
    do_now: '**Vocabulary Primer:**\n- **Square Root ($\\sqrt{x}$):** What number times itself EQUALS x?\n- **Cube Root ($\\sqrt[3]{x}$):** What number times itself 3 TIMES equals x?\n\n**Do Now:** Evaluate $3^2$ and $3^3$.',
    direct_instruction: '## The Inverse Operations\nJust like addition undoes subtraction, roots undo exponents. \nIf $5^2 = 25$, then $\\sqrt{25} = 5$.\nIf $5^3 = 125$, then $\\sqrt[3]{125} = 5$.\n\n---\n\n## The Negative Rule\nYou CANNOT take the square root of a negative number. What times itself equals -25? (-5)x(-5) is positive 25. Nothing works!\nBUT you CAN take the cube root of a negative! $\\sqrt[3]{-8} = -2$, because $(-2)\\times(-2)\\times(-2) = -8$.\n\n* **Turn and Talk (2 min):** Why does squaring a negative number always make it positive?',
    group_practice: 'Root Matchmaker: Students are given cards with square/cube roots and must find the person in the room holding the correct evaluated integer.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Evaluate: $\\sqrt{49}$', correct_answer: '7.', misconception: '24.5.\n\nIntervention: Square roots are not dividing by 2.' },
      { question: 'Evaluate: $\\sqrt[3]{27}$', correct_answer: '3.', misconception: '9.\n\nIntervention: $9 \\times 9 \\times 9$ is huge. $3 \\times 3 \\times 3 = 27$.' },
      { question: 'Evaluate: $\\sqrt{100}$', correct_answer: '10.', misconception: '50.\n\nIntervention: $10 \\times 10 = 100$.' },
      { question: 'Evaluate: $\\sqrt[3]{64}$', correct_answer: '4.', misconception: '8.\n\nIntervention: $\\sqrt{64}$ is 8. This is a CUBE root. $4 \\times 4 \\times 4 = 64$.' },
      { question: 'Evaluate: $\\sqrt[3]{-125}$', correct_answer: '-5.', misconception: 'Impossible.\n\nIntervention: "Only square roots of negatives are impossible. Cube roots are fine!"' },
      { question: 'Evaluate: $-\\sqrt{81}$', correct_answer: '-9.', misconception: 'Impossible.\n\nIntervention: "The negative is on the OUTSIDE. Take the root first, then make it negative."' },
      { question: 'Evaluate: $\\sqrt{144}$', correct_answer: '12.', misconception: '72.\n\nIntervention: You are dividing by 2.' },
      { question: 'Evaluate: $\\sqrt[3]{1}$', correct_answer: '1.', misconception: '0.33.\n\nIntervention: $1 \\times 1 \\times 1 = 1$.' },
      { question: 'Evaluate: $\\sqrt{0}$', correct_answer: '0.', misconception: '1.\n\nIntervention: $0 \\times 0 = 0$.' },
      { question: 'Evaluate: $\\sqrt[3]{8}$', correct_answer: '2.', misconception: '4.\n\nIntervention: $2 \\times 2 \\times 2 = 8$.' }
    ],
    criteria_for_success: 'Evaluate both perfect square and perfect cube roots, identifying when negative roots are possible.',
    exit_ticket: 'Evaluate $\\sqrt{36}$ and $\\sqrt[3]{-27}$.',
    checks_for_understanding: [{ cfu: 'Why can we take the cube root of a negative, but not the square root?', method: 'Turn & Talk' }]
  });

  // Day 17 (9/1)
  lessonPlans.push({
    date_start: '2026-09-01', week_label: '8/31-9/4',
    topic: 'Side Length and Edge Length (Open-Up U8 L2/L12)',
    objective_3m: 'Students will apply square and cube roots to geometric contexts to find the side lengths of squares and edge lengths of cubes.',
    standard: '8.EE.2',
    do_now: '**Vocabulary Primer:**\n- **Area:** The 2D space inside a square (Side $\\times$ Side).\n- **Volume:** The 3D space inside a cube (Edge $\\times$ Edge $\\times$ Edge).\n\n**Do Now:** A square has a side length of 5. What is its area?',
    direct_instruction: '## Working Backwards (Squares)\nIf Area = Side $\\times$ Side, then Area = $s^2$.\nIf I tell you the Area is 81, how do you find the side? Work backwards! Take the square root. $s = \\sqrt{81} = 9$.\n\n---\n\n## Working Backwards (Cubes)\nIf Volume = Edge $\\times$ Edge $\\times$ Edge, then Volume = $e^3$.\nIf I tell you the Volume is 1000, take the cube root! $e = \\sqrt[3]{1000} = 10$.\n\n* **Turn and Talk (2 min):** If a cube has a volume of 64, does it have an edge length of 8? Why or why not?',
    group_practice: 'The Blueprint Problem: Students are given the areas/volumes of various rooms and swimming pools, and must use roots to find the missing dimensions.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'A square rug has an area of 36 square feet. What is its side length?', correct_answer: '$\\sqrt{36} = 6$ feet.', misconception: '18 feet.\n\nIntervention: "Area is not divided by two. It is a square root."' },
      { question: 'A cube-shaped box has a volume of 27 cubic inches. What is the length of one edge?', correct_answer: '$\\sqrt[3]{27} = 3$ inches.', misconception: '9 inches.\n\nIntervention: "That is 27 divided by 3. We need a cube root. $3 \\times 3 \\times 3$."' },
      { question: 'A square garden has an area of 100. What is its PERIMETER?', correct_answer: 'Side = 10. Perimeter = $10+10+10+10 = 40$.', misconception: '10.\n\nIntervention: "You found the side length, but the question asked for Perimeter."' },
      { question: 'The area of a square is 49. Find the side length.', correct_answer: '7.', misconception: '24.5.\n\nIntervention: Area = $s^2$.' },
      { question: 'A cubic tank has a volume of 125. Find the edge length.', correct_answer: '5.', misconception: '25.\n\nIntervention: "5 times 5 times 5."' },
      { question: 'A square has an area of 81. What is the side length?', correct_answer: '9.', misconception: '81.\n\nIntervention: You have to take the square root.' },
      { question: 'A cube has a volume of 1. What is the edge length?', correct_answer: '1.', misconception: 'Impossible.\n\nIntervention: $1 \\times 1 \\times 1 = 1$.' },
      { question: 'If the area of a square is 144, what is the perimeter?', correct_answer: 'Side is 12. Perimeter is 48.', misconception: '12.\n\nIntervention: "Read carefully! It asked for perimeter."' },
      { question: 'A cube has a volume of 8. What is the AREA of its base?', correct_answer: 'Edge is $\\sqrt[3]{8} = 2$. Base is a square, so Area = $2 \\times 2 = 4$.', misconception: '2.\n\nIntervention: "You found the edge. Now find the area of the bottom face."' },
      { question: 'A square has an area of 400. Find the side length.', correct_answer: '20.', misconception: '200.\n\nIntervention: $200 \\times 200 = 40,000$.' }
    ],
    criteria_for_success: 'Use square roots to find side lengths from area, and cube roots to find edge lengths from volume.',
    exit_ticket: 'A cube has a volume of 64 cubic inches. What is the length of one edge?',
    checks_for_understanding: [{ cfu: 'Why do we use cube roots for volume, but square roots for area?', method: 'Turn & Talk' }]
  });

  // Day 18 (9/2)
  lessonPlans.push({
    date_start: '2026-09-02', week_label: '8/31-9/4',
    topic: 'Solving Equations with Square & Cube Roots (Envision T1-5)',
    objective_3m: 'Students will solve algebraic equations of the form $x^2 = p$ and $x^3 = p$ by applying root operations to both sides.',
    standard: '8.EE.2',
    do_now: '**Vocabulary Primer:**\n- **Inverse:** The opposite operation.\n\n**Do Now:** Solve for x: $x + 5 = 12$. What did you do to both sides?',
    direct_instruction: '## The Algebra Rule\nWhatever you do to one side of the equal sign, you MUST do to the other.\nTo get rid of a "squared" ($x^2$), you take the square root of both sides.\n\n---\n\n## The Two Answers Trap\nIf $x^2 = 25$, then $x = \\sqrt{25}$. So $x = 5$.\nBUT WAIT! Is there another number that, when squared, equals 25? Yes! $(-5) \\times (-5) = 25$.\nWhen you take a SQUARE root in an equation, there are ALWAYS TWO ANSWERS: positive and negative ($\\pm 5$). Cube roots only have ONE answer.\n\n* **Turn and Talk (2 min):** Why does $x^3 = 8$ only have one answer ($x = 2$) and not negative 2?',
    group_practice: 'Whiteboard Relay: Teams solve 2-step root equations rapidly, remembering to include the $\\pm$ symbol when necessary.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Solve for x: $x^2 = 81$', correct_answer: '$x = 9$ and $x = -9$ (or $x = \\pm 9$).', misconception: 'Just 9.\n\nIntervention: "If I square -9, what do I get? Positive 81! So both work."' },
      { question: 'Solve for x: $x^3 = 27$', correct_answer: '$x = 3$.', misconception: '$x = \\pm 3$.\n\nIntervention: "Does (-3) cubed equal 27? No, it equals -27. Cube roots only have one answer."' },
      { question: 'Solve for x: $x^2 = 100$', correct_answer: '$x = \\pm 10$.', misconception: '10.\n\nIntervention: "Don\'t forget the negative answer!"' },
      { question: 'Solve for x: $x^3 = -64$', correct_answer: '$x = -4$.', misconception: 'No solution.\n\nIntervention: "You can\'t take the square root of a negative, but you CAN take the cube root."' },
      { question: 'Solve for x: $x^2 + 5 = 30$', correct_answer: '$x^2 = 25$, so $x = \\pm 5$.', misconception: 'Taking the square root of 30.\n\nIntervention: "You have to isolate $x^2$ first by subtracting 5."' },
      { question: 'Solve for x: $2x^3 = 16$', correct_answer: '$x^3 = 8$, so $x = 2$.', misconception: 'Cube rooting 16.\n\nIntervention: "Divide by 2 first!"' },
      { question: 'Solve for x: $x^2 = 144$', correct_answer: '$x = \\pm 12$.', misconception: '72.\n\nIntervention: "Square root, not divide by 2."' },
      { question: 'Solve for x: $x^3 - 1 = 7$', correct_answer: '$x^3 = 8$, so $x = 2$.', misconception: 'Cube rooting 7.\n\nIntervention: "Add 1 to both sides first."' },
      { question: 'Solve for x: $x^2 = 1$', correct_answer: '$x = \\pm 1$.', misconception: 'Just 1.\n\nIntervention: "Does $(-1)\\times(-1)$ equal 1? Yes!"' },
      { question: 'Solve for x: $x^2 = -16$', correct_answer: 'No real solution.', misconception: '$-4$.\n\nIntervention: "$(-4)\\times(-4)$ is POSITIVE 16. Nothing squared can be negative."' }
    ],
    criteria_for_success: 'Solve simple root equations and recognize that square root equations have two solutions (positive and negative).',
    exit_ticket: 'Solve for x: $x^2 = 49$.',
    checks_for_understanding: [{ cfu: 'Does $x^3 = 64$ have one answer or two?', method: 'Fist to Five (Hold up fingers)' }]
  });

  // Day 19 (9/3)
  lessonPlans.push({
    date_start: '2026-09-03', week_label: '8/31-9/4',
    topic: 'Cluster 1 Review (Real Numbers, Exponents, Roots)',
    objective_3m: 'Students will synthesize their understanding of exponents, scientific notation, and roots to prepare for the cluster assessment.',
    standard: '8.NS.1, 8.NS.2, 8.EE.1, 8.EE.2, 8.EE.3, 8.EE.4',
    do_now: '**Vocabulary Primer:**\n- **Review:** To look over past material.\n\n**Do Now:** Write down the 3 exponent rules we learned (Product, Quotient, Power of a Power).',
    direct_instruction: '## The Most Missed Questions\nToday we are looking at the questions that tripped up last year\'s 8th graders on the state test.\n1. Thinking $\\sqrt{20}$ is exactly halfway between 4 and 5 (it\'s not, it\'s closer to 4).\n2. Forgetting to adjust scientific notation when the front number gets bigger than 10.\n3. Forgetting the negative answer when solving $x^2 = 36$.\n\n* **Turn and Talk (2 min):** Which topic do you feel the least confident about?',
    group_practice: 'Stations Review: Students rotate through 4 stations (Rational/Irrational, Exponent Rules, Scientific Notation, Roots).',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Simplify: $x^4 \\times x^3$', correct_answer: '$x^7$', misconception: '$x^{12}$' },
      { question: 'Solve for x: $x^2 = 64$', correct_answer: '$x = \\pm 8$', misconception: 'Just 8' },
      { question: 'Multiply: $(4 \\times 10^3)(3 \\times 10^2)$', correct_answer: '$1.2 \\times 10^6$', misconception: '$12 \\times 10^5$' },
      { question: 'Classify $\\sqrt{10}$', correct_answer: 'Irrational', misconception: 'Rational' },
      { question: 'Simplify $(x^2)^4$', correct_answer: '$x^8$', misconception: '$x^6$' },
      { question: 'Rewrite $3^{-2}$', correct_answer: '1/9', misconception: '-9' },
      { question: 'A square has area 100. Perimeter?', correct_answer: '40', misconception: '10' },
      { question: 'Convert 0.0045 to Sci Not', correct_answer: '$4.5 \\times 10^{-3}$', misconception: '$4.5 \\times 10^3$' },
      { question: 'Evaluate $\\sqrt[3]{-8}$', correct_answer: '-2', misconception: 'No solution' },
      { question: 'Estimate $\\sqrt{30}$', correct_answer: 'Approx 5.5', misconception: '15' }
    ],
    criteria_for_success: 'Score at least 80% on the review packet.',
    exit_ticket: 'What topic do you need to study tonight?',
    checks_for_understanding: [{ cfu: 'Thumbs up/down: I am ready for the test tomorrow.', method: 'Visual Check' }]
  });

  // Day 20 (9/4)
  lessonPlans.push({
    date_start: '2026-09-04', week_label: '8/31-9/4',
    topic: 'Cluster 1 Assessment',
    objective_3m: 'Students will demonstrate mastery of the real number system, exponent properties, roots, and scientific notation on a formal assessment.',
    standard: '8.NS.1, 8.NS.2, 8.EE.1, 8.EE.2, 8.EE.3, 8.EE.4',
    do_now: '**Vocabulary Primer:**\n- **Mastery:** Complete understanding of a skill.\n\n**Do Now:** Take 5 minutes to review your exponent rules silently.',
    direct_instruction: '## Test Expectations\n- Voice level 0.\n- Keep eyes on your own paper/screen.\n- Use your scratch paper to expand out all exponent problems! Do not do it in your head!\n\n---\n\n## When You Finish\nWhen you complete the test, check over your answers (especially the scientific notation adjustments and the $\\pm$ symbol on root equations). If you are 100% finished, close your laptop and silently read a book.',
    group_practice: 'Assessment Block. No group practice today.',
    independent_practice: 'Cluster 1 Formal Assessment (Testing Environment).',
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

  console.log(`Inserting Week 4 plans (8th Grade)...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) console.error(`Error inserting ${plan.date_start}:`, error);
  }
};

run();
