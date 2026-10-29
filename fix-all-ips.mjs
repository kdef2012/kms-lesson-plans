import fetch from "node-fetch";

const supabaseUrl = "https://qnmndsnbftcspzrlfnab.supabase.co/rest/v1/lesson_plans";
const headers = {
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubW5kc25iZnRjc3B6cmxmbmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDAwNzcsImV4cCI6MjEwMTUxNjA3N30.xSFqQrO6iCxkE4AqvrDC541zH0oWUatDkxzRxcpe5co",
  "Content-Type": "application/json"
};

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shapes = [
    "Triangle LMN", "Square PQRS", "Rectangle EFGH", "Parallelogram JKLM", 
    "Trapezoid ABCD", "Hexagon RSTUVW", "Rhombus MNOP", "Pentagon VWXYZ",
    "Triangle DEF", "Quadrilateral TUVW", "Triangle XYZ", "Rectangle LMNP"
];
function getShape(i) { return shapes[i % shapes.length]; }

function generate921() {
    let q = [];
    // 9/21 Intro to Dilations (Is it reduction or enlargement? Scaling by integer or fraction)
    for (let i = 0; i < 10; i++) {
        const isReduction = i % 2 === 0;
        const scaleStr = isReduction ? `${randInt(1,4)}/${randInt(5,9)}` : `${randInt(2,6)}`;
        const effect = isReduction ? 'reduction' : 'enlargement';
        const wrongEffect = isReduction ? 'enlargement' : 'reduction';
        
        q.push({
            id: generateUUID(),
            text: `${getShape(i)} is dilated by a scale factor of $k = ${scaleStr}$. Will the resulting image be a reduction or an enlargement?`,
            type: 'multiple-choice',
            options: ['Reduction', 'Enlargement', 'Stays the same size', 'Cannot be determined'],
            correctAnswer: isReduction ? 'Reduction' : 'Enlargement',
            dok: 1,
            exemplar: `The scale factor is ${isReduction ? 'less than 1' : 'greater than 1'}, so it is a ${effect}.`,
            misconception: `Confusing the threshold of k=1.`
        });
    }
    return q;
}

function generate922() {
    let q = [];
    // 9/22: Dilation on a Grid (calculating coordinates given original + scale factor)
    for (let i = 0; i < 10; i++) {
        const shape = getShape(i + 3);
        const k = randInt(2, 5);
        const num = randInt(1, 3);
        const den = randInt(4, 7);
        const useFraction = i % 2 === 0;
        
        let x, y, nx, ny, scaleStr;
        if (useFraction) {
            x = den * randInt(-6, 6);
            y = den * randInt(-6, 6);
            nx = x * num / den;
            ny = y * num / den;
            scaleStr = `${num}/${den}`;
        } else {
            x = randInt(-12, 12);
            y = randInt(-12, 12);
            nx = x * k;
            ny = y * k;
            scaleStr = `${k}`;
        }

        q.push({
            id: generateUUID(),
            text: `${shape} has a vertex at $(${x}, ${y})$. If the figure is dilated by a scale factor of $${scaleStr}$ centered at the origin, what are the coordinates of the corresponding image vertex?`,
            type: 'multiple-choice',
            options: [`$(${nx}, ${ny})$`, `$(${nx + 1}, ${ny - 1})$`, `$(${x + (useFraction ? num : k)}, ${y + (useFraction ? num : k)})$`, `$(${Math.round(x/k)}, ${Math.round(y/k)})$`],
            correctAnswer: `$(${nx}, ${ny})$`,
            dok: 2,
            exemplar: `Multiply each coordinate by ${scaleStr}: x = ${x} * ${scaleStr} = ${nx}, y = ${y} * ${scaleStr} = ${ny}.`,
            misconception: 'Adding the scale factor instead of multiplying.'
        });
    }
    return q;
}

function generate923() {
    let q = [];
    // 9/23: Determining Scale Factor
    for (let i = 0; i < 10; i++) {
        const shape = getShape(i + 5);
        const kNum = randInt(2, 7);
        const kDen = randInt(2, 7);
        const isFrac = i % 2 !== 0 && kNum !== kDen;
        const k = isFrac ? kNum/kDen : randInt(2, 8);
        const scaleStr = isFrac ? `${kNum}/${kDen}` : `${k}`;
        
        let x, y, nx, ny;
        if (isFrac) {
            x = kDen * randInt(2, 6) * (Math.random() < 0.5 ? 1 : -1);
            y = kDen * randInt(2, 6) * (Math.random() < 0.5 ? 1 : -1);
            nx = x * kNum / kDen;
            ny = y * kNum / kDen;
        } else {
            x = randInt(2, 10) * (Math.random() < 0.5 ? 1 : -1);
            y = randInt(2, 10) * (Math.random() < 0.5 ? 1 : -1);
            nx = x * k;
            ny = y * k;
        }

        q.push({
            id: generateUUID(),
            text: `An image of ${shape} has a vertex located at $(${nx}, ${ny})$. If the pre-image vertex was originally at $(${x}, ${y})$, what is the scale factor of the dilation?`,
            type: 'multiple-choice',
            options: [`$${scaleStr}$`, `$${isFrac ? kDen + '/' + kNum : '1/' + k}$`, `$${Math.abs(nx - x)}$`, `$${Math.abs(ny + y)}$`],
            correctAnswer: `$${scaleStr}$`,
            dok: 2,
            exemplar: `Use the formula k = image / pre-image. For the x-coordinate: ${nx} / ${x} = ${scaleStr}.`,
            misconception: 'Dividing pre-image by image instead of image by pre-image.'
        });
    }
    return q;
}

