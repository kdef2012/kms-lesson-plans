import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json",
  "Prefer": "return=minimal"
};

async function run() {
  const newDI = `## Vocabulary\n---\n**Finding Scale Factor ($k$):** The exact formula is **$k = \\frac{\\text{Image (new coordinate)}}{\\text{Pre-Image (original coordinate)}}$**\n**Coordinate Formula:** $(x, y) \\rightarrow (kx, ky)$\n\n## Direct Instruction\n---\nToday, instead of being given the scale factor, we have to calculate it like detectives! We will use the formula: **$k = \\frac{\\text{Image (new coordinate)}}{\\text{Pre-Image (original coordinate)}}$**.\n\n**Example 1**\nI will model taking the new x-coordinate from the image and dividing by the original x-coordinate from the pre-image. I will then verify this by dividing the new y-coordinate by the original y-coordinate to prove the scale factor $k$ is the same for both. Because $k > 1$, it's an enlargement.\n\n**Example 2**\nI will model dividing the new coordinate by the original coordinate. Since the image is smaller than the pre-image, our formula will give us a fraction between 0 and 1. The scale factor is a reduction!`;
  
  await fetch(`${supabaseUrl}?date_start=eq.2026-09-23`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ direct_instruction: newDI })
  });
  console.log("Successfully fixed 9/23 DI!");
}
run();
