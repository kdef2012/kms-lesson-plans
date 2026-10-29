const fs = require('fs');

function genPoints(topic, index) {
    // Generate different shapes based on index
    const shapes = [
        [{x:1,y:1}, {x:3,y:1}, {x:3,y:4}], // Triangle
        [{x:-2,y:1}, {x:1,y:1}, {x:1,y:3}, {x:-2,y:3}], // Rectangle
        [{x:0,y:2}, {x:2,y:0}, {x:0,y:-2}, {x:-2,y:0}], // Diamond
        [{x:-3,y:-3}, {x:-1,y:-3}, {x:-1,y:-1}], // Small Triangle
        [{x:1,y:2}, {x:4,y:2}, {x:2,y:4}], // Obtuse Triangle
        [{x:-4,y:2}, {x:-2,y:2}, {x:-2,y:5}, {x:-4,y:5}], // Tall Rectangle
        [{x:2,y:-1}, {x:5,y:-1}, {x:4,y:-3}, {x:1,y:-3}], // Parallelogram
        [{x:-2,y:-1}, {x:2,y:-1}, {x:1,y:-3}, {x:-1,y:-3}], // Trapezoid
    ];
    return shapes[index % shapes.length];
}

function generateDay22() {
    const ex = [];
    for(let i=0; i<16; i++) {
        const sf = (i % 3) + 2; // 2, 3, or 4
        const pts = genPoints(22, i);
        ex.push({
            id: `22-${i}`,
            dok: 2,
            text: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
            type: "interactive-graph",
            question: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
            visualData: { type: "geometry-transformation", gridSize: 10, originalPolygon: pts },
            correctPoints: pts.map(p => ({ x: p.x * sf, y: p.y * sf })),
            misconception: "Added the scale factor instead of multiplying.",
            correct_answer: `Multiply all coordinates by ${sf}.`
        });
    }
    return ex;
}

function generateDay23() {
    const ex = [];
    for(let i=0; i<16; i++) {
        const sf = (i % 2 === 0) ? 0.5 : 0.25; 
        const pts = genPoints(23, i).map(p => ({ x: p.x * 4, y: p.y * 4 })); // scale up so reduction is clean
        ex.push({
            id: `23-${i}`,
            dok: 2,
            text: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
            type: "interactive-graph",
            question: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
            visualData: { type: "geometry-transformation", gridSize: 10, originalPolygon: pts },
            correctPoints: pts.map(p => ({ x: p.x * sf, y: p.y * sf })),
            misconception: "Multiplied by the inverse.",
            correct_answer: `Multiply all coordinates by ${sf}.`
        });
    }
    return ex;
}

function generateDay24() {
    const ex = [];
    for(let i=0; i<16; i++) {
        const sf = (i % 2 === 0) ? 2 : 0.5;
        const pts = genPoints(24, i).map(p => ({ x: p.x * 2, y: p.y * 2 }));
        ex.push({
            id: `24-${i}`,
            dok: 2,
            text: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
            type: "interactive-graph",
            question: `Dilate the polygon by a scale factor of ${sf} centered at the origin. Plot the new vertices.`,
            visualData: { type: "geometry-transformation", gridSize: 10, originalPolygon: pts },
            correctPoints: pts.map(p => ({ x: p.x * sf, y: p.y * sf })),
            misconception: "Added the scale factor instead of multiplying.",
            correct_answer: `Multiply all coordinates by ${sf}.`
        });
    }
    return ex;
}

function generateDay25() {
    const ex = [];
    for(let i=0; i<16; i++) {
        const isSimilar = i % 2 === 0;
        const sf = (i % 3) + 2;
        const pts1 = genPoints(25, i);
        const pts2 = pts1.map(p => ({ x: p.x * sf + (isSimilar ? 0 : 1), y: p.y * sf }));
        ex.push({
            id: `25-${i}`,
            dok: 2,
            text: `Polygon A has vertices at ${JSON.stringify(pts1)}. Polygon B has vertices at ${JSON.stringify(pts2)}. Are they similar?`,
            type: "multiple_choice",
            options: ["Yes", "No"],
            correctAnswer: isSimilar ? "Yes" : "No",
            misconception: "Looked at difference instead of ratio.",
            correct_answer: "Check if the ratio of corresponding sides is constant."
        });
    }
    return ex;
}

function generateDay28() {
    const ex = [];
    for(let i=0; i<16; i++) {
        const sf = (i % 3) + 2;
        const side1 = (i % 4) + 2;
        const side2 = side1 * sf;
        const side3 = (i % 5) + 3;
        ex.push({
            id: `28-${i}`,
            dok: 2,
            text: `Two polygons are similar. Polygon 1 has a side of length ${side1} and another side of length ${side3}. The corresponding side to the first one on Polygon 2 has length ${side2}. What is the length of the side corresponding to ${side3} on Polygon 2?`,
            type: "open_ended",
            sample_answer: `${side3 * sf}`
        });
    }
    return ex;
}

function generateDay29() {
    const ex = [];
    for(let i=0; i<16; i++) {
        const sf = (i % 3) + 2;
        const transX = (i % 4) + 1;
        ex.push({
            id: `29-${i}`,
            dok: 2,
            text: `A square is centered at the origin. Describe the sequence of transformations that maps it to a square that is ${sf} times larger and shifted right by ${transX} units.`,
            type: "open_ended",
            sample_answer: `Dilate by a scale factor of ${sf} centered at the origin, then translate right ${transX} units.`
        });
    }
    return ex;
}

const allData = {
    "2026-09-22": generateDay22(),
    "2026-09-23": generateDay23(),
    "2026-09-24": generateDay24(),
    "2026-09-25": generateDay25(),
    "2026-09-28": generateDay28(),
    "2026-09-29": generateDay29()
};

fs.writeFileSync('generated-exemplars.json', JSON.stringify(allData, null, 2));
console.log("Done");
