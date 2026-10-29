const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const plans = [
  {
    date_start: '2026-09-14',
    topic: '[enVision T6 L2] Reflection (8.G.3)',
    objective_3m: 'SWBAT analyze reflections, identify lines of reflection, and determine the coordinate rules for reflecting figures across the x- and y-axes.',
    standard: '8.G.3',
    do_now: 'Graph the point $A(3, 4)$ on a coordinate plane. Translate the point 4 units left and 2 units down to create $A\'$. What are the coordinates of $A\'$?',
    direct_instruction: `## Conceptual Understanding of Reflections\n---\nWe will begin with **Savvas Envision Example 1**. Look at the image of the patio. We want to move the grill from one side of the patio to the opposite side so that it is a mirror image. How does reflecting the grill differ from translating it? Notice that when we fold the patio along the center line, the original grill (pre-image) and the new grill (image) match exactly. This center line is our **line of reflection**. \n\n---\n## Visual and Coordinate Representation\n---\nIn **Envision Example 2**, we will analyze reflections on a coordinate grid. Look at triangle $ABC$ and its reflection triangle $A\'B\'C\'$. What do you notice about the distance from point $A$ to the y-axis compared to point $A\'$ to the y-axis? They are equal! Scholars will record observations in their notes: corresponding points on a pre-image and its reflection are always an **equal distance** from the line of reflection.\n\n---\n## Procedural Rules for Reflection\n---\nFinally, in **Envision Example 3**, we will discover the coordinate rules. Let's list the coordinates of triangle $ABC$ before and after a reflection across the x-axis. What pattern do we see? The x-coordinates stay the same, but the y-coordinates become opposite. Rule: $(x, y) \\rightarrow (x, -y)$. What happens when reflecting across the y-axis? Rule: $(x, y) \\rightarrow (-x, y)$.`,
    exit_ticket: 'Reflect the point $P(-2, 5)$ across the y-axis. What are the new coordinates? Explain how you know.',
    structured_exemplars: [
      { question: 'Conceptual: Describe in your own words what a line of reflection is.', correct_answer: 'It is an imaginary line where if you fold the plane, the pre-image and image match exactly.', misconception: 'Thinking it is just a line the shape slides along.' },
      { question: 'Visual: Is Figure A\'B\'C\'D\' a reflection of Figure ABCD over a slanted line f? Explain.', correct_answer: 'No, because the distance from corresponding points to the line f is not equal.', misconception: 'Assuming any flip is a reflection without checking distance to the line.' },
      { question: 'Coordinate Rule: Which of the following statements is true about the values of the coordinate points in a figure when the figure is reflected over the y-axis?', correct_answer: 'Only the y-values remain the same. The x-values change signs.', misconception: 'Thinking both x and y change.' },
      { question: 'Procedural: If $\\triangle STU$ with $S(-4, 2)$ is reflected over the y-axis, what are the coordinates of $S\'$?', correct_answer: '$S\'(4, 2)$', misconception: 'Changing both coordinates to $(4, -2)$.' },
      { question: 'Procedural: $\\triangle A\'B\'C\'$ is a reflection of $\\triangle ABC$. If $A(-2, 1)$ becomes $A\'(2, 1)$, which choice best describes the reflection?', correct_answer: 'A reflection over the y-axis.', misconception: 'A reflection over the x-axis.' },
      { question: 'Application: The vertices of Figure ABCD are A(1, 1), B(2, 3), C(4, 3), and D(5, 1). If Figure ABCD is reflected over the line $y = -1$, find the coordinates of vertex B\'.', correct_answer: '$B\'(2, -5)$', misconception: 'Applying the x-axis rule instead of counting distance to $y = -1$.' },
      { question: 'Justification: A student says reflecting across the x-axis and then the y-axis is the same as translating the figure. Are they correct? Explain.', correct_answer: 'No, it is equivalent to a 180 degree rotation, not a translation.', misconception: 'Assuming two reflections cancel out orientation changes.' },
      { question: 'Visual: Graph the segment $MN$ with endpoints $M(1, 2)$ and $N(3, 4)$. Reflect it across the x-axis.', correct_answer: '$M\'(1, -2)$ and $N\'(3, -4)$', misconception: 'Negating the x-values instead.' }
    ]
  },
  {
    date_start: '2026-09-15',
    topic: '[enVision T6 L3] Rotations (8.G.3)',
    objective_3m: 'SWBAT analyze rotations on a coordinate plane, identify the center and angle of rotation, and discover coordinate rules for 90, 180, and 270 degree rotations.',
    standard: '8.G.3',
    do_now: 'Reflect the triangle with vertices $A(1,1), B(3,1), C(1,4)$ across the x-axis. What are the coordinates of $A\', B\', C\'$?',
    direct_instruction: `## Conceptualizing Rotations\n---\nWe will use **Savvas Envision Example 1** to introduce rotations. Think of a steering wheel or a clock hand. When we turn it, it rotates around a fixed center point. We will model rotating a shape 90 degrees around the origin using tracing paper. Scholars will observe that the shape's orientation changes, but its size and shape remain congruent. \n\n---\n## Exploring Coordinate Rules\n---\nIn **Envision Example 2**, scholars will interact with coordinates. We will rotate a triangle 180 degrees about the origin. By recording the pre-image and image coordinates in a table, scholars will deduce the algebraic rule: $(x, y) \\rightarrow (-x, -y)$. We will emphasize checking our rule by testing a point. \n\n---\n## Application and Justification\n---\nFor **Envision Example 3**, we will distinguish between clockwise and counterclockwise rotations. Scholars will analyze a figure that has already been rotated and work backward to determine the degree and direction of the rotation. What specific questions will we ask? "How can tracing paper help us verify the degree of rotation?" and "Why does a 90 degree clockwise rotation land in the same quadrant as a 270 degree counterclockwise rotation?"`,
    exit_ticket: 'Rotate the point $K(-3, 4)$ 180 degrees about the origin. State the new coordinates and the algebraic rule you used.',
    structured_exemplars: [
      { question: 'Conceptual: What two pieces of information do you need to perform a rotation?', correct_answer: 'The center of rotation and the angle/direction of rotation.', misconception: 'Thinking you only need an angle.' },
      { question: 'Visual: Rotate a triangle 90 degrees clockwise around the origin. Which quadrant does it move to if it started in Quadrant I?', correct_answer: 'Quadrant IV.', misconception: 'Quadrant II (confusing clockwise and counterclockwise).' },
      { question: 'Procedural: Apply the rule $(x, y) \\rightarrow (-y, x)$ to the point $P(2, 5)$. What type of rotation is this?', correct_answer: '$P\'(-5, 2)$. This is a 90 degree counterclockwise rotation.', misconception: 'Thinking it is a reflection.' },
      { question: 'Procedural: Rotate $A(4, -1)$ 180 degrees about the origin.', correct_answer: '$A\'(-4, 1)$', misconception: 'Switching the x and y coordinates.' },
      { question: 'Application: A figure is rotated 90 degrees clockwise. If a pre-image point is $(-3, -6)$, what is the image point?', correct_answer: '$(-6, 3)$', misconception: 'Applying the counterclockwise rule.' },
      { question: 'Justification: Does rotating a figure change its perimeter? Explain.', correct_answer: 'No, rotations are rigid motions that preserve side lengths.', misconception: 'Thinking the distance from the origin changes the size.' },
      { question: 'Visual: Identify the rotation that maps $\\triangle ABC$ to $\\triangle A\'B\'C\'$ if $A(1,1)$ maps to $A\'(-1,-1)$.', correct_answer: '180 degree rotation about the origin.', misconception: 'Reflection across the origin.' },
      { question: 'Procedural: Rotate the segment with endpoints $(0,4)$ and $(2,0)$ 270 degrees counterclockwise.', correct_answer: '$(4,0)$ and $(0,-2)$', misconception: 'Confusing 270 counterclockwise with 90 counterclockwise.' }
    ]
  },
  {
    date_start: '2026-09-16',
    topic: '[enVision T6 L4] Compose Transformations (8.G.3)',
    objective_3m: 'SWBAT perform and analyze a sequence of multiple rigid transformations and understand that the order of composition matters.',
    standard: '8.G.3',
    do_now: 'Apply a 90 degree clockwise rotation to the point $M(-2, 3)$.',
    direct_instruction: `## Understanding Composition\n---\nUsing **Savvas Envision Example 1**, we will explore what happens when we combine transformations. If we translate a figure and then reflect it, is it the same as reflecting it and then translating it? We will model this on the board using a physical cutout. Scholars will observe that the **order matters**. \n\n---\n## Procedural Application\n---\nIn **Envision Example 2**, we will track a point's coordinates through a sequence. Start with $A(2, 4)$. Step 1: Reflect across the x-axis $\\rightarrow A\'(2, -4)$. Step 2: Translate left 3 units $\\rightarrow A\'\'(-1, -4)$. Scholars will record the intermediate steps in their guided notes to build a mathematical record of the process. \n\n---\n## Working Backward\n---\nIn **Envision Example 3**, we will look at a pre-image and a final image and determine the sequence of transformations that connects them. We will ask: "What properties changed? Did the orientation change?" If the orientation changed, a reflection must be involved. We will justify our chosen sequence by testing the coordinates.`,
    exit_ticket: 'Translate $P(1,1)$ up 2 units, then reflect across the y-axis. What are the final coordinates?',
    structured_exemplars: [
      { question: 'Conceptual: What is a composition of transformations?', correct_answer: 'A combination of two or more transformations performed one after the other.', misconception: 'Thinking it is a single new type of transformation.' },
      { question: 'Conceptual: Does the order of transformations matter? Provide an example.', correct_answer: 'Yes. Translating right 2 then reflecting over the y-axis is different from reflecting then translating right 2.', misconception: 'Thinking order is commutative.' },
      { question: 'Procedural: Reflect $A(3, 4)$ over the x-axis, then rotate 180 degrees.', correct_answer: '$A\'\'(-3, 4)$', misconception: 'Applying the rules simultaneously and mixing up the signs.' },
      { question: 'Procedural: Translate $B(-1, -2)$ by $\\langle 4, 3 \\rangle$, then reflect across the y-axis.', correct_answer: '$B\'\'(-3, 1)$', misconception: 'Reflecting across the x-axis instead.' },
      { question: 'Application: A figure is rotated 90 degrees clockwise, then translated down 5 units. If the original point was $(2, 2)$, find the final point.', correct_answer: '$(2, -7)$', misconception: 'Translating before rotating.' },
      { question: 'Justification: Two different sequences of transformations map Figure A to Figure B. Is this possible? Explain.', correct_answer: 'Yes, multiple paths can result in the same final image.', misconception: 'Thinking there is only one unique sequence.' },
      { question: 'Visual: Determine the sequence of transformations that maps $\\triangle ABC$ to $\\triangle A\'\'B\'\'C\'\'$ given in the diagram.', correct_answer: 'A reflection across the y-axis followed by a translation down 3 units.', misconception: 'Identifying it as a single rotation.' },
      { question: 'Procedural: Write the coordinate rule for a reflection across the x-axis followed by a 180 degree rotation.', correct_answer: '$(x, y) \\rightarrow (-x, y)$', misconception: '$(x, y) \\rightarrow (-x, -y)$' }
    ]
  },
  {
    date_start: '2026-09-17',
    topic: '[Open-Up U1 L11-L12] Congruent Figures/Polygons (8.G.2)',
    objective_3m: 'SWBAT define congruence in terms of rigid transformations and verify that two figures are congruent if there is a sequence of rigid motions mapping one to the other.',
    standard: '8.G.2',
    do_now: 'Describe a sequence of two transformations that maps $\\triangle ABC$ to $\\triangle A\'\'B\'\'C\'\'$.',
    direct_instruction: `## Defining Congruence\n---\nWe will use the **Open Up Resources Unit 1 Lesson 11** introductory task. What does it mean for two shapes to be exactly the same? We will define **congruence**: Two figures are congruent if and only if one can be mapped onto the other using a sequence of rigid transformations (translations, rotations, reflections). \n\n---\n## Verifying Congruence\n---\nIn the **Lesson 12 Activity**, scholars will be given pairs of polygons. They must determine if they are congruent. How? By finding the specific sequence of rigid motions. I will model using tracing paper to slide, turn, and flip polygon A onto polygon B. We will ask: "If they don't match up exactly, what does that tell us?" \n\n---\n## Corresponding Parts\n---\nWe will explicitly discuss corresponding parts. If polygon $ABCD$ is congruent to polygon $WXYZ$, then side $AB$ corresponds to side $WX$, and angle $C$ corresponds to angle $Y$. Scholars will complete a matching representation in their notes to connect the visual geometry to the vertex naming convention.`,
    exit_ticket: 'Are all rectangles congruent? Explain using the definition of rigid transformations.',
    structured_exemplars: [
      { question: 'Conceptual: Define what it means for two figures to be congruent.', correct_answer: 'They are congruent if a sequence of rigid transformations maps one exactly onto the other.', misconception: 'Thinking they just need to look similar.' },
      { question: 'Visual: Are these two triangles congruent? (One is translated and rotated)', correct_answer: 'Yes, because a rotation and translation preserves side lengths and angles.', misconception: 'No, because they are facing different directions.' },
      { question: 'Procedural: If $\\triangle LMN \\cong \\triangle PQR$, which angle corresponds to $\\angle M$?', correct_answer: '$\\angle Q$', misconception: '$\\angle P$' },
      { question: 'Application: A square has a side length of 5. It is rotated 90 degrees and reflected. What is the side length of the new square?', correct_answer: '5', misconception: 'Thinking the side length changes.' },
      { question: 'Justification: Can a triangle with a perimeter of 12 be congruent to a triangle with a perimeter of 15? Explain.', correct_answer: 'No. Rigid transformations preserve distance, so congruent figures must have the same perimeter.', misconception: 'Yes, if you use a dilation (which is not a rigid motion).' },
      { question: 'Procedural: Name the sequence of transformations that proves Figure 1 is congruent to Figure 2.', correct_answer: 'A translation of $\\langle 3, 0 \\rangle$ and a reflection across the x-axis.', misconception: 'Naming only one of the two transformations.' },
      { question: 'Visual: Polygon $ABCDE$ is mapped to $VWXYZ$. Which side corresponds to $CD$?', correct_answer: 'Side $XY$', misconception: 'Side $YZ$' },
      { question: 'Conceptual: Does congruence depend on the coordinate plane?', correct_answer: 'No, congruence is a property of the shapes themselves, regardless of where they are on the plane.', misconception: 'Thinking congruence requires coordinates to prove.' }
    ]
  },
  {
    date_start: '2026-09-18',
    topic: '[enVision T6 L5] Understand Congruent Figures (8.G.2)',
    objective_3m: 'SWBAT write congruence statements and describe the specific sequence of rigid motions that exhibits the congruence between two figures.',
    standard: '8.G.2',
    do_now: 'If $\\triangle ABC \\cong \\triangle DEF$, and $AB = 6$, what is the length of $DE$?',
    direct_instruction: `## Exhibiting Congruence\n---\nUsing **Savvas Envision Example 1**, we will take two figures on a coordinate plane that we know are congruent and focus on **describing the sequence**. We will model writing out the full transformation rule. For example: "A translation 4 units right, followed by a 90 degree clockwise rotation." Scholars must be precise in their language. \n\n---\n## Writing Congruence Statements\n---\nIn **Envision Example 2**, we will focus on the notation. When we write $\\triangle ABC \\cong \\triangle XYZ$, the order of the letters matters immensely. I will ask: "Why can't we write $\\triangle ABC \\cong \\triangle YXZ$?" Scholars will analyze the coordinates to prove that vertex A maps to vertex X, not Y. \n\n---\n## Putting It All Together\n---\nIn **Envision Example 3**, scholars will be given a pre-image, a sequence of rules, and must graph the final image and write the congruence statement. This moves scholars from conceptual understanding to procedural application and justification.`,
    exit_ticket: 'Given $\\triangle DOG \\cong \\triangle CAT$. List all three pairs of congruent corresponding sides.',
    structured_exemplars: [
      { question: 'Conceptual: Why does the order of vertices matter in a congruence statement?', correct_answer: 'Because it identifies which specific parts (angles and sides) correspond to each other.', misconception: 'Thinking the order is just alphabetical.' },
      { question: 'Procedural: If $QUAD \\cong KITE$, what side corresponds to $AD$?', correct_answer: 'Side $KE$', misconception: 'Side $IT$' },
      { question: 'Visual: Describe the sequence that maps $\\triangle ABC$ onto $\\triangle DEF$.', correct_answer: 'A reflection across the y-axis, then a translation up 2 units.', misconception: 'Describing it backward.' },
      { question: 'Procedural: $\\triangle ABC$ has vertices $A(0,0), B(0,3), C(4,0)$. It is translated right 1 unit. Write the congruence statement for the image.', correct_answer: '$\\triangle ABC \\cong \\triangle A\'B\'C\'$ where $A\'(1,0), B\'(1,3), C\'(5,0)$.', misconception: 'Writing the wrong coordinates.' },
      { question: 'Application: Create a sequence of two transformations that proves a rectangle in Quadrant I is congruent to a rectangle in Quadrant III.', correct_answer: 'A reflection across the x-axis, then a reflection across the y-axis.', misconception: 'Only providing one transformation.' },
      { question: 'Justification: Can two circles with different radii be congruent? Why?', correct_answer: 'No, because no rigid motion can change the radius of a circle.', misconception: 'Thinking they can be mapped by translation.' },
      { question: 'Visual: Identify the error in this congruence statement: $\\triangle ABC \\cong \\triangle BAC$.', correct_answer: 'Unless the triangle is isosceles or equilateral, vertex A does not correspond to vertex B.', misconception: 'Thinking the statement is perfectly fine.' },
      { question: 'Procedural: A triangle is rotated 180 degrees. Write the coordinate rule that proves the congruence.', correct_answer: '$(x, y) \\rightarrow (-x, -y)$', misconception: '$(x, y) \\rightarrow (-y, x)$' }
    ]
  }
];

async function run() {
  for (const plan of plans) {
    const { error } = await supabase.from('lesson_plans')
      .update(plan)
      .eq('date_start', plan.date_start);
      
    if (error) {
      console.error('Error updating', plan.date_start, error);
    } else {
      console.log('Successfully updated', plan.date_start);
    }
  }
  console.log('All week 9/14-9/18 plans updated to comply with the evaluation feedback!');
}

run();
