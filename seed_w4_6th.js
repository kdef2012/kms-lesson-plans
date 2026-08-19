import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans (Week 4 6th Grade)...');
  await supabase.from('lesson_plans').delete().in('date_start', ['2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04']);

  const lessonPlans = [];

  // Day 16 (8/31)
  lessonPlans.push({
    date_start: '2026-08-31', week_label: '8/31-9/4',
    topic: 'Greatest Common Factor (Open-Up U7 L21)',
    objective_3m: 'Students will find the Greatest Common Factor (GCF) of two whole numbers less than or equal to 100 to solve real-world grouping problems.',
    standard: '6.NS.4',
    do_now: '**Vocabulary Primer:**\n- **Factor:** A number that divides perfectly into another number (no remainder).\n- **Greatest:** The biggest one.\n\n**Do Now:** List all the numbers that divide perfectly into 12.',
    direct_instruction: '## The Factor Rainbow\nTo find all the factors of a number, we make a rainbow! Start with 1 and the number itself. Then check 2, then 3, and so on until the rainbow connects in the middle.\n\n---\n\n## Finding the GCF\nWhen we compare the factor rainbows of TWO numbers, they might share several factors. The biggest number in both lists is the **Greatest Common Factor (GCF)**.\n\n* **Turn and Talk (2 min):** Why is the GCF of 12 and 18 the number 6, and not 2 or 3?',
    group_practice: 'Goodie Bag Factory: Students must figure out the maximum number of identical goodie bags they can make given two different amounts of candy (finding the GCF).',
    independent_practice: '',
    structured_exemplars: [
      { question: 'List all factors of 20.', correct_answer: '1, 2, 4, 5, 10, 20.', misconception: 'Missing 4 and 5.\n\nIntervention: Check your times tables. $4 \\times 5 = 20$.' },
      { question: 'Find the GCF of 12 and 16.', correct_answer: '4. (Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 16: 1, 2, 4, 8, 16).', misconception: 'Saying 2.\n\nIntervention: "2 is a common factor, but is it the GREATEST?"' },
      { question: 'Find the GCF of 24 and 36.', correct_answer: '12.', misconception: '6.\n\nIntervention: Continue listing factors past 6.' },
      { question: 'Find the GCF of 15 and 25.', correct_answer: '5.', misconception: '15.\n\nIntervention: 15 does not divide evenly into 25.' },
      { question: 'Find the GCF of 7 and 13.', correct_answer: '1.', misconception: 'Saying they don\'t have one.\n\nIntervention: "1 is a factor of EVERY number!"' },
      { question: 'You have 18 red balloons and 27 blue balloons. You want to make identical bunches with no leftovers. What is the greatest number of bunches you can make?', correct_answer: '9 bunches. (The GCF of 18 and 27 is 9).', misconception: 'Adding 18 + 27.\n\nIntervention: "We are separating them into groups, not combining them."' },
      { question: 'Find the GCF of 30 and 45.', correct_answer: '15.', misconception: '5.\n\nIntervention: "Check 15. $15 \\times 2 = 30$. $15 \\times 3 = 45$. Yes, 15 works!"' },
      { question: 'Find the GCF of 40 and 60.', correct_answer: '20.', misconception: '10.\n\nIntervention: "Is there a bigger number ending in zero that goes into both?"' },
      { question: 'If the GCF of two numbers is 8, what are the two numbers? (Give one possible pair)', correct_answer: '8 and 16. Or 16 and 24. Or 8 and 24.', misconception: 'Saying 4 and 2.\n\nIntervention: "The numbers must be multiples of 8."' },
      { question: 'Find the GCF of 14 and 28.', correct_answer: '14. (14 goes into itself, and $14 \\times 2 = 28$).', misconception: '7.\n\nIntervention: Always check if the smaller number divides perfectly into the bigger number!' }
    ],
    criteria_for_success: 'List factors accurately and identify the greatest common factor between two numbers.',
    exit_ticket: 'Find the GCF of 24 and 32.',
    checks_for_understanding: [{ cfu: 'What does the word "Common" mean when we say Greatest Common Factor?', method: 'Turn & Talk' }]
  });

  // Day 17 (9/1)
  lessonPlans.push({
    date_start: '2026-09-01', week_label: '8/31-9/4',
    topic: 'Least Common Multiple (Open-Up U7 L22)',
    objective_3m: 'Students will find the Least Common Multiple (LCM) of two whole numbers less than or equal to 12.',
    standard: '6.NS.4',
    do_now: '**Vocabulary Primer:**\n- **Multiple:** A number you get when you multiply a starting number by 1, 2, 3, etc. (Skip counting!).\n- **Least:** The smallest one.\n\n**Do Now:** Write the first 5 multiples of 4 (start by counting by 4s).',
    direct_instruction: '## The Skip Counting Method\nFactors are small. Multiples are BIG! To find the multiples of 5, just skip count: 5, 10, 15, 20...\n\n---\n\n## Finding the LCM\nIf two frogs are jumping on a number line, one jumps by 3s and one jumps by 4s. Where is the FIRST lilypad they will both land on? That is the **Least Common Multiple (LCM)**.\n\n* **Turn and Talk (2 min):** Will a multiple ever be smaller than the number itself?',
    group_practice: 'The Hot Dog Problem: Hot dogs come in packs of 10. Buns come in packs of 8. What is the smallest number of packs of each you can buy to have exactly one hot dog for every bun?',
    independent_practice: '',
    structured_exemplars: [
      { question: 'List the first five multiples of 6.', correct_answer: '6, 12, 18, 24, 30.', misconception: 'Listing factors (1, 2, 3, 6).\n\nIntervention: "Multiples mean multiply! Count UP by 6s."' },
      { question: 'Find the LCM of 3 and 4.', correct_answer: '12.', misconception: '1.\n\nIntervention: "1 is a factor, not a multiple. Can you skip count by 3 and hit 1? No."' },
      { question: 'Find the LCM of 6 and 8.', correct_answer: '24.', misconception: '48.\n\nIntervention: "48 is a common multiple, but is it the LEAST? Skip count 6 and 8 again carefully."' },
      { question: 'Find the LCM of 5 and 10.', correct_answer: '10.', misconception: '50.\n\nIntervention: "Count by 5s. 5, 10... Wait! We already hit 10! The LCM is 10."' },
      { question: 'Hot dogs come in packs of 10. Buns come in packs of 8. What is the LCM?', correct_answer: '40.', misconception: '80.\n\nIntervention: "List the multiples of 10. List the multiples of 8. Find the first match."' },
      { question: 'Find the LCM of 2 and 7.', correct_answer: '14.', misconception: 'Saying they don\'t have one.\n\nIntervention: "Multiply them together if you are stuck!"' },
      { question: 'Find the LCM of 4 and 6.', correct_answer: '12.', misconception: '24.\n\nIntervention: "Is there a smaller number they both hit? Check 12."' },
      { question: 'A bus comes every 12 minutes. A train comes every 9 minutes. If they both arrive at 12:00, how many minutes until they arrive at the same time again?', correct_answer: '36 minutes. (LCM of 12 and 9).', misconception: '21 minutes.\n\nIntervention: "They don\'t arrive together in 21 minutes. The train comes at 18 and 27."' },
      { question: 'Find the LCM of 9 and 12.', correct_answer: '36.', misconception: '108.\n\nIntervention: "Skip count by the BIGGER number first (12, 24, 36). Then check if the smaller number goes into them."' },
      { question: 'Find the LCM of 5 and 7.', correct_answer: '35.', misconception: '12.\n\nIntervention: You added them instead of finding multiples.' }
    ],
    criteria_for_success: 'Skip count to find multiples and identify the lowest common match between two sequences.',
    exit_ticket: 'Find the LCM of 8 and 12.',
    checks_for_understanding: [{ cfu: 'Why do hot dogs and buns come in different pack sizes? (Just kidding, but mathematically, how do we fix it?)', method: 'Turn & Talk' }]
  });

  // Day 18 (9/2)
  lessonPlans.push({
    date_start: '2026-09-02', week_label: '8/31-9/4',
    topic: 'Multiples & Factors Word Problems (Open-Up U7 L23)',
    objective_3m: 'Students will distinguish between GCF and LCM in real-world contexts and apply the correct method.',
    standard: '6.NS.4',
    do_now: '**Vocabulary Primer:**\n- **Distinguish:** To tell the difference between two things.\n\n**Do Now:** Find the GCF of 12 and 18. Find the LCM of 12 and 18.',
    direct_instruction: '## The Ultimate Showdown: GCF vs LCM\nHow do you know which one to use in a word problem?\n- If the problem is about SPLITTING things into equal groups or cutting things down, use **GCF**.\n- If the problem is about repeating events, cycles, or finding when things will happen AT THE SAME TIME, use **LCM**.\n\n---\n\n## Let\'s Practice Identifying\n"Sarah wants to cut two ribbons into identical pieces..." is this GCF or LCM?\n\n* **Turn and Talk (2 min):** What keywords give away that a problem is an LCM problem?',
    group_practice: 'The Sorting Hat: Students read 10 word problems, sort them into a GCF pile and an LCM pile, and then solve them.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Identify and Solve: Pencils come in packs of 12. Erasers come in packs of 15. What is the least amount you can buy to have an equal amount of both?', correct_answer: 'LCM. Answer is 60.', misconception: 'GCF (3).\n\nIntervention: Are you splitting the pencils up, or buying MORE packs? Buying more means multiples!' },
      { question: 'Identify and Solve: You have 24 cookies and 36 brownies. You want to make identical gift bags with no leftovers. What is the most bags you can make?', correct_answer: 'GCF. Answer is 12.', misconception: 'LCM (72).\n\nIntervention: "Are you baking more cookies, or splitting up the ones you have?"' },
      { question: 'Identify and Solve: A bell rings every 4 hours. A whistle blows every 6 hours. When will they happen together?', correct_answer: 'LCM. Answer is 12 hours.', misconception: 'GCF (2).\n\nIntervention: "This is a repeating cycle. Cycles mean multiples."' },
      { question: 'Identify and Solve: A florist has 40 red roses and 50 white roses. What is the greatest number of identical bouquets she can make?', correct_answer: 'GCF. Answer is 10.', misconception: 'LCM (200).\n\nIntervention: "Splitting into bouquets = dividing = factors."' },
      { question: 'Identify and Solve: Jack mows his lawn every 8 days and washes his car every 14 days. When will he do both on the same day?', correct_answer: 'LCM. Answer is 56 days.', misconception: 'GCF (2).\n\nIntervention: "Cycles = Multiples!"' },
      { question: 'Find the GCF of 16 and 40.', correct_answer: '8.', misconception: '4.\n\nIntervention: 4 works, but is it the GREATEST?' },
      { question: 'Find the LCM of 10 and 15.', correct_answer: '30.', misconception: '60.\n\nIntervention: 60 works, but is it the LEAST?' },
      { question: 'Identify: You want to cut two pieces of wood into the longest possible equal lengths. GCF or LCM?', correct_answer: 'GCF. (Cutting = Dividing = Factors).', misconception: 'LCM.\n\nIntervention: "When you cut wood, it gets smaller. Factors are smaller than the number."' },
      { question: 'Identify: Two flashing neon signs. One flashes every 9 seconds, one every 15 seconds. GCF or LCM?', correct_answer: 'LCM. (Repeating event).', misconception: 'GCF.\n\nIntervention: "Cycles = Multiples."' },
      { question: 'True or False: The LCM of two numbers can be smaller than the numbers themselves.', correct_answer: 'False. Multiples are always equal to or larger than the number.', misconception: 'True.\n\nIntervention: Give an example. Multiples of 5 are 5, 10, 15...' }
    ],
    criteria_for_success: 'Analyze word problems to determine whether GCF or LCM is required, and solve correctly.',
    exit_ticket: 'Read the word problem, state if it requires GCF or LCM, and solve: "Maya runs the track every 6 minutes. Leo runs it every 8 minutes. When will they cross the start line together?"',
    checks_for_understanding: [{ cfu: 'If a problem says "split into equal pieces", do we use GCF or LCM?', method: 'Choral Response' }]
  });

  // Day 19 (9/3)
  lessonPlans.push({
    date_start: '2026-09-03', week_label: '8/31-9/4',
    topic: 'Dividing Fractions (Envision T3-2)',
    objective_3m: 'Students will divide fractions by fractions using the standard algorithm (Keep-Change-Flip).',
    standard: '6.NS.1',
    do_now: '**Vocabulary Primer:**\n- **Reciprocal:** The flipped version of a fraction (e.g., 2/3 becomes 3/2).\n\n**Do Now:** Multiply 1/2 x 3/4. Multiply 5/6 x 2/3.',
    direct_instruction: '## The "Keep-Change-Flip" Rule\nDividing by a fraction is the EXACT SAME THING as multiplying by its reciprocal. \n1. **KEEP** the first fraction exactly the same.\n2. **CHANGE** the division sign to multiplication.\n3. **FLIP** the second fraction upside down.\n\n---\n\n## Why does it work?\nIf I have 4 pizzas, and I divide them into 1/2 slices, how many slices do I have? I have 8 slices! \n$4 \\div 1/2 = 8$.\nNotice that $4 \\times 2$ also equals 8! Division by a half is the same as multiplying by 2.\n\n* **Turn and Talk (2 min):** What is the reciprocal of 5?',
    group_practice: 'Fraction Division Dominoes: Students match a division problem card to a multiplication card, and then to the final answer card.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Divide: $3/4 \\div 1/2$', correct_answer: '$3/4 \\times 2/1 = 6/4 = 1.5$ (or $1\\frac{1}{2}$).', misconception: 'Flipping the FIRST fraction (4/3 * 1/2 = 4/6).\n\nIntervention: "Keep the first one! Only flip the second one."' },
      { question: 'Divide: $5/8 \\div 1/4$', correct_answer: '$5/8 \\times 4/1 = 20/8 = 5/2 = 2.5$.', misconception: 'Multiplying straight across without flipping (5/32).\n\nIntervention: "You cannot divide fractions straight across easily. You MUST use K-C-F."' },
      { question: 'What is the reciprocal of $2/7$?', correct_answer: '$7/2$.', misconception: '$-2/7$.\n\nIntervention: "Reciprocal means flip upside down, not change the sign."' },
      { question: 'What is the reciprocal of $4$?', correct_answer: '$1/4$.', misconception: '$-4$.\n\nIntervention: "Write 4 as a fraction first (4/1). Now flip it!"' },
      { question: 'Divide: $2/3 \\div 2/3$', correct_answer: '1. (Any number divided by itself is 1). Or $2/3 \\times 3/2 = 6/6 = 1$.', misconception: '4/9.\n\nIntervention: "You forgot to flip the second one!"' },
      { question: 'Divide: $1/5 \\div 3/10$', correct_answer: '$1/5 \\times 10/3 = 10/15 = 2/3$.', misconception: 'Struggling to simplify 10/15.\n\nIntervention: "What number goes into both 10 and 15?"' },
      { question: 'Divide: $7/9 \\div 2/3$', correct_answer: '$7/9 \\times 3/2 = 21/18 = 7/6$.', misconception: 'Flipping both fractions.\n\nIntervention: "Only flip the SECOND one!"' },
      { question: 'Divide: $4 \\div 1/3$', correct_answer: '$4/1 \\times 3/1 = 12/1 = 12$.', misconception: '4/3.\n\nIntervention: "Write the whole number over 1 first."' },
      { question: 'Divide: $1/8 \\div 4$', correct_answer: '$1/8 \\div 4/1 = 1/8 \\times 1/4 = 1/32$.', misconception: '32.\n\nIntervention: "If you have 1/8 of a pizza and split it among 4 people, they get a tiny crumb (1/32), not 32 pizzas!"' },
      { question: 'Divide: $9/10 \\div 3/5$', correct_answer: '$9/10 \\times 5/3 = 45/30 = 3/2 = 1.5$.', misconception: 'Calculation error in 9x5 or 10x3.\n\nIntervention: Use a multiplication chart if needed.' }
    ],
    criteria_for_success: 'Accurately apply the Keep-Change-Flip method to divide fractions by fractions.',
    exit_ticket: 'Divide: $4/5 \\div 1/2$. Show your Keep-Change-Flip steps.',
    checks_for_understanding: [{ cfu: 'Which fraction do we flip?', method: 'Choral Response' }]
  });

  // Day 20 (9/4)
  lessonPlans.push({
    date_start: '2026-09-04', week_label: '8/31-9/4',
    topic: 'Dividing Fractions Word Problems (Envision T3-2)',
    objective_3m: 'Students will solve real-world word problems involving the division of fractions.',
    standard: '6.NS.1',
    do_now: '**Vocabulary Primer:**\n- **Algorithm:** A set of rules to solve a math problem (like Keep-Change-Flip).\n\n**Do Now:** Divide $5/6 \\div 2/5$.',
    direct_instruction: '## What is being split?\nThe hardest part of a division word problem is figuring out which number goes first. The number that is BEING SPLIT UP goes first! The number that is doing the splitting (the size of the groups) goes second.\n\n---\n\n## Example\n"I have 5 pizzas. I want to give everyone 1/3 of a pizza."\nWhat is being split? The pizzas! So 5 goes first. $5 \\div 1/3$.\n"I have 1/2 of a cake. I want to split it among 4 friends."\nWhat is being split? The cake! So 1/2 goes first. $1/2 \\div 4$.\n\n* **Turn and Talk (2 min):** A board is 3/4 meters long. I cut it into pieces that are 1/8 meters long. Which number goes first in the division equation?',
    group_practice: 'Word Problem Posters: Students work in groups of 3 to model and solve complex fraction word problems on large chart paper.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'A bag of flour contains 3/4 of a cup. A recipe requires 1/8 of a cup. How many recipes can you make?', correct_answer: '$3/4 \\div 1/8 = 3/4 \\times 8/1 = 24/4 = 6$ recipes.', misconception: 'Doing $1/8 \\div 3/4$.\n\nIntervention: "What is being split? The bag of flour. So 3/4 goes first."' },
      { question: 'You have 1/2 of a gallon of milk. You split it evenly among 4 glasses. How much milk is in each glass?', correct_answer: '$1/2 \\div 4 = 1/2 \\times 1/4 = 1/8$ of a gallon.', misconception: 'Saying 2 gallons.\n\nIntervention: "If you have half a gallon, can you give everyone 2 whole gallons? No! You are dividing by 4."' },
      { question: 'A ribbon is 7/8 yards long. You cut it into pieces that are 1/4 yards long. How many pieces?', correct_answer: '$7/8 \\div 1/4 = 7/8 \\times 4/1 = 28/8 = 3.5$ pieces.', misconception: 'Putting 1/4 first.\n\nIntervention: "The ribbon is being cut. Put 7/8 first."' },
      { question: 'Divide: $9/10 \\div 3/10$', correct_answer: '$9/10 \\times 10/3 = 90/30 = 3$.', misconception: 'Leaving it as a fraction.\n\nIntervention: "Simplify 90/30!"' },
      { question: 'You run 4/5 of a mile. You stop every 1/5 of a mile for water. How many stops?', correct_answer: '$4/5 \\div 1/5 = 4/5 \\times 5/1 = 20/5 = 4$ stops.', misconception: 'Adding them.\n\nIntervention: "You are splitting the run into segments."' },
      { question: 'A pitcher holds 2/3 of a gallon of lemonade. Each cup holds 1/6 of a gallon. How many cups can you fill?', correct_answer: '$2/3 \\div 1/6 = 2/3 \\times 6/1 = 12/3 = 4$ cups.', misconception: 'Multiplying 2/3 and 1/6.\n\nIntervention: "Are we finding a fraction OF a fraction? No, we are splitting it."' },
      { question: 'Divide: $5/8 \\div 3/4$', correct_answer: '$5/8 \\times 4/3 = 20/24 = 5/6$.', misconception: 'Failing to simplify 20/24.\n\nIntervention: "Divide top and bottom by 4."' },
      { question: 'A turtle walks 1/10 of a mile every hour. How long will it take to walk 1/2 of a mile?', correct_answer: '$1/2 \\div 1/10 = 1/2 \\times 10/1 = 10/2 = 5$ hours.', misconception: '$1/10 \\div 1/2$.\n\nIntervention: "We are trying to see how many 1/10s fit INSIDE 1/2. Put 1/2 first."' },
      { question: 'You have 3 blocks of clay. Each art project requires 2/5 of a block. How many projects?', correct_answer: '$3 \\div 2/5 = 3/1 \\times 5/2 = 15/2 = 7.5$ projects.', misconception: 'Multiplying $3 \\times 2/5$.\n\nIntervention: "We are dividing the clay up."' },
      { question: 'Divide: $11/12 \\div 1/4$', correct_answer: '$11/12 \\times 4/1 = 44/12 = 11/3$.', misconception: 'Flipping the first one.\n\nIntervention: Keep-Change-Flip!' }
    ],
    criteria_for_success: 'Determine the correct dividend and divisor from a word problem context and divide accurately.',
    exit_ticket: 'A piece of wood is 5/6 meters long. You cut it into pieces that are 1/12 meters long. How many pieces do you get?',
    checks_for_understanding: [{ cfu: 'In a division word problem, how do you know which fraction comes first in your equation?', method: 'Cold Call' }]
  });

  console.log(`Inserting Week 4 plans...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) console.error(`Error inserting ${plan.date_start}:`, error);
  }
};

run();
