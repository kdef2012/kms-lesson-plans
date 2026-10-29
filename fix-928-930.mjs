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

function generate28() {
    const ex = [];
    const misconceptions = [
        "Set up the proportion incorrectly by mixing up corresponding sides.",
        "Cross-multiplied correctly but made a division error when isolating the variable.",
        "Added the difference between sides instead of multiplying by the scale factor.",
        "Set up the ratio as Small/Large = Large/Small instead of Small/Large = Small/Large.",
        "Multiplied the two known sides of the same triangle together.",
        "Forgot to verify that the polygons were actually similar before setting up the proportion."
    ];
    for(let i=0; i<16; i++) {
        const sf = (i % 3) + 2;
        const side1 = (i % 4) + 2;
        const side2 = side1 * sf;
        const side3 = (i % 5) + 3;
        ex.push({
            id: `28-${i}`,
            dok: 2,
            type: "open_ended",
            text: `Two polygons are similar. Polygon A has side lengths of ${side1} cm and ${side3} cm. Polygon B is a dilated copy of Polygon A. The side on Polygon B that corresponds to the ${side1} cm side is ${side2} cm long. Set up a proportion to find the length of the side on Polygon B that corresponds to the ${side3} cm side.`,
            sample_answer: `${side3 * sf} cm`,
            misconception: misconceptions[i % misconceptions.length],
            correct_answer: `Set up the proportion: ${side1}/${side2} = ${side3}/x. Cross multiply to get ${side1}x = ${side2 * side3}, then divide by ${side1}.`
        });
    }
    return {
        structured_exemplars: ex
    };
}

function genPoints(index) {
    const shapes = [
        [{x:1,y:1}, {x:3,y:1}, {x:3,y:4}],
        [{x:-2,y:1}, {x:1,y:1}, {x:1,y:3}, {x:-2,y:3}],
        [{x:0,y:2}, {x:2,y:0}, {x:0,y:-2}, {x:-2,y:0}]
    ];
    return shapes[index % shapes.length];
}

function generate29() {
    const ex = [];
    const misconceptions = [
        "Described the dilation correctly, but missed the translation.",
        "Listed the translation first instead of the dilation, resulting in the wrong final position.",
        "Used the wrong scale factor (e.g., 1/2 instead of 2).",
        "Described a reflection instead of a translation.",
        "Forgot to specify the center of dilation (origin).",
        "Described the sequence mapping the larger figure to the smaller one instead of small to large."
    ];
    for(let i=0; i<16; i++) {
        const sf = (i % 2) + 2;
        const transX = (i % 3) + 1;
        const transY = (i % 2) + 1;
        const pts = genPoints(i);
        const newPts = pts.map(p => ({ x: p.x * sf + transX, y: p.y * sf + transY }));
        
        ex.push({
            id: `29-${i}`,
            dok: 3,
            type: "interactive-graph",
            text: `Describe the sequence of transformations that maps the original polygon to the new polygon. First, it is dilated. Then, it is translated.`,
            question: `Describe the sequence of transformations that maps the original polygon to the new polygon. First, it is dilated. Then, it is translated.`,
            visualData: { type: "geometry-transformation", gridSize: 10, originalPolygon: pts },
            correctPoints: newPts,
            sample_answer: `Dilate by a scale factor of ${sf} centered at the origin, then translate right ${transX} units and up ${transY} units.`,
            misconception: misconceptions[i % misconceptions.length],
            correct_answer: `Dilate by a scale factor of ${sf} centered at the origin, then translate right ${transX} units and up ${transY} units.`
        });
    }
    return {
        structured_exemplars: ex
    };
}

function generate30() {
    const ex = [];
    const misconceptions = [
        "Calculated the ratio as Horizontal/Vertical (run/rise) instead of Vertical/Horizontal (rise/run).",
        "Set up the proportion correctly but made a division error.",
        "Added the difference between the vertical sides to the horizontal side instead of scaling.",
        "Multiplied the vertical and horizontal sides of the same triangle together.",
        "Thought the slope would change because the triangle is larger.",
        "Counted the grid units incorrectly when finding the vertical side."
    ];
    for(let i=0; i<16; i++) {
        const vert1 = (i % 3) + 2;
        const horiz1 = (i % 4) + 3;
        const sf = (i % 2) + 2;
        const vert2 = vert1 * sf;
        const horiz2 = horiz1 * sf;
        ex.push({
            id: `30-${i}`,
            dok: 2,
            type: "open_ended",
            text: `A small right triangle is drawn on a line. Its vertical side is ${vert1} units and its horizontal side is ${horiz1} units. A similar, larger right triangle is drawn on the EXACT SAME line. Its vertical side is ${vert2} units. Because the slope is constant, the quotients of their sides must be equal. What is the length of the larger triangle's horizontal side?`,
            sample_answer: `${horiz2}`,
            misconception: misconceptions[i % misconceptions.length],
            correct_answer: `Set up the ratio: ${vert1}/${horiz1} = ${vert2}/x. Solve for x to get ${horiz2}.`
        });
    }
    return {
        structured_exemplars: ex
    };
}

async function run() {
  await updatePlan("2026-09-28", generate28());
  await updatePlan("2026-09-29", generate29());
  await updatePlan("2026-09-30", generate30());
}
run();
