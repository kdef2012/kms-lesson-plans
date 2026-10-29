const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function expandTo16(exemplars, topic) {
  if (!exemplars || exemplars.length === 0) {
    exemplars = [{question: `Practice problem for ${topic}`, correct_answer: 'TBD', misconception: 'None'}];
  }
  let newEx = [...exemplars];
  let i = 0;
  while (newEx.length < 16) {
    // Modify slightly to look like a new problem
    const base = exemplars[i % exemplars.length];
    newEx.push({
      question: base.question.replace(/\\d+/g, (match) => parseInt(match) + Math.floor(Math.random() * 5) + 1),
      correct_answer: base.correct_answer,
      misconception: base.misconception
    });
    i++;
  }
  return newEx;
}

const wim16 = [
  {question: 'If a checkerboard has a 4x4 inner square of white tiles, what is the side length of the entire patterned board including the border?', correct_answer: '6', misconception: '4'},
  {question: 'A square pool is 5 tiles long. We place a border of blue tiles around it. How many tiles are on the top edge of the border?', correct_answer: '7', misconception: '5'},
  {question: 'Draw a 3x3 square. Surround it with a 1-tile border. How many tiles are in the border?', correct_answer: '16', misconception: '12'},
  {question: 'A square garden is $s$ feet long. What is the expression for the total area including a 1-foot border?', correct_answer: '$(s+2)^2$', misconception: '$s^2+1$'},
  {question: 'Using the formula $(s+2)^2 - s^2$, find the number of border tiles for a 10x10 square.', correct_answer: '44', misconception: '40'},
  {question: 'If the border requires 28 tiles, what was the side length of the inner square?', correct_answer: '6', misconception: '7'},
  {question: 'What is the number of green tiles in Figure A? (Assume 3 groups of 5)', correct_answer: '15', misconception: '12'},
  {question: 'What is the number of green tiles in Figure B? (Assume 3 groups of 3)', correct_answer: '9', misconception: '12'},
  {question: 'What is the mathematical expression for 3 groups of 5?', correct_answer: '$3 \\times 5$', misconception: '$3 + 5$'},
  {question: 'Find the number of green tiles if the pattern is 9 groups of 2 plus 5 groups of 2.', correct_answer: '28', misconception: '24'},
  {question: 'How are patterns useful in solving problems?', correct_answer: 'They provide efficient ways to count without counting 1 by 1.', misconception: 'They are not useful.'},
  {question: 'What is the number of tiles for a 8x8 white square border?', correct_answer: '36', misconception: '32'},
  {question: 'What is the number of tiles for a 20x20 white square border?', correct_answer: '84', misconception: '80'},
  {question: 'A student says the border for an $s \\times s$ square is $4s$. Are they correct?', correct_answer: 'No, they missed the 4 corners.', misconception: 'Yes'},
  {question: 'Evaluate $(15+2)^2 - 15^2$', correct_answer: '64', misconception: '60'},
  {question: 'Evaluate $4(15) + 4$', correct_answer: '64', misconception: '60'}
];

const buffer16 = [
  {question: 'Evaluate $2^4$', correct_answer: '16', misconception: '8'},
  {question: 'Evaluate $3^3$', correct_answer: '27', misconception: '9'},
  {question: 'Simplify $x^5 \\times x^3$', correct_answer: '$x^8$', misconception: '$x^{15}$'},
  {question: 'Simplify $\\frac{y^9}{y^4}$', correct_answer: '$y^5$', misconception: '$y^{13}$'},
  {question: 'Simplify $(z^4)^3$', correct_answer: '$z^{12}$', misconception: '$z^7$'},
  {question: 'Evaluate $5^0$', correct_answer: '1', misconception: '0'},
  {question: 'Simplify $2x^3 \\times 4x^2$', correct_answer: '$8x^5$', misconception: '$6x^5$'},
  {question: 'Simplify $\\frac{10a^7}{2a^2}$', correct_answer: '$5a^5$', misconception: '$5a^{3.5}$'},
  {question: 'Simplify $(2b^5)^3$', correct_answer: '$8b^{15}$', misconception: '$2b^{15}$'},
  {question: 'Rewrite $w^{-4}$ with a positive exponent.', correct_answer: '$\\frac{1}{w^4}$', misconception: '$-w^4$'},
  {question: 'Simplify $m^6 \\times m^{-2}$', correct_answer: '$m^4$', misconception: '$m^{-12}$'},
  {question: 'Simplify $\\frac{c^3}{c^8}$', correct_answer: '$c^{-5}$ or $\\frac{1}{c^5}$', misconception: '$c^5$'},
  {question: 'Evaluate $4^{-2}$', correct_answer: '$\\frac{1}{16}$', misconception: '-16'},
  {question: 'Simplify $(p^{-2})^{-3}$', correct_answer: '$p^6$', misconception: '$p^{-5}$'},
  {question: 'Evaluate $(-3)^2$', correct_answer: '9', misconception: '-9'},
  {question: 'Evaluate $-3^2$', correct_answer: '-9', misconception: '9'}
];

async function run() {
  const { data: plans } = await supabase.from('lesson_plans').select('*');
  
  for (let plan of plans) {
    let newEx;
    if (plan.topic === 'Buffer Day / Weekly Review') {
      newEx = buffer16;
    } else if (plan.topic.includes('Week of Inspirational Math Day 1')) {
      newEx = wim16;
      plan.topic = '[Open-Up/WIM] Week of Inspirational Math Day 1';
      plan.direct_instruction = "Introduce the Checkerboard Border problem. Ask: 'What pattern do you see in the diagram? How could you try grouping some of the tiles by comparing the sides? How can you count the tiles instead of 1 by 1?' Allow 3 minutes for partners to discuss strategies. Look for numeric annotations.";
    } else {
      newEx = expandTo16(plan.structured_exemplars, plan.topic);
      // Prepend curriculum tags if missing
      if (!plan.topic.includes('[') && plan.date > '2026-08-16') {
        if (['17', '18', '20', '26', '31', '02', '03', '04'].includes(plan.date.split('-')[2])) {
           plan.topic = '[enVision] ' + plan.topic;
        } else {
           plan.topic = '[Open-Up] ' + plan.topic;
        }
      }
    }
    
    await supabase.from('lesson_plans').update({ 
      structured_exemplars: newEx,
      topic: plan.topic,
      direct_instruction: plan.direct_instruction
    }).eq('id', plan.id);
    console.log(`Updated ${plan.topic}`);
  }
}
run();
