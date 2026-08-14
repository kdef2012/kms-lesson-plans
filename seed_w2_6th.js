import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans (Week 2)...');
  await supabase.from('lesson_plans').delete().in('date_start', ['2026-08-17', '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21']);

  const lessonPlans = [];

  // Day 6 (8/17)
  lessonPlans.push({
    date_start: '2026-08-17', week_label: '8/17-8/21',
    topic: 'Intro to Area (Open-Up U1 L1-3)',
    objective_3m: 'Students will find the area of polygons by decomposing them into rectangles or composing them into a larger rectangle.',
    standard: '6.G.1',
    do_now: '**Vocabulary Primer:**\n- **Area:** The amount of space inside a 2D shape, measured in square units.\n- **Decompose:** To break a shape apart into smaller pieces.\n\n**Do Now:** Draw a 4x5 rectangle on grid paper. How many squares are inside? Can you split it into two smaller rectangles?',
    direct_instruction: '## What is Area?\nArea is the amount of flat space inside a shape. We measure it by seeing how many 1x1 squares fit inside perfectly without overlapping.\n\n---\n\n## The "Cut and Paste" Strategy (Decomposing)\nWhen we see a weird, irregular shape (like an L-shape), we don\'t have a formula for it. But we CAN break it into rectangles!\n\n* **Turn and Talk (2 min):** Look at the L-shape on the board. Where would you draw a line to cut it into two rectangles?\n\n---\n\n## The "Box It In" Strategy (Composing)\nInstead of cutting a shape into pieces, we can draw a large rectangle AROUND the shape, find the area of the big rectangle, and subtract the "empty space" triangles we added.',
    group_practice: 'Area Puzzle Stations: Students rotate through stations calculating the area of L-shapes, T-shapes, and U-shapes by physically cutting out paper and rearranging pieces.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Find the area of an L-shape that is composed of a 2x6 rectangle and a 3x4 rectangle.', correct_answer: 'Area 1 = 12. Area 2 = 12. Total = 24 sq units.', misconception: 'Multiplying all the outside numbers together.\n\nIntervention: "Area is space inside, not outside! Decompose it first."' },
      { question: 'A shape is drawn on a grid. You draw a 5x5 box around it. The empty space outside the shape is 5 squares. What is the shape\'s area?', correct_answer: 'Box = 25. Empty space = 5. 25 - 5 = 20 sq units.', misconception: 'Adding the empty space (30).\n\nIntervention: "Are we keeping the empty space or throwing it away?"' },
      { question: 'Find the area of a rectangle with length 8 and width 3.', correct_answer: '8 x 3 = 24 sq units.', misconception: 'Adding 8+3+8+3 = 22 (finding perimeter).\n\nIntervention: Remind them perimeter is the fence, area is the grass.' },
      { question: 'Decompose a 10x10 square into two equal rectangles. What is the area of one?', correct_answer: '100 / 2 = 50. Or a 5x10 rectangle = 50.', misconception: 'Splitting the length and width (5x5 = 25).\n\nIntervention: "If you cut a pizza in half, you only make one cut, not two."' },
      { question: 'A T-shape is made of a top rectangle (2x8) and a bottom stem (4x2). Find the area.', correct_answer: 'Top = 16. Stem = 8. Total = 24 sq units.', misconception: 'Adding the side lengths instead of multiplying.\n\nIntervention: Have them count the physical grid squares.' },
      { question: 'True or False: If two shapes have the same area, they must look the same.', correct_answer: 'False. A 2x6 rectangle and a 3x4 rectangle both have an area of 12.', misconception: 'Saying True.\n\nIntervention: Give them 12 blocks and ask them to build two different rectangles.' },
      { question: 'Find the area of an irregular polygon by boxing it into a 4x6 rectangle and removing two 1x2 rectangles from the corners.', correct_answer: 'Total box = 24. Two corners = 2 + 2 = 4. 24 - 4 = 20 sq units.', misconception: 'Subtracting only one corner.\n\nIntervention: Circle all the empty space that needs to be removed.' },
      { question: 'Decompose a 7x4 rectangle into two smaller rectangles.', correct_answer: 'Possible answer: A 3x4 and a 4x4. Areas: 12 + 16 = 28.', misconception: 'Making pieces that overlap.\n\nIntervention: "When you cut paper, the pieces don\'t overlap."' },
      { question: 'Find the area of a U-shape: A 5x5 square with a 3x3 square removed from the top middle.', correct_answer: '25 - 9 = 16 sq units.', misconception: '25 - 3 = 22.\n\nIntervention: Remember to find the AREA of the missing piece (3x3), not just the side length.' },
      { question: 'A room is 12ft by 10ft. A rug is 8ft by 5ft. How much floor is NOT covered by the rug?', correct_answer: 'Room = 120. Rug = 40. 120 - 40 = 80 sq ft.', misconception: 'Subtracting side lengths (12-8). \n\nIntervention: Draw a picture of the rug inside the room.' }
    ],
    criteria_for_success: 'Students accurately decompose 4 out of 5 irregular shapes on their exit ticket to find the correct area.',
    exit_ticket: 'Find the area of the provided cross-shaped polygon by decomposing it.'
  });

  // Day 7 (8/18)
  lessonPlans.push({
    date_start: '2026-08-18', week_label: '8/17-8/21',
    topic: 'Area of Parallelograms (Envision T7-1, Open-Up U1 L4-6)',
    objective_3m: 'Students will discover and apply the formula A = bh to find the area of a parallelogram.',
    standard: '6.G.1',
    do_now: '**Vocabulary Primer:**\n- **Parallelogram:** A 4-sided shape with two pairs of parallel sides.\n- **Base & Height:** They must ALWAYS form a 90-degree right angle (perpendicular).\n\n**Do Now:** How is a parallelogram different from a rectangle? How are they similar?',
    direct_instruction: '## The Doctor\'s Office Rule\nWhen you go to the doctor to get your height measured, do you lean sideways? NO! You stand straight up. The same is true in math: Height must be straight up and down, forming a 90° angle with the ground (the base).\n\n---\n\n## Transforming Shapes\nIf we take a parallelogram, chop off the slanted triangle on the left, and move it to the right... it turns into a perfect rectangle! This means a parallelogram has the EXACT same area formula as a rectangle: $A = b \\times h$.\n\n* **Turn and Talk (2 min):** Why is the slanted side of a parallelogram a "trap" number?',
    group_practice: 'Parallelogram Surgery: Students cut out paper parallelograms and tape them into rectangles to prove the formula.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Find the area of a parallelogram with base = 8 and height = 5.', correct_answer: 'A = 8 * 5 = 40 sq units.', misconception: 'Adding 8+5.\n\nIntervention: "We are finding area, so we multiply the two dimensions that form the right angle."' },
      { question: 'A parallelogram has a base of 10, a slanted side of 6, and a height of 4. Find the area.', correct_answer: 'A = b * h = 10 * 4 = 40 sq units. (Ignore the 6).', misconception: 'Multiplying 10 * 6 = 60.\n\nIntervention: Have them cross out the slanted side with a red pen before solving.' },
      { question: 'If the area of a parallelogram is 50 and the base is 10, what is the height?', correct_answer: '50 = 10 * h. Height = 5.', misconception: 'Multiplying 50 * 10 = 500.\n\nIntervention: Write out the equation A = b * h and plug in what you know.' },
      { question: 'A parallelogram has height 12 and base 3. Area?', correct_answer: '12 * 3 = 36.', misconception: 'Thinking the base must be the longer number.\n\nIntervention: "Does 12*3 equal something different than 3*12?"' },
      { question: 'Find the area: Base=7, Height=7, Slant=9.', correct_answer: '7 * 7 = 49.', misconception: 'Multiplying all three numbers.\n\nIntervention: "You only need TWO numbers to find area of a 2D shape."' },
      { question: 'A parallelogram has an area of 24. List two possible base and height pairs.', correct_answer: 'b=6, h=4 or b=8, h=3 or b=12, h=2.', misconception: 'Listing 24 and 24.\n\nIntervention: Remind them they are finding factors of 24.' },
      { question: 'Find the area: Base=5.5, Height=4.', correct_answer: '5.5 * 4 = 22.', misconception: 'Calculation error with decimals.\n\nIntervention: Do 5 * 4 = 20, then half of 4 is 2. 20 + 2 = 22.' },
      { question: 'If you double the height of a parallelogram, what happens to the area?', correct_answer: 'The area doubles.', misconception: 'The area gets 4 times bigger.\n\nIntervention: Test it out with a base of 2 and height of 3 vs height of 6.' },
      { question: 'Find the area: The base is vertical (8) and the horizontal distance to the other side is 3.', correct_answer: '8 * 3 = 24. You can turn the paper sideways so the base is on the bottom!', misconception: 'Saying you can\'t solve it because the base is on the side.\n\nIntervention: Rotate the paper 90 degrees.' },
      { question: 'Base=15, Slant=10, Height=8. Area?', correct_answer: '15 * 8 = 120.', misconception: 'Using the slant (15*10=150).\n\nIntervention: Re-emphasize the Doctor\'s Office rule. Cross out the slant.' }
    ],
    criteria_for_success: 'Consistently ignore the slanted side length and correctly apply A = bh.',
    exit_ticket: 'Find the area of the parallelogram (b=12, h=5, slant=6).'
  });

  // Day 8 (8/19)
  lessonPlans.push({
    date_start: '2026-08-19', week_label: '8/17-8/21',
    topic: 'Parallelograms to Triangles (Open-Up U1 L7)',
    objective_3m: 'Students will understand that a triangle is exactly half of a related parallelogram, establishing the relationship between their areas.',
    standard: '6.G.1',
    do_now: '**Vocabulary Primer:**\n- **Identical:** Exactly the same size and shape.\n- **Compose:** To put smaller pieces together to make a larger shape.\n\n**Do Now:** Find the area of a parallelogram with b=10, h=4.',
    direct_instruction: '## The Triangle Secret\nEvery single triangle in the world is secretly just half of a parallelogram. If you take ANY triangle, clone it, and flip it upside down, the two triangles will lock together to form a parallelogram.\n\n---\n\n## Using the Secret\nIf the parallelogram\'s area is $A = b \\times h$, and a triangle is exactly half of that, what should the triangle\'s area formula be?\n\n* **Turn and Talk (2 min):** Explain to your partner why dividing by 2 makes sense for a triangle.',
    group_practice: 'Triangle Clones: Students are given paper triangles. They must trace it, cut out the copy, and tape them together to form parallelograms.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'If two identical triangles form a parallelogram with an area of 40, what is the area of one triangle?', correct_answer: '40 / 2 = 20.', misconception: 'Saying 40.\n\nIntervention: "If the WHOLE thing is 40, what is HALF of it?"' },
      { question: 'A triangle has an area of 15. If you copy it to make a parallelogram, what is the parallelogram\'s area?', correct_answer: '15 * 2 = 30.', misconception: 'Dividing by 2 (7.5).\n\nIntervention: "Are you building a bigger shape or a smaller shape?"' },
      { question: 'A parallelogram has base 6 and height 4. You cut it diagonally into two triangles. Area of one triangle?', correct_answer: 'Parallelogram = 24. Triangle = 12.', misconception: 'Saying 24.\n\nIntervention: Draw the diagonal line. Ask "Does this triangle take up the whole shape?"' },
      { question: 'True or False: Only right triangles can form a rectangle.', correct_answer: 'True. Non-right triangles will form a slanted parallelogram.', misconception: 'False.\n\nIntervention: Have them try to make a rectangle out of two equilateral triangles.' },
      { question: 'A parallelogram area = 100. Cut into 2 triangles. Area of each?', correct_answer: '50.', misconception: 'Calculation error.\n\nIntervention: Mental math practice.' },
      { question: 'Triangle area = 8. Parallelogram area?', correct_answer: '16.', misconception: '8.\n\nIntervention: "You have TWO triangles now."' },
      { question: 'What do the triangle and the parallelogram share?', correct_answer: 'They have the exact same base and the exact same height.', misconception: 'They share the same area.\n\nIntervention: Look at the formulas. One is half.' },
      { question: 'Parallelogram area = 32. Base = 8. What is the area of the triangle made from it?', correct_answer: '32 / 2 = 16.', misconception: 'Dividing 8/2.\n\nIntervention: We want the area, not the base length.' },
      { question: 'A square has an area of 64. Cut it in half diagonally. Area of the triangle?', correct_answer: '64 / 2 = 32.', misconception: 'Finding the side length (8) and stopping.\n\nIntervention: "Did the question ask for the side length or the area?"' },
      { question: 'Triangle area = 25. Parallelogram area?', correct_answer: '50.', misconception: '12.5.\n\nIntervention: "Bigger shape means multiply!"' }
    ],
    criteria_for_success: 'Articulate that the area of a triangle is half the area of a related parallelogram.',
    exit_ticket: 'Explain the relationship between the area of a triangle and a parallelogram.'
  });

  // Day 9 (8/20)
  lessonPlans.push({
    date_start: '2026-08-20', week_label: '8/17-8/21',
    topic: 'Area of Triangles (Envision T7-2, Open-Up U1 L8-9)',
    objective_3m: 'Students will formally apply the formula A = 1/2 bh to find the area of acute, right, and obtuse triangles.',
    standard: '6.G.1',
    do_now: '**Vocabulary Primer:**\n- **Formula:** A mathematical rule written with variables.\n- **Substitute:** Replacing a letter variable with a known number.\n\n**Do Now:** What is half of 48? What is half of 7? What is half of 100?',
    direct_instruction: '## The Triangle Formula\nBecause a triangle is half a parallelogram, the formula is $A = \\frac{1}{2}bh$ (or $A = \\frac{b \\times h}{2}$). Both versions work perfectly!\n\n---\n\n## The "Pi Trap" of Triangles\nJust like parallelograms, triangles have a "trap" number. The height MUST drop straight down to the base at a 90° angle. If the triangle is obtuse, the height might even drop outside the shape!\n\n* **Turn and Talk (2 min):** Why is it usually easier to multiply the base and height first, and THEN divide by 2, rather than taking half of an odd number?',
    group_practice: 'Triangle Task Cards: Students calculate the area of 12 different triangles, being careful to identify and cross out the "trap" slant sides.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Find the area of a triangle with base = 10, height = 6.', correct_answer: '1/2 * 10 * 6 = 30.', misconception: '10 * 6 = 60.\n\nIntervention: "60 is the parallelogram. Don\'t forget to cut it in half!"' },
      { question: 'Triangle: Base = 5, Height = 8, Slanted sides = 6 and 7.', correct_answer: '1/2 * 5 * 8 = 20. (Ignore 6 and 7).', misconception: 'Multiplying 5 * 6.\n\nIntervention: Cross out slanted sides in red immediately.' },
      { question: 'Right triangle: Base = 12, Height = 5.', correct_answer: '1/2 * 12 * 5 = 30. (In a right triangle, the sides ARE the base and height).', misconception: 'Looking for a dotted line in the middle.\n\nIntervention: "Does the corner make a perfect L? Then those sides are the base and height!"' },
      { question: 'Obtuse triangle: Base = 4, outside Height = 9.', correct_answer: '1/2 * 4 * 9 = 18.', misconception: 'Including the dotted line distance on the floor as part of the base.\n\nIntervention: "Highlight ONLY the solid black line of the triangle as your base."' },
      { question: 'Triangle Area = 20. Base = 10. Find the Height.', correct_answer: '20 = 1/2 * 10 * h. 20 = 5 * h. h = 4.', misconception: '20 / 10 = 2.\n\nIntervention: "If the height was 2, the area would be 1/2*10*2 = 10. We need 20!"' },
      { question: 'Base = 7, Height = 7.', correct_answer: '1/2 * 49 = 24.5.', misconception: 'Saying you can\'t halve an odd number.\n\nIntervention: Remind them about money. What is half of 49 dollars?' },
      { question: 'Triangle on a grid: Base is 6 units wide, the tip is 4 units up.', correct_answer: '1/2 * 6 * 4 = 12.', misconception: 'Counting grid squares and guessing.\n\nIntervention: "Count the base, count the height, use the formula!"' },
      { question: 'Triangle: Base = 20, Height = 30.', correct_answer: '1/2 * 20 * 30 = 10 * 30 = 300.', misconception: 'Halving BOTH numbers (10 * 15 = 150).\n\nIntervention: "The formula says 1/2 is only used ONCE. You only halve one of the numbers."' },
      { question: 'Base = 11, Height = 4.', correct_answer: 'Halve the 4 to make 2. 11 * 2 = 22.', misconception: 'Trying to halve 11 and getting stuck on 5.5 * 4.\n\nIntervention: "You can halve EITHER number! Pick the even one!"' },
      { question: 'Triangle Area = 100. Height = 10. Find Base.', correct_answer: '100 = 1/2 * b * 10. 100 = 5 * b. b = 20.', misconception: 'Saying base is 10.\n\nIntervention: Check the math: 1/2 * 10 * 10 = 50. Not 100.' }
    ],
    criteria_for_success: 'Correctly identify base and height, ignore slant sides, and multiply by 1/2.',
    exit_ticket: 'Calculate the area of the obtuse triangle (b=8, h=7, slant=10).'
  });

  // Day 10 (8/21)
  lessonPlans.push({
    date_start: '2026-08-21', week_label: '8/17-8/21',
    topic: 'Area of Polygons (Envision T7-4, Open-Up U1 L11)',
    objective_3m: 'Students will find the area of complex polygons by decomposing them into known triangles and rectangles.',
    standard: '6.G.1',
    do_now: '**Vocabulary Primer:**\n- **Composite Figure:** A shape made out of two or more simpler shapes.\n\n**Do Now:** Find the area of a triangle (b=8, h=5) and a rectangle (b=8, h=3).',
    direct_instruction: '## The Ultimate Puzzle\nIn the real world, rooms and backyards aren\'t perfect rectangles. They are composite figures! To find the area, we have to slice them up into shapes we DO know: rectangles, parallelograms, and triangles.\n\n---\n\n## The Three-Step Process\n1. **Slice it:** Draw lines to break the shape into rectangles and triangles.\n2. **Solve it:** Find the area of each individual piece.\n3. **Sum it:** Add all the areas back together!\n\n* **Turn and Talk (2 min):** If you see a shape that looks like a house, how would you slice it?',
    group_practice: 'Floor Plan Architect: Students are given a blueprint of a weirdly shaped house and must calculate the total square footage to buy flooring.',
    independent_practice: '',
    structured_exemplars: [
      { question: 'Find the area of a "house" shape: a square (6x6) with a triangle roof (base 6, height 4).', correct_answer: 'Square: 36. Triangle: 1/2*6*4 = 12. Total: 36+12=48.', misconception: 'Forgetting to halve the triangle area.\n\nIntervention: "Did you use the rectangle formula or triangle formula for the roof?"' },
      { question: 'A shape looks like an arrow. A 2x6 rectangle attached to a triangle with base 4 and height 3.', correct_answer: 'Rectangle: 12. Triangle: 1/2*4*3 = 6. Total = 18.', misconception: 'Multiplying all the numbers.\n\nIntervention: Reiterate the 3-step process. Slice, Solve, Sum.' },
      { question: 'A trapezoid-like shape decomposed into a 5x4 rectangle and a triangle with base 3, height 4.', correct_answer: 'Rec: 20. Tri: 6. Total: 26.', misconception: 'Using the slanted side of the triangle instead of the height 4.\n\nIntervention: "The rectangle side IS the height of the triangle!"' },
      { question: 'A pentagon composed of a 10x8 rectangle and a triangle cut OUT of it (base 10, height 3).', correct_answer: 'Rec: 80. Tri: 15. Since it\'s cut OUT, subtract! 80 - 15 = 65.', misconception: 'Adding them (95).\n\nIntervention: "Is the triangle part of the shape, or is it empty space?"' },
      { question: 'A shape made of two triangles. Tri 1: b=4, h=4. Tri 2: b=4, h=6.', correct_answer: 'Tri 1: 8. Tri 2: 12. Total = 20.', misconception: 'Treating it as one big triangle.\n\nIntervention: "Do they have the same height? No, solve them separately."' },
      { question: 'A regular hexagon decomposed into 6 identical triangles. Each triangle has b=2, h=1.7. Area?', correct_answer: 'One Tri = 1/2 * 2 * 1.7 = 1.7. Six Triangles = 1.7 * 6 = 10.2.', misconception: 'Finding area of one and stopping.\n\nIntervention: "How many slices are in this hexagon pizza?"' },
      { question: 'A 4x4 square with a 1x1 square cut out of the corner.', correct_answer: '16 - 1 = 15.', misconception: '16 - 2 = 14.\n\nIntervention: What is the area of a 1x1 square? 1*1=1.' },
      { question: 'A shape made of 3 identical squares. Side length is 5. Area?', correct_answer: 'One square = 25. Three squares = 75.', misconception: '5*5*5 = 125.\n\nIntervention: "Find ONE square first."' },
      { question: 'An ice cream cone shape: Triangle (b=4, h=6) and a semi-circle (skip, not 6th grade math, replace with a rectangle 4x4 on top).', correct_answer: 'Tri: 12. Rec: 16. Total: 28.', misconception: 'Adding 6+4+4+4.\n\nIntervention: Perimeter vs Area.' },
      { question: 'A giant H shape. Two 2x8 side columns, and one 2x2 middle bridge.', correct_answer: 'Columns: 16+16=32. Bridge: 4. Total = 36.', misconception: 'Overlap errors.\n\nIntervention: Color the three distinct rectangles.' }
    ],
    criteria_for_success: 'Successfully decompose and sum areas for at least 3 out of 4 composite figures.',
    exit_ticket: 'Find the area of the arrow-shaped polygon.'
  });

  console.log(`Inserting Week 2 plans...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) console.error(`Error inserting ${plan.date_start}:`, error);
  }
};

run();
