// PPTX Generation and Geometry Rendering Engine for KMS Math 8 Lesson Plans
// Ensures pixel-perfect 16:9 layout (10.0" x 5.625") with zero text overflow.

const COLOR_PURPLE = '4B0082';
const COLOR_TEAL = '008080';
const COLOR_SLATE = '1E293B';
const COLOR_MUTED = '64748B';
const COLOR_BG = 'F8FAFC';
const COLOR_WHITE = 'FFFFFF';
const COLOR_BORDER = 'E2E8F0';

export function cleanMathText(text, preserveLines = false) {
  if (!text) return '';
  let s = String(text)
    .replace(/<[a-zA-Z\/][^>]*>/g, ' ')
    .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
    .replace(/\\overleftrightarrow\{([^}]+)\}/g, '$1')
    .replace(/\\overline\{([^}]+)\}/g, '$1')
    .replace(/\\parallel\b/g, '∥')
    .replace(/\\perp\b/g, '⊥')
    .replace(/\\angle\b/g, '∠')
    .replace(/\\triangle\b/g, '△')
    .replace(/\\cong\b/g, '≅')
    .replace(/\\sim\b/g, '~')
    .replace(/\\ell\b/g, 'ℓ')
    .replace(/\\degree\b/g, '°')
    .replace(/\\circ\b/g, '°')
    .replace(/\^\{\\circ\}/g, '°')
    .replace(/\^\\circ/g, '°')
    .replace(/\^\{circ\}/g, '°')
    .replace(/\^circ/g, '°')
    .replace(/\\le(q)?\b/g, '≤')
    .replace(/\\ge(q)?\b/g, '≥')
    .replace(/\\neq\b/g, '≠')
    .replace(/\\times\b/g, '×')
    .replace(/\\cdot\b/g, '·')
    .replace(/\\pi\b/g, 'π')
    .replace(/\\pm\b/g, '±')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/##\s*/g, '')
    .replace(/---\s*/g, '');

  if (preserveLines) {
    return s
      .split('\n')
      .map(l => l.replace(/[ \t]+/g, ' ').trim())
      .filter(Boolean)
      .join('\n');
  } else {
    return s.replace(/\s+/g, ' ').trim();
  }
}

export function cleanQuestionText(raw) {
  let text = cleanMathText(raw);
  text = text.replace(/^Problem\s+\d+\s*\([^)]+\)\s*:\s*/i, '');
  return text;
}

