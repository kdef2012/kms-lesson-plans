const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const exemplars = [
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
];

function expandTo16(exemplars) {
  let newEx = [...exemplars];
  let i = 0;
  while (newEx.length < 16) {
    const base = exemplars[i % exemplars.length];
    newEx.push({
      question: base.question,
      correct_answer: base.correct_answer,
      misconception: base.misconception
    });
    i++;
  }
  return newEx;
}

async function run() {
  const updateData = {
      do_now: 'List 3 fractions and 3 decimals.', 
      direct_instruction: '## Sub Plan Instructions\\nComplete quietly.\\n\\n**Rational vs Irrational:**\\n- Rational: Ends, repeats, or is a perfect square (e.g., $0.5, 0.333..., \\sqrt{25}$). Can be written as a fraction.\\n- Irrational: Never ends, never repeats, or is a non-perfect square root (e.g., $\\pi, \\sqrt{10}$).', 
      exit_ticket: 'Classify $\\sqrt{15}$.',
      structured_exemplars: expandTo16(exemplars)
  };

  await supabase.from('lesson_plans').update(updateData).eq('topic', 'Emergency Plan 1: Classifying Real Numbers (8.NS.1)');
  console.log('Restored Emergency Plan 1');
}

run();
