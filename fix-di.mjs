import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

async function updatePlan(date, updates) {
  const res = await fetch(`${supabaseUrl}?date_start=eq.${date}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updates)
  });
  if (!res.ok) console.error(`Failed to update ${date}: ${res.statusText}`);
  else console.log(`Updated ${date} successfully`);
}

const lessons = {
  "2026-09-22": {
    do_now: "Solve for x: \\( \\frac{x}{4} = \\frac{15}{20} \\). Then, find the coordinates of point A(2, 5) if both coordinates are multiplied by 3.",
    direct_instruction: "## Vocabulary\n---\n**Dilation on a Grid:** Multiplying the coordinates of a figure by a scale factor $k$ to find the coordinates of the image.\n**Origin (0,0):** The center of dilation we will use today.\n\n## Direct Instruction\n---\nYesterday, we learned that dilations change the size of a figure based on a scale factor. Today, we bring this to the coordinate plane!\n\nWhen a dilation is centered at the origin $(0,0)$, the rule is very simple: **$(x, y) \\rightarrow (kx, ky)$**. You multiply both the x-coordinate and the y-coordinate by the scale factor $k$.\n\nIn **Example 1**, we will dilate a triangle by a scale factor of 3. I will show how to take each vertex, multiply its coordinates by 3, and plot the new enlarged triangle. \n\nIn **Example 2**, we will dilate a rectangle by a scale factor of 4. Notice how the distance from the origin to each point is also multiplied by the scale factor!"
  },
  "2026-09-23": {
    do_now: "Simplify the following fractions: 1) \\( \\frac{1}{2} \\times 8 \\), 2) \\( \\frac{1}{4} \\times 12 \\), 3) \\( 0.5 \\times 10 \\). What do you notice about all of your answers compared to the original numbers?",
    direct_instruction: "## Vocabulary\n---\n**Reduction:** A dilation that shrinks a figure. This occurs when the scale factor is between 0 and 1 (like $1/2$ or $0.25$).\n\n## Direct Instruction\n---\nWe have mastered enlargements where the scale factor $k > 1$. But what happens if we use a fraction like $k = 1/2$?\n\nBecause we are multiplying by a number less than 1, the coordinates will get smaller. This means the new figure will be a **reduction**—it will be smaller than the original and closer to the origin.\n\nLet's look at **Example 1**. We are dilating a polygon by a scale factor of $1/2$. We will take each coordinate and multiply it by $1/2$ (which is the exact same as dividing by 2). \n\nIn **Example 2**, we will use a scale factor of $1/4$. I will model how to carefully calculate the new fractional or decimal coordinates and plot them accurately on the grid."
  },
  "2026-09-24": {
    do_now: "Point P is at (3, 7). Point P' is at (9, 21). What did we multiply the coordinates of P by to get P'? How do you know?",
    direct_instruction: "## Vocabulary\n---\n**Scale Factor ($k$):** Found by dividing the Image coordinate by the Pre-Image coordinate. $k = \\frac{\\text{Image}}{\\text{Pre-Image}}$.\n\n## Direct Instruction\n---\nSo far, you have been given the scale factor and asked to find the new points. Today, we work backwards! You will be given the original figure and the dilated figure, and you must determine the scale factor.\n\nTo find the scale factor, pick one corresponding point from both figures. Set up the ratio: **$k = \\frac{\\text{New Coordinate}}{\\text{Old Coordinate}}$**. \n\nLet's look at **Example 1**. I see the original point A is at $(2, 4)$ and the image A' is at $(6, 12)$. I will set up my ratio: $6 / 2 = 3$. The scale factor is 3.\n\nIn **Example 2**, I see point B is $(8, 10)$ and B' is $(4, 5)$. The ratio is $4 / 8 = 1/2$. Because the image is smaller, I know the scale factor must be a fraction!"
  },
  "2026-09-25": {
    do_now: "Are a 3x5 index card and a 6x10 index card the same shape? Are they the same size? What relationship do they have?",
    direct_instruction: "## Vocabulary\n---\n**Similar Figures:** Two figures that have the same shape but not necessarily the same size. \n**Proportional:** Having a constant ratio.\n\n## Direct Instruction\n---\nToday we introduce the concept of **Similarity**. Two figures are mathematically similar if one is a dilation of the other. This means two things are always true for similar figures:\n1. Their corresponding angles are exactly equal.\n2. Their corresponding side lengths are **proportional** (multiplied by the same scale factor).\n\nIn **Example 1**, we will look at two rectangles and test if they are similar. I will set up ratios for their width and height. If the ratios are equal, they are similar! \n\nIn **Example 2**, I will show you two triangles where the angles are the same, but one side was multiplied by 2 and the other by 3. Because the scale factor isn't constant, they are NOT similar."
  },
  "2026-09-28": {
    do_now: "Solve for x in the following proportion: \\( \\frac{3}{5} = \\frac{12}{x} \\). Show the steps you used to solve it.",
    direct_instruction: "## Vocabulary\n---\n**Cross-Multiplication:** A method for solving proportions where you multiply the numerator of one ratio by the denominator of the other.\n\n## Direct Instruction\n---\nBecause we know similar polygons have proportional side lengths, we can use algebra to find missing sides!\n\nIf we know two shapes are similar, we can set up a proportion: **$\\frac{\\text{Side 1}}{\\text{Corresponding Side 1}} = \\frac{\\text{Side 2}}{\\text{Corresponding Side 2}}$**.\n\nIn **Example 1**, we have two similar triangles. We know three of the sides and need to find the fourth ($x$). I will model setting up the proportion, cross-multiplying, and solving the one-step equation for $x$.\n\nIn **Example 2**, we will look at a real-world word problem involving similar rectangles. I will draw a diagram to make sure I match the correct corresponding sides before setting up my proportion."
  },
  "2026-09-29": {
    do_now: "Translate the point (2, 4) up 3 units and left 1 unit. Then, dilate it by a scale factor of 2. What are the final coordinates?",
    direct_instruction: "## Vocabulary\n---\n**Sequence of Transformations:** Performing more than one transformation in a specific order.\n**Similarity Transformation:** Any sequence of rigid motions and dilations.\n\n## Direct Instruction\n---\nToday is our synthesis of the entire unit! We will prove that two figures are similar by describing the exact sequence of transformations that maps one onto the other.\n\nTo map one similar figure onto another, you usually need a **Dilation** (to fix the size) and a **Translation** (to move it to the right spot).\n\nIn **Example 1**, I will model how to find the scale factor first. Once the size is correct, I will track one vertex to see how far up/down/left/right it needs to translate to land perfectly on the target figure.\n\nIn **Example 2**, we will practice writing our sequence clearly. Order matters! We will see why dilating *then* translating gives a different result than translating *then* dilating."
  }
};

async function run() {
  for(let date in lessons) {
     await updatePlan(date, lessons[date]);
  }
}
run();