export function getEssentialQuestion(obj) {
  if (!obj) return "How can we apply today's concept to solve real-world problems?";
  let topic = obj.toLowerCase();
  const m = topic.match(/involving (.*?) \(/);
  if (m) {
    return `How can we apply our understanding of ${m[1]} to solve real-world problems?`;
  }
  return "How can we apply today's concept to solve real-world problems?";
}

export function getLessonPurpose(p) {
  if (!p) return null;
  const adminFraming = p.admin_framing || (p.criteria_for_success && p.criteria_for_success.match(/\*\*Admin Framing:\*\*\s*(.*?)(?=\n\n|$)/s)?.[1]);
  if (adminFraming) return adminFraming;
  if (p.direct_instruction) {
    const m = p.direct_instruction.match(/##+\s*(?:Lesson\s+)?Purpose[\s\S]*?(?=##\s+[A-Z🎯]|$)/i);
    if (m) return m[0].replace(/##+\s*(?:Lesson\s+)?Purpose/i, '').replace(/---/g, '').trim();
  }
  return null;
}

export function getFramingArc(plan) {
  if (!plan || !plan.direct_instruction) return null;
  const di = plan.direct_instruction;
  const match = di.match(/(?:\*\*Admin Framing:\*\*|##+ [^\n]*Framing[^\n]*)\s*([\s\S]*?)(?=\n##|---|$|\n\n\n)/i);
  if (match) {
    const text = match[1].trim();
    const ym = text.match(/Yesterday we:?\s*(.*?)(?=\.?\s*\n?\*?\s*\*\*Today|\n\n|$)/i);
    const tm = text.match(/Today we will:?\s*(.*?)(?=\.?\s*\n?\*?\s*\*\*so that|\n\n|$)/i);
    const sm = text.match(/so that:?\s*(.*?)(?=\n\n|\n##|$)/i);
    if (ym && tm && sm) {
      return { yesterday: ym[1].trim(), today: tm[1].trim(), soThat: sm[1].trim() };
    }
  }
  return null;
}

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderTransversalSvg(vd = {}) {
  const labels = vd.angleLabels || {};
  const highlighted = vd.highlightedAngles || (vd.correctAngle ? [vd.correctAngle] : [1]);
  const prompt = vd.prompt || 'Lines ℓ ∥ m cut by transversal t';

  const isHigh = (n) => highlighted.includes(n);
  const getLabel = (n) => labels[n] || labels[String(n)] || String(n);

  const renderBadge = (n, cx, cy) => {
    const rawText = getLabel(n);
    const text = escapeXml(rawText);
    const high = isHigh(n);
    const stroke = high ? '#0f766e' : '#6366f1';
    const fill = high ? '#ccfbf1' : '#e0e7ff';
    const textCol = high ? '#0f766e' : '#4338ca';
    const strokeW = high ? 2.5 : 1.2;

    if (rawText.length > 3) {
      const bw = Math.min(80, Math.max(38, rawText.length * 8 + 10));
      const bh = 22;
      return `
        <rect x="${cx - bw/2}" y="${cy - bh/2}" width="${bw}" height="${bh}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}"/>
        <text x="${cx}" y="${cy + 4.5}" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="${textCol}" text-anchor="middle">${text}</text>
      `;
    }
    return `
      <circle cx="${cx}" cy="${cy}" r="14" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}"/>
      <text x="${cx}" y="${cy + 4.5}" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${textCol}" text-anchor="middle">${text}</text>
    `;
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" width="420" height="300">
    <rect width="420" height="300" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
    
    <!-- Parallel Line 1 (ℓ) -->
    <line x1="30" y1="95" x2="390" y2="95" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
    <text x="15" y="100" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#475569">ℓ</text>
    
    <!-- Parallel Line 2 (m) -->
    <line x1="30" y1="195" x2="390" y2="195" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
    <text x="15" y="200" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#475569">m</text>
    
    <!-- Transversal Line (t) -->
    <line x1="130" y1="265" x2="290" y2="25" stroke="#0f766e" stroke-width="3" stroke-linecap="round"/>
    <text x="300" y="30" font-family="Arial, sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#0f766e">t</text>
    
    <!-- Parallel Arrows -->
    <path d="M 125 90 L 133 95 L 125 100" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 125 190 L 133 195 L 125 200" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Intersection 1 badges (Line ℓ) -->
    ${renderBadge(1, 280, 68)}
    ${renderBadge(2, 206, 68)}
    ${renderBadge(3, 200, 122)}
    ${renderBadge(4, 274, 122)}

    <!-- Intersection 2 badges (Line m) -->
    ${renderBadge(5, 214, 168)}
    ${renderBadge(6, 140, 168)}
    ${renderBadge(7, 134, 222)}
    ${renderBadge(8, 208, 222)}

    <!-- Prompt / Note -->
    <rect x="15" y="260" width="390" height="30" rx="5" fill="#f1f5f9"/>
    <text x="210" y="280" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">${escapeXml(prompt)}</text>
  </svg>`;
}

export function renderTriangleSvg(vd = {}) {
  const labels = vd.angleLabels || {};
  const highlighted = vd.highlightedAngles || (vd.correctAngle ? [vd.correctAngle] : []);
  const prompt = vd.prompt || '△ABC Angles';
  const hasExt = vd.hasExteriorAngle !== false;

  const isHigh = (n) => highlighted.includes(n);
  const getLabel = (n) => labels[n] || labels[String(n)] || String(n);

  const renderBadge = (n, cx, cy) => {
    const rawText = getLabel(n);
    const text = escapeXml(rawText);
    const high = isHigh(n);
    const stroke = n === 4 ? '#dc2626' : (high ? '#0f766e' : '#6366f1');
    const fill = n === 4 ? '#fef2f2' : (high ? '#ccfbf1' : '#e0e7ff');
    const textCol = n === 4 ? '#b91c1c' : (high ? '#0f766e' : '#4338ca');
    const strokeW = high || n === 4 ? 2.5 : 1.2;

    if (rawText.length > 3) {
      const bw = Math.min(80, Math.max(38, rawText.length * 8 + 10));
      const bh = 22;
      return `
        <rect x="${cx - bw/2}" y="${cy - bh/2}" width="${bw}" height="${bh}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}"/>
        <text x="${cx}" y="${cy + 4.5}" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="${textCol}" text-anchor="middle">${text}</text>
      `;
    }
    return `
      <circle cx="${cx}" cy="${cy}" r="14" fill="${fill}" stroke="${stroke}" stroke-width="${strokeW}"/>
      <text x="${cx}" y="${cy + 4.5}" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${textCol}" text-anchor="middle">${text}</text>
    `;
  };

  const polyPoints = hasExt ? "160,55 60,215 270,215" : "210,55 90,215 330,215";
  const aX = hasExt ? 160 : 210;
  const bX = hasExt ? 60 : 90;
  const cX = hasExt ? 270 : 330;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" width="420" height="300">
    <rect width="420" height="300" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>

    ${hasExt ? `
      <!-- Base extension ray -->
      <line x1="270" y1="215" x2="385" y2="215" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,4" stroke-linecap="round"/>
      <polygon points="385,215 375,210 375,220" fill="#dc2626"/>
      <text x="392" y="220" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc2626">D</text>
    ` : ''}

    <!-- Triangle polygon -->
    <polygon points="${polyPoints}" fill="#f0fdfa" stroke="#0f766e" stroke-width="3" stroke-linejoin="round"/>

    <!-- Vertex Labels -->
    <text x="${aX - 5}" y="42" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">A</text>
    <text x="${bX - 25}" y="222" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">B</text>
    <text x="${cX + (hasExt ? -5 : 10)}" y="235" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#1e293b">C</text>

    <!-- Angle Badges -->
    ${renderBadge(1, aX, 90)}
    ${renderBadge(2, bX + 42, 195)}
    ${renderBadge(3, cX - 42, 195)}
    ${hasExt ? renderBadge(4, 320, 185) : ''}

    <!-- Prompt / Note -->
    <rect x="15" y="260" width="390" height="30" rx="5" fill="#f1f5f9"/>
    <text x="210" y="280" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">${escapeXml(prompt)}</text>
  </svg>`;
}

export function renderSimilarTrianglesSvg(vd = {}) {
  const prompt = vd.prompt || 'Angle-Angle (AA) Triangle Similarity';
  const t1 = vd.triangle1 || { label: '△ABC', angles: { A: '40°', B: '60°', C: '80°' } };
  const t2 = vd.triangle2 || { label: '△DEF', angles: { D: '40°', B: '60°', F: '80°' } };
  const labels = vd.angleLabels || {};

  const aA = labels['1'] || t1.angles?.A || '40°';
  const aB = labels['2'] || t1.angles?.B || '60°';
  const aC = labels['3'] || t1.angles?.C || '80°';

  const aD = labels['4'] || t2.angles?.D || '40°';
  const aE = labels['5'] || t2.angles?.E || '60°';
  const aF = labels['6'] || t2.angles?.F || '80°';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" width="420" height="300">
    <rect width="420" height="300" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
    
    <!-- Triangle 1 (ABC) -->
    <polygon points="85,85 30,210 145,210" fill="#f0fdfa" stroke="#0f766e" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="80" y="70" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f766e">A</text>
    <text x="14" y="218" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f766e">B</text>
    <text x="150" y="218" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f766e">C</text>
    
    <!-- Badges for Triangle 1 -->
    <text x="85" y="118" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">${escapeXml(aA)}</text>
    <text x="65" y="196" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">${escapeXml(aB)}</text>
    <text x="122" y="196" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">${escapeXml(aC)}</text>
    <text x="88" y="242" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f766e" text-anchor="middle">${escapeXml(t1.label || '△ABC')}</text>

    <!-- Similarity symbol -->
    <text x="185" y="150" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#6366f1" text-anchor="middle">∼</text>

    <!-- Triangle 2 (DEF) - Scaled larger -->
    <polygon points="300,50 220,215 390,215" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="295" y="38" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4f46e5">D</text>
    <text x="205" y="222" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4f46e5">E</text>
    <text x="395" y="222" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4f46e5">F</text>
    
    <!-- Badges for Triangle 2 -->
    <text x="300" y="90" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#4f46e5" text-anchor="middle">${escapeXml(aD)}</text>
    <text x="260" y="198" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#4f46e5" text-anchor="middle">${escapeXml(aE)}</text>
    <text x="350" y="198" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#4f46e5" text-anchor="middle">${escapeXml(aF)}</text>
    <text x="305" y="242" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4f46e5" text-anchor="middle">${escapeXml(t2.label || '△DEF')}</text>

    <!-- Prompt / Note -->
    <rect x="15" y="260" width="390" height="30" rx="5" fill="#f1f5f9"/>
    <text x="210" y="280" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">${escapeXml(prompt)}</text>
  </svg>`;
}

export function getSvgForExemplar(ex) {
  if (!ex) return null;
  const vd = ex.visualData;
  if (!vd || !vd.type) return null;
  if (vd.type === 'transversal') return renderTransversalSvg(vd);
  if (vd.type === 'triangle-angles') return renderTriangleSvg(vd);
  if (vd.type === 'similar-triangles') return renderSimilarTrianglesSvg(vd);
  return null;
}

function toBase64(svgString) {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(unescape(encodeURIComponent(svgString)));
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(svgString).toString('base64');
  }
  return btoa(unescape(encodeURIComponent(svgString)));
}

export function addHeader(slide, title, timer, pres) {
  slide.background = { color: COLOR_BG };
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.85, fill: { color: COLOR_PURPLE } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0.85, w: '100%', h: 0.06, fill: { color: COLOR_TEAL } });

  slide.addText(title, {
    x: 0.5, y: 0.05, w: timer ? 7.6 : 9.0, h: 0.75,
    fontSize: 20, bold: true, color: COLOR_WHITE, valign: 'middle'
  });

  if (timer) {
    slide.addShape(pres.ShapeType.roundRect, {
      x: 8.5, y: 0.18, w: 1.0, h: 0.45,
      fill: { color: COLOR_TEAL }, line: { color: COLOR_WHITE, width: 1 }
    });
    slide.addText(timer, {
      x: 8.5, y: 0.18, w: 1.0, h: 0.45,
      fontSize: 14, bold: true, color: COLOR_WHITE, align: 'center', valign: 'middle'
    });
  }

  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.5, y: 1.05, w: 9.0, h: 4.3,
    fill: { color: COLOR_WHITE }, line: { color: COLOR_BORDER, width: 1.5 }
  });
}

export function addProblemContent(slide, ex, pres) {
  const qText = cleanQuestionText(ex.question || ex.text || 'Solve the problem.');
  const svg = getSvgForExemplar(ex);
  const options = ex.options && Array.isArray(ex.options) ? ex.options.slice(0, 4) : [];

  if (svg) {
    // 2-COLUMN LAYOUT: Left = Diagram, Right = Question + Choices
    slide.addImage({
      data: `image/svg+xml;base64,${toBase64(svg)}`,
      x: 0.7, y: 1.15, w: 4.2, h: 3.9
    });

    // Question card on top right
    slide.addShape(pres.ShapeType.roundRect, {
      x: 5.05, y: 1.15, w: 4.35, h: 1.4,
      fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1.2 }
    });

    const qFont = qText.length > 140 ? 11.5 : (qText.length > 90 ? 12.5 : 13.5);
    slide.addText(qText, {
      x: 5.15, y: 1.2, w: 4.15, h: 1.3,
      fontSize: qFont, bold: true, color: COLOR_SLATE, valign: 'middle', align: 'left'
    });

    // Choices on bottom right (stacked 4 rows)
    if (options.length > 0) {
      const startY = 2.65;
      const rowH = 0.58;
      const gap = 0.08;

      options.forEach((opt, idx) => {
        const oy = startY + idx * (rowH + gap);
        const letter = String.fromCharCode(65 + idx);
        const optText = cleanMathText(opt);

        slide.addShape(pres.ShapeType.roundRect, {
          x: 5.05, y: oy, w: 4.35, h: rowH,
          fill: { color: COLOR_WHITE }, line: { color: COLOR_BORDER, width: 1 }
        });

        slide.addShape(pres.ShapeType.roundRect, {
          x: 5.15, y: oy + 0.08, w: 0.42, h: rowH - 0.16,
          fill: { color: COLOR_PURPLE }
        });
        slide.addText(letter, {
          x: 5.15, y: oy + 0.08, w: 0.42, h: rowH - 0.16,
          fontSize: 12, bold: true, color: COLOR_WHITE, align: 'center', valign: 'middle'
        });

        const optFont = optText.length > 60 ? 10 : (optText.length > 40 ? 11 : 12);
        slide.addText(optText, {
          x: 5.65, y: oy + 0.04, w: 3.65, h: rowH - 0.08,
          fontSize: optFont, color: COLOR_SLATE, valign: 'middle'
        });
      });
    } else {
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.05, y: 2.65, w: 4.35, h: 2.4,
        fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1, dashType: 'dash' }
      });
      slide.addText('Work Space / Show Steps:', {
        x: 5.2, y: 2.75, w: 4.0, h: 0.35,
        fontSize: 11, bold: true, color: COLOR_MUTED
      });
    }
  } else {
    // FULL-WIDTH LAYOUT (No diagram)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.25, w: 8.4, h: 1.4,
      fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1.2 }
    });
    const qFont = qText.length > 150 ? 13 : (qText.length > 90 ? 14 : 15);
    slide.addText(qText, {
      x: 1.0, y: 1.3, w: 8.0, h: 1.3,
      fontSize: qFont, bold: true, color: COLOR_SLATE, align: 'center', valign: 'middle'
    });

    if (options.length > 0) {
      options.forEach((opt, idx) => {
        const ox = (idx % 2 === 0) ? 0.8 : 5.1;
        const oy = (idx < 2) ? 2.85 : 3.9;
        const letter = String.fromCharCode(65 + idx);
        const optText = cleanMathText(opt);

        slide.addShape(pres.ShapeType.roundRect, {
          x: ox, y: oy, w: 4.1, h: 0.9,
          fill: { color: COLOR_WHITE }, line: { color: COLOR_BORDER, width: 1.2 }
        });
        slide.addShape(pres.ShapeType.roundRect, {
          x: ox + 0.15, y: oy + 0.18, w: 0.5, h: 0.5,
          fill: { color: COLOR_PURPLE }
        });
        slide.addText(letter, {
          x: ox + 0.15, y: oy + 0.18, w: 0.5, h: 0.5,
          fontSize: 13, bold: true, color: COLOR_WHITE, align: 'center', valign: 'middle'
        });
        const optFont = optText.length > 60 ? 11 : 12.5;
        slide.addText(optText, {
          x: ox + 0.75, y: oy + 0.08, w: 3.2, h: 0.74,
          fontSize: optFont, color: COLOR_SLATE, valign: 'middle'
        });
      });
    }
  }
}

export function buildPlanPptx(pres, p, weekPlans) {
  pres.layout = 'LAYOUT_16x9';

  // 1. Welcome Slide
  {
    const s = pres.addSlide();
    s.background = { color: COLOR_PURPLE };
    s.addShape(pres.ShapeType.rect, { x: 2.0, y: 1.2, w: 6.0, h: 0.08, fill: { color: COLOR_TEAL } });
    s.addText('WELCOME TO CLASS', {
      x: 0.5, y: 1.4, w: 9.0, h: 0.8,
      fontSize: 34, bold: true, color: COLOR_WHITE, align: 'center'
    });
    const topicText = cleanMathText(p.topic || 'Math 8');
    const tFont = topicText.length > 60 ? 18 : (topicText.length > 40 ? 21 : 24);
    s.addText(topicText, {
      x: 0.5, y: 2.2, w: 9.0, h: 0.9,
      fontSize: tFont, bold: true, color: '99F6E4', align: 'center', valign: 'middle'
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: 3.4, y: 3.4, w: 3.2, h: 0.6,
      fill: { color: COLOR_TEAL }
    });
    s.addText('Get ready to start!', {
      x: 3.4, y: 3.4, w: 3.2, h: 0.6,
      fontSize: 16, bold: true, color: COLOR_WHITE, align: 'center', valign: 'middle'
    });
  }

  // 2. Spiraled Do Now
  {
    const s = pres.addSlide();
    addHeader(s, '1. Spiraled Do Now', '5:00', pres);
    
    // Directions banner
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.2, w: 8.4, h: 0.45,
      fill: { color: 'F5F3FF' }, line: { color: 'DDD6FE', width: 1 }
    });
    s.addText('Directions: Complete the warm-up problems quietly in your notebook before the timer rings.', {
      x: 1.0, y: 1.2, w: 8.0, h: 0.45,
      fontSize: 11.5, italic: true, color: COLOR_PURPLE, valign: 'middle'
    });

    const cleanDoNowLines = (p.do_now || 'Complete the Do Now on the board.')
      .split('\n')
      .filter(l => !l.trim().match(/^\*?Answer:/i))
      .join('\n');
    const doNowText = cleanMathText(cleanDoNowLines, true);

    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.75, w: 8.4, h: 3.4,
      fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1 }
    });
    s.addText(doNowText, {
      x: 1.0, y: 1.85, w: 8.0, h: 3.2,
      fontSize: 13, color: COLOR_SLATE, valign: 'top', lineSpacing: 20
    });
  }

  // 3. Classroom Expectations
  {
    const s = pres.addSlide();
    addHeader(s, '2. Classroom Expectations', null, pres);
    const rules = [
      { num: '1', title: 'No Cellphones', desc: 'Devices must be kept away and on silent during instruction.' },
      { num: '2', title: 'Drop Pencils When Done', desc: 'When timer buzzes or signaled, drop pencils and track speaker.' },
      { num: '3', title: 'Communicate with Respect', desc: 'Use positive, academic language with peers and teachers.' },
      { num: '4', title: 'Raise Your Hand', desc: 'Wait to be acknowledged before speaking or leaving your seat.' }
    ];
    rules.forEach((r, idx) => {
      const rx = (idx % 2 === 0) ? 0.8 : 5.1;
      const ry = (idx < 2) ? 1.35 : 3.15;
      s.addShape(pres.ShapeType.roundRect, {
        x: rx, y: ry, w: 4.1, h: 1.55,
        fill: { color: 'F1F5F9' }, line: { color: COLOR_BORDER, width: 1 }
      });
      s.addShape(pres.ShapeType.roundRect, {
        x: rx + 0.15, y: ry + 0.18, w: 0.45, h: 0.45,
        fill: { color: COLOR_PURPLE }
      });
      s.addText(r.num, {
        x: rx + 0.15, y: ry + 0.18, w: 0.45, h: 0.45,
        fontSize: 13, bold: true, color: COLOR_WHITE, align: 'center', valign: 'middle'
      });
      s.addText(r.title, {
        x: rx + 0.7, y: ry + 0.18, w: 3.25, h: 0.45,
        fontSize: 15, bold: true, color: COLOR_PURPLE, valign: 'middle'
      });
      s.addText(r.desc, {
        x: rx + 0.7, y: ry + 0.65, w: 3.25, h: 0.75,
        fontSize: 11.5, color: COLOR_SLATE, valign: 'top'
      });
    });
  }

  // 4. Today @ A Glance
  {
    const s = pres.addSlide();
    addHeader(s, '3. Today @ A Glance', null, pres);
    const framing = getFramingArc(p);

    s.addShape(pres.ShapeType.roundRect, {
      x: 0.7, y: 1.15, w: 5.3, h: 4.1,
      fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1 }
    });

    let curY = 1.25;
    if (framing) {
      s.addText('🎯 Learning Progression Framing:', {
        x: 0.9, y: curY, w: 4.9, h: 0.3, fontSize: 13, bold: true, color: COLOR_TEAL
      });
      curY += 0.35;
      s.addText(`Yesterday: ${cleanMathText(framing.yesterday)}`, {
        x: 0.9, y: curY, w: 4.9, h: 0.5, fontSize: 10.5, color: COLOR_SLATE, valign: 'top'
      });
      curY += 0.55;
      s.addText(`Today: ${cleanMathText(framing.today)}`, {
        x: 0.9, y: curY, w: 4.9, h: 0.5, fontSize: 10.5, color: COLOR_SLATE, valign: 'top'
      });
      curY += 0.55;
      s.addText(`So that: ${cleanMathText(framing.soThat)}`, {
        x: 0.9, y: curY, w: 4.9, h: 0.55, fontSize: 10.5, italic: true, color: COLOR_PURPLE, valign: 'top'
      });
      curY += 0.6;
    }

    s.addText('Essential Question of the Day:', {
      x: 0.9, y: Math.max(curY, 3.3), w: 4.9, h: 0.28, fontSize: 12, bold: true, color: COLOR_TEAL
    });
    s.addText(getEssentialQuestion(p.objective_3m), {
      x: 0.9, y: Math.max(curY, 3.3) + 0.3, w: 4.9, h: 1.1, fontSize: 11, italic: true, color: COLOR_SLATE, valign: 'top'
    });

    // Right card: Agenda
    s.addShape(pres.ShapeType.roundRect, {
      x: 6.2, y: 1.15, w: 3.1, h: 4.1,
      fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1 }
    });
    s.addText('Today\'s Agenda', {
      x: 6.4, y: 1.25, w: 2.7, h: 0.3, fontSize: 14, bold: true, color: COLOR_PURPLE
    });
    const agendaItems = [
      '1. Spiraled Do Now',
      '2. Direct Instruction / Notes',
      '3. Guided & Group Practice (We Do)',
      '4. Independent Practice (You Do)',
      '5. Exit Ticket'
    ];
    s.addText(agendaItems.join('\n\n'), {
      x: 6.4, y: 1.7, w: 2.7, h: 3.3, fontSize: 11.5, color: COLOR_SLATE, valign: 'top', lineSpacing: 20
    });
  }

  // 3b. Lesson Purpose ("Our Why?")
  const purposeText = getLessonPurpose(p);
  if (purposeText) {
    const sPurp = pres.addSlide();
    addHeader(sPurp, 'Lesson Purpose ("Our Why?")', null, pres);
    sPurp.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.25, w: 8.4, h: 3.9,
      fill: { color: 'F8FAFC' }, line: { color: COLOR_PURPLE, width: 2 }
    });
    sPurp.addText(cleanMathText(purposeText, true), {
      x: 1.1, y: 1.45, w: 7.8, h: 3.5,
      fontSize: 13, color: COLOR_SLATE, valign: 'top', lineSpacing: 20
    });
  }

  // 5. Student Shoutouts
  {
    const s = pres.addSlide();
    addHeader(s, '4. Student Shoutouts', null, pres);
    s.addText('Highest TicketOut Scores Across All Classes!', {
      x: 0.8, y: 1.25, w: 8.4, h: 0.4,
      fontSize: 16, bold: true, color: COLOR_TEAL, align: 'center'
    });

    const cores = [
      { name: 'Core 1', student: 'Top Scholar' },
      { name: 'Core 2', student: 'Top Scholar' },
      { name: 'Core 3', student: 'Top Scholar' }
    ];

    cores.forEach((c, idx) => {
      const cx = 0.9 + idx * 2.8;
      s.addShape(pres.ShapeType.roundRect, {
        x: cx, y: 1.8, w: 2.6, h: 3.0,
        fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1 }
      });
      s.addShape(pres.ShapeType.roundRect, {
        x: cx, y: 1.8, w: 2.6, h: 0.7,
        fill: { color: COLOR_PURPLE }
      });
      s.addText(c.name, {
        x: cx, y: 1.8, w: 2.6, h: 0.7,
        fontSize: 16, bold: true, color: COLOR_WHITE, align: 'center', valign: 'middle'
      });
      s.addText('Top Performer', {
        x: cx, y: 2.7, w: 2.6, h: 0.4,
        fontSize: 12, italic: true, color: COLOR_MUTED, align: 'center'
      });
      s.addText(c.student, {
        x: cx, y: 3.3, w: 2.6, h: 0.8,
        fontSize: 18, bold: true, color: COLOR_PURPLE, align: 'center', valign: 'middle'
      });
    });
  }

  // 6. Direct Instruction Slides
  if (p.direct_instruction) {
    let diText = p.direct_instruction;
    diText = diText.split(/##+\s*(?:Tiered\s+)?Differentiation/i)[0];
    diText = diText.replace(/##+\s*(?:Lesson\s+)?Purpose[\s\S]*?(?=##\s+[A-Z🎯]|$)/i, '').trim();
    diText = diText.replace(/##+\s*[^\n]*Framing[\s\S]*?(?=##\s+|$)/i, '').trim();

    const blocks = diText.split(/(?=##+ )/);
    blocks.forEach(block => {
      if (!block.trim()) return;
      let title = "Direct Instruction";
      const tm = block.match(/##+ (.*?)\n/);
      if (tm) {
        title = tm[1].trim();
        block = block.replace(/##+ .*?\n/, '');
      }
      const titleLower = title.toLowerCase();
      if (
        titleLower.includes('differentiation') ||
        titleLower.includes('lesson purpose') ||
        titleLower.includes('our why') ||
        titleLower.includes('framing') ||
        titleLower.includes('continuity')
      ) {
        return;
      }
      block = block.replace(/^---\n/, '').trim();
      if (!block || block === '#' || block === '---') return;

      // Handle Vocabulary: split into clean 2-column cards
      if (titleLower.includes('vocabulary')) {
        const s = pres.addSlide();
        addHeader(s, `Direct Instruction: ${title}`, null, pres);

        const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 5);
        const col1 = lines.slice(0, 3);
        const col2 = lines.slice(3, 6);

        [col1, col2].forEach((col, cIdx) => {
          const colX = cIdx === 0 ? 0.8 : 5.1;
          col.forEach((line, rIdx) => {
            const itemY = 1.3 + rIdx * 1.25;
            s.addShape(pres.ShapeType.roundRect, {
              x: colX, y: itemY, w: 4.1, h: 1.15,
              fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1 }
            });
            const parts = line.split(/:\s*/);
            const term = cleanMathText(parts[0]);
            const def = cleanMathText(parts.slice(1).join(': '));

            s.addText(term, {
              x: colX + 0.15, y: itemY + 0.1, w: 3.8, h: 0.35,
              fontSize: 12.5, bold: true, color: COLOR_PURPLE, valign: 'top'
            });
            s.addText(def, {
              x: colX + 0.15, y: itemY + 0.45, w: 3.8, h: 0.65,
              fontSize: 10.5, color: COLOR_SLATE, valign: 'top'
            });
          });
        });
        return;
      }

      // Handle Golden Rules / Theorems with diagram
      const isTheorems = titleLower.includes('rule') || titleLower.includes('theorem') || titleLower.includes('criterion') || titleLower.includes('station');
      if (isTheorems && p.structured_exemplars && p.structured_exemplars[0]) {
        const s = pres.addSlide();
        addHeader(s, `Direct Instruction: ${title}`, null, pres);

        const svg = getSvgForExemplar(p.structured_exemplars[0]);
        if (svg) {
          s.addImage({
            data: `image/svg+xml;base64,${toBase64(svg)}`,
            x: 0.7, y: 1.2, w: 4.1, h: 3.8
          });

          s.addShape(pres.ShapeType.roundRect, {
            x: 5.0, y: 1.2, w: 4.4, h: 3.8,
            fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1.2 }
          });
          const cleanRules = cleanMathText(block, true);
          s.addText(cleanRules, {
            x: 5.15, y: 1.3, w: 4.1, h: 3.6,
            fontSize: 11.5, color: COLOR_SLATE, valign: 'top', lineSpacing: 18
          });
          return;
        }
      }

      // Default DI slide
      const s = pres.addSlide();
      addHeader(s, `Direct Instruction: ${title}`, null, pres);
      s.addShape(pres.ShapeType.roundRect, {
        x: 0.8, y: 1.25, w: 8.4, h: 3.9,
        fill: { color: 'F8FAFC' }, line: { color: COLOR_BORDER, width: 1.2 }
      });
      const cleanContent = cleanMathText(block, true);
      const font = cleanContent.length > 350 ? 12 : 13.5;
      s.addText(cleanContent, {
        x: 1.0, y: 1.4, w: 8.0, h: 3.6,
        fontSize: font, color: COLOR_SLATE, valign: 'top', lineSpacing: 20
      });
    });
  }

  // 7. CFU 1
  {
    const s = pres.addSlide();
    addHeader(s, '7. Formative Assessment #1 (CFU)', '2:00', pres);
    const cfu = (p.checks_for_understanding && p.checks_for_understanding[0]?.cfu) || 'Turn and Talk';
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.3, w: 8.4, h: 3.7,
      fill: { color: 'F0FDFA' }, line: { color: COLOR_TEAL, width: 2 }
    });
    s.addText('Check for Understanding:', {
      x: 1.2, y: 1.5, w: 7.6, h: 0.4,
      fontSize: 16, bold: true, color: COLOR_TEAL
    });
    const cfuClean = cleanMathText(cfu);
    const cfuFont = cfuClean.length > 150 ? 13.5 : (cfuClean.length > 90 ? 15 : 18);
    s.addText(cfuClean, {
      x: 1.2, y: 2.0, w: 7.6, h: 2.7,
      fontSize: cfuFont, bold: true, color: COLOR_SLATE, valign: 'top', lineSpacing: 22
    });
  }

  // 8. Guided Practice Problems (indices 0 and 1)
  if (p.structured_exemplars && p.structured_exemplars.length >= 2) {
    [0, 1].forEach((exIdx) => {
      const ex = p.structured_exemplars[exIdx];
      const s = pres.addSlide();
      addHeader(s, `8. Guided Practice (Problem ${exIdx + 1})`, '5:00', pres);
      addProblemContent(s, ex, pres);
    });
  }

  // 9. CFU #2 (Cold Call)
  if (p.checks_for_understanding && p.checks_for_understanding[1]) {
    const cfu2 = p.checks_for_understanding[1];
    const s = pres.addSlide();
    addHeader(s, `9. Formative Assessment #2 (${cfu2.method || 'Cold Call'})`, '2:00', pres);
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.3, w: 8.4, h: 3.7,
      fill: { color: 'F0FDFA' }, line: { color: COLOR_TEAL, width: 2 }
    });
    s.addText(`Check for Understanding (${cfu2.method || 'Cold Call'}):`, {
      x: 1.2, y: 1.5, w: 7.6, h: 0.4,
      fontSize: 16, bold: true, color: COLOR_TEAL
    });
    const cfuClean = cleanMathText(cfu2.cfu);
    const cfuFont = cfuClean.length > 150 ? 13.5 : (cfuClean.length > 90 ? 15 : 18);
    s.addText(cfuClean, {
      x: 1.2, y: 2.0, w: 7.6, h: 2.7,
      fontSize: cfuFont, bold: true, color: COLOR_SLATE, valign: 'top', lineSpacing: 22
    });
  }

  // 10. Group Practice Problems (indices 2 to 5)
  if (p.structured_exemplars && p.structured_exemplars.length >= 6) {
    [2, 3, 4, 5].forEach((exIdx, gIdx) => {
      const ex = p.structured_exemplars[exIdx];
      const s = pres.addSlide();
      addHeader(s, `10. Group Practice (Problem ${gIdx + 3})`, '5:00', pres);
      addProblemContent(s, ex, pres);
    });
  }

  // 11. CFU #3 (Warm Call)
  if (p.checks_for_understanding && p.checks_for_understanding[2]) {
    const cfu3 = p.checks_for_understanding[2];
    const s = pres.addSlide();
    addHeader(s, `11. Formative Assessment #3 (${cfu3.method || 'Warm Call'})`, '2:00', pres);
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.3, w: 8.4, h: 3.7,
      fill: { color: 'F0FDFA' }, line: { color: COLOR_TEAL, width: 2 }
    });
    s.addText(`Check for Understanding (${cfu3.method || 'Warm Call'}):`, {
      x: 1.2, y: 1.5, w: 7.6, h: 0.4,
      fontSize: 16, bold: true, color: COLOR_TEAL
    });
    const cfuClean = cleanMathText(cfu3.cfu);
    const cfuFont = cfuClean.length > 150 ? 13.5 : (cfuClean.length > 90 ? 15 : 18);
    s.addText(cfuClean, {
      x: 1.2, y: 2.0, w: 7.6, h: 2.7,
      fontSize: cfuFont, bold: true, color: COLOR_SLATE, valign: 'top', lineSpacing: 22
    });
  }

  // 12. Independent Practice Directions
  {
    const s = pres.addSlide();
    addHeader(s, '12. Independent Practice (Directions)', '15:00', pres);
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.25, w: 8.4, h: 3.9,
      fill: { color: 'F8FAFC' }, line: { color: COLOR_PURPLE, width: 1.5 }
    });

    const rawIp = p.independent_practice || 'Complete all assigned independent practice problems quietly.';
    const transMatch = rawIp.match(/🔁\s*\*\*Transition[^\*]*\*\*:?\s*\*?(.*?)\*?\n\n/is);
    let curY = 1.45;
    if (transMatch) {
      s.addShape(pres.ShapeType.roundRect, {
        x: 1.0, y: curY, w: 8.0, h: 1.2,
        fill: { color: 'EFF6FF' }, line: { color: '3B82F6', width: 1.2 }
      });
      s.addText('🔁 Class Transition:', {
        x: 1.15, y: curY + 0.1, w: 7.7, h: 0.3,
        fontSize: 12, bold: true, color: '1E40AF'
      });
      s.addText(cleanMathText(transMatch[1]), {
        x: 1.15, y: curY + 0.4, w: 7.7, h: 0.7,
        fontSize: 11, italic: true, color: '1E3A8A', valign: 'top'
      });
      curY += 1.35;
    }

    s.addText('Independent Work Expectations:', {
      x: 1.0, y: curY, w: 8.0, h: 0.35,
      fontSize: 15, bold: true, color: COLOR_PURPLE
    });
    const remainingIp = rawIp.replace(/🔁\s*\*\*Transition[^\*]*\*\*:?\s*\*?.*?\*?\n\n/is, '');
    s.addText(cleanMathText(remainingIp, true), {
      x: 1.0, y: curY + 0.4, w: 8.0, h: 3.7 - (curY - 1.25),
      fontSize: 12.5, color: COLOR_SLATE, valign: 'top', lineSpacing: 18
    });
  }

  // 13. Independent Practice Problems (indices 6 to 13)
  if (p.structured_exemplars && p.structured_exemplars.length > 6) {
    const indExemplars = p.structured_exemplars.slice(6, 14);
    indExemplars.forEach((ex, idx) => {
      const s = pres.addSlide();
      addHeader(s, `12. Independent Practice (Problem ${idx + 7})`, '3:00', pres);
      addProblemContent(s, ex, pres);
    });
  }

  // 14. CFU #4 (Batch Call)
  if (p.checks_for_understanding && p.checks_for_understanding[3]) {
    const cfu4 = p.checks_for_understanding[3];
    const s = pres.addSlide();
    addHeader(s, `13. Formative Assessment #4 (${cfu4.method || 'Batch Call'})`, '2:00', pres);
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 1.3, w: 8.4, h: 3.7,
      fill: { color: 'F0FDFA' }, line: { color: COLOR_TEAL, width: 2 }
    });
    s.addText(`Check for Understanding (${cfu4.method || 'Batch Call'}):`, {
      x: 1.2, y: 1.5, w: 7.6, h: 0.4,
      fontSize: 16, bold: true, color: COLOR_TEAL
    });
    const cfuClean = cleanMathText(cfu4.cfu);
    const cfuFont = cfuClean.length > 150 ? 13.5 : (cfuClean.length > 90 ? 15 : 18);
    s.addText(cfuClean, {
      x: 1.2, y: 2.0, w: 7.6, h: 2.7,
      fontSize: cfuFont, bold: true, color: COLOR_SLATE, valign: 'top', lineSpacing: 22
    });
  }

  // 15. Exit Ticket Slides
  if (p.structured_exemplars && p.structured_exemplars.length >= 16) {
    [14, 15].forEach((exIdx, i) => {
      const ex = p.structured_exemplars[exIdx];
      const s = pres.addSlide();
      addHeader(s, `14. Exit Ticket (Problem ${i + 15})`, '3:00', pres);
      addProblemContent(s, ex, pres);
    });
  } else {
    const s = pres.addSlide();
    addHeader(s, '14. Exit Ticket', '5:00', pres);
    s.addText('Directions: Complete independently without notes before the bell.', {
      x: 0.8, y: 1.25, w: 8.4, h: 0.35,
      fontSize: 13, italic: true, color: COLOR_MUTED
    });
    const etText = cleanMathText(p.exit_ticket || 'Complete the Exit Ticket.', true);
    s.addText(etText, {
      x: 0.8, y: 1.65, w: 8.4, h: 3.5,
      fontSize: 14, color: COLOR_SLATE, valign: 'top', lineSpacing: 20
    });
  }
}
