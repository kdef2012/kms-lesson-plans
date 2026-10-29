const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const topicUpdates = {
  '[Open-Up] Exponent Review/Properties of Integer Exponents (8.EE.1)': '[Open-Up U7 L1] Exponent Review/Properties of Integer Exponents (8.EE.1)',
  '[Open-Up] Properties of Integer Exponents (8.EE.1)': '[Open-Up U7 L2] Properties of Integer Exponents (8.EE.1)',
  '[Open-Up] X Powers of 10, Powers of Powers of 10, Dividing Powers of 10 (8.EE.1)': '[Open-Up U7 L3-L4] X Powers of 10, Powers of Powers of 10, Dividing Powers of 10 (8.EE.1)',
  '[Open-Up] Negative Exponents / Bases other than 10 (8.EE.1)': '[Open-Up U7 L5-L6] Negative Exponents / Bases other than 10 (8.EE.1)',
  '[Open-Up] Rational Bases / Combining Bases (8.EE.1)': '[Open-Up U7 L7-L8] Rational Bases / Combining Bases (8.EE.1)',
  '[Open-Up] Square Roots on the Number Line / Reasoning with Square Roots (8.NS.2)': '[Open-Up U8 L4-L5] Square Roots on the Number Line / Reasoning with Square Roots (8.NS.2)',
  '[Open-Up] Cube Roots (8.EE.2)': '[Open-Up U8 L13] Cube Roots (8.EE.2)',
  '[Open-Up] Evaluating Square Roots and Cube Roots (8.EE.2)': '[Open-Up U8 L14] Evaluating Square Roots and Cube Roots (8.EE.2)',
  '[Open-Up] Side Length/Edge Length (8.EE.2)': '[Open-Up U8 L2/L12] Side Length/Edge Length (8.EE.2)',
  '[Open-Up] Solve Equations w/SR & CR (8.EE.2)': '[Open-Up U8 L15] Solve Equations w/SR & CR (8.EE.2)'
};

async function run() {
  const { data: plans, error } = await supabase.from('lesson_plans').select('id, topic');
  if (error) { console.error("Error fetching plans:", error); return; }

  for (let plan of plans) {
    if (topicUpdates[plan.topic]) {
      const newTopic = topicUpdates[plan.topic];
      await supabase.from('lesson_plans').update({ topic: newTopic }).eq('id', plan.id);
      console.log('Updated: ' + newTopic);
    }
  }
}

run();
