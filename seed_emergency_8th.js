import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Inserting Emergency Plans (8th Grade) for Mr. Nelson...');
  
  const lessonPlans = [];

  // Emergency Plan 1
  lessonPlans.push({
    date_start: '2026-08-20', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 1: Solving Multi-Step Equations (8.EE.7)',
    objective_3m: 'Students will solve multi-step equations including those with variables on both sides.',
    standard: '8.EE.7',
    do_now: '**Vocabulary Primer:**\n- **Variable:** A letter representing an unknown quantity.\n- **Inverse Operation:** An operation that undoes another (e.g. addition and subtraction).\n\n**Do Now:** Simplify the expression: $3(x + 4) - 2x$',
    direct_instruction: '## Sub Plan Instructions\nThis is an emergency lesson plan. Students should complete the guided notes and the independent practice. The substitute teacher does not need to deliver direct instruction. Students may use their notes from previous lessons.\n\n**Key Steps for Solving Equations:**\n1. Distribute if necessary.\n2. Combine like terms on each side.\n3. Move variables to one side.\n4. Isolate the variable using inverse operations.',
    group_practice: 'Students may work quietly in pairs to check their work on the first 4 problems before completing the rest independently.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Solve for x: $3x + 5 = 17$', correct_answer: '$3x = 12 \\Rightarrow x = 4$', misconception: 'Subtracting 3 instead of dividing.\nIntervention: "3x means 3 TIMES x. What is the inverse of multiplication?"' },
      { question: 'Solve for y: $2y - 8 = 10$', correct_answer: '$2y = 18 \\Rightarrow y = 9$', misconception: 'Subtracting 8 from 10.\nIntervention: "To move a minus 8, you must ADD 8 to both sides."' },
      { question: 'Solve for m: $4m = 2m + 12$', correct_answer: '$2m = 12 \\Rightarrow m = 6$', misconception: 'Adding 2m to 4m.\nIntervention: "To move a positive 2m across the equal sign, you must subtract it."' },
      { question: 'Solve for k: $5(k - 2) = 20$', correct_answer: '$5k - 10 = 20 \\Rightarrow 5k = 30 \\Rightarrow k = 6$', misconception: 'Forgetting to distribute to the 2.\nIntervention: "Draw arrows from the 5 to BOTH the k and the -2."' },
      { question: 'Solve for p: $3p + 2 = p + 10$', correct_answer: '$2p + 2 = 10 \\Rightarrow 2p = 8 \\Rightarrow p = 4$', misconception: 'Subtracting 3p from p incorrectly.\nIntervention: "Always move the smaller variable to avoid negative coefficients if possible."' },
      { question: 'Solve for x: $-2x + 7 = 15$', correct_answer: '$-2x = 8 \\Rightarrow x = -4$', misconception: 'Losing the negative sign.\nIntervention: "When you divide by -2, a positive divided by a negative is negative."' },
      { question: 'Solve for w: $2(w + 3) = 4w - 6$', correct_answer: '$2w + 6 = 4w - 6 \\Rightarrow 6 = 2w - 6 \\Rightarrow 12 = 2w \\Rightarrow w = 6$', misconception: 'Combining terms across the equal sign incorrectly.\nIntervention: "Treat the equal sign like a wall. You must use inverse operations to cross it."' },
      { question: 'Solve for a: $\\frac{a}{3} + 4 = 9$', correct_answer: '$\\frac{a}{3} = 5 \\Rightarrow a = 15$', misconception: 'Multiplying by 3 before subtracting 4.\nIntervention: "Always undo addition and subtraction before undoing multiplication and division."' },
      { question: 'Solve for n: $4n - 2n + 6 = 14$', correct_answer: '$2n + 6 = 14 \\Rightarrow 2n = 8 \\Rightarrow n = 4$', misconception: 'Using inverse operations on the same side.\nIntervention: "If terms are on the SAME side of the equal sign, just combine them directly. Do not use opposite signs."' },
      { question: 'Solve for x: $3(2x - 1) = 9x - 15$', correct_answer: '$6x - 3 = 9x - 15 \\Rightarrow -3 = 3x - 15 \\Rightarrow 12 = 3x \\Rightarrow x = 4$', misconception: 'Distribution error.\nIntervention: "Check your distribution step carefully."' }
    ],
    criteria_for_success: 'Students correctly isolate variables and find the solution to multi-step algebraic equations.',
    exit_ticket: 'Solve for x: $4x - 5 = 2x + 7$',
    checks_for_understanding: [{ cfu: 'What is your first step when solving an equation with parentheses?', method: 'Independent Work' }]
  });

  // Emergency Plan 2
  lessonPlans.push({
    date_start: '2026-08-21', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 2: Pythagorean Theorem (8.G.7)',
    objective_3m: 'Students will apply the Pythagorean Theorem to find the missing side length of a right triangle.',
    standard: '8.G.7',
    do_now: '**Vocabulary Primer:**\n- **Hypotenuse:** The longest side of a right triangle, opposite the right angle.\n- **Legs:** The two shorter sides that form the right angle.\n\n**Do Now:** Evaluate $3^2 + 4^2$.',
    direct_instruction: '## Sub Plan Instructions\nThis is an emergency lesson plan. Students should complete the practice problems independently. \n\n**The Pythagorean Theorem:**\n$a^2 + b^2 = c^2$\nWhere $a$ and $b$ are the legs, and $c$ is the hypotenuse.\nTo find the hypotenuse: Square the legs, add them, then take the square root.\nTo find a leg: Square the hypotenuse and the given leg, subtract, then take the square root.',
    group_practice: 'Students may discuss their approach to identifying the hypotenuse with a partner before solving.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Legs are 6 and 8. Find the hypotenuse.', correct_answer: '$6^2 + 8^2 = c^2 \\Rightarrow 36 + 64 = c^2 \\Rightarrow 100 = c^2 \\Rightarrow c = 10$', misconception: 'Adding 6 + 8 = 14.\nIntervention: "You must SQUARE the sides first before adding!"' },
      { question: 'Legs are 5 and 12. Find the hypotenuse.', correct_answer: '$5^2 + 12^2 = c^2 \\Rightarrow 25 + 144 = c^2 \\Rightarrow 169 = c^2 \\Rightarrow c = 13$', misconception: 'Squaring incorrectly.\nIntervention: "Use your perfect squares list or calculate carefully."' },
      { question: 'Leg a is 3, hypotenuse c is 5. Find leg b.', correct_answer: '$3^2 + b^2 = 5^2 \\Rightarrow 9 + b^2 = 25 \\Rightarrow b^2 = 16 \\Rightarrow b = 4$', misconception: 'Adding $3^2$ and $5^2$.\nIntervention: "When you know the hypotenuse, you must SUBTRACT the squares."' },
      { question: 'Legs are 9 and 12. Find the hypotenuse.', correct_answer: '$81 + 144 = 225 \\Rightarrow c = 15$', misconception: 'Taking the square root of 225 as 25.\nIntervention: "Check your math. $15 \\times 15 = 225$."' },
      { question: 'Hypotenuse is 10, leg is 8. Find the other leg.', correct_answer: '$100 - 64 = 36 \\Rightarrow b = 6$', misconception: 'Setting up the equation as $8^2 + 10^2 = c^2$.\nIntervention: "Always identify the hypotenuse FIRST. It is the longest side."' },
      { question: 'Legs are 7 and 24. Find the hypotenuse.', correct_answer: '$49 + 576 = 625 \\Rightarrow c = 25$', misconception: 'Addition error.\nIntervention: "Line up your numbers carefully when adding 576 + 49."' },
      { question: 'Hypotenuse is 13, leg is 12. Find the other leg.', correct_answer: '$169 - 144 = 25 \\Rightarrow a = 5$', misconception: 'Adding instead of subtracting.\nIntervention: "You are finding a missing LEG, so subtract."' },
      { question: 'Legs are 10 and 24. Find the hypotenuse.', correct_answer: '$100 + 576 = 676 \\Rightarrow c = 26$', misconception: 'Not knowing the square root of 676.\nIntervention: "Since 625 is 25 squared, 676 must be just slightly larger. Try 26."' },
      { question: 'Hypotenuse is 15, leg is 9. Find the other leg.', correct_answer: '$225 - 81 = 144 \\Rightarrow b = 12$', misconception: 'Subtracting 15 - 9 first, then squaring.\nIntervention: "Order of operations: Exponents come BEFORE subtraction!"' },
      { question: 'A ladder is 10ft long and the base is 6ft from the wall. How high up the wall does it reach?', correct_answer: '$10^2 - 6^2 = 100 - 36 = 64 \\Rightarrow \\sqrt{64} = 8$ ft', misconception: 'Adding the squares.\nIntervention: "The ladder is the hypotenuse! The wall and ground are the legs."' }
    ],
    criteria_for_success: 'Students accurately identify the hypotenuse and apply the Pythagorean Theorem to solve for missing sides.',
    exit_ticket: 'A right triangle has legs of 5 cm and 12 cm. What is the length of the hypotenuse?',
    checks_for_understanding: [{ cfu: 'How do you know whether to add or subtract the squares?', method: 'Independent Work' }]
  });

  // Emergency Plan 3
  lessonPlans.push({
    date_start: '2026-08-22', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 3: Scientific Notation Review (8.EE.3)',
    objective_3m: 'Students will convert numbers between standard form and scientific notation.',
    standard: '8.EE.3',
    do_now: '**Vocabulary Primer:**\n- **Scientific Notation:** A way of writing very large or small numbers as a decimal between 1 and 10, multiplied by a power of 10.\n\n**Do Now:** Multiply: $4.5 \\times 100$ and $4.5 \\times 1000$.',
    direct_instruction: '## Sub Plan Instructions\nThis is an emergency lesson plan. Complete the problems quietly.\n\n**Scientific Notation Rules:**\nLarge numbers have POSITIVE exponents. Move the decimal to the LEFT to make the number between 1 and 10.\nSmall numbers (decimals) have NEGATIVE exponents. Move the decimal to the RIGHT.\nExample: $3,400,000 = 3.4 \\times 10^6$\nExample: $0.00052 = 5.2 \\times 10^{-4}$',
    group_practice: 'Work independently to complete the worksheet.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Convert to scientific notation: 45,000', correct_answer: '$4.5 \\times 10^4$', misconception: '$45 \\times 10^3$\nIntervention: "The first number MUST be between 1 and 10."' },
      { question: 'Convert to scientific notation: 0.0078', correct_answer: '$7.8 \\times 10^{-3}$', misconception: '$7.8 \\times 10^3$\nIntervention: "This is a very small number, so the exponent must be negative."' },
      { question: 'Convert to standard form: $3.2 \\times 10^5$', correct_answer: '320,000', misconception: '3,200,000\nIntervention: "Move the decimal exactly 5 places to the right."' },
      { question: 'Convert to standard form: $1.4 \\times 10^{-4}$', correct_answer: '0.00014', misconception: '0.000014\nIntervention: "Moving the decimal 4 places left means there will be 3 zeros after the decimal point."' },
      { question: 'Convert to scientific notation: 8,000,000', correct_answer: '$8 \\times 10^6$', misconception: '$8.0 \\times 10^7$\nIntervention: "Count the zeros carefully."' },
      { question: 'Convert to scientific notation: 0.00009', correct_answer: '$9 \\times 10^{-5}$', misconception: '$9 \\times 10^{-4}$\nIntervention: "You must move the decimal completely past the 9."' },
      { question: 'Convert to standard form: $5.06 \\times 10^4$', correct_answer: '50,600', misconception: '506,000\nIntervention: "The decimal moves 4 places: 2 to get past the 06, and 2 more for the zeros."' },
      { question: 'Convert to standard form: $8 \\times 10^{-2}$', correct_answer: '0.08', misconception: '0.008\nIntervention: "Move the decimal 2 places left."' },
      { question: 'Which is larger: $4 \\times 10^5$ or $9 \\times 10^4$?', correct_answer: '$4 \\times 10^5$ (400,000 vs 90,000)', misconception: '$9 \\times 10^4$ because 9 > 4.\nIntervention: "Always look at the exponent first! The higher exponent is always bigger for large numbers."' },
      { question: 'Which is larger: $3 \\times 10^{-4}$ or $8 \\times 10^{-5}$?', correct_answer: '$3 \\times 10^{-4}$ (0.0003 vs 0.00008)', misconception: '$8 \\times 10^{-5}$\nIntervention: "A power of -4 is larger than a power of -5 because it is closer to zero."' }
    ],
    criteria_for_success: 'Students accurately convert between standard and scientific notation.',
    exit_ticket: 'Convert 12,500 to scientific notation and $4.1 \\times 10^{-3}$ to standard form.',
    checks_for_understanding: [{ cfu: 'Does a negative exponent mean the number itself is negative?', method: 'Independent Work' }]
  });

  const { data, error } = await supabase.from('lesson_plans').insert(lessonPlans);
  
  if (error) {
    console.error('Error inserting emergency plans:', error);
  } else {
    console.log('Successfully inserted 3 emergency plans for Mr. Nelson!');
  }
};

run();