function generate924() {
    let q = [];
    // 9/24: Dilations Mixed
    for (let i = 0; i < 10; i++) {
        const shape = getShape(i + 7);
        if (i % 2 === 0) {
            // Find coordinate
            const k = randInt(3, 9);
            const x = randInt(-8, 8);
            const y = randInt(-8, 8);
            q.push({
                id: generateUUID(),
                text: `${shape} is dilated by a scale factor of $${k}$. If a pre-image vertex is $(${x}, ${y})$, what is the new vertex?`,
                type: 'multiple-choice',
                options: [`$(${x*k}, ${y*k})$`, `$(${x+k}, ${y+k})$`, `$(${x*k}, ${y})$`, `$(${x}, ${y*k})$`],
                correctAnswer: `$(${x*k}, ${y*k})$`,
                dok: 2,
                exemplar: `Multiply both x and y by ${k}.`,
                misconception: 'Adding the scale factor.'
            });
        } else {
            // Find scale factor
            const nx = randInt(15, 45);
            const x = randInt(3, 9);
            const k = nx / x;
            q.push({
                id: generateUUID(),
                text: `The pre-image of ${shape} has an x-coordinate of ${x}. After dilation, the image has an x-coordinate of ${nx}. What is the scale factor?`,
                type: 'multiple-choice',
                options: [`$${k}$`, `$${x/nx}$`, `$${nx - x}$`, `$${nx + x}$`],
                correctAnswer: `$${k}$`,
                dok: 2,
                exemplar: `k = image / pre-image = ${nx} / ${x} = ${k}.`,
                misconception: 'Subtracting coordinates.'
            });
        }
    }
    return q;
}

function generate925() {
    let q = [];
    // 9/25: Similarity (properties)
    const truths = [
        "Corresponding angle measures are congruent.",
        "The shape is preserved.",
        "The figures have the same angle measures.",
        "Corresponding sides are proportional.",
        "The ratio of corresponding sides is equal to the scale factor."
    ];
    const falses = [
        "Corresponding side lengths are congruent.",
        "The area is preserved.",
        "The perimeter is preserved.",
        "The figures are congruent.",
        "Corresponding angles are proportional."
    ];
    
    for (let i = 0; i < 10; i++) {
        const shape1 = getShape(i);
        const shape2 = getShape(i+1);
        const isTrue = i % 2 === 0;
        const statement = isTrue ? truths[i % truths.length] : falses[i % falses.length];
        
        q.push({
            id: generateUUID(),
            text: `If ${shape1} is similar to ${shape2} after a dilation, which statement regarding the two figures is correct?`,
            type: 'multiple-choice',
            options: [
                isTrue ? statement : truths[(i+1)%truths.length],
                isTrue ? falses[i%falses.length] : statement,
                "The figures must have different angle measures.",
                "The pre-image and image are the exact same size."
            ],
            correctAnswer: isTrue ? statement : truths[(i+1)%truths.length],
            dok: 2,
            exemplar: `Similar figures have congruent corresponding angles and proportional corresponding side lengths.`,
            misconception: `Believing similar figures have congruent side lengths or different angle measures.`
        });
    }
    return q;
}

async function run() {
    const dates = ['2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25'];
    const generators = {
        '2026-09-21': generate921,
        '2026-09-22': generate922,
        '2026-09-23': generate923,
        '2026-09-24': generate924,
        '2026-09-25': generate925
    };

    for (const date of dates) {
        const r = await fetch(`${supabaseUrl}?date_start=eq.${date}&select=id,structured_exemplars`, { headers });
        const d = await r.json();
        if (!d || d.length === 0) continue;
        
        const lesson = d[0];
        let exemplars = lesson.structured_exemplars || [];
        
        // Ensure there are at least 6 initial items. If not, don't break.
        const originalFirst6 = exemplars.slice(0, 6);
        
        // Generate the 10 fresh independent practice questions
        const fresh10 = generators[date]();
        
        // Format them like the structured exemplars
        const formattedFresh10 = fresh10.map((q, idx) => ({
            id: q.id,
            question: q.text,
            type: q.type,
            options: q.options,
            correct_answer: q.correctAnswer,
            misconception: q.misconception
        }));
        
        // Combine (keep first 6 representing GP/CP, append the 10 fresh IP questions)
        const combined = [...originalFirst6, ...formattedFresh10];
        
        // Update Supabase
        await fetch(`${supabaseUrl}?id=eq.${lesson.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ structured_exemplars: combined })
        });
        
        console.log(`Updated ${date} with ${formattedFresh10.length} unique independent practice problems.`);
    }
}
run();
