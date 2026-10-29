const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const days = [
  {
    date_start: '2026-09-01',
    week_label: '8/31-9/4',
    topic: '[Open-Up U1 L1] Translation (8.G.2)',
    objective_3m: 'SWBAT describe and perform translations of two-dimensional figures on a coordinate plane with 85% accuracy.',
    standard: '8.G.2',
    do_now: '1. Plot the points $A(2, 3)$, $B(4, 7)$, and $C(6, 3)$ on a coordinate plane.\n2. What is the distance between point $A$ and point $C$?',
    direct_instruction: '## Introduction to Transformations\n---\nA **transformation** is an operation that maps an original geometric figure, called the **pre-image**, onto a new figure, called the **image**. The most fundamental type of transformation is a **rigid transformation**, also known as an **isometry**. In a rigid transformation, the size and shape of the figure do not change—only its **position** or **orientation** changes.\n\n---\n## What is a Translation?\n---\nA **translation** is a specific type of rigid transformation that **slides** a figure along a straight line without turning it or flipping it. Every point of the pre-image is moved the **exact same distance** in the **exact same direction**. We can describe a translation using a **vector**, such as $\\langle a, b \\rangle$, which tells us to move $a$ units horizontally and $b$ units vertically.\n\n---\n## Algebraic Representation\n---\nWhen translating a figure on the coordinate plane, we apply a rule to the coordinates of its vertices. The algebraic rule for a translation is written as $(x, y) \\rightarrow (x + a, y + b)$. If a point is moved **right**, we add to the x-coordinate. If it is moved **left**, we subtract. Similarly, moving **up** adds to the y-coordinate, and moving **down** subtracts from it. For example, a translation of 3 units left and 4 units up would be $(x, y) \\rightarrow (x - 3, y + 4)$.\n\n---\n## Real-World Applications\n---\nTranslations are everywhere in the real world! In **video game design**, when a character moves across the screen without rotating, that is a translation. In **architecture**, repeating a specific window design across the facade of a building involves translating the blueprint horizontally or vertically. Understanding how to precisely describe these moves using vectors is crucial for programming and design.',
    structured_exemplars: [
      {
        question: "A graphic designer is moving a logo on a digital canvas. The top-left corner of the logo is at $(-5, 8)$. The designer translates the logo using the rule $(x, y) \\rightarrow (x + 7, y - 12)$. What are the new coordinates of the top-left corner?",
        correct_answer: "$(2, -4)$",
        misconception: "Subtracting from x instead of adding."
      },
      {
        question: "Triangle $PQR$ has vertices $P(1, 4)$, $Q(3, 8)$, and $R(6, 2)$. It is translated so that $P'$ is at $(-2, 1)$. Find the coordinates of $Q'$ and $R'$.",
        correct_answer: "$Q'(-0, 5)$, $R'(3, -1)$",
        misconception: "Finding the translation vector incorrectly as $(3, 3)$ instead of $(-3, -3)$."
      },
      {
        question: "In a game of chess, a knight moves from $e4$ to $f6$. If we map the board to a coordinate plane where $e4$ is $(5, 4)$ and $f6$ is $(6, 6)$, what is the translation vector for this move?",
        correct_answer: "$\\langle 1, 2 \\rangle$",
        misconception: "Writing the coordinates instead of the vector."
      },
      {
        question: "An architect is designing a repeating floor pattern. A central tile is located at $(-12, 15)$. The next tile is placed at $(-4, 15)$. Describe the translation in words and as an algebraic rule.",
        correct_answer: "Translate 8 units right; $(x, y) \\rightarrow (x + 8, y)$",
        misconception: "Translating up instead of right."
      },
      {
        question: "A drone is flying at coordinates $(100, 250, 50)$ in 3D space, but we are only tracking its ground position $(100, 250)$. It receives a command to move $150$ meters West (negative x) and $75$ meters North (positive y). What is its new ground position?",
        correct_answer: "$(-50, 325)$",
        misconception: "Confusing North/South with East/West on the axes."
      },
      {
        question: "Given the pre-image $A(-3, -7)$ and image $A\'(4, -2)$, determine the translation vector.",
        correct_answer: "$\\langle 7, 5 \\rangle$",
        misconception: "Subtracting the image from the pre-image."
      },
      // Independent Practice (10 problems)
      {
        question: "Translate the point $(0, -5)$ using the rule $(x, y) \\rightarrow (x - 4, y + 9)$.",
        correct_answer: "$(-4, 4)$",
        misconception: "Adding 4 instead of subtracting."
      },
      {
        question: "A ship at sea is located at $(12.5, -4.2)$ on a nautical map. It translates its position by moving $5.5$ units East and $8.4$ units North. What is the ship's new location?",
        correct_answer: "$(18.0, 4.2)$",
        misconception: "Miscalculating the decimals."
      },
      {
        question: "If a translation maps $(x, y)$ to $(x + 3, y - 8)$, what is the pre-image of the point $(5, 0)$?",
        correct_answer: "$(2, 8)$",
        misconception: "Applying the translation rule to the image instead of doing the inverse."
      },
      {
        question: "A robotics engineer programs a robotic arm to move from starting coordinates $(-15, 22)$ to a target component at $(8, -5)$. What is the exact translation rule?",
        correct_answer: "$(x, y) \\rightarrow (x + 23, y - 27)$",
        misconception: "Calculating the difference incorrectly."
      },
      {
        question: "Point $K(a, b)$ is translated left 4 units and up 7 units. Its new coordinates are $(6, -2)$. Find $a$ and $b$.",
        correct_answer: "$a = 10, b = -9$",
        misconception: "Subtracting 4 from 6 instead of adding."
      },
      {
        question: "A surveyor maps a property line starting at $(-240, 150)$ and ending at $(80, -90)$. If the entire property line is shifted 50 units North, what are the new starting and ending coordinates?",
        correct_answer: "Start: $(-240, 200)$, End: $(80, -40)$",
        misconception: "Adding 50 to the x-coordinates instead of y."
      },
      {
        question: "Translate $\\triangle XYZ$ with vertices $X(0,0), Y(4,0), Z(0,3)$ by the vector $\\langle -2, -2 \\rangle$. Find the area of the translated triangle.",
        correct_answer: "6 square units",
        misconception: "Thinking the area changes after translation."
      },
      {
        question: "Describe the translation that maps $(x, y) \\rightarrow (x, y - 11)$ in words.",
        correct_answer: "A translation 11 units down.",
        misconception: "Translating 11 units left."
      },
      {
        question: "A laser cutter starts at $(12.4, 5.8)$ and makes a straight cut by translating $\\langle -3.1, 4.2 \\rangle$. What is the endpoint of the cut?",
        correct_answer: "$(9.3, 10.0)$",
        misconception: "Subtracting both values."
      },
      {
        question: "If $M(-1, 5)$ is translated to $M\'(3, 1)$ and then translated again to $M\'\'(0, 6)$, what single translation vector would map $M$ directly to $M\'\'$?",
        correct_answer: "$\\langle 1, 1 \\rangle$",
        misconception: "Adding the intermediate coordinates instead of the vectors."
      }
    ],
    exit_ticket: "A city planner is moving a rectangular park on a digital map. The park's top-right corner is originally at $(15, 24)$. The park needs to be moved 10 units West and 5 units South to avoid a new highway. What are the new coordinates of the park's top-right corner, and what is the algebraic rule for this translation?"
  },
  {
    date_start: '2026-09-02',
    week_label: '8/31-9/4',
    topic: '[Open-Up U1 L2-L3] Naming the Moves (8.G.2)',
    objective_3m: 'SWBAT identify and name the specific rigid transformations (translation, rotation, reflection) used to map a pre-image to an image with 90% accuracy.',
    standard: '8.G.2',
    do_now: 'Translate the point $(-4, 9)$ by the vector $\\langle 6, -11 \\rangle$.',
    direct_instruction: '## Naming the Moves\n---\nYesterday, we focused entirely on **translations**. But what if a figure doesn\'t just slide? What if it turns or flips? Today, we are going to learn how to **name the moves** that take a pre-image to its image. The three rigid transformations are **translations** (slides), **rotations** (turns), and **reflections** (flips).\n\n---\n## Identifying Translations\n---\nIf a figure has been translated, its **orientation** remains exactly the same. The top of the figure still points up, and the left side is still on the left. If you draw line segments connecting corresponding vertices of the pre-image and image, all the segments will be **parallel** and the **same length**.\n\n---\n## Identifying Reflections\n---\nA **reflection** flips a figure over a line. The most obvious sign of a reflection is that the **orientation is reversed**. If you read the vertices of the pre-image in a clockwise direction (e.g., $A$ to $B$ to $C$), the corresponding vertices of the reflected image will read in a **counter-clockwise** direction. The figure appears as a mirror image.\n\n---\n## Identifying Rotations\n---\nA **rotation** turns a figure around a specific point, called the center of rotation. Unlike a translation, the orientation usually changes (the figure might be upside down or sideways). Unlike a reflection, the "handedness" of the figure is preserved—if you trace the vertices clockwise on the pre-image, they will still trace clockwise on the image. Identifying the exact **angle** and **center** of rotation takes practice, but the first step is recognizing that a turn has occurred.',
    structured_exemplars: [
      {
        question: "An architect is analyzing a floor plan. A triangular desk $ABC$ is moved to position $A\'B\'C\'$. The vertices of $ABC$ are read clockwise, but the vertices of $A\'B\'C\'$ are read counter-clockwise. What rigid transformation was performed?",
        correct_answer: "Reflection",
        misconception: "Thinking a rotation reverses orientation."
      },
      {
        question: "A graphic designer copies a logo and places it on the opposite side of a webpage. The logo is exactly the same, but it is now upside down. If the vertices still read in the same clockwise order, what transformation was used?",
        correct_answer: "Rotation (specifically, 180 degrees)",
        misconception: "Assuming it's a reflection because it is 'upside down'."
      },
      {
        question: "A surveyor maps a triangular plot of land with vertices at $(0,0), (5,0), (0,10)$. The city requires the plot to be mapped to $(2,3), (7,3), (2,13)$. Name the specific transformation.",
        correct_answer: "Translation by $\\langle 2, 3 \\rangle$",
        misconception: "Failing to check all three points to confirm it's a rigid slide."
      },
      {
        question: "A drone captures an image of a square building. On the map, the building's corners are at $(1,1), (1,3), (3,3), (3,1)$. In an older map, the building is at $(-1,1), (-1,3), (-3,3), (-3,1)$. Describe the move that maps the old building to the new building.",
        correct_answer: "Reflection across the y-axis.",
        misconception: "Thinking it's a translation of 2 units right (which would map -1 to 1, but -3 to -1, not 3)."
      },
      {
        question: "An engineer is designing a gear system. Gear 1 has a marker at $(0, 5)$. After a movement, the marker is at $(5, 0)$. The gear spins around the origin $(0,0)$. Name the move.",
        correct_answer: "Rotation of 90 degrees clockwise around $(0,0)$.",
        misconception: "Calling it a translation."
      },
      {
        question: "Identify the transformation: $(x, y) \\rightarrow (-x, y)$.",
        correct_answer: "Reflection across the y-axis.",
        misconception: "Reflection across the x-axis."
      },
      // Independent
      {
        question: "If a figure is moved so that all its points travel the exact same distance in parallel lines, what is the move called?",
        correct_answer: "Translation",
        misconception: "Rotation"
      },
      {
        question: "Identify the transformation: $(x, y) \\rightarrow (x - 7, y + 1)$.",
        correct_answer: "Translation 7 units left, 1 unit up.",
        misconception: "Translation 7 units right."
      },
      {
        question: "A video game character at $(4, 4)$ is hit by a spell and teleports to $(-4, -4)$. If the character is facing the exact opposite direction but has not been flipped over, what is the transformation?",
        correct_answer: "Rotation of 180 degrees around the origin.",
        misconception: "Reflection"
      },
      {
        question: "Determine the transformation that maps $P(-2, 8)$ to $P\'(-2, -8)$.",
        correct_answer: "Reflection across the x-axis.",
        misconception: "Reflection across the y-axis."
      },
      {
        question: "A robotic vacuum starts at $(0,0)$ facing North. It moves to $(5,5)$ and is now facing East. Was this a single translation?",
        correct_answer: "No, a translation preserves orientation. This involves a rotation.",
        misconception: "Yes, because it changed position."
      },
      {
        question: "A shape has vertices $A(1,2)$ and $B(3,4)$. After a transformation, the vertices are $A\'(2,1)$ and $B\'(4,3)$. Name the move.",
        correct_answer: "Reflection across the line $y=x$.",
        misconception: "Translation"
      },
      {
        question: "Is $(x, y) \\rightarrow (2x, 2y)$ a rigid transformation? Why or why not?",
        correct_answer: "No, it is a dilation. It changes the size of the figure.",
        misconception: "Yes, because the shape stays the same."
      },
      {
        question: "A student claims that reflecting a figure across the x-axis and then reflecting it across the y-axis is the exact same as rotating it 180 degrees around the origin. Is the student correct?",
        correct_answer: "Yes.",
        misconception: "No, reflections and rotations are always different."
      },
      {
        question: "What transformation preserves both size AND orientation?",
        correct_answer: "Translation",
        misconception: "Reflection"
      },
      {
        question: "Map the point $(-5, -5)$ to $(5, -5)$. What is the simplest transformation that does this?",
        correct_answer: "Reflection across the y-axis (or translation right 10).",
        misconception: "Reflection across x-axis."
      }
    ],
    exit_ticket: "A graphic artist takes a right triangle with vertices at $(1,1), (4,1),$ and $(1,5)$. She performs a transformation and the new vertices are $(-1,1), (-4,1),$ and $(-1,5)$. Describe the transformation completely. Did the orientation of the vertices change?"
  },
  {
    date_start: '2026-09-03',
    week_label: '8/31-9/4',
    topic: '[iReady L18] Understand Properties of Transformations (8.G.2)',
    objective_3m: 'SWBAT verify experimentally the properties of rotations, reflections, and translations, specifically focusing on parallel lines and angle measures.',
    standard: '8.G.2',
    do_now: 'List the three rigid transformations. Which one(s) can change the orientation (handedness) of a figure?',
    direct_instruction: '## Properties of Transformations\n---\nWe know that rigid transformations preserve the **size** and **shape** of a figure. But what does that mean mathematically? It means that if you translate, rotate, or reflect a figure, the **angle measures** of the figure remain exactly the same. If a triangle has a 90-degree angle before a transformation, it will have a 90-degree angle after the transformation.\n\n---\n## Parallel Lines\n---\nAnother crucial property involves **parallel lines**. If two lines in a pre-image are parallel, their corresponding lines in the image will **always be parallel**, no matter which rigid transformation is applied. \n\n---\n## Collinearity and Distance\n---\nRigid transformations also preserve **collinearity** (points that lie on a line will still lie on a line) and **distance** (the distance between any two points is preserved). Because distance is preserved, side lengths of polygons do not change. Because angle measure and side lengths are preserved, the pre-image and image are **congruent**.',
    structured_exemplars: [
      {
        question: "Line segment $AB$ is parallel to line segment $CD$. If both segments are rotated 75 degrees clockwise around the origin, will the image segments $A\'B\'$ and $C\'D\'$ still be parallel?",
        correct_answer: "Yes, rigid transformations preserve parallel lines.",
        misconception: "Thinking rotation changes the relationship between lines."
      },
      {
        question: "A city block is shaped like a parallelogram with opposite sides parallel. If the city block is mapped onto a new coordinate system using a reflection across the y-axis, will the new shape still be a parallelogram?",
        correct_answer: "Yes, because reflections preserve parallel lines, the opposite sides will still be parallel.",
        misconception: "Reflections distort shapes."
      },
      {
        question: "An architect reflects a blueprint of a triangular roof across a central axis. In the original blueprint, one angle of the roof is $42^\\circ$. What will be the measure of the corresponding angle in the reflected blueprint?",
        correct_answer: "$42^\\circ$",
        misconception: "Thinking the angle becomes negative or supplementary."
      },
      {
        question: "Points $X, Y,$ and $Z$ lie on the same straight line, with $Y$ directly between $X$ and $Z$. The line is translated 50 units right. Will the image of $Y$ still lie between the images of $X$ and $Z$?",
        correct_answer: "Yes, translations preserve collinearity and betweenness of points.",
        misconception: "Translations mix up points."
      },
      {
        question: "A square has a perimeter of 40 cm. It is rotated 90 degrees. What is the area of the rotated square?",
        correct_answer: "100 square cm (side length is 10, area is 100).",
        misconception: "Thinking the perimeter or area changes."
      },
      {
        question: "A student performs a transformation on a pair of parallel lines and the resulting lines intersect. Did the student perform a rigid transformation?",
        correct_answer: "No, rigid transformations preserve parallel lines.",
        misconception: "Yes, rotations make lines intersect."
      },
      // Independent
      {
        question: "True or False: A reflection can change a $30^\\circ$ angle into a $150^\\circ$ angle.",
        correct_answer: "False",
        misconception: "True, because it flips it."
      },
      {
        question: "If a regular hexagon with side length 8 is translated down 12 units, what is the side length of the image?",
        correct_answer: "8",
        misconception: "12 or -4."
      },
      {
        question: "A designer rotates a logo containing two parallel stripes. What will be true about the stripes in the rotated logo?",
        correct_answer: "They will still be parallel.",
        misconception: "They will be perpendicular."
      },
      {
        question: "If the distance from point $A$ to point $B$ is 15 units, what is the distance from $A\'$ to $B\'$ after a reflection across the line $y=x$?",
        correct_answer: "15 units",
        misconception: "Distance is negated."
      },
      {
        question: "A map shows two intersecting roads that form a $90^\\circ$ angle. If the map is digitized and translated onto a new grid, what will the angle between the roads be?",
        correct_answer: "$90^\\circ$",
        misconception: "Angles change when translated."
      },
      {
        question: "Triangle $MNP$ is rotated 180 degrees. If $m\\angle M = 45^\\circ$ and $m\\angle N = 60^\\circ$, what is the measure of $\\angle P\'$?",
        correct_answer: "$75^\\circ$ (Angles in a triangle add to 180, and rotation preserves angle measure)",
        misconception: "Cannot be determined."
      },
      {
        question: "Does a transformation given by $(x, y) \\rightarrow (x+2, 3y)$ preserve distance? Why or why not?",
        correct_answer: "No, it stretches the y-coordinates by a factor of 3, so it is not a rigid transformation.",
        misconception: "Yes, because it's a rule."
      },
      {
        question: "If line $L$ is perpendicular to line $M$, and both are translated, what is the relationship between $L\'$ and $M\'$?",
        correct_answer: "They are perpendicular.",
        misconception: "They are parallel."
      },
      {
        question: "A student measures an angle on a pre-image as $50^\\circ$ and the corresponding angle on the image as $55^\\circ$. What can be concluded?",
        correct_answer: "The transformation was not rigid, or the student measured incorrectly.",
        misconception: "It was a rotation of 5 degrees."
      },
      {
        question: "Two circles with radii 5 and 7 are translated by $\\langle 10, -10 \\rangle$. What are their new radii?",
        correct_answer: "5 and 7.",
        misconception: "15 and 17."
      }
    ],
    exit_ticket: "A structural engineer is copying a truss design from one part of a bridge blueprint to another part using a translation. The original truss contains two parallel steel beams and a $60^\\circ$ support angle. Explain how the engineer can be certain that the copied truss will also have parallel beams and a $60^\\circ$ support angle."
  },
  {
    date_start: '2026-09-04',
    week_label: '8/31-9/4',
    topic: '[enVision T6 L1] Translation (8.G.3)',
    objective_3m: 'SWBAT describe the effect of translations on two-dimensional figures using coordinates with 90% accuracy.',
    standard: '8.G.3',
    do_now: 'If a point at $(-2, 5)$ is translated by the rule $(x, y) \\rightarrow (x+4, y-3)$, what is the new coordinate?',
    direct_instruction: '## Translations and Coordinates\n---\nWe have learned what a translation is conceptually. Now, we will rigorously apply translations to coordinates on the Cartesian plane. Understanding how coordinates change during a transformation is a critical standard (8.G.3) and forms the basis of computer graphics programming.\n\n---\n## The Algebraic Rule\n---\nA translation can always be described by a rule of the form $(x, y) \\rightarrow (x + a, y + b)$. \n- The value **$a$** affects the **x-coordinate**. If $a$ is positive, the figure moves **right**. If $a$ is negative, it moves **left**.\n- The value **$b$** affects the **y-coordinate**. If $b$ is positive, the figure moves **up**. If $b$ is negative, it moves **down**.\n\n---\n## Working Backwards\n---\nSometimes you are given the pre-image and the image, and you must find the rule. To find $a$, subtract the pre-image x-coordinate from the image x-coordinate ($a = x\' - x$). To find $b$, subtract the pre-image y-coordinate from the image y-coordinate ($b = y\' - y$). If you know the rule and the image, you can work backward to find the pre-image by doing the **inverse** operation.',
    structured_exemplars: [
      {
        question: "A ship navigator inputs a translation command to move a digital marker from $(45, -12)$ to $(10, 30)$ on a grid. Write the algebraic rule for this translation.",
        correct_answer: "$(x, y) \\rightarrow (x - 35, y + 42)$",
        misconception: "Adding the coordinates together."
      },
      {
        question: "An animator applies the rule $(x, y) \\rightarrow (x + 120, y - 50)$ to a character. If the character ends up at $(400, 200)$, what were its starting coordinates?",
        correct_answer: "$(280, 250)$",
        misconception: "Applying the rule forward instead of backward."
      },
      {
        question: "A triangle has vertices $A(-2, 3), B(1, 5), C(4, 0)$. It is translated left 6 units and up 2 units. Write the algebraic rule and find the coordinates of $B\'$.",
        correct_answer: "Rule: $(x, y) \\rightarrow (x - 6, y + 2)$. $B\'(-5, 7)$",
        misconception: "Mixing up left/right with up/down."
      },
      {
        question: "On a city map, the fire station is at $(-8, -3)$ and the hospital is at $(5, 9)$. What translation vector describes the flight path of a helicopter moving directly from the fire station to the hospital?",
        correct_answer: "$\\langle 13, 12 \\rangle$",
        misconception: "Subtracting hospital from fire station (wrong direction)."
      },
      {
        question: "If the point $(m, n)$ is translated by $\\langle -4, 9 \\rangle$ to get $(1, 1)$, what is the value of $m + n$?",
        correct_answer: "$m = 5, n = -8$. Sum is -3.",
        misconception: "Failing to solve for m and n correctly."
      },
      {
        question: "A line segment has endpoints at $(-1, 4)$ and $(3, 8)$. After a translation, the new endpoints are $(2, 2)$ and $(6, 6)$. What was the translation rule?",
        correct_answer: "$(x, y) \\rightarrow (x + 3, y - 2)$",
        misconception: "Calculating the difference inconsistently between the two points."
      },
      // Independent
      {
        question: "Write the algebraic rule for a translation 8 units down and 3 units right.",
        correct_answer: "$(x, y) \\rightarrow (x + 3, y - 8)$",
        misconception: "$(x, y) \\rightarrow (x - 8, y + 3)$"
      },
      {
        question: "Find the image of $(-14, 22)$ under the translation $(x, y) \\rightarrow (x - 6, y - 10)$.",
        correct_answer: "$(-20, 12)$",
        misconception: "$(-8, 32)$"
      },
      {
        question: "Find the pre-image of $(0, 0)$ under the translation $(x, y) \\rightarrow (x + 5, y - 7)$.",
        correct_answer: "$(-5, 7)$",
        misconception: "$(5, -7)$"
      },
      {
        question: "Point $P(-3, y)$ is translated by $\\langle 4, -2 \\rangle$ to $P\'(x, 5)$. Find $x$ and $y$.",
        correct_answer: "$x = 1, y = 7$",
        misconception: "$x = -7, y = 3$"
      },
      {
        question: "A weather balloon drifts from $(-15.5, 40.2)$ to $(-10.0, 48.7)$ on a radar screen. What is the translation vector?",
        correct_answer: "$\\langle 5.5, 8.5 \\rangle$",
        misconception: "Incorrect decimal subtraction."
      },
      {
        question: "If a translation maps the origin to $(-4, 9)$, where does it map the point $(4, -9)$?",
        correct_answer: "$(0, 0)$",
        misconception: "$(-8, 18)$"
      },
      {
        question: "What is the result of applying the translation $(x, y) \\rightarrow (x + 2, y - 2)$ twice in a row to the point $(10, 10)$?",
        correct_answer: "$(14, 6)$",
        misconception: "$(12, 8)$"
      },
      {
        question: "A square with vertices at $(0,0), (0,2), (2,2), (2,0)$ is translated so its center moves from $(1,1)$ to $(5,5)$. What are the new vertices?",
        correct_answer: "$(4,4), (4,6), (6,6), (6,4)$",
        misconception: "Calculating the translation of the center but applying it incorrectly."
      },
      {
        question: "Write a translation rule that does absolutely nothing to a figure.",
        correct_answer: "$(x, y) \\rightarrow (x + 0, y + 0)$",
        misconception: "Not possible."
      },
      {
        question: "If you translate a point by $\\langle a, b \\rangle$ and then by $\\langle -a, -b \\rangle$, where does the point end up?",
        correct_answer: "Back at its original starting position.",
        misconception: "At the origin."
      }
    ],
    exit_ticket: "A programmer is writing code for a touchscreen app. When a user drags an icon, the software calculates the translation. If the user drags an icon from $(145, 800)$ to $(320, 650)$, write the algebraic rule the software applies. If the user then applies the exact same rule to a second icon at $(100, 100)$, where will it end up?"
  }
];

async function run() {
  const dates = days.map(d => d.date_start);
  await supabase.from('lesson_plans').delete().in('date_start', dates);
  const { error } = await supabase.from('lesson_plans').insert(days);
  if (error) console.error(error);
  else console.log('Successfully re-seeded missing days 9/1 to 9/4 with highly rigorous content');
}
run();
