import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans...');
  await supabase.from('lesson_plans').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const lessonPlans = [];

  // --- WEEK 1: Week of Inspirational Math (8/10 - 8/13) & Content (8/14) ---
  const week1Dates = ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13'];
  const w1Topics = ['WIM Day 1', 'WIM Day 2', 'WIM Day 3', 'WIM Day 4'];
  for (let i = 0; i < 4; i++) {
    lessonPlans.push({
      date_start: week1Dates[i],
      week_label: '8/10-8/14',
      topic: w1Topics[i] + ' - Growth Mindset & Norms',
      objective_3m: 'Students will understand and apply YouCubed Mathematical Norms to establish a foundation for a positive mathematical mindset.',
      standard: 'SMPs 1-8',
      do_now: 'Growth mindset reflection puzzle from YouCubed resources.',
      direct_instruction: 'Establish classroom norms. Discuss how mistakes grow your brain.',
      group_practice: 'Collaborative task focusing on perseverance (e.g. four 4s activity).',
      independent_practice: '',
      structured_exemplars: [
        {
          question: 'Journal Prompt (From YouCubed WIM Resource): Describe a time you struggled in math. How did you handle it?',
          correct_answer: 'Students should write a paragraph detailing a specific struggle and reflecting on their feelings. Ideal response acknowledges frustration but recognizes that effort leads to learning.',
          misconception: 'Students might write "I am just bad at math." \n\nIntervention: Guide them to reframe it using "yet" (I don\'t understand it yet).'
        },
        {
          question: 'Activity (From YouCubed WIM Resource): The Four 4s. Create the number 1 using exactly four 4s.',
          correct_answer: '44/44 = 1 or (4+4)/(4+4) = 1.',
          misconception: 'Students might give up quickly or use fewer than four 4s.\n\nIntervention: Remind them of the "productive struggle" norm. Suggest they try grouping operations in parentheses.'
        }
      ],
      criteria_for_success: 'Students understand the value of mistakes and persist through challenging tasks without giving up.',
      exit_ticket: 'What is one thing you learned about how your brain works today?',
      checks_for_understanding: [{ cfu: 'How can we rephrase "I can\'t do this"?', method: 'Turn & Talk' }]
    });
  }

  // 8/14: Rational & Irrational Numbers (85-minute block)
  lessonPlans.push({
    date_start: '2026-08-14', week_label: '8/10-8/14',
    topic: 'Rational & Irrational Numbers (Envision T1 - 2, Open-Up U8 Lesson 3)',
    objective_3m: 'Students will classify real numbers as rational or irrational and justify their reasoning through collaborative sorting and independent practice.',
    standard: '8.NS.1',
    do_now: '**(10 minutes)** Convert 1/3, 1/4, and 2/9 to decimals. What do you notice about the patterns? Which ones stop, and which ones repeat?',
    direct_instruction: '**(20 minutes)** Define rational vs irrational numbers. Discuss non-terminating, non-repeating decimals (like pi and non-perfect square roots). Show visual examples of the real number system diagram.',
    group_practice: '**(25 minutes)** Card Sort Activity: Students work in pairs to sort 20 different numbers (fractions, decimals, perfect squares, non-perfect squares, and pi) into Rational and Irrational columns. Students must write a one-sentence justification for 5 of their placements.',
    independent_practice: '**(20 minutes)** Independent Worksheet covering 10 classification problems (from EnVision and Open-Up) with required written justifications.',
    structured_exemplars: [
      {
        question: 'Classify as rational or irrational: 0.333...',
        correct_answer: 'Rational. It is a repeating decimal and can be written as the fraction 1/3.',
        misconception: 'Irrational, because "it goes on forever". \n\nIntervention: Clarify that going on forever WITH a pattern (repeating) makes it rational.'
      },
      {
        question: 'Classify as rational or irrational: sqrt(10)',
        correct_answer: 'Irrational. 10 is not a perfect square, so its square root is a non-terminating, non-repeating decimal (~3.1622...).',
        misconception: 'Rational, because 10 is an even number. \n\nIntervention: Remind students that only perfect squares yield rational square roots.'
      },
      {
        question: 'Classify as rational or irrational: -5',
        correct_answer: 'Rational. All integers are rational because they can be written as a fraction over 1 (e.g., -5/1).',
        misconception: 'Irrational, because it is negative. \n\nIntervention: Remind students that negative signs do not affect whether a number can be written as a ratio.'
      },
      {
        question: 'Classify as rational or irrational: 3.14',
        correct_answer: 'Rational. It is a terminating decimal (it ends after the 4), which can be written as 314/100.',
        misconception: 'Irrational, because it is pi. \n\nIntervention: Emphasize the difference between the exact symbol pi (irrational) and the rounded decimal 3.14 (rational).',
      }
    ],
    criteria_for_success: 'Students correctly classify at least 8/10 real numbers and provide mathematically sound justifications.',
    exit_ticket: '**(10 minutes)** Is the square root of 2 rational or irrational? Explain why using the definitions discussed in class.',
    checks_for_understanding: [{ cfu: 'Why is pi considered an irrational number, but 3.14 is rational?', method: 'Cold Call / DOK 3' }]
  });

  // --- WEEK 2 (8/17 - 8/21) ---
  lessonPlans.push({
    date_start: '2026-08-17', week_label: '8/17-8/21',
    topic: 'Rational & Irrational Numbers (Envision T1 - 2, Open-Up (NC Edition) U8 Lesson 3)',
    objective_3m: 'Students will classify real numbers as rational or irrational and justify their reasoning.',
    standard: '8.NS.1',
    do_now: 'Convert 1/3 and 1/4 to decimals. What do you notice?',
    direct_instruction: 'Define rational vs irrational numbers.',
    group_practice: 'Sort a set of numbers into rational and irrational categories.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U8 L3) Classify as rational or irrational: 0.333...',
        correct_answer: 'Rational. It is a repeating decimal and can be written as the fraction 1/3.',
        misconception: 'Irrational, because "it goes on forever". \n\nIntervention: Clarify that going on forever WITH a pattern (repeating) makes it rational. Only non-terminating, NON-repeating decimals are irrational.'
      },
      {
        question: '(From Envision T1 - 2) Classify as rational or irrational: sqrt(10)',
        correct_answer: 'Irrational. 10 is not a perfect square, so its square root is a non-terminating, non-repeating decimal (~3.1622...).',
        misconception: 'Rational, because 10 is an even number. \n\nIntervention: Remind students that only perfect squares yield rational square roots.'
      }
    ],
    criteria_for_success: 'Students correctly classify at least 8/10 real numbers.',
    exit_ticket: 'Is the square root of 2 rational or irrational? Explain why.',
    checks_for_understanding: [{ cfu: 'Why is pi considered an irrational number?', method: 'Cold Call / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-18', week_label: '8/17-8/21',
    topic: 'Decimal Representations / Infinite Decimal Expansions (Open-Up (NC Edition) U8 Lesson 15)',
    objective_3m: 'Students will convert repeating decimals into fractions to prove they are rational numbers.',
    standard: '8.NS.1',
    do_now: 'Write 0.75 and 0.5 as fractions.',
    direct_instruction: 'Model algebraic process of converting repeating decimals to fractions.',
    group_practice: 'Partner work converting infinite decimal expansions.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U8 L15) Convert 0.777... to a fraction.',
        correct_answer: 'x = 0.777...\n10x = 7.777...\n10x - x = 7.777... - 0.777...\n9x = 7\nx = 7/9',
        misconception: 'Students might say 7/10. \n\nIntervention: Have them type 7/10 into a calculator to see it is 0.7 exactly, not repeating. Show that dividing by 9 creates the repeating pattern.'
      },
      {
        question: '(From Open-Up (NC Edition) U8 L15) Convert 0.454545... to a fraction.',
        correct_answer: 'x = 0.4545...\n100x = 45.4545...\n100x - x = 45\n99x = 45\nx = 45/99 = 5/11',
        misconception: 'Students might multiply by 10 instead of 100. \n\nIntervention: Point out that TWO digits repeat, so we need to shift the decimal TWO places by multiplying by 10^2 (100).'
      }
    ],
    criteria_for_success: 'Students set up equations to convert repeating decimals to fractions.',
    exit_ticket: 'Convert 0.444... into a fraction.',
    checks_for_understanding: [{ cfu: 'Why do we multiply by 10 if one digit repeats?', method: 'Think-Pair-Share / DOK 3' }]
  });

  lessonPlans.push({
    date_start: '2026-08-19', week_label: '8/17-8/21',
    topic: 'Compare and Order Real Numbers (Envision T1 - 3)',
    objective_3m: 'Students will estimate the value of irrational numbers to compare and order them.',
    standard: '8.NS.2',
    do_now: 'Order from least to greatest: 1/2, 0.3, 3/4, 0.8',
    direct_instruction: 'Explain using perfect squares to estimate square roots.',
    group_practice: 'Number line placement activity.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T1-3) Which is greater: sqrt(20) or 4.5?',
        correct_answer: 'sqrt(16) = 4, sqrt(25) = 5. 20 is almost exactly in the middle of 16 and 25, so sqrt(20) is approximately 4.47. Therefore, 4.5 is greater.',
        misconception: 'Students might divide 20 by 2 and say sqrt(20)=10, which is > 4.5. \n\nIntervention: Ask them to multiply 10x10. Is it 20? No, it\'s 100. Re-establish the definition of a square root.'
      },
      {
        question: '(From Envision T1-3) Place sqrt(8) on a number line.',
        correct_answer: 'sqrt(8) is between sqrt(4)=2 and sqrt(9)=3, but very close to 3. (approx 2.8).',
        misconception: 'Placing it halfway between 2 and 3. \n\nIntervention: Ask which perfect square 8 is closer to (4 or 9)? It\'s closer to 9, so the root must be closer to 3.'
      }
    ],
    criteria_for_success: 'Students accurately estimate irrational numbers to nearest tenth.',
    exit_ticket: 'Which is greater: sqrt(15) or 4? Explain.',
    checks_for_understanding: [{ cfu: 'How do you know sqrt(20) is between 4 and 5?', method: 'Mini-whiteboards / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-20', week_label: '8/17-8/21',
    topic: 'Exponent Review (Open-Up (NC Edition) U7 L1)',
    objective_3m: 'Students will write and evaluate expressions with integer exponents.',
    standard: '8.EE.1',
    do_now: 'Evaluate: 2*2*2 and 3*3.',
    direct_instruction: 'Review base and exponent definitions.',
    group_practice: 'Match expanded form to exponential form.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U7 L1) Evaluate 5^3',
        correct_answer: '5 * 5 * 5 = 125',
        misconception: '5 * 3 = 15. \n\nIntervention: Remind them that the exponent tells us how many times to write the BASE. Have them write it out as 5 * 5 * 5 first before calculating.'
      },
      {
        question: '(From Open-Up (NC Edition) U7 L1) Write 7 * 7 * 7 * 7 using an exponent.',
        correct_answer: '7^4',
        misconception: '4^7. \n\nIntervention: Ask "What number is being repeated?" (The base, 7). "How many times?" (The exponent, 4).'
      }
    ],
    criteria_for_success: 'Seamlessly translate between expanded, exponential, and standard forms.',
    exit_ticket: 'Write 4*4*4*4*4 using an exponent and evaluate.',
    checks_for_understanding: [{ cfu: 'Difference between 2^3 and 3^2?', method: 'Turn/Talk / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-21', week_label: '8/17-8/21',
    topic: 'Properties of Integer Exponents (Envision T1 L7)',
    objective_3m: 'Students will apply the product and quotient rules for integer exponents.',
    standard: '8.EE.1',
    do_now: 'Expand 3^2 * 3^3.',
    direct_instruction: 'Formalize Product and Quotient of Powers rules.',
    group_practice: 'Whiteboard relay: simplify expressions using rules.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T1 L7) Simplify: 4^5 * 4^3',
        correct_answer: 'Bases are the same, so add exponents: 4^(5+3) = 4^8',
        misconception: '16^8 or 4^15. \n\nIntervention: Show expanded form: (4*4*4*4*4) * (4*4*4). Count them. There are 8 fours, so it\'s 4^8.'
      },
      {
        question: '(From Envision T1 L7) Simplify: x^7 / x^2',
        correct_answer: 'Bases are the same, so subtract exponents: x^(7-2) = x^5',
        misconception: 'x^3.5 or 1^5. \n\nIntervention: Write it as a fraction and cancel out the common factors (x*x) on top and bottom to see 5 are left on top.'
      }
    ],
    criteria_for_success: 'Correctly apply rules to simplify 80% of expressions.',
    exit_ticket: 'Simplify: (x^4 * x^5) / x^2',
    checks_for_understanding: [{ cfu: 'Why do we add exponents when multiplying bases?', method: 'Class Discussion / DOK 3' }]
  });

  // --- WEEK 3 (8/24 - 8/28) ---
  lessonPlans.push({
    date_start: '2026-08-24', week_label: '8/24-8/28',
    topic: 'Powers of 10, Dividing Powers (Open-Up (NC Edition) U7 L2-L4)',
    objective_3m: 'Students apply power of a power and power of a product rules.',
    standard: '8.EE.1',
    do_now: 'Simplify (10^2) * (10^3)',
    direct_instruction: 'Introduce Power of a Power rule.',
    group_practice: 'Collaborative tasks combining exponent rules.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U7 L2) Simplify (2^3)^4',
        correct_answer: 'Multiply the exponents: 2^(3*4) = 2^12',
        misconception: '2^7. \n\nIntervention: Expand it out: (2^3) * (2^3) * (2^3) * (2^3). Now use the product rule to add 3+3+3+3 = 12.'
      },
      {
        question: '(From Open-Up (NC Edition) U7 L4) Simplify (3x)^3',
        correct_answer: 'Apply the power to both terms in the product: 3^3 * x^3 = 27x^3',
        misconception: '3x^3. \n\nIntervention: The parentheses mean everything inside is cubed. Expand to (3x)(3x)(3x) = 3*3*3 * x*x*x.'
      }
    ],
    criteria_for_success: 'Correctly apply multiple properties of exponents.',
    exit_ticket: 'Simplify (x^3)^4.',
    checks_for_understanding: [{ cfu: 'Why does (2^3)^2 equal 2^6?', method: 'Whiteboard / DOK 3' }]
  });

  lessonPlans.push({
    date_start: '2026-08-25', week_label: '8/24-8/28',
    topic: 'Negative Exponents (Open-Up (NC Edition) U7 L5-L6)',
    objective_3m: 'Students define and evaluate negative exponents and bases other than 10.',
    standard: '8.EE.1',
    do_now: 'Follow pattern: 2^3=8, 2^2=4, 2^1=2. 2^0=?, 2^-1=?',
    direct_instruction: 'Teach negative exponent rule (x^-1 = 1/x).',
    group_practice: 'Translating negative exponents to positive exponents in fractions.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U7 L5) Evaluate 4^-2',
        correct_answer: '1 / (4^2) = 1 / 16',
        misconception: '-16 or -8. \n\nIntervention: Remind them that an exponent does not make a number negative; it tells us to divide rather than multiply when following the pattern down past zero.'
      },
      {
        question: '(From Open-Up (NC Edition) U7 L6) Simplify x^3 * x^-5',
        correct_answer: 'x^(3 + -5) = x^-2 = 1/(x^2)',
        misconception: 'x^8 or -x^2. \n\nIntervention: They can still use the product rule (add exponents). 3 + (-5) is -2. Then rewrite.'
      }
    ],
    criteria_for_success: 'Rewrite negative exponents using positive exponents and evaluate.',
    exit_ticket: 'Rewrite 5^-2 as a fraction and evaluate.',
    checks_for_understanding: [{ cfu: 'Does a negative exponent make the number negative?', method: 'Thumbs up/down / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-26', week_label: '8/24-8/28',
    topic: 'Rational Bases/Combining Bases (Open-Up (NC Edition) U7 L7-L8)',
    objective_3m: 'Students simplify expressions with rational bases and combine all properties.',
    standard: '8.EE.1',
    do_now: 'Simplify (1/2)^3',
    direct_instruction: 'Model applying exponent properties to fractions.',
    group_practice: 'Matching complex expressions to simplified forms.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U7 L7) Simplify (2/5)^2',
        correct_answer: '(2^2) / (5^2) = 4 / 25',
        misconception: '4/5 or 2/25. \n\nIntervention: Remind them the power applies to BOTH the numerator and denominator.'
      },
      {
        question: '(From Open-Up (NC Edition) U7 L8) Simplify ( (x^2 * y^3) / x )^2',
        correct_answer: 'Inside first: x^(2-1) * y^3 = xy^3. Then apply outside power: (xy^3)^2 = x^2 * y^6',
        misconception: 'x^2 * y^5. \n\nIntervention: Step-by-step breakdown. Simplify inside parentheses first using quotient rule, then apply power of a power.'
      }
    ],
    criteria_for_success: 'Accurately combine bases and apply properties to simplify.',
    exit_ticket: 'Simplify (2/3)^2 * (2/3)^-1',
    checks_for_understanding: [{ cfu: 'How do you apply an exponent to a fraction?', method: 'Turn/Talk / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-27', week_label: '8/24-8/28',
    topic: 'Square Roots on the Number Line (Open-Up (NC Edition) U8 L4-L5)',
    objective_3m: 'Students reason with square roots and plot them accurately on a number line.',
    standard: '8.NS.2',
    do_now: 'List the first 10 perfect squares.',
    direct_instruction: 'Find side length of a square given area. Relate to square roots.',
    group_practice: 'Class number line with post-it notes of roots.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U8 L4) A square has an area of 50 sq inches. Estimate the side length.',
        correct_answer: 'Side length = sqrt(50). sqrt(49) is 7, so sqrt(50) is slightly more than 7, approx 7.1 inches.',
        misconception: '25 inches (dividing by 2). \n\nIntervention: Area = side * side. 25 * 25 = 625, not 50.'
      },
      {
        question: '(From Open-Up (NC Edition) U8 L5) Between which two integers does -sqrt(15) lie?',
        correct_answer: 'sqrt(15) is between 3 and 4, so -sqrt(15) is between -3 and -4.',
        misconception: 'Between -15 and -16. \n\nIntervention: Ensure they evaluate the root first before applying the negative sign.'
      }
    ],
    criteria_for_success: 'Determine integers a square root falls between and plot.',
    exit_ticket: 'Between which two integers does sqrt(30) lie?',
    checks_for_understanding: [{ cfu: 'How does area relate to square roots?', method: 'Think-Pair-Share / DOK 3' }]
  });

  lessonPlans.push({
    date_start: '2026-08-28', week_label: '8/24-8/28',
    topic: 'Cube Roots (Open-Up (NC Edition) U8 L13)',
    objective_3m: 'Students solve equations of the form x^3 = p by taking the cube root.',
    standard: '8.EE.2',
    do_now: 'Evaluate: 2^3, 3^3, 4^3.',
    direct_instruction: 'Introduce cube roots as the inverse of cubing.',
    group_practice: 'Work with physical cubes to find edge lengths.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U8 L13) Solve for x: x^3 = 125',
        correct_answer: 'x = cuberoot(125) = 5',
        misconception: 'x = 41.6 (divided by 3) or x = approx 11.1 (took square root). \n\nIntervention: Remind them that we need a number that multiplies by itself THREE times to get 125. 5*5*5 = 125.'
      },
      {
        question: '(From Open-Up (NC Edition) U8 L13) A cube has a volume of 64 cubic cm. What is the length of one edge?',
        correct_answer: 'Edge = cuberoot(64) = 4 cm.',
        misconception: '8 cm. \n\nIntervention: That\'s the square root. Check work: 8*8*8 = 512, not 64.'
      }
    ],
    criteria_for_success: 'Evaluate cube roots of perfect cubes.',
    exit_ticket: 'Solve for x: x^3 = 64',
    checks_for_understanding: [{ cfu: 'Difference between finding square/cube root?', method: 'Cold Call / DOK 2' }]
  });

  // --- WEEK 4 (8/31 - 9/4) ---
  const week4Dates = ['2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04'];
  const w4Topics = [
    'Eval Sq & Cube Roots (Envision T1 - 4)',
    'Side Length/Edge Length (Open-Up (NC Edition) U8 L2/L12)',
    'Solve Eq w/SR & CR (Envision T1 - 5)',
    'Cluster 1 Review',
    'Cluster 1 Post Assessment'
  ];

  lessonPlans.push({
    date_start: week4Dates[0], week_label: '8/31-9/4', topic: w4Topics[0],
    objective_3m: 'Students evaluate square and cube roots to solve real-world problems.',
    standard: '8.EE.2', do_now: 'Evaluate sqrt(81) and cuberoot(27).',
    direct_instruction: 'Review both square and cube roots side by side.',
    group_practice: 'Collaborative problem solving.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T1 - 4) Evaluate: sqrt(100) + cuberoot(8)',
        correct_answer: '10 + 2 = 12',
        misconception: '50 + 2.6 = 52.6 (Dividing by 2 and 3). \n\nIntervention: Re-teach definitions using visual models (squares and cubes).'
      },
      {
        question: '(From Envision T1 - 4) Evaluate: 3 * sqrt(25)',
        correct_answer: '3 * 5 = 15',
        misconception: 'sqrt(75). \n\nIntervention: The 3 is outside the radical, meaning multiplication. Evaluate the root first, then multiply.'
      }
    ],
    criteria_for_success: 'Differentiate and calculate square and cube roots.',
    exit_ticket: 'Explain difference between x^2=25 and x^3=125.',
    checks_for_understanding: [{ cfu: 'How do you check your answer for a cube root?', method: 'Whiteboard / DOK 2' }]
  });

  lessonPlans.push({
    date_start: week4Dates[1], week_label: '8/31-9/4', topic: w4Topics[1],
    objective_3m: 'Students apply area and volume formulas to find unknown side lengths.',
    standard: '8.EE.2', do_now: 'Area of square is 49. Side length?',
    direct_instruction: 'Connect algebra to geometry (Area/Volume).',
    group_practice: 'Solving word problems involving area and volume.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up (NC Edition) U8 L2) A square rug has an area of 144 sq ft. What are its dimensions?',
        correct_answer: 'Side = sqrt(144) = 12 ft. Dimensions are 12 ft by 12 ft.',
        misconception: '72x72. \n\nIntervention: Area is length x width. 72x72 is over 5000.'
      },
      {
        question: '(From Open-Up (NC Edition) U8 L12) A moving box is a perfect cube with a volume of 216 cubic inches. Will a 7-inch plate lie flat on the bottom?',
        correct_answer: 'Edge = cuberoot(216) = 6 inches. The bottom is 6x6. A 7-inch plate will NOT lie flat because 7 > 6.',
        misconception: 'Yes, because 216/3 = 72. \n\nIntervention: Volume is s^3, not 3*s.'
      }
    ],
    criteria_for_success: 'Find side lengths of squares/cubes given area/volume.',
    exit_ticket: 'Cube volume is 1000 cm^3. Edge length?',
    checks_for_understanding: [{ cfu: 'Why use cube root for volume?', method: 'Turn/Talk / DOK 3' }]
  });

  lessonPlans.push({
    date_start: week4Dates[2], week_label: '8/31-9/4', topic: w4Topics[2],
    objective_3m: 'Students solve equations of form x^2=p and x^3=p.',
    standard: '8.EE.2', do_now: 'Solve 2x = 10. Operation used?',
    direct_instruction: 'Model solving equations using square/cube roots as inverse operations.',
    group_practice: 'Equation solving stations.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T1 - 5) Solve: x^2 = 81',
        correct_answer: 'x = sqrt(81) OR x = -sqrt(81). So x = 9, x = -9.',
        misconception: 'x = 9 only. \n\nIntervention: Remind them that (-9) * (-9) also equals positive 81. Equations with x^2 always have two solutions if p > 0.'
      },
      {
        question: '(From Envision T1 - 5) Solve: x^3 = 27',
        correct_answer: 'x = cuberoot(27) = 3.',
        misconception: 'x = 3, -3. \n\nIntervention: (-3)*(-3)*(-3) = -27, not +27. Cube roots of positive numbers only have ONE real solution.'
      }
    ],
    criteria_for_success: 'Isolate variables and use correct root operations.',
    exit_ticket: 'Solve: x^2 = 144.',
    checks_for_understanding: [{ cfu: 'Why does x^2 = 16 have two solutions?', method: 'Class Discussion / DOK 3' }]
  });

  lessonPlans.push({
    date_start: week4Dates[3], week_label: '8/31-9/4', topic: w4Topics[3],
    objective_3m: 'Students review and synthesize all Cluster 1 concepts.',
    standard: '8.NS, 8.EE', do_now: 'Write down one concept to review.',
    direct_instruction: 'Review EOG Release questions.',
    group_practice: 'Gizmos/Desmos review activities.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(Cluster 1 Review) EOG Release: Place sqrt(5), 2.5, and 8/3 on a number line.',
        correct_answer: 'sqrt(5) is ~2.23. 8/3 is 2.66... So order is: sqrt(5), 2.5, 8/3.',
        misconception: 'Placing sqrt(5) as 2.5. \n\nIntervention: Have them calculate 2.5^2 = 6.25, which is > 5.'
      },
      {
        question: '(Cluster 1 Review) Simplify: (3^2)^3 * 3^-4',
        correct_answer: '3^6 * 3^-4 = 3^2 = 9',
        misconception: '3^10. \n\nIntervention: Step by step tracking. Power of a power = 6. Product = add -4.'
      }
    ],
    criteria_for_success: 'Identify areas of weakness and practice.',
    exit_ticket: 'Topic to study tonight?',
    checks_for_understanding: [{ cfu: 'Strategy for EOG question?', method: '1-on-1 conferring / DOK 3' }]
  });

  lessonPlans.push({
    date_start: week4Dates[4], week_label: '8/31-9/4', topic: w4Topics[4],
    objective_3m: 'Students demonstrate mastery of Cluster 1 standards on Post Assessment.',
    standard: '8.NS, 8.EE', do_now: 'Prepare testing materials.',
    direct_instruction: 'Explain testing expectations (Teacher: 6739923, Student: LY5ZE7P).',
    group_practice: 'N/A',
    independent_practice: 'Cluster 1 Post Assessment. **Teacher Note:** Continuously actively monitor. Check that students are utilizing scratch paper to evaluate square and cube roots before selecting answers.',
    structured_exemplars: [],
    criteria_for_success: 'Score 80%+ on Assessment.',
    exit_ticket: 'Post-test reflection.',
    checks_for_understanding: [{ cfu: 'Accommodations met?', method: 'Observation / DOK 1' }]
  });

  console.log(`Inserting ${lessonPlans.length} daily lesson plans with highly structured visual exemplars...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) {
      console.error(`Error inserting plan for ${plan.date_start}:`, error);
    } else {
      console.log(`Success: ${plan.date_start} (${plan.week_label})`);
    }
  }
};

run();
