import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwptszrqrrinzycjdodz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cHRzenJxcnJpbnp5Y2pkb2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NjU4OTksImV4cCI6MjEwMjA0MTg5OX0.V0mpPE5nZPqgaJLyaENmW5KuoAfQH0694rEtxTvVpO0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Inserting Emergency Plans (6th Grade) for Mr. Bongweni...');
  
  const lessonPlans = [];

  // Emergency Plan 1
  lessonPlans.push({
    date_start: '2026-08-20', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 1: Decimal Operations (6.NS.3)',
    objective_3m: 'Students will fluently add, subtract, multiply, and divide multi-digit decimals.',
    standard: '6.NS.3',
    do_now: '**Vocabulary Primer:**\n- **Sum:** The result of addition.\n- **Product:** The result of multiplication.\n\n**Do Now:** Evaluate $12 + 4.5$ and $12 - 4.5$',
    direct_instruction: '## Sub Plan Instructions\nThis is an emergency lesson plan. Students should complete the practice problems independently.\n\n**Decimal Rules:**\n- **Adding/Subtracting:** Line up the decimal points! Add placeholder zeros if needed.\n- **Multiplying:** Ignore the decimals at first. Multiply normally. Then count the total decimal places in the problem and put that many in the answer.\n- **Dividing:** If the divisor (outside number) has a decimal, move it to the right until it is a whole number. Move the dividend (inside number) the same amount.',
    group_practice: 'Work independently on the practice problems.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Add: $3.45 + 12.8$', correct_answer: 'Line up decimals: $3.45 + 12.80 = 16.25$', misconception: 'Adding 5 and 8.\nIntervention: "Line up the decimal point. Use a zero placeholder after the 8."' },
      { question: 'Subtract: $15 - 3.24$', correct_answer: 'Line up decimals: $15.00 - 3.24 = 11.76$', misconception: 'Dropping down the .24 directly.\nIntervention: "You must put .00 after the 15 and borrow!"' },
      { question: 'Multiply: $4.2 \\times 3.1$', correct_answer: 'Multiply 42 x 31 = 1302. Two decimal places total. Answer: 13.02', misconception: '130.2\nIntervention: "Count the decimal places in BOTH original numbers."' },
      { question: 'Divide: $12.5 \\div 0.5$', correct_answer: 'Move decimal 1 place: $125 \\div 5 = 25$', misconception: '2.5\nIntervention: "Move the decimal in the outside number until it is a whole number."' },
      { question: 'Add: $0.07 + 2.1$', correct_answer: 'Line up decimals: $0.07 + 2.10 = 2.17$', misconception: '0.28\nIntervention: "Line up the decimals! The 1 is in the tenths place."' },
      { question: 'Subtract: $8.4 - 2.15$', correct_answer: 'Line up decimals: $8.40 - 2.15 = 6.25$', misconception: '6.35\nIntervention: "Don\'t forget to borrow from the 4."' },
      { question: 'Multiply: $0.5 \\times 0.5$', correct_answer: '5 x 5 = 25. Two decimal places. Answer: 0.25', misconception: '2.5\nIntervention: "There are two numbers after the decimal in the problem, so there must be two in the answer."' },
      { question: 'Divide: $4.8 \\div 1.2$', correct_answer: 'Move decimal 1 place: $48 \\div 12 = 4$', misconception: '0.4\nIntervention: "Move the decimal in both numbers first!"' },
      { question: 'You buy 3 apples for $1.25 each. Total cost?', correct_answer: '$3 \\times 1.25 = 3.75$', misconception: '3.25\nIntervention: "Line up the multiplication properly."' },
      { question: 'You have $10 and spend $4.35. How much is left?', correct_answer: '$10.00 - 4.35 = 5.65$', misconception: '6.65\nIntervention: "Borrow across the zeros correctly!"' }
    ],
    criteria_for_success: 'Students accurately align decimals for addition/subtraction and place decimals correctly for multiplication/division.',
    exit_ticket: 'Solve: $14 - 3.8$ and $2.5 \\times 1.4$',
    checks_for_understanding: [{ cfu: 'Do you line up decimals when multiplying?', method: 'Independent Work' }]
  });

  // Emergency Plan 2
  lessonPlans.push({
    date_start: '2026-08-21', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 2: Intro to Ratios (6.RP.1)',
    objective_3m: 'Students will understand the concept of a ratio and use ratio language to describe relationships.',
    standard: '6.RP.1',
    do_now: '**Vocabulary Primer:**\n- **Ratio:** A comparison of two quantities.\n\n**Do Now:** Write the fraction $\\frac{4}{8}$ in simplest form.',
    direct_instruction: '## Sub Plan Instructions\nThis is an emergency lesson plan. Complete the problems quietly.\n\n**Ratios:**\nA ratio compares two things. It can be written in 3 ways:\n1. With the word "to": 3 to 4\n2. With a colon: 3:4\n3. As a fraction: $\\frac{3}{4}$\nAlways simplify ratios just like you simplify fractions! If the ratio is 6:8, divide both by 2 to get 3:4.',
    group_practice: 'Work independently on the practice problems.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'There are 5 boys and 10 girls. Ratio of boys to girls?', correct_answer: '5 to 10, which simplifies to 1 to 2.', misconception: '10 to 5.\nIntervention: "The order matters! Boys came first in the question."' },
      { question: 'Write the ratio 12:16 in simplest form.', correct_answer: 'Divide both by 4 to get 3:4.', misconception: '6:8\nIntervention: "6:8 is correct, but not SIMPLEST form. Divide by 2 again."' },
      { question: 'A recipe uses 2 cups sugar and 6 cups flour. Ratio of sugar to flour?', correct_answer: '2:6, simplifies to 1:3', misconception: '1:4\nIntervention: "What can you divide both 2 and 6 by?"' },
      { question: 'There are 4 dogs and 8 cats. Ratio of dogs to TOTAL animals?', correct_answer: 'Total animals = 12. Ratio is 4:12, simplifies to 1:3.', misconception: '4:8\nIntervention: "Read carefully! It asked for TOTAL animals, not cats."' },
      { question: 'Write the ratio 15 to 25 as a simplified fraction.', correct_answer: '$\\frac{15}{25} = \\frac{3}{5}$', misconception: '$\\frac{25}{15}$\nIntervention: "The first number goes on top!"' },
      { question: 'Ratio of vowels to consonants in the word "MATH"?', correct_answer: 'Vowels: 1 (A). Consonants: 3 (M, T, H). Ratio is 1:3.', misconception: '3:1\nIntervention: "Vowels first! A, E, I, O, U."' },
      { question: 'If the ratio of red to blue marbles is 2:3, and there are 4 red marbles, how many blue?', correct_answer: 'The ratio multiplied by 2. So 3 x 2 = 6 blue marbles.', misconception: '5\nIntervention: "If the red doubled from 2 to 4, the blue must double too."' },
      { question: 'Simplify the ratio 20:30', correct_answer: '2:3 (Divide by 10)', misconception: '2:0\nIntervention: "You divide by 10, not subtract."' },
      { question: 'A class has 12 boys and 18 girls. Ratio of girls to boys?', correct_answer: '18:12, simplifies to 3:2.', misconception: '2:3\nIntervention: "Order matters! Girls first."' },
      { question: 'Write the ratio 7:21 in simplest form.', correct_answer: '1:3 (Divide by 7)', misconception: 'Cannot be simplified.\nIntervention: "Check if 21 is divisible by 7."' }
    ],
    criteria_for_success: 'Students write ratios in three formats and simplify them correctly.',
    exit_ticket: 'There are 8 apples and 12 oranges. Write the ratio of apples to oranges in simplest form.',
    checks_for_understanding: [{ cfu: 'Does the order of a ratio matter?', method: 'Independent Work' }]
  });

  // Emergency Plan 3
  lessonPlans.push({
    date_start: '2026-08-22', week_label: 'Emergency Sub Plans',
    topic: 'Emergency Plan 3: Area of Polygons (6.G.1)',
    objective_3m: 'Students will find the area of right triangles, other triangles, and special quadrilaterals.',
    standard: '6.G.1',
    do_now: '**Vocabulary Primer:**\n- **Area:** The space inside a 2D shape.\n- **Base and Height:** MUST form a 90-degree right angle.\n\n**Do Now:** Multiply $12 \\times 5$ and $12 \\times 5 \\div 2$',
    direct_instruction: '## Sub Plan Instructions\nThis is an emergency lesson plan. Complete the problems quietly.\n\n**Formulas:**\n- **Rectangle/Parallelogram:** $A = b \\times h$\n- **Triangle:** $A = (b \\times h) \\div 2$ (A triangle is HALF of a parallelogram!)\nRemember: The height is NOT always the slanted side. The height must go straight up and down and make a right angle with the base.',
    group_practice: 'Work independently on the practice problems.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Rectangle: base 8cm, height 5cm. Find Area.', correct_answer: '$A = 8 \\times 5 = 40$ sq cm.', misconception: '26 (perimeter).\nIntervention: "Area is multiplication, not adding the sides!"' },
      { question: 'Triangle: base 10in, height 6in. Find Area.', correct_answer: '$A = (10 \\times 6) \\div 2 = 60 \\div 2 = 30$ sq in.', misconception: '60\nIntervention: "A triangle is HALF a rectangle. Don\'t forget to divide by 2!"' },
      { question: 'Parallelogram: base 12m, slanted side 7m, straight height 6m. Find Area.', correct_answer: '$A = 12 \\times 6 = 72$ sq m.', misconception: '84 (12 x 7).\nIntervention: "The height must be straight up and down. The slanted side is a trap!"' },
      { question: 'Triangle: base 7ft, height 4ft. Find Area.', correct_answer: '$A = (7 \\times 4) \\div 2 = 28 \\div 2 = 14$ sq ft.', misconception: '28\nIntervention: "Divide by 2!"' },
      { question: 'Square: side 9cm. Find Area.', correct_answer: '$A = 9 \\times 9 = 81$ sq cm.', misconception: '36\nIntervention: "Area is side TIMES side, not side times 4."' },
      { question: 'Triangle: base 5, height 8. Find Area.', correct_answer: '$A = (5 \\times 8) \\div 2 = 40 \\div 2 = 20$', misconception: '40\nIntervention: "Always divide a triangle by 2."' },
      { question: 'Parallelogram: base 15, height 10. Find Area.', correct_answer: '$15 \\times 10 = 150$', misconception: '75\nIntervention: "Do not divide a parallelogram by 2. It is a full shape."' },
      { question: 'Right Triangle: legs are 3 and 4. Find Area.', correct_answer: '$A = (3 \\times 4) \\div 2 = 12 \\div 2 = 6$', misconception: '12\nIntervention: "The legs are the base and height because they make a right angle."' },
      { question: 'Rectangle: Area is 50, base is 10. Find the height.', correct_answer: 'Work backwards. $10 \\times h = 50$, so $h = 5$.', misconception: '500\nIntervention: "We ALREADY HAVE the area. You must divide to find the missing side."' },
      { question: 'Triangle: Area is 20, base is 8. Find the height.', correct_answer: 'Work backwards. Half of the rectangle is 20, so the full rectangle is 40. $8 \\times h = 40$, so $h = 5$.', misconception: '2.5\nIntervention: "If you plug 2.5 back in: (8 x 2.5) / 2 = 10, not 20. Double the area first!"' }
    ],
    criteria_for_success: 'Students choose the correct formula and accurately compute the area of polygons.',
    exit_ticket: 'Find the area of a triangle with base 12 and height 5.',
    checks_for_understanding: [{ cfu: 'Why do we divide a triangle by 2?', method: 'Independent Work' }]
  });

  const { data, error } = await supabase.from('lesson_plans').insert(lessonPlans);
  
  if (error) {
    console.error('Error inserting emergency plans:', error);
  } else {
    console.log('Successfully inserted 3 emergency plans for Mr. Bongweni!');
  }
};

run();
