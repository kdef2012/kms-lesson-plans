import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

async function run() {
  const di921 = `## Vocabulary\n---\n**Dilation:** A transformation that changes the size of a figure, but not its shape.\n**Scale Factor ($k$):** The multiplier used to enlarge or reduce the figure.\n**Enlargement:** A dilation where $k > 1$.\n**Reduction:** A dilation where $0 < k < 1$.\n**Coordinate Formula:** $(x, y) \\rightarrow (kx, ky)$\n\n## Direct Instruction\n---\nToday we learn our first non-rigid motion: Dilations. Dilations stretch or shrink a figure from a center point. \n\nWhen we dilate a point on the coordinate plane, we must apply the exact formula **$(x, y) \\rightarrow (kx, ky)$**. This means we multiply both coordinates by the scale factor $k$.\n\n**Example 1**\nI will model multiplying every single $x$ and $y$ coordinate by the scale factor. Because $k > 1$, this is an enlargement.\n\n**Example 2**\nI will model multiplying the coordinates by the fractional scale factor. Because the scale factor is between 0 and 1, this results in a reduction.`;
  
  const di922 = `## Vocabulary\n---\n**Dilation on a Grid:** Multiplying the coordinates of a figure by a **scale factor** $k$ to find the coordinates of the image.\n**Coordinate Formula:** $(x, y) \\rightarrow (kx, ky)$\n\n## Direct Instruction\n---\nYesterday, we learned that dilations change the size of a figure based on a **scale factor**. Today, we bring this to the coordinate plane!\n\nWhen a dilation is centered at the origin $(0,0)$, the rule is very simple: **$(x, y) \\rightarrow (kx, ky)$**. You multiply both the x-coordinate and the y-coordinate by the **scale factor** $k$.\n\n**Example 1**\nI will show how to take each vertex, apply the formula, and plot the new enlarged figure.\n\n**Example 2**\nI will model how to multiply each coordinate by the fraction to find the reduction.`;

  await fetch(`${supabaseUrl}?date_start=eq.2026-09-21`, { method: "PATCH", headers, body: JSON.stringify({ direct_instruction: di921 }) });
  await fetch(`${supabaseUrl}?date_start=eq.2026-09-22`, { method: "PATCH", headers, body: JSON.stringify({ direct_instruction: di922 }) });
  
  console.log("Successfully fixed 9/21 and 9/22 DI!");
}
run();
