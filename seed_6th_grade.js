import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const run = async () => {
  console.log('Clearing old lesson plans...');
  await supabase.from('lesson_plans').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const lessonPlans = [];

  // --- WEEK 1: Week of Inspirational Math (8/10 - 8/14) ---
  const week1Dates = ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14'];
  const w1Topics = ['WIM Day 1', 'WIM Day 2', 'WIM Day 3', 'WIM Day 4', 'WIM Day 5'];
  for (let i = 0; i < 5; i++) {
    lessonPlans.push({
      date_start: week1Dates[i],
      week_label: '8/10-8/14',
      topic: w1Topics[i] + ' - Growth Mindset & Norms',
      objective_3m: 'Students will understand and apply YouCubed Mathematical Norms to establish a foundation for a positive mathematical mindset in 6th grade.',
      standard: 'SMPs 1-8',
      do_now: 'Growth mindset reflection puzzle from YouCubed resources.',
      direct_instruction: 'Establish 6th grade classroom norms. Discuss how mistakes grow your brain.',
      group_practice: 'Collaborative task focusing on perseverance.',
      independent_practice: '',
      structured_exemplars: [
        {
          question: 'Journal Prompt (From YouCubed WIM Resource): Describe a time you struggled in math last year. How did you handle it?',
          correct_answer: 'Students should write a paragraph detailing a specific struggle and reflecting on their feelings. Ideal response acknowledges frustration but recognizes that effort leads to learning.',
          misconception: 'Students might write "I am just bad at math." \n\nIntervention: Guide them to reframe it using "yet" (I don\'t understand it yet).'
        }
      ],
      criteria_for_success: 'Students actively engage in math discourse and follow classroom norms.',
      exit_ticket: 'What is one thing you learned about your math mindset today?',
      checks_for_understanding: [
        { cfu: 'What does it mean to have a growth mindset in math?', method: 'Turn and Talk / DOK 2' }
      ]
    });
  }

  // --- WEEK 2 (8/17 - 8/21): Cluster 1 - Area (6.G.1) ---
  lessonPlans.push({
    date_start: '2026-08-17', week_label: '8/17-8/21',
    topic: 'Intro to Area (Open-Up U1 Lesson 1-3)',
    objective_3m: 'Students will find the area of polygons by decomposing them into rectangles or composing them into a larger rectangle.',
    standard: '6.G.1',
    do_now: 'Find the area of a 4x5 rectangle.',
    direct_instruction: 'Model decomposing an irregular L-shaped polygon into two smaller rectangles to find the total area.',
    group_practice: 'Partner work decomposing complex shapes on grid paper.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up U1 L2) Find the area of the given irregular polygon (L-shape).',
        correct_answer: 'Decompose vertically into a 3x5 rectangle and a 2x4 rectangle. Area 1 = 15. Area 2 = 8. Total Area = 23 sq units.',
        misconception: 'Students might count the perimeter instead of the area. \n\nIntervention: Remind them that area is the space INSIDE the figure. Have them count the physical grid squares inside.'
      },
      {
        question: '(From Open-Up U1 L3) Compose a rectangle around the triangle to find its area.',
        correct_answer: 'Draw a rectangle enclosing the triangle. Find the area of the rectangle, then subtract the area of the right triangles on the outside.',
        misconception: 'Subtracting the wrong outside areas. \n\nIntervention: Explicitly highlight the "empty space" triangles in a different color to visualize what needs to be removed.'
      }
    ],
    criteria_for_success: 'Students accurately decompose polygons into non-overlapping rectangles.',
    exit_ticket: 'Find the area of the provided irregular polygon.',
    checks_for_understanding: [{ cfu: 'Why can we split a shape into pieces to find its area?', method: 'Cold Call / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-18', week_label: '8/17-8/21',
    topic: 'Area of Parallelograms (Envision T7-1, Open-Up U1 L4-6)',
    objective_3m: 'Students will discover and apply the formula A = bh to find the area of a parallelogram.',
    standard: '6.G.1',
    do_now: 'Decompose a rectangle into a triangle and a trapezoid.',
    direct_instruction: 'Demonstrate cutting a right triangle off one side of a parallelogram and moving it to the other side to form a rectangle, proving A = bh.',
    group_practice: 'Cutting and rearranging physical paper parallelograms.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T7-1) Find the area of a parallelogram with a base of 8cm and a slant edge of 5cm, with a height of 4cm.',
        correct_answer: 'A = b * h. The base is 8, the height is 4 (the perpendicular distance). A = 8 * 4 = 32 sq cm.',
        misconception: 'Multiplying the base by the slant edge (8 * 5 = 40). \n\nIntervention: Remind students that height must be PERPENDICULAR to the base. Ask them "If you go to the doctor to measure your height, do you stand straight up or lean diagonally?"'
      }
    ],
    criteria_for_success: 'Identify the correct base and perpendicular height and apply A = bh.',
    exit_ticket: 'Find the area of the parallelogram.',
    checks_for_understanding: [{ cfu: 'Why do we not use the slanted side for height?', method: 'Think-Pair-Share / DOK 3' }]
  });

  lessonPlans.push({
    date_start: '2026-08-19', week_label: '8/17-8/21',
    topic: 'Parallelograms to Triangles (Open-Up U1 Lesson 7)',
    objective_3m: 'Students will understand that a triangle is half of a parallelogram, establishing the relationship between their areas.',
    standard: '6.G.1',
    do_now: 'Find the area of a parallelogram with b=10, h=6.',
    direct_instruction: 'Take two identical paper triangles, put them together to form a parallelogram. Conclude the area of one triangle is half the parallelogram.',
    group_practice: 'Manipulating identical triangles to form parallelograms.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up U1 L7) Use two identical triangles to form a parallelogram. If the parallelogram\'s area is 24, what is the area of one triangle?',
        correct_answer: 'The parallelogram is made of 2 equal triangles. 24 / 2 = 12. Area = 12.',
        misconception: 'Stating the area is 24. \n\nIntervention: Have them physically pull the two triangles apart and ask "If the whole thing is 24, how much is just this one piece?"'
      }
    ],
    criteria_for_success: 'Articulate that the area of a triangle is half the area of a related parallelogram.',
    exit_ticket: 'Explain the relationship between the area of a triangle and a parallelogram.',
    checks_for_understanding: [{ cfu: 'How many identical triangles make a parallelogram?', method: 'Choral Response / DOK 1' }]
  });

  lessonPlans.push({
    date_start: '2026-08-20', week_label: '8/17-8/21',
    topic: 'Area of Triangles (Envision T7-2, Open-Up U1 L8-9)',
    objective_3m: 'Students will apply the formula A = 1/2 bh to find the area of triangles.',
    standard: '6.G.1',
    do_now: 'What is half of 48?',
    direct_instruction: 'Formalize the formula A = 1/2 bh or A = (bh)/2. Model identifying the base and height.',
    group_practice: 'Stations finding the area of various acute, obtuse, and right triangles.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T7-2) Find the area of a triangle with base 12 and height 7.',
        correct_answer: 'A = 1/2 * b * h \nA = 1/2 * 12 * 7 \nA = 6 * 7 \nA = 42 sq units.',
        misconception: 'Forgetting to multiply by 1/2. (12 * 7 = 84). \n\nIntervention: If they get 84, ask them "What shape did you just find the area for?" (A rectangle/parallelogram). "How do we fix it for a triangle?"'
      }
    ],
    criteria_for_success: 'Correctly identify base and height and multiply by 1/2.',
    exit_ticket: 'Calculate the area of the given obtuse triangle.',
    checks_for_understanding: [{ cfu: 'Does it matter which side we call the base?', method: 'Turn and Talk / DOK 3' }]
  });

  lessonPlans.push({
    date_start: '2026-08-21', week_label: '8/17-8/21',
    topic: 'Area of Polygons (Envision T7-4, Open-Up U1 L11)',
    objective_3m: 'Students will find the area of complex polygons by decomposing them into triangles and rectangles.',
    standard: '6.G.1',
    do_now: 'Find the area of a triangle (b=8, h=5) and a rectangle (b=8, h=3).',
    direct_instruction: 'Model decomposing a pentagon or hexagon into known shapes, finding individual areas, and summing them.',
    group_practice: 'Gallery walk solving complex composite figures.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up U1 L11 Task 3) Find the area of the composite figure (house shape).',
        correct_answer: 'Decompose into a square (bottom) and a triangle (roof). \nSquare: 6x6 = 36. \nTriangle: base 6, height 4. 1/2(6)(4) = 12. \nTotal = 36 + 12 = 48 sq units.',
        misconception: 'Multiplying all the outside numbers together. \n\nIntervention: Have them use highlighters to color the distinct shapes they see inside the figure before doing any math.'
      }
    ],
    criteria_for_success: 'Successfully decompose and sum areas for at least 3 out of 4 composite figures.',
    exit_ticket: 'Find the area of the arrow-shaped polygon.',
    checks_for_understanding: [{ cfu: 'What shapes should we look for when decomposing?', method: 'Popcorn / DOK 1' }]
  });

  // --- WEEK 3 (8/24 - 8/28): Cluster 1 - Surface Area (6.G.4) ---
  lessonPlans.push({
    date_start: '2026-08-24', week_label: '8/24-8/28',
    topic: 'Surface Area (Open-Up U1 L12/L18, Envision T7-6)',
    objective_3m: 'Students will understand that surface area is the sum of the areas of all faces of a 3D figure.',
    standard: '6.G.4',
    do_now: 'How many faces does a rectangular prism (a box) have?',
    direct_instruction: 'Introduce the concept of surface area vs volume (wrapping paper vs water).',
    group_practice: 'Calculating surface area of physical boxes by measuring faces.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T7-6) Find the surface area of a rectangular prism with dimensions 5x4x3.',
        correct_answer: 'Front/Back: 5x3=15 (x2) = 30\nTop/Bottom: 5x4=20 (x2) = 40\nLeft/Right: 4x3=12 (x2) = 24\nTotal: 30 + 40 + 24 = 94 sq units.',
        misconception: 'Multiplying 5 * 4 * 3 = 60. \n\nIntervention: Explain that this is VOLUME (filling the box). Surface area is covering the OUTSIDE. Have them draw the 6 faces.'
      }
    ],
    criteria_for_success: 'Calculate the area of all 6 faces and add them together.',
    exit_ticket: 'Find the surface area of a cube with edge length 4.',
    checks_for_understanding: [{ cfu: 'Difference between surface area and volume?', method: 'Whiteboard / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-25', week_label: '8/24-8/28',
    topic: 'Nets (Envision T7-5, Open-Up U1 L14-15)',
    objective_3m: 'Students will represent 3D figures using nets and use them to find surface area.',
    standard: '6.G.4',
    do_now: 'Draw what a cereal box would look like if you cut it open and laid it flat.',
    direct_instruction: 'Model drawing a net for a rectangular prism and labeling the dimensions on the net.',
    group_practice: 'Matching 3D figures to their corresponding 2D nets.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up U1 L14) Draw a net for a triangular prism and find its surface area.',
        correct_answer: 'Net should show 3 rectangles and 2 triangles. \nTriangles: 1/2(b)(h) x 2. \nRectangles: l x w for each of the 3. \nSum all 5 areas.',
        misconception: 'Drawing 4 rectangles instead of 3. \n\nIntervention: Have them hold a physical triangular prism (Toblerone box) and count the rectangular sides.'
      }
    ],
    criteria_for_success: 'Accurately draw a net and use it to calculate total surface area.',
    exit_ticket: 'Draw the net for a 2x2x5 prism.',
    checks_for_understanding: [{ cfu: 'How does a net help us find surface area?', method: 'Class Discussion / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-26', week_label: '8/24-8/28',
    topic: 'Surface Area of Pyramids (Envision T1-7)',
    objective_3m: 'Students will draw nets for square and triangular pyramids to find their surface area.',
    standard: '6.G.4',
    do_now: 'What shapes make up a square pyramid?',
    direct_instruction: 'Model the net of a square pyramid (1 square, 4 triangles). Calculate the area of the base and the 4 triangular faces.',
    group_practice: 'Calculating surface area of various pyramids.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision T1-7) Find the surface area of a square pyramid with a base of 6x6 and triangular faces with a height of 8.',
        correct_answer: 'Base Area: 6x6 = 36.\nTriangle Area: 1/2 * 6 * 8 = 24. Since there are 4 triangles: 24 * 4 = 96.\nTotal SA = 36 + 96 = 132 sq units.',
        misconception: 'Forgetting to multiply the triangle area by 4, or using the slant height as the base. \n\nIntervention: Ask them "How many triangles are attached to the square base?" (4).'
      }
    ],
    criteria_for_success: 'Find the area of the base and all triangular faces, then sum them.',
    exit_ticket: 'Find the surface area of a square pyramid (base 5, triangle height 10).',
    checks_for_understanding: [{ cfu: 'How is the net of a pyramid different from a prism?', method: 'Turn/Talk / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-08-27', week_label: '8/24-8/28',
    topic: 'End of Unit Review',
    objective_3m: 'Students will review and synthesize all Cluster 1 geometry concepts (Area, Surface Area, Nets).',
    standard: '6.G.1, 6.G.4',
    do_now: 'Write down one concept you need to review the most.',
    direct_instruction: 'Review EOG Released Questions regarding geometry.',
    group_practice: 'Review Game (Blooket/Kahoot) and iReady Standards Mastery.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: 'EOG Release: What is the area of a right triangle with a base of 14cm and a height of 9cm?',
        correct_answer: 'A = 1/2 * 14 * 9 = 7 * 9 = 63 sq cm.',
        misconception: '14 * 9 = 126. \n\nIntervention: Write the formula at the top of the scratch paper before solving.'
      }
    ],
    criteria_for_success: 'Identify areas of weakness and practice.',
    exit_ticket: 'What topic will you study tonight?',
    checks_for_understanding: [{ cfu: 'Strategy for EOG geometry questions?', method: '1-on-1 conferring / DOK 3' }]
  });

  lessonPlans.push({
    date_start: '2026-08-28', week_label: '8/24-8/28',
    topic: 'Cluster 1 Post Assessment',
    objective_3m: 'Students will demonstrate mastery of Cluster 1 geometry standards on their Post Assessment.',
    standard: '6.G.1, 6.G.4',
    do_now: 'Prepare testing materials.',
    direct_instruction: 'Explain testing expectations (Teacher Access: 6739808, Student Code: BY3MA6K).',
    group_practice: 'N/A',
    independent_practice: 'Cluster 1 Post Assessment. **Teacher Note:** Continuously actively monitor. Check that students are drawing nets on their scratch paper for surface area problems.',
    structured_exemplars: [],
    criteria_for_success: 'Score 80%+ on Assessment.',
    exit_ticket: 'Post-test reflection.',
    checks_for_understanding: [{ cfu: 'Accommodations met?', method: 'Observation / DOK 1' }]
  });

  // --- WEEK 4 (8/31 - 9/4): Cluster 2 - Factors & Multiples (6.NS.4) ---
  lessonPlans.push({
    date_start: '2026-08-31', week_label: '8/31-9/4',
    topic: 'Common Factors (Open-Up U7 Lesson 21, Hands2Mind L5)',
    objective_3m: 'Students will find the greatest common factor (GCF) of two whole numbers less than or equal to 100.',
    standard: '6.NS.4',
    do_now: 'List all the factors of 12 and 18.',
    direct_instruction: 'Model listing factors using a T-chart and circling the common factors to find the greatest one.',
    group_practice: 'Hands2Mind Lesson 5 activity using manipulatives to find GCF.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up U7 L21) Find the GCF of 24 and 36.',
        correct_answer: 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24.\nFactors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.\nCommon: 1, 2, 3, 4, 6, 12.\nGCF = 12.',
        misconception: 'Stopping at 6 because they miss 12. \n\nIntervention: Require students to write factors in PAIRS (1x24, 2x12, 3x8, 4x6) so they don\'t miss the larger numbers.'
      }
    ],
    criteria_for_success: 'Systematically list factors and accurately identify the GCF.',
    exit_ticket: 'Find the GCF of 30 and 45.',
    checks_for_understanding: [{ cfu: 'What is the difference between a factor and a multiple?', method: 'Cold Call / DOK 2' }]
  });

  lessonPlans.push({
    date_start: '2026-09-01', week_label: '8/31-9/4',
    topic: 'Common Multiples (Open-Up U7 Lesson 22)',
    objective_3m: 'Students will find the least common multiple (LCM) of two whole numbers less than or equal to 12.',
    standard: '6.NS.4',
    do_now: 'List the first 5 multiples of 4 and 6.',
    direct_instruction: 'Model writing lists of multiples until a common match is found. Relate to real-world scenarios (e.g. buying hot dogs in packs of 8 and buns in packs of 6).',
    group_practice: 'Word problem carousel focusing on LCM.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up U7 L22) Find the LCM of 8 and 12.',
        correct_answer: 'Multiples of 8: 8, 16, 24, 32, 40...\nMultiples of 12: 12, 24, 36...\nFirst match is 24. LCM = 24.',
        misconception: 'Multiplying 8 x 12 = 96 and calling that the LCM. \n\nIntervention: Explain that 96 IS a common multiple, but not the LEAST common. Have them write the lists.'
      }
    ],
    criteria_for_success: 'List multiples in order and identify the first common match.',
    exit_ticket: 'Find the LCM of 6 and 9.',
    checks_for_understanding: [{ cfu: 'Why do we look for the LEAST common multiple but the GREATEST common factor?', method: 'Think-Pair-Share / DOK 3' }]
  });

  lessonPlans.push({
    date_start: '2026-09-02', week_label: '8/31-9/4',
    topic: 'GCF and LCM (Open-Up U7 Lesson 23)',
    objective_3m: 'Students will distinguish between GCF and LCM in real-world word problems and solve them accurately.',
    standard: '6.NS.4',
    do_now: 'Find the GCF and LCM of 6 and 8.',
    direct_instruction: 'Teach keywords for GCF (split, divide equally, greatest) vs LCM (repeating event, both at the same time, least).',
    group_practice: 'Sorting word problems into "GCF" or "LCM" categories before solving.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Open-Up U7 L23) Sarah has 16 red flowers and 24 yellow flowers. She wants to make identical bouquets with no flowers left over. What is the greatest number of bouquets she can make?',
        correct_answer: 'This is a GCF problem (splitting into groups). GCF of 16 and 24 is 8. She can make 8 bouquets.',
        misconception: 'Finding the LCM (48). \n\nIntervention: Ask "Does she have 48 flowers? No, she is splitting what she has. Are factors or multiples used for splitting?"'
      }
    ],
    criteria_for_success: 'Correctly identify the operation needed and calculate GCF/LCM.',
    exit_ticket: 'Determine if a problem is GCF or LCM and solve.',
    checks_for_understanding: [{ cfu: 'What keywords tell us to find the LCM?', method: 'Mini-whiteboards / DOK 1' }]
  });

  lessonPlans.push({
    date_start: '2026-09-03', week_label: '8/31-9/4',
    topic: 'GCF and LCM Practice (Envision Topic 3 Lesson 2)',
    objective_3m: 'Students will practice finding GCF and LCM using prime factorization (factor trees).',
    standard: '6.NS.4',
    do_now: 'Is 15 prime or composite? What about 17?',
    direct_instruction: 'Model creating a factor tree and using a Venn Diagram of prime factors to find GCF (intersection) and LCM (union).',
    group_practice: 'Creating giant factor trees on chart paper.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision Topic 3 L2) Use prime factorization to find the GCF of 36 and 60.',
        correct_answer: '36 = 2 * 2 * 3 * 3. \n60 = 2 * 2 * 3 * 5. \nCommon primes: 2, 2, 3. \nGCF = 2 * 2 * 3 = 12.',
        misconception: 'Making a mistake in the factor tree (e.g., saying 60 = 6 * 10, and stopping because they think 6 and 10 are prime). \n\nIntervention: Circle prime numbers. If it\'s not circled, you must keep branching.'
      }
    ],
    criteria_for_success: 'Accurately break numbers down into prime factors to find GCF/LCM.',
    exit_ticket: 'Use a factor tree to find the prime factorization of 48.',
    checks_for_understanding: [{ cfu: 'How do you know when to stop a factor tree?', method: 'Popcorn / DOK 1' }]
  });

  lessonPlans.push({
    date_start: '2026-09-04', week_label: '8/31-9/4',
    topic: 'GCF and LCM Application (Envision Topic 3 Lesson 2)',
    objective_3m: 'Students will apply GCF and LCM strategies to solve complex, multi-step problems.',
    standard: '6.NS.4',
    do_now: 'Find the LCM of 10 and 15 using a Venn Diagram.',
    direct_instruction: 'Review common pitfalls in word problems and the Distributive Property using GCF (e.g. 36 + 8 = 4(9 + 2)).',
    group_practice: 'Task cards focusing on Distributive property and GCF.',
    independent_practice: '',
    structured_exemplars: [
      {
        question: '(From Envision Topic 3 L2) Use the GCF to rewrite 24 + 32 using the distributive property.',
        correct_answer: 'GCF of 24 and 32 is 8. \n24 = 8 * 3. \n32 = 8 * 4. \nRewrite: 8(3 + 4).',
        misconception: 'Using a common factor that is not the GREATEST (e.g., using 2: 2(12 + 16)). \n\nIntervention: Remind them they must pull out the LARGEST possible piece. Have them check if 12 and 16 still share a factor.'
      }
    ],
    criteria_for_success: 'Express the sum of two numbers using the distributive property and GCF.',
    exit_ticket: 'Rewrite 15 + 25 using the distributive property.',
    checks_for_understanding: [{ cfu: 'What property uses the GCF and parentheses?', method: 'Choral / DOK 1' }]
  });

  console.log(`Inserting ${lessonPlans.length} 6th Grade daily lesson plans with structured visual exemplars...`);
  
  for (const plan of lessonPlans) {
    const { error } = await supabase.from('lesson_plans').insert([plan]);
    if (error) {
      console.error(`Error inserting plan for ${plan.date_start}:`, error);
    } else {
      console.log(`Success: ${plan.date_start} (${plan.week_label})`);
    }
  }
};

run();
