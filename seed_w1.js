import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans (Week 1)...');
  await supabase.from('lesson_plans').delete().in('date_start', ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14']);

  const lessonPlans = [];

  // Day 1
  lessonPlans.push({
    date_start: '2026-08-10', week_label: '8/10-8/14',
    topic: 'WIM Day 1 - Brain Plasticity & Mistakes',
    objective_3m: 'Students will understand that their brains can grow and change, and that mistakes are essential for learning mathematics.',
    standard: 'SMP.1, SMP.3',
    do_now: '**Vocabulary Primer:**\n- **Neuroplasticity:** The brain\'s ability to change and grow.\n- **Synapse:** A connection between neurons that fires when we learn.\n\n**Journal Prompt:** Describe a time you made a mistake in math. How did it make you feel? Did you learn from it?',
    direct_instruction: '## The Power of Mistakes\nWhen you make a mistake in math, your brain actually *grows*. A synapse fires in your brain whether you realize you made the mistake or not!\n\n---\n\n## The "I\'m Not a Math Person" Myth\nThere is no such thing as a "math brain". Everyone is born with the capability to learn high-level mathematics.\n\n* **Turn and Talk (2 min):** What is something you used to be bad at, but now you are good at? How did you improve?\n\n---\n\n## Classroom Norms for the Year\n1. Everyone can learn math to the highest levels.\n2. Mistakes are valuable.\n3. Questions are really important.\n4. Math is about creativity and making sense.\n5. Math is about connections and communicating.',
    group_practice: 'Four 4s Activity: Using exactly four 4s and any operations, try to find every number from 1 to 10.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'What happens in your brain when you make a mistake?', correct_answer: 'A synapse fires and the brain grows, creating new pathways for learning.', misconception: 'Nothing happens, or the brain forgets information.\n\nIntervention: Show the brain-scan image from YouCubed proving brain activity sparks during errors.' },
      { question: 'Write 1 using exactly four 4s.', correct_answer: '(4 / 4) * (4 / 4) = 1 * 1 = 1', misconception: 'Using a different number of 4s.\n\nIntervention: Count the 4s out loud.' },
      { question: 'Write 2 using exactly four 4s.', correct_answer: '(4 / 4) + (4 / 4) = 1 + 1 = 2', misconception: 'Adding all 4s gives 16.\n\nIntervention: Remind them to use division or other operations.' },
      { question: 'Write 3 using exactly four 4s.', correct_answer: '(4 + 4 + 4) / 4 = 12 / 4 = 3', misconception: 'Order of operations error.\n\nIntervention: Use parentheses to group the addition first.' },
      { question: 'Write 4 using exactly four 4s.', correct_answer: '4 + (4 - 4) / 4 = 4 + 0 = 4', misconception: 'Dividing by zero.\n\nIntervention: Check the denominator.' },
      { question: 'Write 5 using exactly four 4s.', correct_answer: '(4 * 4 + 4) / 4 = 20 / 4 = 5', misconception: 'Evaluating incorrectly.\n\nIntervention: Step-by-step evaluation.' },
      { question: 'Write 6 using exactly four 4s.', correct_answer: '(4 + 4) / 4 + 4 = 2 + 4 = 6', misconception: 'Skipping parentheses.\n\nIntervention: Review PEMDAS.' },
      { question: 'Write 7 using exactly four 4s.', correct_answer: '44 / 4 - 4 = 11 - 4 = 7', misconception: 'Not realizing they can combine 4s into 44.\n\nIntervention: Hint that two numbers can be squished together.' },
      { question: 'Write 8 using exactly four 4s.', correct_answer: '4 + 4 + 4 - 4 = 8', misconception: 'Using multiplication gives 64.\n\nIntervention: Try just addition and subtraction.' },
      { question: 'Write 9 using exactly four 4s.', correct_answer: '4 / 4 + 4 + 4 = 1 + 4 + 4 = 9', misconception: 'Struggling to find the last operation.\n\nIntervention: Work backward from 9.' }
    ],
    criteria_for_success: 'Actively participate in the Four 4s challenge and demonstrate perseverance through mistakes.',
    exit_ticket: 'What is one new thing you learned about your brain today?'
  });

  // Day 2
  lessonPlans.push({
    date_start: '2026-08-11', week_label: '8/10-8/14',
    topic: 'WIM Day 2 - Visualizing Mathematics',
    objective_3m: 'Students will explore visual representations of numbers and understand that math is a visual subject.',
    standard: 'SMP.4, SMP.5',
    do_now: '**Vocabulary Primer:**\n- **Representation:** A way to show a mathematical idea (e.g., drawing, equation, graph).\n\n**Visual Prompt:** How many dots do you see? How did you see them (did you group them in your head)?',
    direct_instruction: '## Math is Visual\nWhen we see numbers, our brain processes them in the visual pathways. Finger counting is actually a great way to build strong math foundations!\n\n---\n\n## Multiple Representations\nWe can represent a single idea in many ways:\n- As a physical object (blocks)\n- As a picture\n- As words\n- As symbols ($x + 2 = 5$)\n\n* **Turn and Talk (2 min):** Which representation makes the most sense to you when solving a problem? Why?\n\n---\n\n## The Power of Color\nUsing highlighters to color-code your math work helps your brain organize information and spot patterns.',
    group_practice: 'Number Visuals Activity: Analyzing circles grouped in different patterns and coloring the patterns they see.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Draw a visual representation of 3 x 4.', correct_answer: 'An array of 3 rows and 4 columns of dots.', misconception: 'Drawing 3 dots and 4 dots (addition).\n\nIntervention: Remind them multiplication is "groups of".' },
      { question: 'How can you quickly count a grid of 5x5 dots with the 4 corners removed?', correct_answer: 'Find the total area (5x5 = 25) and subtract the 4 corners. 25 - 4 = 21.', misconception: 'Counting by ones and losing track.\n\nIntervention: Ask "Is there a faster way using multiplication and subtraction?"' },
      { question: 'Represent the fraction 1/2 visually in two different ways.', correct_answer: 'A circle split in half, and a rectangle split in half.', misconception: 'Drawing uneven pieces.\n\nIntervention: Emphasize that fractions require EQUAL parts.' },
      { question: 'If a pattern starts with 2 dots, then 4, then 6... draw the 5th step.', correct_answer: 'The 5th step should have 10 dots.', misconception: 'Drawing 8 dots (stopping at the 4th step).\n\nIntervention: Have them label the steps 1, 2, 3, 4, 5.' },
      { question: 'Color-code the equation: 2x + 3 = 11 to show the variable, coefficient, and constants.', correct_answer: 'Color x one color, 2 another, and 3/11 a third color.', misconception: 'Coloring the 2x as one single thing.\n\nIntervention: Explain the difference between a number and a letter variable.' },
      { question: 'Draw a visual that proves 4 + 5 = 9.', correct_answer: 'A group of 4 objects joined with a group of 5 objects.', misconception: 'Just writing the numbers.\n\nIntervention: "I want to see it without numbers!"' },
      { question: 'Visually show why 1/2 is equivalent to 2/4.', correct_answer: 'Draw a circle split in 2, shade 1. Draw a second circle split in 4, shade 2. They take up the same space.', misconception: 'Drawing them different sizes.\n\nIntervention: "The whole pizzas must be the same size to compare them!"' },
      { question: 'What is the visual difference between Perimeter and Area?', correct_answer: 'Perimeter is the fence around the outside. Area is the grass filling the inside.', misconception: 'Confusing the two.\n\nIntervention: Trace the outside with a pen for perimeter, color the inside for area.' },
      { question: 'Draw a shape with an area of 12 square units on grid paper.', correct_answer: 'A 3x4 rectangle, or a 2x6 rectangle, or an irregular shape containing 12 squares.', misconception: 'Drawing a 12x12 square.\n\nIntervention: Remind them area is the total number of squares inside.' },
      { question: 'How do you visually represent a negative number?', correct_answer: 'Drawing it on the left side of zero on a number line, or using red chips vs yellow chips.', misconception: 'Saying "you can\'t draw less than nothing".\n\nIntervention: "Have you ever owed someone money? How could we draw that?"' }
    ],
    criteria_for_success: 'Create at least two different visual representations for a given mathematical concept.',
    exit_ticket: 'Draw a visual representation of the number 15 in a way that shows its factors.'
  });

  // Day 3
  lessonPlans.push({
    date_start: '2026-08-12', week_label: '8/10-8/14',
    topic: 'WIM Day 3 - Number Sense & Flexibility',
    objective_3m: 'Students will develop number flexibility by solving problems using multiple strategies.',
    standard: 'SMP.2, SMP.7',
    do_now: '**Vocabulary Primer:**\n- **Number Sense:** The ability to play with numbers and understand how they relate.\n- **Flexibility:** Being able to change strategies if one isn\'t working.\n\n**Number Talk:** Solve 18 x 5 in your head without a calculator. Write down the strategy you used.',
    direct_instruction: '## What is Number Sense?\nStudents with high number sense don\'t just memorize procedures; they break numbers apart and put them back together in ways that make sense to them.\n\n---\n\n## Strategy: Halve and Double\nTo solve $18 \\times 5$, we can halve the 18 to make 9, and double the 5 to make 10. Now we have $9 \\times 10 = 90$!\n\n* **Turn and Talk (2 min):** Try using the Halve and Double strategy for $24 \\times 5$. Explain it to your partner.\n\n---\n\n## Strategy: Rounding and Adjusting\nTo solve $39 + 45$, round 39 up to 40. Then add $40 + 45 = 85$. Finally, subtract the 1 you added earlier to get 84!',
    group_practice: 'Number Flex Task: Solving a set of computation problems using at least two different mental math strategies for each.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Use mental math to solve: 99 + 46.', correct_answer: '100 + 46 = 146. Subtract 1 = 145.', misconception: 'Trying to carry the 1 in their head and getting confused.\n\nIntervention: "What friendly number is really close to 99?"' },
      { question: 'Use Halve and Double: 16 x 25.', correct_answer: 'Halve 16 to 8. Double 25 to 50. Halve 8 to 4. Double 50 to 100. 4 x 100 = 400.', misconception: 'Halving both numbers.\n\nIntervention: "If you cut both in half, the answer gets 4 times smaller! One goes up, one goes down."' },
      { question: 'Break apart to solve: 3 x 42.', correct_answer: '3 x 40 = 120. 3 x 2 = 6. 120 + 6 = 126.', misconception: 'Forgetting to multiply the 3 by the 2.\n\nIntervention: Draw an area model rectangle (3 by 40 and 2).' },
      { question: 'Use mental math: 150 - 98.', correct_answer: 'Add 2 to 98 to make 100. 150 - 100 = 50. Add the 2 back on = 52.', misconception: 'Subtracting 100 and forgetting to add the 2 back (getting 50).\n\nIntervention: "Did you take away too much or too little when you subtracted 100?"' },
      { question: 'Solve mentally: 5 x 64.', correct_answer: 'Halve 64 to 32. Double 5 to 10. 32 x 10 = 320.', misconception: 'Trying standard algorithm in their head.\n\nIntervention: "Any time you see a 5, think about turning it into a 10!"' },
      { question: 'Break apart to solve: 104 x 6.', correct_answer: '(100 x 6) + (4 x 6) = 600 + 24 = 624.', misconception: 'Adding 104 + 6 = 110.\n\nIntervention: Check the operation symbol.' },
      { question: 'Solve mentally: 1000 - 450.', correct_answer: 'Count up: 450 + 50 = 500. 500 + 500 = 1000. Total added = 550.', misconception: 'Messing up the borrowing across zeros.\n\nIntervention: "Try counting up from 450 instead of subtracting down!"' },
      { question: 'Use rounding: $4.99 + $2.50.', correct_answer: '$5.00 + $2.50 = $7.50. Subtract 1 penny = $7.49.', misconception: 'Getting stuck on the decimals.\n\nIntervention: "Think about money. What is $4.99 almost equal to?"' },
      { question: 'Solve: 25 x 12.', correct_answer: 'Think of quarters! 12 quarters is 3 dollars = 300.', misconception: 'Using the standard algorithm.\n\nIntervention: "If you have 12 quarters in your pocket, how many cents is that?"' },
      { question: 'Use mental math: 21 x 9.', correct_answer: '21 x 10 = 210. Subtract one group of 21 = 189.', misconception: 'Subtracting 9 instead of 21.\n\nIntervention: "You have 10 groups of 21, but you only want 9 groups. What do you need to take away?"' }
    ],
    criteria_for_success: 'Effectively explain a mental math strategy to a peer without using the standard algorithm.',
    exit_ticket: 'Solve 26 x 5 mentally and write down the steps of your thinking.'
  });

  // Day 4
  lessonPlans.push({
    date_start: '2026-08-13', week_label: '8/10-8/14',
    topic: 'WIM Day 4 - Patterns and Generalizations',
    objective_3m: 'Students will identify, extend, and describe geometric and numerical patterns.',
    standard: 'SMP.8',
    do_now: '**Vocabulary Primer:**\n- **Pattern:** A repeated or predictable sequence.\n- **Generalize:** To write a rule that works for EVERY case.\n\n**Do Now:** Look at the sequence 2, 4, 6, 8... what is the 100th term? How do you know?',
    direct_instruction: '## The Beauty of Patterns\nMathematics is often called the "science of patterns". From the spirals of a sunflower to the orbit of planets, math is everywhere!\n\n---\n\n## Finding the "Rule"\nWhen we see a pattern, our goal is to find the rule. If the rule is "multiply by 2", we can find ANY term in the sequence without counting them all out.\n\n* **Turn and Talk (2 min):** What is the rule for this pattern: 1, 4, 9, 16, 25...?\n\n---\n\n## Growing Shapes\nWe can look at how a shape grows to find a pattern. Does it grow by adding 2 blocks to the top each time? Or multiplying?',
    group_practice: 'Pattern Block Task: Build the first 4 stages of a growing pattern, then predict the 10th stage.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Find the next term: 3, 6, 9, 12, ___', correct_answer: '15. The rule is add 3.', misconception: 'Adding 2.\n\nIntervention: Have them subtract the previous term from the current term.' },
      { question: 'Find the next term: 1, 3, 9, 27, ___', correct_answer: '81. The rule is multiply by 3.', misconception: 'Trying to find an addition rule (+2, +6, +18) and getting stuck.\n\nIntervention: "If addition doesn\'t have a steady pattern, try multiplication!"' },
      { question: 'What is the 10th term of the pattern: 5, 10, 15, 20...', correct_answer: '50. The rule is $5 \\times n$.', misconception: 'Writing out all 10 terms and miscounting.\n\nIntervention: "What is the relationship between the term number and the value?"' },
      { question: 'Find the missing term: 100, 90, ___, 70, 60.', correct_answer: '80. The rule is subtract 10.', misconception: 'Subtracting 5.\n\nIntervention: Test their rule on the whole sequence to see if it works.' },
      { question: 'A shape starts with 1 block. Step 2 has 3 blocks. Step 3 has 5 blocks. How many blocks in Step 4?', correct_answer: '7 blocks. It adds 2 each time.', misconception: 'Multiplying by 3.\n\nIntervention: Have them draw the physical blocks.' },
      { question: 'Find the next term: 1, 4, 9, 16, 25, ___', correct_answer: '36. These are perfect squares ($1^2, 2^2, 3^2...$)', misconception: 'Adding odd numbers (+3, +5, +7, +9) and adding the wrong odd number next.\n\nIntervention: Both methods work! If adding odds, make sure the next odd is 11. 25 + 11 = 36.' },
      { question: 'Describe the pattern rule for: 2, 4, 8, 16, 32.', correct_answer: 'Multiply by 2 (or doubling).', misconception: 'Adding 2.\n\nIntervention: "Does 4 + 2 = 8?"' },
      { question: 'If you have 1 square, the perimeter is 4. If you put 2 squares side-by-side, the perimeter is 6. 3 squares is 8. What is the perimeter of 4 squares side-by-side?', correct_answer: '10. The perimeter increases by 2 each time because the touching sides are hidden.', misconception: 'Multiplying 4 squares by 4 sides = 16.\n\nIntervention: Have them draw the 4 squares touching and trace the outside edge.' },
      { question: 'Find the next term: 50, 25, 12.5, ___', correct_answer: '6.25. The rule is divide by 2.', misconception: 'Getting scared of decimals.\n\nIntervention: Think of money. Half of $12.50.' },
      { question: 'What is the rule for: 2, 5, 11, 23, 47?', correct_answer: 'Multiply by 2, then add 1.', misconception: 'Giving up because it\'s a two-step rule.\n\nIntervention: "Let\'s double the first number and see how close we get to the second number."' }
    ],
    criteria_for_success: 'Accurately extend a pattern and write a sentence describing the rule.',
    exit_ticket: 'Create your own number pattern and write the rule for it.'
  });

  // Day 5
  lessonPlans.push({
    date_start: '2026-08-14', week_label: '8/10-8/14',
    topic: 'WIM Day 5 - Depth over Speed',
    objective_3m: 'Students will understand that deep mathematical thinking is more important than solving problems quickly.',
    standard: 'SMP.1, SMP.6',
    do_now: '**Vocabulary Primer:**\n- **Depth:** Exploring a concept fully to understand *why* it works.\n- **Speed:** How fast you do something.\n\n**Do Now:** Who do you think makes a better mathematician: someone who solves a problem in 10 seconds, or someone who takes 10 minutes but draws three diagrams to prove it?',
    direct_instruction: '## The "Fast Math" Trap\nMany people think being good at math means being fast. The greatest mathematicians in history worked on single problems for YEARS!\n\n---\n\n## Plunging into Depth\nWhen we rush, we miss the beautiful connections in math. Today, we aren\'t going to solve 50 problems quickly. We are going to solve 1 problem DEEPLY.\n\n* **Turn and Talk (2 min):** Have you ever felt rushed in a math class? How did it affect your learning?\n\n---\n\n## The "Why" vs the "How"\nKnowing *how* to follow a formula is okay. Knowing *why* the formula works is what makes you a true mathematician.',
    group_practice: 'The "Consecutive Numbers" exploration: Which numbers can be made by adding consecutive integers? (e.g. 1+2=3, 2+3=5).',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Can you make the number 3 using consecutive integers?', correct_answer: 'Yes. 1 + 2 = 3.', misconception: 'Thinking 1 and 2 are not consecutive.\n\nIntervention: Define consecutive as "next to each other on the number line".' },
      { question: 'Can you make the number 5 using consecutive integers?', correct_answer: 'Yes. 2 + 3 = 5.', misconception: 'Trying to use 3 numbers.\n\nIntervention: It can be ANY amount of consecutive numbers, but 2+3 is easiest.' },
      { question: 'Can you make the number 6 using consecutive integers?', correct_answer: 'Yes. 1 + 2 + 3 = 6.', misconception: 'Saying no because no TWO numbers add to 6.\n\nIntervention: Remind them they can use 3, 4, or 5 numbers in a row!' },
      { question: 'Can you make 7 using consecutive integers?', correct_answer: 'Yes. 3 + 4 = 7.', misconception: 'Calculation error.\n\nIntervention: Use a number line.' },
      { question: 'Can you make 9 using consecutive integers in two DIFFERENT ways?', correct_answer: 'Yes. 4 + 5 = 9. And 2 + 3 + 4 = 9.', misconception: 'Stopping after finding one way.\n\nIntervention: Push them to look for longer chains of smaller numbers.' },
      { question: 'Can you make 10 using consecutive integers?', correct_answer: 'Yes. 1 + 2 + 3 + 4 = 10.', misconception: 'Adding 5 + 5.\n\nIntervention: "Are 5 and 5 consecutive? No, they are the same number!"' },
      { question: 'Can you make 15 using consecutive integers?', correct_answer: 'Yes. 7 + 8 = 15. Or 4 + 5 + 6 = 15. Or 1+2+3+4+5 = 15.', misconception: 'Missing the 5-number chain.\n\nIntervention: "Can you start all the way at 1?"' },
      { question: 'What is the first number that CANNOT be made with consecutive integers?', correct_answer: 'The number 2. (1 cannot be made either, but we usually start checking at 3).', misconception: 'Saying 4.\n\nIntervention: Test 4. 1+2=3, 2+3=5. Yes, 4 cannot be made! But check 2 first.' },
      { question: 'Can you make 4 using consecutive integers?', correct_answer: 'No. 1+2=3. 2+3=5. 1+2+3=6.', misconception: 'Trying negative numbers.\n\nIntervention: We are sticking to positive whole numbers for this task.' },
      { question: 'Can you make 8 using consecutive integers?', correct_answer: 'No. 3+4=7, 4+5=9. 1+2+3=6. 2+3+4=9.', misconception: 'Guessing yes without checking.\n\nIntervention: Write down all the possible sums under 10.' }
    ],
    criteria_for_success: 'Explore the consecutive numbers task deeply and justify findings with written proof.',
    exit_ticket: 'Why is it more important to understand deeply than to answer quickly?'
  });

  console.log(`Inserting Week 1 plans...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) console.error(`Error inserting ${plan.date_start}:`, error);
  }
};

run();
