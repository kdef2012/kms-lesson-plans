import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans (Week 3 8th Grade)...');
  await supabase.from('lesson_plans').delete().in('date_start', ['2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28']);

  const lessonPlans = [];

  // Day 11 (8/24)
  lessonPlans.push({
    date_start: '2026-08-24', week_label: '8/24-8/28',
    topic: 'Negative Exponents (Open-Up U7 L5-L6)',
    objective_3m: 'Students will define and evaluate negative exponents by translating them into positive exponents in the denominator of a fraction.',
    standard: '8.EE.1',
    do_now: '**Vocabulary Primer:**\n- **Reciprocal:** Flipping a fraction upside down.\n\n**Do Now:** Follow the pattern: $2^3 = 8$, $2^2 = 4$, $2^1 = 2$. What should $2^0$ be? What about $2^{-1}$?',
    direct_instruction: '## Continuing the Pattern\nEvery time we drop the exponent by 1, we divide the answer by 2. So $2^0 = 1$. If we divide by 2 again, $2^{-1} = 1/2$. \n\n---\n\n## The Negative Exponent Rule\nA negative exponent does NOT make the number negative. It makes it a FRACTION. \nRule: $x^{-a} = \\frac{1}{x^a}$. \n\n* **Turn and Talk (2 min):** If $3^2 = 9$, what is $3^{-2}$?',
    group_practice: 'Elevator Math: Students practice moving negative exponents from the numerator to the denominator to make them "happy" (positive).',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Evaluate: $5^{-2}$', correct_answer: '1/25', misconception: '-25.\n\nIntervention: "Negative exponents mean fractions, not negative numbers!"' },
      { question: 'Evaluate: $10^{-3}$', correct_answer: '1/1000', misconception: '-30.\n\nIntervention: $10^3 = 1000$. Put it under a 1.' },
      { question: 'Rewrite with a positive exponent: $x^{-4}$', correct_answer: '$1/x^4$', misconception: '$-x^4$.\n\nIntervention: Move it to the denominator.' },
      { question: 'Evaluate: $2^{-4}$', correct_answer: '1/16', misconception: '1/8.\n\nIntervention: $2 \\times 2 \\times 2 \\times 2 = 16$.' },
      { question: 'Rewrite: $3x^{-2}$', correct_answer: '$3 / x^2$', misconception: '$1 / 3x^2$.\n\nIntervention: "Only the x has the negative exponent. The 3 stays on top."' },
      { question: 'Rewrite: $\\frac{1}{m^{-3}}$', correct_answer: '$m^3$', misconception: '$-m^3$.\n\nIntervention: If it\'s negative on the bottom, move it to the top to make it positive.' },
      { question: 'Simplify: $x^5 \\times x^{-2}$', correct_answer: '$x^3$', misconception: '$x^{-10}$.\n\nIntervention: Product rule says ADD them. $5 + (-2) = 3$.' },
      { question: 'Evaluate: $4^{-1}$', correct_answer: '1/4', misconception: '-4.\n\nIntervention: Anything to the -1 power is just its reciprocal.' },
      { question: 'Evaluate: $(-3)^{-2}$', correct_answer: '$1 / (-3)^2 = 1/9$', misconception: '-1/9.\n\nIntervention: $(-3) \\times (-3)$ is positive 9.' },
      { question: 'Simplify: $\\frac{x^2}{x^5}$', correct_answer: '$x^{-3}$ or $1/x^3$', misconception: '$x^3$.\n\nIntervention: Quotient rule means subtract top from bottom: $2 - 5 = -3$.' }
    ],
    criteria_for_success: 'Rewrite expressions so they contain only positive exponents.',
    exit_ticket: 'Evaluate $4^{-2}$ and rewrite $5y^{-3}$ using positive exponents.',
    checks_for_understanding: [{ cfu: 'Does a negative exponent ever result in a negative number?', method: 'Choral Response' }]
  });

  // Day 12 (8/25)
  lessonPlans.push({
    date_start: '2026-08-25', week_label: '8/24-8/28',
    topic: 'Intro to Scientific Notation (Open-Up U7 L9)',
    objective_3m: 'Students will convert very large and very small numbers between standard form and scientific notation.',
    standard: '8.EE.3',
    do_now: '**Vocabulary Primer:**\n- **Standard Form:** The normal way we write numbers (e.g. 5,000).\n- **Scientific Notation:** A shorthand way to write huge or tiny numbers using powers of 10.\n\n**Do Now:** Multiply $3.5 \\times 1000$. What happens to the decimal?',
    direct_instruction: '## Why do we need it?\nThe distance to the sun is 93,000,000 miles. A red blood cell is 0.000008 meters wide. Writing all those zeros is annoying and leads to mistakes!\n\n---\n\n## The Rules of Scientific Notation\nA number is in scientific notation if it looks like $a \\times 10^b$, where $a$ is a number between 1 and 10, and $b$ is an integer.\n- Huge numbers have POSITIVE exponents (e.g., $9.3 \\times 10^7$)\n- Tiny decimals have NEGATIVE exponents (e.g., $8 \\times 10^{-6}$)\n\n* **Turn and Talk (2 min):** Is $45 \\times 10^3$ written in proper scientific notation? Why or why not?',
    group_practice: 'Matching Game: Match standard form numbers (mass of earth, size of virus) to their scientific notation equivalents.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Convert to scientific notation: 4,500,000', correct_answer: '$4.5 \\times 10^6$', misconception: '$45 \\times 10^5$.\n\nIntervention: "The first number MUST be between 1 and 10. 45 is too big."' },
      { question: 'Convert to scientific notation: 0.00032', correct_answer: '$3.2 \\times 10^{-4}$', misconception: '$3.2 \\times 10^4$.\n\nIntervention: "Tiny decimals always have negative exponents!"' },
      { question: 'Convert to standard form: $6 \\times 10^4$', correct_answer: '60,000', misconception: '6,000.\n\nIntervention: Move the decimal 4 spaces to the right.' },
      { question: 'Convert to standard form: $1.5 \\times 10^{-3}$', correct_answer: '0.0015', misconception: '0.00015.\n\nIntervention: Move the decimal 3 spaces to the left. The 1 counts as the first space.' },
      { question: 'Convert to scientific notation: 80', correct_answer: '$8 \\times 10^1$', misconception: '$8 \\times 10^0$.\n\nIntervention: Move the decimal one place.' },
      { question: 'Convert to scientific notation: 0.9', correct_answer: '$9 \\times 10^{-1}$', misconception: '$0.9 \\times 10^0$.\n\nIntervention: The front number must be at least 1.' },
      { question: 'Is $0.5 \\times 10^4$ in proper scientific notation?', correct_answer: 'No. 0.5 is less than 1. It should be $5 \\times 10^3$.', misconception: 'Yes.\n\nIntervention: Review the rule: $1 \\le a < 10$.' },
      { question: 'Convert to standard form: $7.25 \\times 10^5$', correct_answer: '725,000', misconception: '7,250,000.\n\nIntervention: Count the decimal jumps carefully. The 2 and 5 take up the first two jumps.' },
      { question: 'Convert to scientific notation: 0.0000001', correct_answer: '$1 \\times 10^{-7}$', misconception: '$1 \\times 10^{-6}$.\n\nIntervention: Count how many times you move the decimal to get behind the 1.' },
      { question: 'Is $10 \\times 10^2$ in proper scientific notation?', correct_answer: 'No. The first number must be LESS than 10. It should be $1 \\times 10^3$.', misconception: 'Yes.\n\nIntervention: Rule: $1 \\le a < 10$.' }
    ],
    criteria_for_success: 'Convert values seamlessly between standard form and scientific notation, ensuring the coefficient is between 1 and 10.',
    exit_ticket: 'Convert 35,000 to scientific notation. Convert $4.2 \\times 10^{-4}$ to standard form.',
    checks_for_understanding: [{ cfu: 'Why do tiny decimals have negative exponents?', method: 'Cold Call' }]
  });

  // Day 13 (8/26)
  lessonPlans.push({
    date_start: '2026-08-26', week_label: '8/24-8/28',
    topic: 'Operations with Scientific Notation (Open-Up U7 L10)',
    objective_3m: 'Students will multiply and divide numbers written in scientific notation by grouping coefficients and using exponent rules.',
    standard: '8.EE.4',
    do_now: '**Vocabulary Primer:**\n- **Coefficient:** The number in front (the $a$ in $a \\times 10^b$).\n\n**Do Now:** Simplify $x^3 \\times x^4$ and simplify $(3 \\times 4)$.',
    direct_instruction: '## The Grouping Strategy\nTo multiply $(3 \\times 10^2)$ by $(2 \\times 10^4)$, we don\'t need to convert them to standard form! Just group the like parts:\n1. Multiply the normal numbers (coefficients): $3 \\times 2 = 6$.\n2. Multiply the powers of 10 (use the product rule!): $10^2 \\times 10^4 = 10^6$.\n3. Combine them: $6 \\times 10^6$.\n\n---\n\n## The Adjustment Step\nSometimes when you multiply, your front number gets too big (like 15). You must adjust it back down to a number between 1 and 10 by moving the decimal and bumping up the exponent.\n\n* **Turn and Talk (2 min):** How would you divide $(8 \\times 10^5)$ by $(2 \\times 10^2)$?',
    group_practice: 'Whiteboard Relay: Teams solve multiplication and division problems, being careful to adjust answers that fall out of proper scientific notation format.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Multiply: $(3 \\times 10^4)(2 \\times 10^5)$', correct_answer: '$6 \\times 10^9$', misconception: '$6 \\times 10^{20}$.\n\nIntervention: When multiplying bases, ADD the exponents.' },
      { question: 'Divide: $(9 \\times 10^8) / (3 \\times 10^2)$', correct_answer: '$3 \\times 10^6$', misconception: '$3 \\times 10^4$.\n\nIntervention: Divide the big numbers, but SUBTRACT the exponents.' },
      { question: 'Multiply: $(4 \\times 10^3)(3 \\times 10^2)$', correct_answer: '$12 \\times 10^5$, which adjusts to $1.2 \\times 10^6$.', misconception: 'Leaving it as $12 \\times 10^5$.\n\nIntervention: "Is 12 between 1 and 10? No. We have to adjust it."' },
      { question: 'Divide: $(8 \\times 10^5) / (4 \\times 10^8)$', correct_answer: '$2 \\times 10^{-3}$', misconception: '$2 \\times 10^3$.\n\nIntervention: $5 - 8 = -3$.' },
      { question: 'Multiply: $(5 \\times 10^{-2})(2 \\times 10^{-3})$', correct_answer: '$10 \\times 10^{-5}$, which adjusts to $1 \\times 10^{-4}$.', misconception: '$10 \\times 10^{-6}$.\n\nIntervention: $-2 + (-3) = -5$. Then adjust.' },
      { question: 'Divide: $(1.2 \\times 10^6) / (2 \\times 10^2)$', correct_answer: '$0.6 \\times 10^4$, which adjusts to $6 \\times 10^3$.', misconception: 'Leaving it as $0.6 \\times 10^4$.\n\nIntervention: "The front number must be at least 1."' },
      { question: 'Multiply: $(2.5 \\times 10^5)(2 \\times 10^5)$', correct_answer: '$5 \\times 10^{10}$', misconception: '$5 \\times 10^{25}$.\n\nIntervention: Add exponents!' },
      { question: 'Divide: $(4 \\times 10^3) / (8 \\times 10^3)$', correct_answer: '$0.5 \\times 10^0$, which adjusts to $5 \\times 10^{-1}$.', misconception: 'Saying the answer is 0.\n\nIntervention: $10^0$ is 1. The front number is 0.5.' },
      { question: 'Multiply: $(6 \\times 10^4)(5 \\times 10^4)$', correct_answer: '$30 \\times 10^8$, adjusts to $3 \\times 10^9$.', misconception: 'Forgetting to adjust.\n\nIntervention: "Is 30 between 1 and 10?"' },
      { question: 'Divide: $(3 \\times 10^7) / (6 \\times 10^4)$', correct_answer: '$0.5 \\times 10^3$, adjusts to $5 \\times 10^2$.', misconception: 'Saying 2 for the coefficient.\n\nIntervention: "3 divided by 6 is 0.5, not 2!"' }
    ],
    criteria_for_success: 'Multiply and divide coefficients and apply exponent rules, adjusting final answers into proper scientific notation.',
    exit_ticket: 'Multiply: $(5 \\times 10^3) \\times (4 \\times 10^6)$. Ensure your final answer is in proper scientific notation.',
    checks_for_understanding: [{ cfu: 'Why does $15 \\times 10^4$ turn into $1.5 \\times 10^5$?', method: 'Turn & Talk' }]
  });

  // Day 14 (8/27)
  lessonPlans.push({
    date_start: '2026-08-27', week_label: '8/24-8/28',
    topic: 'Unit 1 Assessment (Exponents & Real Numbers)',
    objective_3m: 'Students will demonstrate mastery of the real number system, exponent properties, and scientific notation on a formal assessment.',
    standard: '8.NS.1, 8.EE.1, 8.EE.3',
    do_now: '**Vocabulary Primer:**\n- **Mastery:** Complete understanding of a skill.\n\n**Do Now:** Take 5 minutes to review your exponent rules silently.',
    direct_instruction: '## Test Expectations\n- Voice level 0.\n- Keep eyes on your own paper/screen.\n- Use your scratch paper to expand out all exponent problems! Do not do it in your head!\n\n---\n\n## When You Finish\nWhen you complete the test, check over your answers (especially the scientific notation adjustments). If you are 100% finished, close your laptop and silently read a book.',
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

  // Day 15 (8/28)
  lessonPlans.push({
    date_start: '2026-08-28', week_label: '8/24-8/28',
    topic: 'Unit 1 Assessment Review & Data Analysis',
    objective_3m: 'Students will review the Unit 1 Assessment, analyze their mistakes, and complete targeted remediation on exponent and real number concepts.',
    standard: '8.NS.1, 8.EE.1, 8.EE.3',
    do_now: '**Vocabulary Primer:**\n- **Remediation:** Correcting or fixing something.\n\n**Do Now:** Look at your graded assessment. Which question was the most confusing for you?',
    direct_instruction: '## Reviewing the Assessment\nToday we will be going over the most commonly missed questions on the Unit 1 test. It is not about the grade, but about learning from your mistakes!\n\n---\n\n## Most Missed Questions\n1. Question 4: Converting Repeating Decimals\n2. Question 7: Negative Exponents\n3. Question 9: Scientific Notation Adjustments\n\n* **Turn and Talk (2 min):** What was the trickiest part of multiplying numbers in scientific notation?',
    group_practice: 'Error Analysis: Students pair up to review and correct a peer\'s (anonymous) incorrect test response.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Review: Convert 0.777... to a fraction.', correct_answer: '7/9', misconception: '7/10\n\nIntervention: Repeating decimals are over 9 or 99.' },
      { question: 'Review: Evaluate $3^{-2}$', correct_answer: '1/9', misconception: '-9\n\nIntervention: Negative exponents make fractions!' },
      { question: 'Review: Multiply $(4 \\times 10^3)(5 \\times 10^4)$', correct_answer: '$20 \\times 10^7$ adjusts to $2 \\times 10^8$', misconception: 'Forgetting to adjust 20.\n\nIntervention: Is 20 between 1 and 10?' },
      { question: 'Remediation: Convert 0.4545...', correct_answer: '45/99 = 5/11', misconception: '45/100\n\nIntervention: Two repeating digits = over 99.' },
      { question: 'Remediation: Simplify $(2x^3)^4$', correct_answer: '$16x^{12}$', misconception: '$8x^7$\n\nIntervention: Distribute the power to the 2 and multiply the exponents.' },
      { question: 'Remediation: Evaluate $(-4)^2$', correct_answer: '16', misconception: '-16\n\nIntervention: Negative times negative.' },
      { question: 'Remediation: Divide $(8 \\times 10^6)/(2 \\times 10^2)$', correct_answer: '$4 \\times 10^4$', misconception: '$4 \\times 10^3$\n\nIntervention: Subtract the exponents: 6 - 2 = 4.' },
      { question: 'Remediation: Which is larger, $\\sqrt{40}$ or 6.5?', correct_answer: '6.5 (6.5^2 = 42.25)', misconception: '$\\sqrt{40}$\n\nIntervention: Square the 6.5 to compare.' },
      { question: 'Remediation: Simplify $x^5 \\times x^{-2}$', correct_answer: '$x^3$', misconception: '$x^{-10}$\n\nIntervention: Add the exponents.' },
      { question: 'Remediation: Scientific Notation: 0.0004', correct_answer: '$4 \\times 10^{-4}$', misconception: '$4 \\times 10^4$\n\nIntervention: Small numbers have negative exponents.' }
    ],
    criteria_for_success: 'Analyze and correct errors made on the Unit 1 Assessment.',
    exit_ticket: 'What is one concept you understand much better after today\'s review?',
    checks_for_understanding: [{ cfu: 'Why do we need to do error analysis?', method: 'Turn & Talk' }]
  });

  console.log(`Inserting Week 3 plans (8th Grade)...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) console.error(`Error inserting ${plan.date_start}:`, error);
  }
};

run();
