const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const updateReview = {
  date_start: '2026-09-02',
  topic: '[Review] Cluster 1 Review EOG Release Questions',
  objective_3m: 'SWBAT review and master exponent rules, square/cube roots, and rational numbers for the Cluster 1 Assessment.',
  standard: '8.EE.1, 8.EE.2, 8.NS.1, 8.NS.2',
  do_now: 'Write the 3 exponent rules.',
  direct_instruction: '## Cluster 1 Review\n---\nToday we are reviewing all of the concepts from Cluster 1 to prepare for the assessment. This includes the laws of exponents, solving equations with square and cube roots, and identifying rational and irrational numbers. Remember to apply the rules carefully and double-check your work.',
  exit_ticket: 'Rate your confidence 1-5.',
  structured_exemplars: [
    { question: 'Simplify $(y^2)^4$', correct_answer: '$y^8$', misconception: 'Adding exponents instead of multiplying.' },
    { question: 'Simplify $\\frac{x^8}{x^2}$', correct_answer: '$x^6$', misconception: 'Dividing 8 by 2 instead of subtracting.' },
    { question: 'Write $x^{-4}$ with a positive exponent.', correct_answer: '$\\frac{1}{x^4}$', misconception: 'Writing $-x^4$.' },
    { question: 'Square area = 81. Side length?', correct_answer: '9', misconception: 'Dividing by 2 to get 40.5.' },
    { question: 'Simplify $x^5 \\times x^3$', correct_answer: '$x^8$', misconception: 'Multiplying 5 and 3 to get 15.' },
    { question: 'Approximate $\\sqrt{45}$', correct_answer: 'Between 6 and 7 (closer to 6.7)', misconception: 'Saying 22.5 (dividing by 2).' },
    { question: 'Is $\\pi$ rational?', correct_answer: 'No, it is irrational.', misconception: 'Thinking it is a terminating decimal like 3.14.' },
    { question: 'Convert $0.333...$ to a fraction.', correct_answer: '$\\frac{1}{3}$', misconception: 'Writing 333/1000.' },
    { question: 'Solve $x^2 = 121$', correct_answer: '$x = 11$ or $x = -11$', misconception: 'Forgetting the negative solution.' },
    { question: 'Evaluate $\\sqrt[3]{64}$', correct_answer: '4', misconception: 'Dividing by 3.' }
  ]
};

async function run() {
  const { error } = await supabase.from('lesson_plans')
    .update(updateReview)
    .eq('date_start', '2026-09-02');
  
  if (error) {
    console.error(error);
  } else {
    console.log('Restored the original Cluster 1 Review for 9/2!');
  }
}
run();
