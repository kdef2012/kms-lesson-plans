const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const topicPrefixes = {
  'WIM Day 1 - Mindset': '[WIM] ',
  'WIM Day 2 - Brain Growth': '[WIM] ',
  'WIM Day 3 - Patterns': '[WIM] ',
  'WIM Day 4 - Connections': '[WIM] ',
  'Rational & Irrational Numbers (8.NS.1)': '[enVision] ',
  'Decimal Representations / Infinite Decimal Expansions (8.NS.1)': '[enVision] ',
  'Compare and Order Real Numbers (8.NS.2)': '[enVision] ',
  'Exponent Review/Properties of Integer Exponents (8.EE.1)': '[Open-Up] ',
  'Properties of Integer Exponents (8.EE.1)': '[Open-Up] ',
  'X Powers of 10, Powers of Powers of 10, Dividing Powers of 10 (8.EE.1)': '[Open-Up] ',
  'Negative Exponents / Bases other than 10 (8.EE.1)': '[Open-Up] ',
  'Rational Bases / Combining Bases (8.EE.1)': '[Open-Up] ',
  'Square Roots on the Number Line / Reasoning with Square Roots (8.NS.2)': '[Open-Up] ',
  'Cube Roots (8.EE.2)': '[Open-Up] ',
  'Evaluating Square Roots and Cube Roots (8.EE.2)': '[Open-Up] ',
  'Side Length/Edge Length (8.EE.2)': '[Open-Up] ',
  'Solve Equations w/SR & CR (8.EE.2)': '[Open-Up] ',
  'Buffer Day / Weekly Review': '[Review] ',
  'Cluster 1 Review EOG Release Questions': '[Review] ',
  'Cluster 1 Post Assessment': '[Assessment] ',
  'Cluster 1 Extension / Buffer Day': '[Review] '
};

async function run() {
  const { data: plans, error } = await supabase.from('lesson_plans').select('id, topic');
  if (error) { console.error("Error fetching plans:", error); return; }

  for (let plan of plans) {
    let newTopic = plan.topic;
    
    // Remove existing prefixes if they accidentally got prepended twice
    newTopic = newTopic.replace(/^\[.*?\]\s*/, '');
    
    if (topicPrefixes[newTopic]) {
      newTopic = topicPrefixes[newTopic] + newTopic;
      
      await supabase.from('lesson_plans').update({ topic: newTopic }).eq('id', plan.id);
      console.log('Updated: ' + newTopic);
    } else {
      console.log('No prefix mapping for: ' + newTopic);
    }
  }
}

run();
