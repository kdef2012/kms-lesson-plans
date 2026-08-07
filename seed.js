import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans...');
  await supabase.from('lesson_plans').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const lessonPlans = [];

  // --- Helper to format detailed exemplar text ---
  const createExemplar = (problems) => {
    return problems.map(p => `**Problem:** ${p.q}\n**Teacher Work / Correct Answer:** ${p.a}\n**Anticipated Misconception / Wrong Answer:** ${p.w}\n`).join('\n---\n\n');
  };

  // --- WEEK 1: Week of Inspirational Math (8/10 - 8/14) ---
  const week1Dates = ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14'];
  const w1Topics = ['WIM Day 1', 'WIM Day 2', 'WIM Day 3', 'WIM Day 4', 'WIM Day 5'];
  for (let i = 0; i < 5; i++) {
    lessonPlans.push({
      date_start: week1Dates[i],
      week_label: '8/10-8/14',
      topic: w1Topics[i] + ' - Growth Mindset & Norms',
      objective_3m: 'Students will understand and apply YouCubed Mathematical Norms to establish a foundation for a positive mathematical mindset.',
      standard: 'SMPs 1-8',
      do_now: 'Growth mindset reflection puzzle from YouCubed resources.',
      direct_instruction: 'Establish classroom norms. Discuss how mistakes grow your brain.',
      group_practice: 'Collaborative task focusing on perseverance (e.g. four 4s activity).',
      independent_practice: createExemplar([
        {
          q: 'Journal Prompt: Describe a time you struggled in math. How did you handle it?',
          a: 'Students should write a paragraph detailing a specific struggle and reflecting on their feelings. Ideal response acknowledges frustration but recognizes that effort leads to learning.',
          w: 'Students might write "I am just bad at math." Intervention: Guide them to reframe it using "yet" (I don\'t understand it yet).'
        },
        {
          q: 'Activity: The Four 4s. Create the number 1 using exactly four 4s.',
          a: '44/44 = 1 or (4+4)/(4+4) = 1.',
          w: 'Students might give up quickly or use fewer than four 4s. Intervention: Remind them of the "productive struggle" norm. Suggest they try grouping operations in parentheses.'
        }
      ]),
      criteria_for_success: 'Students actively engage in math discourse and follow classroom norms.',
      exit_ticket: 'What is one thing you learned about your math mindset today?',
      checks_for_understanding: [
        { cfu: 'What does it mean to have a growth mindset in math?', method: 'Turn and Talk / DOK 2' }
      ]
    });
  }

  // --- WEEK 2 (8/17 - 8/21) ---
  lessonPlans.push({
    date_start: '2026-08-17', week_label: '8/17-8/21',
    topic: 'Rational & Irrational Numbers (Envision T1 - 2, Open-Up (NC Edition) U8 Lesson 3)',
    objective_3m: 'Students will classify real numbers as rational or irrational and justify their reasoning.',
    standard: '8.NS.1',
    do_now: 'Convert 1/3 and 1/4 to decimals. What do you notice?',
    direct_instruction: 'Define rational vs irrational numbers.',
    group_practice: 'Sort a set of numbers into rational and irrational categories.',
    independent_practice: createExemplar([
      {
        q: 'Classify as rational or irrational: 0.333...',
        a: 'Rational. It is a repeating decimal and can be written as the fraction 1/3.',
        w: 'Irrational, because "it goes on forever". Intervention: Clarify that going on forever WITH a pattern (repeating) makes it rational. Only non-terminating, NON-repeating decimals are irrational.'
      },
      {
        q: 'Classify as rational or irrational: sqrt(10)',
        a: 'Irrational. 10 is not a perfect square, so its square root is a non-terminating, non-repeating decimal (~3.1622...).',
        w: 'Rational, because 10 is an even number. Intervention: Remind students that only perfect squares yield rational square roots.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Convert 0.777... to a fraction.',
        a: 'x = 0.777...\n10x = 7.777...\n10x - x = 7.777... - 0.777...\n9x = 7\nx = 7/9',
        w: 'Students might say 7/10. Intervention: Have them type 7/10 into a calculator to see it is 0.7 exactly, not repeating. Show that dividing by 9 creates the repeating pattern.'
      },
      {
        q: 'Convert 0.454545... to a fraction.',
        a: 'x = 0.4545...\n100x = 45.4545...\n100x - x = 45\n99x = 45\nx = 45/99 = 5/11',
        w: 'Students might multiply by 10 instead of 100. Intervention: Point out that TWO digits repeat, so we need to shift the decimal TWO places by multiplying by 10^2 (100).'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Which is greater: sqrt(20) or 4.5?',
        a: 'sqrt(16) = 4, sqrt(25) = 5. 20 is almost exactly in the middle of 16 and 25, so sqrt(20) is approximately 4.47. Therefore, 4.5 is greater.',
        w: 'Students might divide 20 by 2 and say sqrt(20)=10, which is > 4.5. Intervention: Ask them to multiply 10x10. Is it 20? No, it\'s 100. Re-establish the definition of a square root.'
      },
      {
        q: 'Place sqrt(8) on a number line.',
        a: 'sqrt(8) is between sqrt(4)=2 and sqrt(9)=3, but very close to 3. (approx 2.8).',
        w: 'Placing it halfway between 2 and 3. Intervention: Ask which perfect square 8 is closer to (4 or 9)? It\'s closer to 9, so the root must be closer to 3.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Evaluate 5^3',
        a: '5 * 5 * 5 = 125',
        w: '5 * 3 = 15. Intervention: Remind them that the exponent tells us how many times to write the BASE. Have them write it out as 5 * 5 * 5 first before calculating.'
      },
      {
        q: 'Write 7 * 7 * 7 * 7 using an exponent.',
        a: '7^4',
        w: '4^7. Intervention: Ask "What number is being repeated?" (The base, 7). "How many times?" (The exponent, 4).'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Simplify: 4^5 * 4^3',
        a: 'Bases are the same, so add exponents: 4^(5+3) = 4^8',
        w: '16^8 or 4^15. Intervention: Show expanded form: (4*4*4*4*4) * (4*4*4). Count them. There are 8 fours, so it\'s 4^8.'
      },
      {
        q: 'Simplify: x^7 / x^2',
        a: 'Bases are the same, so subtract exponents: x^(7-2) = x^5',
        w: 'x^3.5 or 1^5. Intervention: Write it as a fraction and cancel out the common factors (x*x) on top and bottom to see 5 are left on top.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Simplify (2^3)^4',
        a: 'Multiply the exponents: 2^(3*4) = 2^12',
        w: '2^7. Intervention: Expand it out: (2^3) * (2^3) * (2^3) * (2^3). Now use the product rule to add 3+3+3+3 = 12.'
      },
      {
        q: 'Simplify (3x)^3',
        a: 'Apply the power to both terms in the product: 3^3 * x^3 = 27x^3',
        w: '3x^3. Intervention: The parentheses mean everything inside is cubed. Expand to (3x)(3x)(3x) = 3*3*3 * x*x*x.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Evaluate 4^-2',
        a: '1 / (4^2) = 1 / 16',
        w: '-16 or -8. Intervention: Remind them that an exponent does not make a number negative; it tells us to divide rather than multiply when following the pattern down past zero.'
      },
      {
        q: 'Simplify x^3 * x^-5',
        a: 'x^(3 + -5) = x^-2 = 1/(x^2)',
        w: 'x^8 or -x^2. Intervention: They can still use the product rule (add exponents). 3 + (-5) is -2. Then rewrite.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Simplify (2/5)^2',
        a: '(2^2) / (5^2) = 4 / 25',
        w: '4/5 or 2/25. Intervention: Remind them the power applies to BOTH the numerator and denominator.'
      },
      {
        q: 'Simplify ( (x^2 * y^3) / x )^2',
        a: 'Inside first: x^(2-1) * y^3 = xy^3. Then apply outside power: (xy^3)^2 = x^2 * y^6',
        w: 'x^2 * y^5. Intervention: Step-by-step breakdown. Simplify inside parentheses first using quotient rule, then apply power of a power.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'A square has an area of 50 sq inches. Estimate the side length.',
        a: 'Side length = sqrt(50). sqrt(49) is 7, so sqrt(50) is slightly more than 7, approx 7.1 inches.',
        w: '25 inches (dividing by 2). Intervention: Area = side * side. 25 * 25 = 625, not 50.'
      },
      {
        q: 'Between which two integers does -sqrt(15) lie?',
        a: 'sqrt(15) is between 3 and 4, so -sqrt(15) is between -3 and -4.',
        w: 'Between -15 and -16. Intervention: Ensure they evaluate the root first before applying the negative sign.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Solve for x: x^3 = 125',
        a: 'x = cuberoot(125) = 5',
        w: 'x = 41.6 (divided by 3) or x = approx 11.1 (took square root). Intervention: Remind them that we need a number that multiplies by itself THREE times to get 125. 5*5*5 = 125.'
      },
      {
        q: 'A cube has a volume of 64 cubic cm. What is the length of one edge?',
        a: 'Edge = cuberoot(64) = 4 cm.',
        w: '8 cm. Intervention: That\'s the square root. Check work: 8*8*8 = 512, not 64.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Evaluate: sqrt(100) + cuberoot(8)',
        a: '10 + 2 = 12',
        w: '50 + 2.6 = 52.6 (Dividing by 2 and 3). Intervention: Re-teach definitions using visual models (squares and cubes).'
      },
      {
        q: 'Evaluate: 3 * sqrt(25)',
        a: '3 * 5 = 15',
        w: 'sqrt(75). Intervention: The 3 is outside the radical, meaning multiplication. Evaluate the root first, then multiply.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'A square rug has an area of 144 sq ft. What are its dimensions?',
        a: 'Side = sqrt(144) = 12 ft. Dimensions are 12 ft by 12 ft.',
        w: '72x72. Intervention: Area is length x width. 72x72 is over 5000.'
      },
      {
        q: 'A moving box is a perfect cube with a volume of 216 cubic inches. Will a 7-inch plate lie flat on the bottom?',
        a: 'Edge = cuberoot(216) = 6 inches. The bottom is 6x6. A 7-inch plate will NOT lie flat because 7 > 6.',
        w: 'Yes, because 216/3 = 72. Intervention: Volume is s^3, not 3*s.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'Solve: x^2 = 81',
        a: 'x = sqrt(81) OR x = -sqrt(81). So x = 9, x = -9.',
        w: 'x = 9 only. Intervention: Remind them that (-9) * (-9) also equals positive 81. Equations with x^2 always have two solutions if p > 0.'
      },
      {
        q: 'Solve: x^3 = 27',
        a: 'x = cuberoot(27) = 3.',
        w: 'x = 3, -3. Intervention: (-3)*(-3)*(-3) = -27, not +27. Cube roots of positive numbers only have ONE real solution.'
      }
    ]),
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
    independent_practice: createExemplar([
      {
        q: 'EOG Release: Place sqrt(5), 2.5, and 8/3 on a number line.',
        a: 'sqrt(5) is ~2.23. 8/3 is 2.66... So order is: sqrt(5), 2.5, 8/3.',
        w: 'Placing sqrt(5) as 2.5. Intervention: Have them calculate 2.5^2 = 6.25, which is > 5.'
      },
      {
        q: 'Simplify: (3^2)^3 * 3^-4',
        a: '3^6 * 3^-4 = 3^2 = 9',
        w: '3^10. Intervention: Step by step tracking. Power of a power = 6. Product = add -4.'
      }
    ]),
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
    criteria_for_success: 'Score 80%+ on Assessment.',
    exit_ticket: 'Post-test reflection.',
    checks_for_understanding: [{ cfu: 'Accommodations met?', method: 'Observation / DOK 1' }]
  });

  console.log(`Inserting ${lessonPlans.length} daily lesson plans with detailed exemplars...`);
  
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
