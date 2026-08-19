import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old plans...');
  await supabase.from('lesson_plans').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const lessonPlans = [];

  // WEEK 1
  lessonPlans.push({
    date_start: '2026-08-10', week_label: '8/10-8/14',
    topic: 'WIM Day 1 - Mindset', objective_3m: 'Establish math norms.', standard: 'SMP 1-8',
    do_now: 'Reflection', direct_instruction: 'Norms discussion', group_practice: 'Task', independent_practice: 'Task',
    structured_exemplars: [{question: 'Why are mistakes good?', correct_answer: 'Grow your brain', misconception: 'Mistakes mean you are bad'}],
    criteria_for_success: 'Engagement', exit_ticket: 'Summary', checks_for_understanding: []
  });
  lessonPlans.push({
    date_start: '2026-08-11', week_label: '8/10-8/14',
    topic: 'WIM Day 2 - Brain Growth', objective_3m: 'Understand neuroplasticity.', standard: 'SMP 1-8',
    do_now: 'Reflection', direct_instruction: 'Brain growth', group_practice: 'Task', independent_practice: 'Task',
    structured_exemplars: [{question: 'How does the brain grow?', correct_answer: 'Forming connections', misconception: 'It is fixed'}],
    criteria_for_success: 'Engagement', exit_ticket: 'Summary', checks_for_understanding: []
  });
  lessonPlans.push({
    date_start: '2026-08-12', week_label: '8/10-8/14',
    topic: 'WIM Day 3 - Patterns', objective_3m: 'Explore visual patterns.', standard: 'SMP 1-8',
    do_now: 'Pattern observation', direct_instruction: 'Visualizing math', group_practice: 'Task', independent_practice: 'Task',
    structured_exemplars: [{question: 'Draw the 4th figure', correct_answer: '4x4 square', misconception: 'Linear growth'}],
    criteria_for_success: 'Engagement', exit_ticket: 'Summary', checks_for_understanding: []
  });
  lessonPlans.push({
    date_start: '2026-08-13', week_label: '8/10-8/14',
    topic: 'WIM Day 4 - Connections', objective_3m: 'Making connections in math.', standard: 'SMP 1-8',
    do_now: 'Reflection', direct_instruction: 'Connections', group_practice: 'Task', independent_practice: 'Task',
    structured_exemplars: [{question: 'How is geometry connected to algebra?', correct_answer: 'Graphs and shapes', misconception: 'They are separate'}],
    criteria_for_success: 'Engagement', exit_ticket: 'Summary', checks_for_understanding: []
  });
  lessonPlans.push({
    date_start: '2026-08-14', week_label: '8/10-8/14',
    topic: 'Rational & Irrational Numbers (8.NS.1)', objective_3m: 'Students will classify real numbers as rational or irrational.', standard: '8.NS.1',
    do_now: 'List 5 fractions you know.', 
    direct_instruction: 'Rational numbers can be written as a fraction. Irrational numbers cannot (e.g. $\\pi$, non-perfect square roots).', 
    group_practice: 'Sort numbers into rational vs irrational.', 
    independent_practice: 'Complete classification worksheet.',
    structured_exemplars: [
      {question: 'Is $\\sqrt{25}$ rational or irrational?', correct_answer: 'Rational (it is 5)', misconception: 'Irrational because of the root.'},
      {question: 'Is $\\pi$ rational?', correct_answer: 'Irrational', misconception: 'Rational because it is 3.14 (3.14 is an approximation!)'},
      {question: 'Is 0.333... rational?', correct_answer: 'Rational (it is 1/3)', misconception: 'Irrational because it goes forever.'},
      {question: 'Is $\\sqrt{10}$ rational?', correct_answer: 'Irrational', misconception: 'Rational because 10 is even.'},
      {question: 'Is -5 rational?', correct_answer: 'Rational (-5/1)', misconception: 'Irrational because it is negative.'},
      {question: 'Is 0 rational?', correct_answer: 'Rational (0/1)', misconception: 'Neither.'},
      {question: 'Is 1.25 rational?', correct_answer: 'Rational (5/4)', misconception: 'Irrational.'},
      {question: 'Is $\\sqrt{2}$ rational?', correct_answer: 'Irrational', misconception: 'Rational.'},
      {question: 'Is 2/3 rational?', correct_answer: 'Rational', misconception: 'Irrational.'},
      {question: 'Is $4.12345...$ (no pattern) rational?', correct_answer: 'Irrational', misconception: 'Rational.'}
    ],
    criteria_for_success: 'Students accurately classify numbers with 80% accuracy.', exit_ticket: 'Classify $\\sqrt{36}$ and $\\sqrt{20}$.', checks_for_understanding: []
  });

  // WEEK 2
  lessonPlans.push({
    date_start: '2026-08-17', week_label: '8/17-8/21',
    topic: 'Decimal Representations / Infinite Decimal Expansions (8.NS.1)', objective_3m: 'Convert repeating decimals to fractions.', standard: '8.NS.1',
    do_now: 'Divide 1 by 3 using long division.', 
    direct_instruction: 'To convert $0.777...$ to a fraction, set $x = 0.777...$, then $10x = 7.777...$. Subtract $x$ to get $9x = 7$, so $x = 7/9$.', 
    group_practice: 'Practice converting single and double digit repeating decimals.', 
    independent_practice: 'Worksheet on repeating decimals.',
    structured_exemplars: [
      {question: 'Convert $0.444...$ to a fraction.', correct_answer: '4/9', misconception: '4/10'},
      {question: 'Convert $0.888...$ to a fraction.', correct_answer: '8/9', misconception: '8/10'},
      {question: 'Convert $0.1212...$ to a fraction.', correct_answer: '12/99 or 4/33', misconception: '12/100'},
      {question: 'Convert $0.4545...$ to a fraction.', correct_answer: '45/99 or 5/11', misconception: '45/100'},
      {question: 'Convert $0.777...$ to a fraction.', correct_answer: '7/9', misconception: '7/10'},
      {question: 'Convert $0.2323...$ to a fraction.', correct_answer: '23/99', misconception: '23/100'},
      {question: 'Convert $0.111...$ to a fraction.', correct_answer: '1/9', misconception: '1/10'},
      {question: 'Convert $0.666...$ to a fraction.', correct_answer: '6/9 or 2/3', misconception: '6/10'},
      {question: 'Convert $0.0505...$ to a fraction.', correct_answer: '5/99', misconception: '5/100'},
      {question: 'Convert $0.999...$ to a fraction.', correct_answer: '9/9 or 1', misconception: 'Less than 1.'}
    ],
    criteria_for_success: 'Students accurately convert repeating decimals.', exit_ticket: 'Convert $0.555...$', checks_for_understanding: []
  });
  
  lessonPlans.push({
    date_start: '2026-08-18', week_label: '8/17-8/21',
    topic: 'Compare and Order Real Numbers (8.NS.2)', objective_3m: 'Compare rational and irrational numbers.', standard: '8.NS.2',
    do_now: 'Order from least to greatest: 1/2, 0.25, 3/4', 
    direct_instruction: 'Convert all numbers to decimals to easily compare them.', 
    group_practice: 'Ordering sets of real numbers.', 
    independent_practice: 'Ordering worksheet.',
    structured_exemplars: [
      {question: 'Compare $\\sqrt{10}$ and 3.5', correct_answer: '$\\sqrt{10}$ is approx 3.16. So $3.5 > \\sqrt{10}$', misconception: '10 is bigger than 3.5 so root 10 is bigger.'},
      {question: 'Compare $\\pi$ and 3.14', correct_answer: '$\\pi \\approx 3.1415...$, so $\\pi > 3.14$', misconception: 'They are equal.'},
      {question: 'Order: $\\sqrt{4}$, 2.5, $\\sqrt{5}$', correct_answer: '$\\sqrt{4}=2$, $\\sqrt{5} \\approx 2.2$. So: $\\sqrt{4}$, $\\sqrt{5}$, 2.5', misconception: 'Root 5 is 2.5'},
      {question: 'Compare $1/3$ and $0.3$', correct_answer: '$1/3 \\approx 0.333...$, so $1/3 > 0.3$', misconception: 'Equal'},
      {question: 'Compare $\\sqrt{20}$ and 4.5', correct_answer: '$\\sqrt{20} \\approx 4.47$, so $4.5 > \\sqrt{20}$', misconception: 'Root 20 is exactly 4.5'},
      {question: 'Order: $\\pi$, 3.1, $\\sqrt{9}$', correct_answer: '3, 3.1, $\\pi$', misconception: 'Pi is exactly 3.14'},
      {question: 'Compare $\\sqrt{2}$ and 1.5', correct_answer: '$\\sqrt{2} \\approx 1.41$, so $1.5 > \\sqrt{2}$', misconception: 'Root 2 is 1'},
      {question: 'Compare $\\sqrt{8}$ and 3', correct_answer: '$\\sqrt{9} = 3$, so $3 > \\sqrt{8}$', misconception: 'Root 8 is 4'},
      {question: 'Compare $-\\sqrt{5}$ and -2', correct_answer: '$-\\sqrt{4} = -2$. $-\\sqrt{5}$ is more negative. So $-2 > -\\sqrt{5}$', misconception: '-5 is bigger'},
      {question: 'Compare 5.1 and $\\sqrt{26}$', correct_answer: '$\\sqrt{26} \\approx 5.1$. $5.1^2 = 26.01$, so $5.1 > \\sqrt{26}$', misconception: 'Root 26 is bigger.'}
    ],
    criteria_for_success: 'Students accurately order numbers.', exit_ticket: 'Compare $\\sqrt{15}$ and 4', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-19', week_label: '8/17-8/21',
    topic: 'Exponent Review/Properties of Integer Exponents (8.EE.1)', objective_3m: 'Review exponent basics and multiplication rule.', standard: '8.EE.1',
    do_now: 'Evaluate $2^3$ and $3^2$.', 
    direct_instruction: 'When multiplying powers with the SAME base, ADD the exponents: $x^a \\times x^b = x^{a+b}$.', 
    group_practice: 'Multiplying powers.', 
    independent_practice: 'Exponent worksheet.',
    structured_exemplars: [
      {question: 'Simplify $x^3 \\times x^4$', correct_answer: '$x^7$', misconception: '$x^{12}$'},
      {question: 'Simplify $y^2 \\times y^5$', correct_answer: '$y^7$', misconception: '$y^{10}$'},
      {question: 'Simplify $2^3 \\times 2^4$', correct_answer: '$2^7$', misconception: '$4^7$'},
      {question: 'Simplify $a \\times a^4$', correct_answer: '$a^5$', misconception: '$a^4$'},
      {question: 'Simplify $3^2 \\times 3^3$', correct_answer: '$3^5$', misconception: '$9^5$'},
      {question: 'Simplify $m^4 \\times m^4$', correct_answer: '$m^8$', misconception: '$m^{16}$'},
      {question: 'Simplify $x^5 \\times x$', correct_answer: '$x^6$', misconception: '$x^5$'},
      {question: 'Simplify $4^2 \\times 4^6$', correct_answer: '$4^8$', misconception: '$16^8$'},
      {question: 'Simplify $b^3 \\times b^6$', correct_answer: '$b^9$', misconception: '$b^{18}$'},
      {question: 'Simplify $5^4 \\times 5^5$', correct_answer: '$5^9$', misconception: '$25^9$'}
    ],
    criteria_for_success: 'Students apply the product rule.', exit_ticket: 'Simplify $x^5 \\times x^8$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-20', week_label: '8/17-8/21',
    topic: 'Properties of Integer Exponents (8.EE.1)', objective_3m: 'Apply power of a power rule.', standard: '8.EE.1',
    do_now: 'Simplify $x^4 \\times x^4$', 
    direct_instruction: 'Power of a power: multiply exponents $(x^a)^b = x^{a \\times b}$.', 
    group_practice: 'Power to a power practice.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Simplify $(x^3)^2$', correct_answer: '$x^6$', misconception: '$x^5$'},
      {question: 'Simplify $(y^4)^3$', correct_answer: '$y^{12}$', misconception: '$y^7$'},
      {question: 'Simplify $(2^3)^4$', correct_answer: '$2^{12}$', misconception: '$2^7$'},
      {question: 'Simplify $(m^2)^5$', correct_answer: '$m^{10}$', misconception: '$m^7$'},
      {question: 'Simplify $(a^5)^2$', correct_answer: '$a^{10}$', misconception: '$a^7$'},
      {question: 'Simplify $(3^4)^2$', correct_answer: '$3^8$', misconception: '$9^8$'},
      {question: 'Simplify $(x^6)^3$', correct_answer: '$x^{18}$', misconception: '$x^9$'},
      {question: 'Simplify $(p^7)^2$', correct_answer: '$p^{14}$', misconception: '$p^9$'},
      {question: 'Simplify $(4^2)^5$', correct_answer: '$4^{10}$', misconception: '$16^{10}$'},
      {question: 'Simplify $(w^8)^2$', correct_answer: '$w^{16}$', misconception: '$w^{10}$'}
    ],
    criteria_for_success: 'Students apply the power rule.', exit_ticket: 'Simplify $(y^5)^4$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-21', week_label: '8/17-8/21',
    topic: 'X Powers of 10 / Dividing Powers of 10 (8.EE.1)', objective_3m: 'Apply quotient rule.', standard: '8.EE.1',
    do_now: 'Simplify $(x^4)^3$', 
    direct_instruction: 'Quotient rule: subtract exponents when dividing. $\\frac{x^a}{x^b} = x^{a-b}$.', 
    group_practice: 'Dividing powers.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Simplify $\\frac{x^5}{x^2}$', correct_answer: '$x^3$', misconception: '$x^{2.5}$'},
      {question: 'Simplify $\\frac{10^8}{10^5}$', correct_answer: '$10^3$', misconception: '$1^3$'},
      {question: 'Simplify $\\frac{y^7}{y^3}$', correct_answer: '$y^4$', misconception: '$y^{10}$'},
      {question: 'Simplify $\\frac{m^6}{m}$', correct_answer: '$m^5$', misconception: '$m^6$'},
      {question: 'Simplify $\\frac{2^9}{2^4}$', correct_answer: '$2^5$', misconception: '$1^5$'},
      {question: 'Simplify $\\frac{p^{10}}{p^2}$', correct_answer: '$p^8$', misconception: '$p^5$'},
      {question: 'Simplify $\\frac{a^8}{a^4}$', correct_answer: '$a^4$', misconception: '$a^2$'},
      {question: 'Simplify $\\frac{10^6}{10^2}$', correct_answer: '$10^4$', misconception: '$1^4$'},
      {question: 'Simplify $\\frac{w^5}{w^4}$', correct_answer: '$w^1$ or $w$', misconception: '0'},
      {question: 'Simplify $\\frac{3^7}{3^2}$', correct_answer: '$3^5$', misconception: '$1^5$'}
    ],
    criteria_for_success: 'Students apply the quotient rule.', exit_ticket: 'Simplify $\\frac{x^9}{x^4}$', checks_for_understanding: []
  });

  // WEEK 3
  lessonPlans.push({
    date_start: '2026-08-24', week_label: '8/24-8/28',
    topic: 'Negative Exponents / Bases other than 10 (8.EE.1)', objective_3m: 'Apply rules to negative exponents.', standard: '8.EE.1',
    do_now: 'Simplify $\\frac{x^3}{x^5}$ by expanding.', 
    direct_instruction: 'Negative exponents mean the reciprocal. $x^{-a} = \\frac{1}{x^a}$.', 
    group_practice: 'Convert negative exponents to positive.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Rewrite $x^{-3}$ with a positive exponent.', correct_answer: '$\\frac{1}{x^3}$', misconception: '$-x^3$'},
      {question: 'Rewrite $y^{-5}$', correct_answer: '$\\frac{1}{y^5}$', misconception: '$-y^5$'},
      {question: 'Rewrite $2^{-4}$', correct_answer: '$\\frac{1}{2^4}$ or $\\frac{1}{16}$', misconception: '-8'},
      {question: 'Rewrite $10^{-3}$', correct_answer: '$\\frac{1}{10^3}$ or $\\frac{1}{1000}$', misconception: '-30'},
      {question: 'Rewrite $m^{-1}$', correct_answer: '$\\frac{1}{m}$', misconception: '$-m$'},
      {question: 'Simplify $\\frac{x^2}{x^6}$', correct_answer: '$x^{-4} = \\frac{1}{x^4}$', misconception: '$x^4$'},
      {question: 'Rewrite $3^{-2}$', correct_answer: '$\\frac{1}{9}$', misconception: '-6'},
      {question: 'Simplify $x^4 \\times x^{-2}$', correct_answer: '$x^2$', misconception: '$x^{-8}$'},
      {question: 'Rewrite $p^{-6}$', correct_answer: '$\\frac{1}{p^6}$', misconception: '$-p^6$'},
      {question: 'Rewrite $5^{-2}$', correct_answer: '$\\frac{1}{25}$', misconception: '-10'}
    ],
    criteria_for_success: 'Students write negative exponents as fractions.', exit_ticket: 'Rewrite $y^{-4}$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-25', week_label: '8/24-8/28',
    topic: 'Rational Bases / Combining Bases (8.EE.1)', objective_3m: 'Apply exponent rules to mixed problems.', standard: '8.EE.1',
    do_now: 'Simplify $x^{-2} \\times x^5$', 
    direct_instruction: 'Combine all three rules (product, quotient, power) in multi-step expressions.', 
    group_practice: 'Multi-step problems.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Simplify $(x^2 \\times x^3)^2$', correct_answer: '$(x^5)^2 = x^{10}$', misconception: '$x^{12}$'},
      {question: 'Simplify $\\frac{y^4 \\times y^3}{y^2}$', correct_answer: '$\\frac{y^7}{y^2} = y^5$', misconception: '$y^9$'},
      {question: 'Simplify $(2x^3)^2$', correct_answer: '$4x^6$', misconception: '$2x^6$'},
      {question: 'Simplify $\\frac{a^5}{(a^2)^2}$', correct_answer: '$\\frac{a^5}{a^4} = a$', misconception: '$\\frac{a^5}{a^4} = 0$'},
      {question: 'Simplify $(3m^4)^2$', correct_answer: '$9m^8$', misconception: '$6m^8$'},
      {question: 'Simplify $\\frac{x^6 \\times x^{-2}}{x^3}$', correct_answer: '$\\frac{x^4}{x^3} = x$', misconception: '$x^{-1}$'},
      {question: 'Simplify $(p^3 \\times p^{-1})^4$', correct_answer: '$(p^2)^4 = p^8$', misconception: '$p^{-12}$'},
      {question: 'Simplify $\\frac{w^{-4}}{w^{-6}}$', correct_answer: '$w^2$', misconception: '$w^{-10}$'},
      {question: 'Simplify $(x^4 \\times x^0)^3$', correct_answer: '$x^{12}$', misconception: '$0$'},
      {question: 'Simplify $(4y^5)^2$', correct_answer: '$16y^{10}$', misconception: '$8y^{10}$'}
    ],
    criteria_for_success: 'Students solve multi-step exponent problems.', exit_ticket: 'Simplify $(x^4 \\times x^2)^3$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-26', week_label: '8/24-8/28',
    topic: 'Square Roots on the Number Line (8.NS.2)', objective_3m: 'Approximate square roots to the nearest tenth.', standard: '8.NS.2',
    do_now: 'List the first 10 perfect squares.', 
    direct_instruction: 'To approximate $\\sqrt{20}$, find the perfect squares it sits between (16 and 25). Since 20 is about in the middle, it is roughly 4.4 or 4.5.', 
    group_practice: 'Number line approximations.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Approximate $\\sqrt{10}$ to nearest tenth.', correct_answer: 'Between $\\sqrt{9}$ and $\\sqrt{16}$. Closer to 3. Approx 3.1 or 3.2', misconception: '5'},
      {question: 'Approximate $\\sqrt{40}$', correct_answer: 'Between $\\sqrt{36}$ and $\\sqrt{49}$. Approx 6.3', misconception: '20'},
      {question: 'Approximate $\\sqrt{80}$', correct_answer: 'Between $\\sqrt{64}$ and $\\sqrt{81}$. Approx 8.9', misconception: '40'},
      {question: 'Approximate $\\sqrt{15}$', correct_answer: 'Between $\\sqrt{9}$ and $\\sqrt{16}$. Approx 3.8 or 3.9', misconception: '7.5'},
      {question: 'Approximate $\\sqrt{30}$', correct_answer: 'Between $\\sqrt{25}$ and $\\sqrt{36}$. Approx 5.4 or 5.5', misconception: '15'},
      {question: 'Approximate $\\sqrt{50}$', correct_answer: 'Between $\\sqrt{49}$ and $\\sqrt{64}$. Approx 7.1', misconception: '25'},
      {question: 'Approximate $\\sqrt{110}$', correct_answer: 'Between $\\sqrt{100}$ and $\\sqrt{121}$. Approx 10.4 or 10.5', misconception: '55'},
      {question: 'Approximate $\\sqrt{5}$', correct_answer: 'Between $\\sqrt{4}$ and $\\sqrt{9}$. Approx 2.2', misconception: '2.5'},
      {question: 'Approximate $\\sqrt{60}$', correct_answer: 'Between $\\sqrt{49}$ and $\\sqrt{64}$. Approx 7.7', misconception: '30'},
      {question: 'Approximate $\\sqrt{90}$', correct_answer: 'Between $\\sqrt{81}$ and $\\sqrt{100}$. Approx 9.4 or 9.5', misconception: '45'}
    ],
    criteria_for_success: 'Students accurately approximate roots.', exit_ticket: 'Approximate $\\sqrt{24}$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-27', week_label: '8/24-8/28',
    topic: 'Cube Roots (8.EE.2)', objective_3m: 'Evaluate cube roots of perfect cubes.', standard: '8.EE.2',
    do_now: 'Evaluate $2^3, 3^3, 4^3$', 
    direct_instruction: 'Cube root is the opposite of cubing. $\\sqrt[3]{8} = 2$.', 
    group_practice: 'Evaluate perfect cubes.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Evaluate $\\sqrt[3]{8}$', correct_answer: '2', misconception: '4'},
      {question: 'Evaluate $\\sqrt[3]{27}$', correct_answer: '3', misconception: '9'},
      {question: 'Evaluate $\\sqrt[3]{64}$', correct_answer: '4', misconception: '8'},
      {question: 'Evaluate $\\sqrt[3]{125}$', correct_answer: '5', misconception: '25'},
      {question: 'Evaluate $\\sqrt[3]{1}$', correct_answer: '1', misconception: '0'},
      {question: 'Evaluate $\\sqrt[3]{1000}$', correct_answer: '10', misconception: '100'},
      {question: 'Evaluate $\\sqrt[3]{-8}$', correct_answer: '-2', misconception: 'Undefined'},
      {question: 'Evaluate $\\sqrt[3]{-27}$', correct_answer: '-3', misconception: 'Undefined'},
      {question: 'Evaluate $\\sqrt[3]{216}$', correct_answer: '6', misconception: '108'},
      {question: 'Evaluate $\\sqrt[3]{343}$', correct_answer: '7', misconception: '49'}
    ],
    criteria_for_success: 'Students evaluate cube roots.', exit_ticket: 'Evaluate $\\sqrt[3]{64}$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-28', week_label: '8/24-8/28',
    topic: 'Evaluating Square Roots and Cube Roots (8.EE.2)', objective_3m: 'Evaluate basic expressions with roots.', standard: '8.EE.2',
    do_now: 'Evaluate $\\sqrt{25}$ and $\\sqrt[3]{125}$', 
    direct_instruction: 'Combine roots with order of operations. Solve the root first like parentheses.', 
    group_practice: 'Expressions practice.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Evaluate $5 + \\sqrt{16}$', correct_answer: '$5 + 4 = 9$', misconception: '$\\sqrt{21}$'},
      {question: 'Evaluate $2 \\times \\sqrt{9}$', correct_answer: '$2 \\times 3 = 6$', misconception: '$\\sqrt{18}$'},
      {question: 'Evaluate $\\sqrt[3]{8} + \\sqrt{36}$', correct_answer: '$2 + 6 = 8$', misconception: '$8 + 36$'},
      {question: 'Evaluate $10 - \\sqrt{25}$', correct_answer: '$10 - 5 = 5$', misconception: '$\\sqrt{15}$'},
      {question: 'Evaluate $3 \\times \\sqrt[3]{27}$', correct_answer: '$3 \\times 3 = 9$', misconception: '$\\sqrt[3]{81}$'},
      {question: 'Evaluate $\\sqrt{64} \\div 2$', correct_answer: '$8 \\div 2 = 4$', misconception: '$\\sqrt{32}$'},
      {question: 'Evaluate $\\sqrt[3]{64} + 5$', correct_answer: '$4 + 5 = 9$', misconception: '69'},
      {question: 'Evaluate $4 \\times \\sqrt{49}$', correct_answer: '$4 \\times 7 = 28$', misconception: '$\\sqrt{196}$'},
      {question: 'Evaluate $\\sqrt{100} - \\sqrt[3]{1000}$', correct_answer: '$10 - 10 = 0$', misconception: '100 - 1000'},
      {question: 'Evaluate $\\frac{\\sqrt{36}}{3}$', correct_answer: '$\\frac{6}{3} = 2$', misconception: '$\\sqrt{12}$'}
    ],
    criteria_for_success: 'Students evaluate expressions with roots.', exit_ticket: 'Evaluate $4 + \\sqrt{81}$', checks_for_understanding: []
  });

  // WEEK 4
  lessonPlans.push({
    date_start: '2026-08-31', week_label: '8/31-9/4',
    topic: 'Side Length/Edge Length (8.EE.2)', objective_3m: 'Relate area and volume to roots.', standard: '8.EE.2',
    do_now: 'Area of square is 25. What is the side length?', 
    direct_instruction: 'The side length of a square is the square root of its area. The edge of a cube is the cube root of its volume.', 
    group_practice: 'Word problems on area and volume.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Square area = 36. Find side length.', correct_answer: '$\\sqrt{36} = 6$', misconception: '18'},
      {question: 'Square area = 81. Find side length.', correct_answer: '$\\sqrt{81} = 9$', misconception: '40.5'},
      {question: 'Cube volume = 27. Find edge length.', correct_answer: '$\\sqrt[3]{27} = 3$', misconception: '9'},
      {question: 'Cube volume = 64. Find edge length.', correct_answer: '$\\sqrt[3]{64} = 4$', misconception: '8'},
      {question: 'Square area = 100. Perimeter?', correct_answer: 'Side = 10. Perimeter = 40.', misconception: '25'},
      {question: 'Cube volume = 125. Find edge.', correct_answer: '$\\sqrt[3]{125} = 5$', misconception: '25'},
      {question: 'Square area = 49. Find side length.', correct_answer: '$\\sqrt{49} = 7$', misconception: '24.5'},
      {question: 'Cube volume = 1000. Find edge.', correct_answer: '$\\sqrt[3]{1000} = 10$', misconception: '100'},
      {question: 'Square area = 144. Find side length.', correct_answer: '$\\sqrt{144} = 12$', misconception: '72'},
      {question: 'Cube volume = 8. Find edge.', correct_answer: '$\\sqrt[3]{8} = 2$', misconception: '4'}
    ],
    criteria_for_success: 'Students use roots to find side lengths.', exit_ticket: 'Square area is 64. What is the side length?', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-09-01', week_label: '8/31-9/4',
    topic: 'Solve Equations w/SR & CR (8.EE.2)', objective_3m: 'Solve basic equations involving squares and cubes.', standard: '8.EE.2',
    do_now: 'Evaluate $x^2$ if $x=5$.', 
    direct_instruction: 'To solve $x^2 = 25$, take the square root of both sides. Remember $x$ can be 5 or -5. For $x^3 = 8$, take cube root. Only one answer: 2.', 
    group_practice: 'Solving simple exponential equations.', 
    independent_practice: 'Worksheet.',
    structured_exemplars: [
      {question: 'Solve $x^2 = 36$', correct_answer: '$x = 6$ or $x = -6$', misconception: 'Only 6'},
      {question: 'Solve $x^3 = 27$', correct_answer: '$x = 3$', misconception: '$x = 3$ or $-3$'},
      {question: 'Solve $y^2 = 81$', correct_answer: '$y = 9$ or $y = -9$', misconception: 'Only 9'},
      {question: 'Solve $m^3 = 64$', correct_answer: '$m = 4$', misconception: '8'},
      {question: 'Solve $a^2 = 100$', correct_answer: '$a = 10$ or $-10$', misconception: 'Only 10'},
      {question: 'Solve $p^3 = 125$', correct_answer: '$p = 5$', misconception: '25'},
      {question: 'Solve $x^2 = 49$', correct_answer: '$x = 7$ or $-7$', misconception: 'Only 7'},
      {question: 'Solve $w^3 = 1000$', correct_answer: '$w = 10$', misconception: '100'},
      {question: 'Solve $k^2 = 144$', correct_answer: '$k = 12$ or $-12$', misconception: 'Only 12'},
      {question: 'Solve $x^3 = -8$', correct_answer: '$x = -2$', misconception: 'No solution'}
    ],
    criteria_for_success: 'Students solve quadratic and cubic equations.', exit_ticket: 'Solve $x^2 = 64$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-09-02', week_label: '8/31-9/4',
    topic: 'Cluster 1 Review EOG Release Questions', objective_3m: 'Review all cluster 1 standards.', standard: '8.NS.1, 8.NS.2, 8.EE.1, 8.EE.2',
    do_now: 'Write the 3 exponent rules.', 
    direct_instruction: 'Station rotation rules and expectations.', 
    group_practice: 'EOG Release Questions / iReady / Gizmos', 
    independent_practice: 'Station tasks.',
    structured_exemplars: [
      {question: 'Simplify $x^5 \\times x^3$', correct_answer: '$x^8$', misconception: '$x^{15}$'},
      {question: 'Approximate $\\sqrt{45}$', correct_answer: 'Approx 6.7', misconception: '22.5'},
      {question: 'Is $\\pi$ rational?', correct_answer: 'No, irrational.', misconception: 'Yes'},
      {question: 'Convert $0.333...$ to a fraction.', correct_answer: '1/3', misconception: '3/10'},
      {question: 'Solve $x^2 = 121$', correct_answer: '11 or -11', misconception: 'Only 11'},
      {question: 'Evaluate $\\sqrt[3]{64}$', correct_answer: '4', misconception: '8'},
      {question: 'Simplify $(y^2)^4$', correct_answer: '$y^8$', misconception: '$y^6$'},
      {question: 'Simplify $\\frac{x^8}{x^2}$', correct_answer: '$x^6$', misconception: '$x^4$'},
      {question: 'Write $x^{-4}$ with a positive exponent.', correct_answer: '$\\frac{1}{x^4}$', misconception: '$-x^4$'},
      {question: 'Square area = 81. Side length?', correct_answer: '9', misconception: '40.5'}
    ],
    criteria_for_success: 'Students complete stations and review for test.', exit_ticket: 'Rate your confidence 1-5.', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-09-03', week_label: '8/31-9/4',
    topic: 'Cluster 1 Post Assessment', objective_3m: 'Demonstrate mastery of Cluster 1.', standard: '8.NS.1, 8.NS.2, 8.EE.1, 8.EE.2',
    do_now: 'Clear your desk. Pencils only.', 
    direct_instruction: 'Test taking strategies and expectations.', 
    group_practice: 'None', 
    independent_practice: 'Cluster 1 Assessment.',
    structured_exemplars: [
      {question: 'Test Question 1', correct_answer: 'A', misconception: 'B'},
      {question: 'Test Question 2', correct_answer: 'B', misconception: 'C'},
      {question: 'Test Question 3', correct_answer: 'C', misconception: 'D'},
      {question: 'Test Question 4', correct_answer: 'D', misconception: 'A'},
      {question: 'Test Question 5', correct_answer: 'A', misconception: 'B'},
      {question: 'Test Question 6', correct_answer: 'B', misconception: 'C'},
      {question: 'Test Question 7', correct_answer: 'C', misconception: 'D'},
      {question: 'Test Question 8', correct_answer: 'D', misconception: 'A'},
      {question: 'Test Question 9', correct_answer: 'A', misconception: 'B'},
      {question: 'Test Question 10', correct_answer: 'B', misconception: 'C'}
    ],
    criteria_for_success: 'Students score 80% or higher.', exit_ticket: 'Turn in test.', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-09-04', week_label: '8/31-9/4',
    topic: 'Cluster 1 Extension / Buffer Day', objective_3m: 'Review missed concepts from assessment.', standard: '8.NS.1, 8.NS.2, 8.EE.1, 8.EE.2',
    do_now: 'Reflection on test performance.', 
    direct_instruction: 'Review most missed questions from the assessment.', 
    group_practice: 'Test corrections.', 
    independent_practice: 'Complete missing work.',
    structured_exemplars: [
      {question: 'Review Q1', correct_answer: 'A', misconception: 'B'},
      {question: 'Review Q2', correct_answer: 'B', misconception: 'C'},
      {question: 'Review Q3', correct_answer: 'C', misconception: 'D'},
      {question: 'Review Q4', correct_answer: 'D', misconception: 'A'},
      {question: 'Review Q5', correct_answer: 'A', misconception: 'B'},
      {question: 'Review Q6', correct_answer: 'B', misconception: 'C'},
      {question: 'Review Q7', correct_answer: 'C', misconception: 'D'},
      {question: 'Review Q8', correct_answer: 'D', misconception: 'A'},
      {question: 'Review Q9', correct_answer: 'A', misconception: 'B'},
      {question: 'Review Q10', correct_answer: 'B', misconception: 'C'}
    ],
    criteria_for_success: 'Students correct misconceptions.', exit_ticket: 'One thing you learned.', checks_for_understanding: []
  });

  // EMERGENCY PLANS (Math already done: 8.NS.1 and 8.NS.2)
  lessonPlans.push({
    date_start: '2026-08-20', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 1: Classifying Real Numbers (8.NS.1)', objective_3m: 'Review classifying numbers as rational or irrational.', standard: '8.NS.1',
    do_now: 'List 3 fractions and 3 decimals.', 
    direct_instruction: '## Sub Plan Instructions\nComplete quietly.\n\n**Rational vs Irrational:**\n- Rational: Ends, repeats, or is a perfect square (e.g., $0.5, 0.333..., \\sqrt{25}$). Can be written as a fraction.\n- Irrational: Never ends, never repeats, or is a non-perfect square root (e.g., $\\pi, \\sqrt{10}$).', 
    group_practice: 'Independent work.', 
    independent_practice: 'Classify numbers.',
    structured_exemplars: [
      {question: 'Classify $\\sqrt{49}$', correct_answer: 'Rational (it equals 7)', misconception: 'Irrational because it has a root.'},
      {question: 'Classify $3.14$', correct_answer: 'Rational (it ends)', misconception: 'Irrational because it looks like Pi.'},
      {question: 'Classify $\\pi$', correct_answer: 'Irrational (never ends or repeats)', misconception: 'Rational'},
      {question: 'Classify $0.444...$', correct_answer: 'Rational (it repeats)', misconception: 'Irrational because it never ends.'},
      {question: 'Classify $\\sqrt{8}$', correct_answer: 'Irrational (not a perfect square)', misconception: 'Rational'},
      {question: 'Classify $-10$', correct_answer: 'Rational (-10/1)', misconception: 'Irrational'},
      {question: 'Classify $1/4$', correct_answer: 'Rational', misconception: 'Irrational'},
      {question: 'Classify $\\sqrt{100}$', correct_answer: 'Rational (equals 10)', misconception: 'Irrational'},
      {question: 'Classify $0.123456...$ (no pattern)', correct_answer: 'Irrational', misconception: 'Rational'},
      {question: 'Classify $5.5$', correct_answer: 'Rational', misconception: 'Irrational'}
    ],
    criteria_for_success: 'Students accurately classify numbers.', exit_ticket: 'Classify $\\sqrt{15}$.', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-21', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 2: Repeating Decimals to Fractions (8.NS.1)', objective_3m: 'Review converting repeating decimals to fractions.', standard: '8.NS.1',
    do_now: 'Convert 0.5 to a fraction.', 
    direct_instruction: '## Sub Plan Instructions\nComplete quietly.\n\n**Repeating Decimals:**\nA repeating decimal can be written as a fraction by putting the repeating part over 9s. \nExample: $0.444... = 4/9$. \nExample: $0.3535... = 35/99$. Always simplify if possible!', 
    group_practice: 'Independent work.', 
    independent_practice: 'Convert decimals.',
    structured_exemplars: [
      {question: 'Convert $0.777...$ to a fraction.', correct_answer: '7/9', misconception: '7/10'},
      {question: 'Convert $0.222...$ to a fraction.', correct_answer: '2/9', misconception: '2/10'},
      {question: 'Convert $0.1515...$ to a fraction.', correct_answer: '15/99', misconception: '15/100'},
      {question: 'Convert $0.8181...$ to a fraction.', correct_answer: '81/99 or 9/11', misconception: '81/100'},
      {question: 'Convert $0.111...$ to a fraction.', correct_answer: '1/9', misconception: '1/10'},
      {question: 'Convert $0.666...$ to a fraction.', correct_answer: '6/9 or 2/3', misconception: '6/10'},
      {question: 'Convert $0.0808...$ to a fraction.', correct_answer: '8/99', misconception: '8/100'},
      {question: 'Convert $0.444...$ to a fraction.', correct_answer: '4/9', misconception: '4/10'},
      {question: 'Convert $0.333...$ to a fraction.', correct_answer: '3/9 or 1/3', misconception: '3/10'},
      {question: 'Convert $0.888...$ to a fraction.', correct_answer: '8/9', misconception: '8/10'}
    ],
    criteria_for_success: 'Students accurately convert repeating decimals.', exit_ticket: 'Convert $0.555...$', checks_for_understanding: []
  });

  lessonPlans.push({
    date_start: '2026-08-22', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 3: Estimating Irrational Numbers (8.NS.2)', objective_3m: 'Review approximating square roots.', standard: '8.NS.2',
    do_now: 'List perfect squares from 1 to 100.', 
    direct_instruction: '## Sub Plan Instructions\nComplete quietly.\n\n**Estimating Roots:**\nFind the two perfect squares the number falls between. \nExample: $\\sqrt{20}$ is between $\\sqrt{16}$ (4) and $\\sqrt{25}$ (5). It is approx 4.4 or 4.5.', 
    group_practice: 'Independent work.', 
    independent_practice: 'Estimate roots.',
    structured_exemplars: [
      {question: 'Estimate $\\sqrt{10}$ to the nearest tenth.', correct_answer: 'Between 3 and 4. Approx 3.1 or 3.2', misconception: '5'},
      {question: 'Estimate $\\sqrt{40}$', correct_answer: 'Between 6 and 7. Approx 6.3', misconception: '20'},
      {question: 'Estimate $\\sqrt{80}$', correct_answer: 'Between 8 and 9. Approx 8.9', misconception: '40'},
      {question: 'Estimate $\\sqrt{15}$', correct_answer: 'Between 3 and 4. Approx 3.8 or 3.9', misconception: '7.5'},
      {question: 'Estimate $\\sqrt{30}$', correct_answer: 'Between 5 and 6. Approx 5.4 or 5.5', misconception: '15'},
      {question: 'Estimate $\\sqrt{50}$', correct_answer: 'Between 7 and 8. Approx 7.1', misconception: '25'},
      {question: 'Estimate $\\sqrt{110}$', correct_answer: 'Between 10 and 11. Approx 10.4 or 10.5', misconception: '55'},
      {question: 'Estimate $\\sqrt{5}$', correct_answer: 'Between 2 and 3. Approx 2.2', misconception: '2.5'},
      {question: 'Estimate $\\sqrt{60}$', correct_answer: 'Between 7 and 8. Approx 7.7', misconception: '30'},
      {question: 'Estimate $\\sqrt{90}$', correct_answer: 'Between 9 and 10. Approx 9.4 or 9.5', misconception: '45'}
    ],
    criteria_for_success: 'Students accurately approximate roots.', exit_ticket: 'Estimate $\\sqrt{24}$', checks_for_understanding: []
  });

  const { data, error } = await supabase.from('lesson_plans').insert(lessonPlans);
  
  if (error) {
    console.error('Error inserting plans:', error);
  } else {
    console.log('Successfully inserted shifted plans and new emergency plans!');
  }
};

run();
