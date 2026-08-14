import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans (Week 2 8th Grade)...');
  await supabase.from('lesson_plans').delete().in('date_start', ['2026-08-17', '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21']);

  const lessonPlans = [];

  // Day 6 (8/17)
  lessonPlans.push({
    date_start: '2026-08-17', week_label: '8/17-8/21',
    topic: 'Converting Repeating Decimals (Open-Up U8 L15)',
    objective_3m: 'Students will convert repeating decimals into fractions using algebraic equations.',
    standard: '8.NS.1',
    do_now: '**Vocabulary Primer:**\n- **Algebraic Equation:** A mathematical statement where two expressions are equal.\n- **Variable:** A letter representing an unknown value.\n\n**Do Now:** Write 0.75 and 0.5 as fractions in their simplest form.',
    direct_instruction: '## The Magic Trick\nWe know that repeating decimals are rational, which means they CAN be written as fractions. But how? We can use algebra!\n\n---\n\n## Setting up the Equation\nLet $x = 0.777...$\nIf we multiply both sides by 10, we shift the decimal one place: $10x = 7.777...$\n\n* **Turn and Talk (2 min):** What happens if we subtract the original $x$ from $10x$?\n\n---\n\n## The Subtraction\n$10x - x = 9x$\n$7.777... - 0.777... = 7$\nSo, $9x = 7$. Divide by 9, and $x = 7/9$!',
    group_practice: 'Whiteboard Race: Students work in pairs to convert various repeating decimals to fractions using the algebraic method.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Convert 0.444... to a fraction.', correct_answer: 'x = 0.444..., 10x = 4.444..., 9x = 4, x = 4/9.', misconception: '4/10.\n\nIntervention: 4/10 is 0.4 exactly. 4/9 is repeating.' },
      { question: 'Convert 0.888... to a fraction.', correct_answer: '8/9.', misconception: '8/10.\n\nIntervention: Follow the algebraic steps. 10x - x = 9x.' },
      { question: 'Convert 0.232323... to a fraction.', correct_answer: 'Multiply by 100 because TWO digits repeat. 100x = 23.2323... 99x = 23. x = 23/99.', misconception: 'Multiplying by 10.\n\nIntervention: "How many digits are in the repeating block?"' },
      { question: 'Convert 0.454545... to a fraction.', correct_answer: '45/99, which simplifies to 5/11.', misconception: 'Forgetting to simplify.\n\nIntervention: Check if both numbers are divisible by 9.' },
      { question: 'Convert 0.111... to a fraction.', correct_answer: '1/9.', misconception: '1/10.\n\nIntervention: Type 1/9 into a calculator to verify.' },
      { question: 'Convert 0.818181... to a fraction.', correct_answer: '81/99, simplifies to 9/11.', misconception: '81/100.\n\nIntervention: "Are there one or two repeating digits? What do we subtract?"' },
      { question: 'Convert 0.555... to a fraction.', correct_answer: '5/9.', misconception: 'Calculation error in subtraction.\n\nIntervention: Line up the decimals vertically to show the tails cancelling out.' },
      { question: 'Convert 0.121212... to a fraction.', correct_answer: '12/99, simplifies to 4/33.', misconception: '12/100.\n\nIntervention: Use the 100x - x = 99x method.' },
      { question: 'Convert 0.999... to a fraction.', correct_answer: '9/9 = 1. (Yes, 0.999... is exactly equal to 1!)', misconception: 'Saying it\'s impossible.\n\nIntervention: Follow the algebra! 9x = 9.' },
      { question: 'Convert 1.333... to a fraction.', correct_answer: 'Let x = 1.333..., 10x = 13.333..., 9x = 12, x = 12/9 = 4/3.', misconception: 'Struggling with the whole number.\n\nIntervention: "Keep the 1 separate, convert 0.333... to 1/3, then add them: 1 + 1/3 = 4/3."' }
    ],
    criteria_for_success: 'Set up an algebraic equation to successfully convert a repeating decimal into a fraction.',
    exit_ticket: 'Convert 0.222... into a fraction using the algebraic method.',
    checks_for_understanding: [{ cfu: 'Why do we multiply by 100 if two digits repeat?', method: 'Turn & Talk' }]
  });

  // Day 7 (8/18)
  lessonPlans.push({
    date_start: '2026-08-18', week_label: '8/17-8/21',
    topic: 'Approximating Irrational Numbers (Envision T1-3, Open-Up U8 L4)',
    objective_3m: 'Students will estimate the value of irrational square roots to the nearest tenth and plot them on a number line.',
    standard: '8.NS.2',
    do_now: '**Vocabulary Primer:**\n- **Approximate:** To estimate a value that is not exact.\n- **Consecutive:** Following continuously (e.g. 3 and 4).\n\n**Do Now:** Order from least to greatest: 1/2, 0.3, 3/4, 0.8',
    direct_instruction: '## The Perfect Square Sandwich\nWe don\'t know exactly what $\\sqrt{20}$ is without a calculator. BUT we do know the perfect squares nearby! $\\sqrt{16} = 4$ and $\\sqrt{25} = 5$.\nSo $\\sqrt{20}$ must be between 4 and 5.\n\n---\n\n## Finding the Decimal\nSince 20 is almost exactly halfway between 16 and 25, $\\sqrt{20}$ is approximately 4.5.\nIf the number was $\\sqrt{17}$, it would be much closer to 4 (maybe 4.1).\n\n* **Turn and Talk (2 min):** Between what two whole numbers is $\\sqrt{40}$?',
    group_practice: 'Human Number Line: Students are given index cards with square roots and must physically arrange themselves in order from least to greatest.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Between which two consecutive whole numbers is $\\sqrt{10}$?', correct_answer: 'Between 3 and 4 ($\\sqrt{9}$ and $\\sqrt{16}$).', misconception: 'Between 5 and 6.\n\nIntervention: "What is 5 squared? 25. That is way too big."' },
      { question: 'Estimate $\\sqrt{80}$ to the nearest tenth.', correct_answer: 'It is between $\\sqrt{64}$ (8) and $\\sqrt{81}$ (9). It is very close to 81, so ~8.9.', misconception: '40.\n\nIntervention: "A square root is not dividing by 2."' },
      { question: 'Place $\\sqrt{8}$ on a number line.', correct_answer: 'Between 2 and 3, but close to 3 (approx 2.8).', misconception: 'Placing it exactly halfway.\n\nIntervention: "Is 8 exactly halfway between 4 and 9?"' },
      { question: 'Which is greater: $\\sqrt{20}$ or 4.5?', correct_answer: '4.5. $\\sqrt{20}$ is roughly 4.47 (20 is slightly less than halfway between 16 and 25).', misconception: 'Guessing $\\sqrt{20}$.\n\nIntervention: "Square 4.5. 4.5 * 4.5 = 20.25. Since 20.25 > 20, 4.5 is greater."' },
      { question: 'Estimate $\\sqrt{30}$.', correct_answer: 'Between 5 and 6, roughly 5.5.', misconception: '15.\n\nIntervention: "15 * 15 = 225. That is not 30!"' },
      { question: 'Between which two whole numbers is $\\sqrt{110}$?', correct_answer: 'Between 10 ($\\sqrt{100}$) and 11 ($\\sqrt{121}$).', misconception: 'Between 50 and 60.\n\nIntervention: List the perfect squares up to 12.' },
      { question: 'Which is greater: $\\sqrt{50}$ or 7.2?', correct_answer: '7.2. (7.2 * 7.2 = 51.84). $\\sqrt{50}$ is ~7.07.', misconception: '$\\sqrt{50}$.\n\nIntervention: Square the decimal.' },
      { question: 'Estimate $\\sqrt{5}$.', correct_answer: 'Between 2 and 3, roughly 2.2.', misconception: '2.5.\n\nIntervention: "5 is closer to 4 than 9, so it should be less than 2.5."' },
      { question: 'Place $\\sqrt{2}$ on a number line.', correct_answer: 'Between 1 and 2, approx 1.4.', misconception: 'Placing it at 1.\n\nIntervention: "1 squared is 1, not 2."' },
      { question: 'Estimate $\\sqrt{90}$.', correct_answer: 'Between 9 and 10, approx 9.5.', misconception: '45.\n\nIntervention: Square roots are not dividing by two!' }
    ],
    criteria_for_success: 'Estimate the value of irrational numbers to the nearest tenth using perfect square benchmarks.',
    exit_ticket: 'Which is greater: $\\sqrt{15}$ or 4? Explain your reasoning.',
    checks_for_understanding: [{ cfu: 'How do you know $\\sqrt{20}$ is between 4 and 5?', method: 'Turn & Talk' }]
  });

  // Day 8 (8/19)
  lessonPlans.push({
    date_start: '2026-08-19', week_label: '8/17-8/21',
    topic: 'Exponent Review (Open-Up U7 L1)',
    objective_3m: 'Students will write, evaluate, and expand expressions with integer exponents.',
    standard: '8.EE.1',
    do_now: '**Vocabulary Primer:**\n- **Base:** The large number being multiplied.\n- **Exponent:** The small number showing how many times to use the base.\n\n**Do Now:** Evaluate: 2 * 2 * 2 and 3 * 3.',
    direct_instruction: '## The Power of Exponents\nAn exponent is just a shortcut for repeated multiplication. Instead of writing $5 \\times 5 \\times 5 \\times 5 \\times 5 \\times 5$, we can write $5^6$.\n\n---\n\n## The "Multiplication Trap"\nThe most common mistake in 8th grade is multiplying the base by the exponent. $5^3$ is NOT 15. It is $5 \\times 5 \\times 5 = 125$.\n\n* **Turn and Talk (2 min):** What is the difference between $2^3$ and $3^2$?',
    group_practice: 'Matching Game: Students match cards showing expanded form, exponential form, and standard form.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Evaluate $5^3$.', correct_answer: '5 * 5 * 5 = 125.', misconception: '15.\n\nIntervention: Write out the expanded form first.' },
      { question: 'Write $7 \\times 7 \\times 7 \\times 7$ using an exponent.', correct_answer: '$7^4$', misconception: '$4^7$.\n\nIntervention: "The base is the number being repeated."' },
      { question: 'Evaluate $2^4$.', correct_answer: '2 * 2 * 2 * 2 = 16.', misconception: '8.\n\nIntervention: "It\'s not 2 * 4. Multiply them one by one. 2*2=4. 4*2=8. 8*2=16."' },
      { question: 'Write $x \\times x \\times x$ using an exponent.', correct_answer: '$x^3$', misconception: '3x.\n\nIntervention: "3x means x + x + x. Exponents are for multiplication."' },
      { question: 'Evaluate $10^5$.', correct_answer: '100,000.', misconception: '50.\n\nIntervention: "A base of 10 means you add that many zeros to a 1."' },
      { question: 'Evaluate $1^8$.', correct_answer: '1.', misconception: '8.\n\nIntervention: "1 * 1 * 1... is always 1!"' },
      { question: 'Evaluate $3^2$.', correct_answer: '9.', misconception: '6.\n\nIntervention: Write it expanded: 3 * 3.' },
      { question: 'Write $-4 \\times -4$ using an exponent.', correct_answer: '$(-4)^2$', misconception: '$-4^2$.\n\nIntervention: "You need parentheses around the negative sign to show the whole negative number is the base."' },
      { question: 'Evaluate $(-2)^3$.', correct_answer: '(-2) * (-2) * (-2) = -8.', misconception: '+8.\n\nIntervention: "A negative times a negative is positive, but times a third negative makes it negative again."' },
      { question: 'Evaluate $10^0$.', correct_answer: '1.', misconception: '0.\n\nIntervention: "Any non-zero number to the power of 0 is 1. (Will explain the pattern tomorrow!)"' }
    ],
    criteria_for_success: 'Seamlessly translate between expanded, exponential, and standard forms.',
    exit_ticket: 'Write $4 \\times 4 \\times 4 \\times 4 \\times 4$ using an exponent, and evaluate $2^5$.',
    checks_for_understanding: [{ cfu: 'What is the most common mistake people make when evaluating $4^3$?', method: 'Turn & Talk' }]
  });

  // Day 9 (8/20)
  lessonPlans.push({
    date_start: '2026-08-20', week_label: '8/17-8/21',
    topic: 'Properties of Integer Exponents - Product Rule (Envision T1 L7)',
    objective_3m: 'Students will apply the product rule for integer exponents to simplify expressions.',
    standard: '8.EE.1',
    do_now: '**Vocabulary Primer:**\n- **Simplify:** To write an expression in its shortest form.\n\n**Do Now:** Write $x^3$ and $x^2$ in expanded form.',
    direct_instruction: '## The Long Way\nIf we want to multiply $x^3 \\times x^2$, we could write it all out: $(x \\times x \\times x) \\times (x \\times x)$. How many x\'s is that? It\'s 5!\n\n---\n\n## The Short Way (Product Rule)\nNotice a pattern? $3 + 2 = 5$. When you multiply terms with the SAME base, you simply ADD the exponents!\nRule: $a^m \\times a^n = a^{m+n}$\n\n* **Turn and Talk (2 min):** Does this rule work for $2^3 \\times 5^2$? Why or why not?',
    group_practice: 'Exponent Mashup: Students are given whiteboards to quickly simplify expressions using the product rule.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Simplify: $x^4 \\times x^5$', correct_answer: '$x^9$', misconception: '$x^{20}$.\n\nIntervention: "Write it out expanded. Do you have 20 x\'s or 9 x\'s?"' },
      { question: 'Simplify: $3^2 \\times 3^6$', correct_answer: '$3^8$', misconception: '$9^8$.\n\nIntervention: "The base stays exactly the same. You just count how many 3s you have."' },
      { question: 'Simplify: $y \\times y^7$', correct_answer: '$y^8$', misconception: '$y^7$.\n\nIntervention: "There is an invisible exponent of 1 on the first y."' },
      { question: 'Simplify: $2^3 \\times 5^2$', correct_answer: 'Cannot be simplified using the rule. The bases are different.', misconception: '$10^5$.\n\nIntervention: "The product rule ONLY works if the bases are identical."' },
      { question: 'Simplify: $a^5 \\times a^5$', correct_answer: '$a^{10}$', misconception: '$a^{25}$.\n\nIntervention: Remember to add, not multiply!' },
      { question: 'Simplify: $4^1 \\times 4^0$', correct_answer: '$4^1$ or just 4.', misconception: '$4^0$.\n\nIntervention: 1 + 0 = 1.' },
      { question: 'Simplify: $m^3 \\times m^2 \\times m^4$', correct_answer: '$m^9$', misconception: 'Only adding the first two.\n\nIntervention: You can add all three exponents.' },
      { question: 'Simplify: $x^{-2} \\times x^5$', correct_answer: '$x^3$', misconception: '$x^7$.\n\nIntervention: Treat it like adding integers. -2 + 5 = 3.' },
      { question: 'Simplify: $10^4 \\times 10^3$', correct_answer: '$10^7$', misconception: '$100^7$.\n\nIntervention: "Keep the base of 10."' },
      { question: 'Simplify: $c^8 \\times c^{-8}$', correct_answer: '$c^0$ (which equals 1).', misconception: '$c^{16}$.\n\nIntervention: 8 + (-8) = 0.' }
    ],
    criteria_for_success: 'Correctly apply the product rule to simplify exponential expressions with like bases.',
    exit_ticket: 'Simplify: $w^6 \\times w^4$ and $7^3 \\times 7^2$.',
    checks_for_understanding: [{ cfu: 'Why does the base stay the same when multiplying exponents?', method: 'Turn & Talk' }]
  });

  // Day 10 (8/21)
  lessonPlans.push({
    date_start: '2026-08-21', week_label: '8/17-8/21',
    topic: 'Power of a Power (Open-Up U7 L2-L4)',
    objective_3m: 'Students will apply the power of a power and power of a product rules to simplify exponential expressions.',
    standard: '8.EE.1',
    do_now: '**Vocabulary Primer:**\n- **Power:** Another word for exponent.\n- **Base:** The number being multiplied.\n\n**Do Now:** Simplify $10^2 \\times 10^3$. What rule did you use?',
    direct_instruction: '## Exponents on Exponents!\nWhat happens if you have $(2^3)^4$? This means you are taking $2^3$ and multiplying it by itself 4 times: $(2^3) \\times (2^3) \\times (2^3) \\times (2^3)$.\n\n---\n\n## The Power Rule\nIf we use the product rule from yesterday on $(2^3) \\times (2^3) \\times (2^3) \\times (2^3)$, we add $3+3+3+3 = 12$. So the answer is $2^{12}$.\nShortcut: When a power is raised directly to another power (with parentheses), you MULTIPLY the exponents! $3 \\times 4 = 12$.\n\n* **Turn and Talk (2 min):** Why do we add exponents for $x^2 \\times x^3$, but multiply them for $(x^2)^3$?',
    group_practice: 'Exponent Relay: Teams race to simplify complex expressions using a combination of the product and power rules.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Simplify: $(2^3)^4$', correct_answer: '$2^{12}$', misconception: '$2^7$.\n\nIntervention: You only add when multiplying two bases. Here, you multiply the powers.' },
      { question: 'Simplify: $(x^5)^2$', correct_answer: '$x^{10}$', misconception: '$x^7$.\n\nIntervention: $(x^5) \\times (x^5)$. Add 5 and 5 to get 10.' },
      { question: 'Simplify: $(3x)^3$', correct_answer: '$27x^3$', misconception: '$3x^3$.\n\nIntervention: The 3 is inside the parentheses too! $3^3 = 27$.' },
      { question: 'Simplify: $(m^4)^0$', correct_answer: '$m^0 = 1$', misconception: '$m^4$.\n\nIntervention: $4 \\times 0 = 0$. Anything to the 0 power is 1.' },
      { question: 'Simplify: $(10^2)^5$', correct_answer: '$10^{10}$', misconception: '1000000.\n\nIntervention: Leave it in exponential form.' },
      { question: 'Simplify: $(x^2y^3)^4$', correct_answer: '$x^8 y^{12}$', misconception: '$x^6 y^7$.\n\nIntervention: Distribute the 4 to BOTH exponents by multiplying.' },
      { question: 'Simplify: $2(x^3)^2$', correct_answer: '$2x^6$', misconception: '$4x^6$.\n\nIntervention: The 2 is outside the parentheses, so it doesn\'t get squared.' },
      { question: 'Simplify: $(a^1)^8$', correct_answer: '$a^8$', misconception: '$a^9$.\n\nIntervention: $1 \\times 8 = 8$.' },
      { question: 'Simplify: $(4^2)^2$', correct_answer: '$4^4 = 256$', misconception: '$4^0$.\n\nIntervention: Multiply the 2 and 2.' },
      { question: 'Which is larger: $(2^3)^2$ or $2^3 \\times 2^2$?', correct_answer: '$(2^3)^2 = 2^6 = 64$. The other is $2^5 = 32$. The first is larger.', misconception: 'They are the same.\n\nIntervention: Apply the rules. Power rule = multiply. Product rule = add.' }
    ],
    criteria_for_success: 'Distinguish between the product rule and power rule, applying the correct operation to the exponents.',
    exit_ticket: 'Simplify $(x^4)^5$ and $(2y^3)^2$.',
    checks_for_understanding: [{ cfu: 'Why does $(2x)^3$ become $8x^3$ and not $2x^3$?', method: 'Whiteboards' }]
  });

  console.log(`Inserting Week 2 plans (8th Grade)...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) console.error(`Error inserting ${plan.date_start}:`, error);
  }
};

run();
