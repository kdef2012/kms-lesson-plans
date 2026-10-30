import React, { useState, useEffect } from 'react';

const STANDARD_MAP = {
  '8.G.1': 'NC.8.G.1 Verify experimentally the properties of rotations, reflections, and translations.',
  '8.G.2': 'NC.8.G.2 Use transformations to define congruence.',
  '8.G.3': 'NC.8.G.3 Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures using coordinates.',
  '8.G.4': 'NC.8.G.4 Use transformations to define similarity.',
  '8.NS.1': 'NC.8.NS.1 Understand that every number has a decimal expansion.'
};

const REAL_ROSTERS = {
  "core1": [
    "Leah I Sixtos-Colon",
    "Luis A Hernandez",
    "Tyson Drake",
    "Mara-Lynn Aycock",
    "Ja'myah Wardlow",
    "David J Matos Salas",
    "Laniyah S Farley",
    "Grace S Bundor",
    "Destiny Fletcher",
    "Irvin Toscano-Rivera",
    "Aveah L Robinson",
    "Bayam Tomas",
    "Aryana A Dearmon",
    "Brooklynne D Flow",
    "Jada'Kiss A Robinson",
    "Joe Martinez Nonthe",
    "Alaysia McDonald",
    "Keyanna D Moore",
    "Leonardo N Saucedo Bernal",
    "Stephanie M Schmidt",
    "Deshayla Hernandez-Garcia",
    "Najwa Sediqi",
    "Javier Isidro-Duarte",
    "Ci'ree Harvey",
    "Aydalyz Gutierrez-Garcia",
    "Cesar S Luna Martinez",
    "Celeste M Staup",
    "Alicia G Horton",
    "Itzia Noyola-Marquez"
  ],
  "core2": [
    "Miguel M De Los Santos",
    "Addai Y Williams",
    "Damian Aguilar Marroquin",
    "Naomi M Arellano Quintanilla",
    "Blake J Scales",
    "Gajuan K Crawford",
    "Ana K Noyola Cisneros",
    "Peyton Brazeal",
    "Jayceon T Silva",
    "Jose A Diaz",
    "Miracle Fletcher",
    "Jefferson S Melgar Jr.",
    "Brittany Quintero",
    "Braylen Linebarger",
    "Stephanie Zamorano-Gonzalez",
    "Allisson Garcia-Carrillo",
    "Katherine N Banger",
    "Kharyan D Davis",
    "Miguel A Maldonado Santos",
    "Natali J Garcia-Julian",
    "Joyce D Silva-Villarreal",
    "Jermauria A Miller-Oglesby",
    "Alberto Hernandez-Salinas",
    "Treyvon Pate",
    "Aiden M Brewster",
    "Roxaly Bernal-Penaloza"
  ],
  "core3": [
    "Alice P Montalvan-Vasquez",
    "Martin J Toscano Salinas",
    "Kalieze T Eaton",
    "Ricardo J Velasco-Martinez",
    "Kadeem E Thom",
    "Nathanal R Flowers",
    "Kaylee Andres Pedro",
    "Bradley A Fontaine",
    "Jayden T Clark",
    "Janelly Barragan-Candela",
    "Franco I Sanchez",
    "Elias B Bernal Avila",
    "Jaylend A Silva-Arellanez",
    "Kiara B Aguilar-Morales",
    "Zinedine Casiano-Montes",
    "Esther Cuevas-Lopez",
    "Angel M Maganda Casiano",
    "Zyan M Robinson",
    "Jose A Lozano Saucedo",
    "Mario A Vasquez-Segovia",
    "Angel D Olmedo-Hernandez",
    "Jener A Lopez Yanes",
    "Malena A Banks",
    "Reggie L Moore III",
    "Natalie A Moore"
  ]
};

const getShoutoutsForDate = (shoutoutsMap, targetDate) => {
  if (shoutoutsMap && shoutoutsMap[targetDate] && shoutoutsMap[targetDate].some(n => n && n !== "TBD" && !n.startsWith("Student") && n !== "Top Scholar")) {
    return shoutoutsMap[targetDate];
  }
  const hash = (targetDate || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [
    REAL_ROSTERS.core1[hash % REAL_ROSTERS.core1.length],
    REAL_ROSTERS.core2[(hash * 3 + 7) % REAL_ROSTERS.core2.length],
    REAL_ROSTERS.core3[(hash * 7 + 13) % REAL_ROSTERS.core3.length]
  ];
};

const getLessonPurpose = (p) => {
  if (!p) return null;
  if (p.lesson_purpose && p.lesson_purpose.trim()) {
    return p.lesson_purpose.trim();
  }
  const di = p.direct_instruction || '';
  const match = di.match(/##+.*?(?:Purpose|Our\s*Why)[\s\S]*?(?=(##\s+[A-Z0-9]|$))/i);
  if (match) {
    return match[0].replace(/^##+.*?\n/i, '').replace(/^---+\s*\n/i, '').trim();
  }
  const whyMatch = di.match(/\*\s*\*\*Why (?:This Matters|is this lesson)[\s\S]*?(?=(##\s+[A-Z0-9]|$))/i);
  if (whyMatch) {
    return whyMatch[0].trim();
  }
  return null;
};

const getFramingArc = (p, allPlans) => {
  if (!p) return null;
  let yesterday = "reviewed prerequisite mathematical foundations and problem-solving skills";
  if (p.date_start === '2026-10-29') {
    yesterday = "solved multi-step linear equations with rational coefficients and determined when equations have one, no, or infinitely many solutions (8.EE.7)";
  } else if (allPlans && allPlans.length > 0) {
    const sorted = [...allPlans].sort((a,b) => (a.date_start || '').localeCompare(b.date_start || ''));
    const idx = sorted.findIndex(item => item.date_start === p.date_start);
    if (idx > 0) {
      const prev = sorted[idx - 1];
      yesterday = (prev.topic || '').replace(/\[.*?\]\s*/, '') + (prev.standard ? ` (${prev.standard})` : '');
    }
  }

  let today = (p.objective_3m || '')
    .replace(/^SWBAT\s+/i, '')
    .replace(/\s+with\s+\d+%.*$/i, '')
    .replace(/\s+with\s+at least.*$/i, '')
    .trim();
  if (!today) today = (p.topic || '').replace(/\[.*?\]\s*/, '');

  let soThat = "we can apply algebraic and geometric models to solve real-world problems in engineering, architecture, and technology!";
  const purpose = getLessonPurpose(p);
  if (purpose) {
    const whyMatch = purpose.match(/Why is this lesson being taught to the students\?\s*\n\*?\s*([\s\S]*?)(?=\n\*|\n##|$)/i);
    if (whyMatch && whyMatch[1].trim()) {
      soThat = whyMatch[1].trim();
      if (soThat.length > 220) {
        soThat = soThat.substring(0, 217).trim() + '...';
      }
    }
  }

  return { yesterday, today, soThat };
};

import { supabase } from '../supabaseClient';
import pptxgen from 'pptxgenjs';
import html2canvas from 'html2canvas';
import { MessageSquare, Send, Download, Image as ImageIcon, AlertTriangle, CheckCircle2, Printer, Play } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { buildPlanPptx, cleanMathText } from './pptxExport';



const LessonPlanViewer = ({ plan, weekPlans, viewerPin, adminName }) => {
  const getDayOwlImage = (dateStr) => {
    try {
      let dayName = '';
      if (dateStr) {
        const parts = String(dateStr).split('-');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          dayName = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        }
      }
      if (!dayName) {
        dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      }
      const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      if (validDays.includes(dayName)) {
        return '/owl-' + dayName + '.png';
      }
    } catch(e) {}
    return '/owl-transparent.png';
  };
  const renderMath = (text) => {
    if (!text) return "";
    let t = text.replace(/\bpi\b/gi, '\\pi');
    if (!window.katex) return t;
    try {
      t = t.replace(/\$\$([\s\S]*?)\$\$/g, (m, math) => window.katex.renderToString(math, {displayMode: true, throwOnError: false}));
      t = t.replace(/\$([^\n]*?)\$/g, (m, math) => window.katex.renderToString(math, {displayMode: false, throwOnError: false}));
      return t;
    } catch (e) {
      return text;
    }
  };

  
  
  const renderQuestionContent = (ex, index = 0) => {
    if (!ex) return '';
    let rawText = ex.question || ex.text || '';
    // Strip redundant leading prefixes like "Group Practice 1: ", "Example 2: "
    let cleanText = rawText.replace(/^(Group Practice|Example)\s*\d*[:.-]?\s*/i, '').trim();
    let html = cleanText ? '<div style="font-weight: 600; font-size: 1.15em; margin-bottom: 15px; color: #1e293b;">' + renderMath(cleanText) + '</div>' : '';
    
    if (ex.type === 'multiple-choice' && ex.options) {
      // Deterministically shuffle based on question string length + index
      let opts = [...ex.options];
      let seed = (cleanText || '').length + index;
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.abs(Math.sin(seed++) * 10000)) % (i + 1);
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      html += '<ol style="list-style-type: upper-alpha; margin-left: 20px; margin-top: 10px; font-size: 0.95em; text-align: left;">' + opts.map(o => '<li style="margin-bottom:6px;">' + renderMath(o) + '</li>').join('') + '</ol>';
    }

    
    if (ex.type === 'interactive-graph' && ex.visualData && ex.visualData.originalPolygon) {
      const gridMax = 10;
      const svgSize = 160;
      const center = svgSize / 2;
      const step = svgSize / (gridMax * 2);
      
      let gridLines = '';
      for(let i=0; i<=svgSize; i+=step) {
         gridLines += '<line x1="'+i+'" y1="0" x2="'+i+'" y2="'+svgSize+'" stroke="#eee" stroke-width="1"/>';
         gridLines += '<line x1="0" y1="'+i+'" x2="'+svgSize+'" y2="'+i+'" stroke="#eee" stroke-width="1"/>';
      }
      const axes = '<line x1="0" y1="'+center+'" x2="'+svgSize+'" y2="'+center+'" stroke="#333" stroke-width="2"/><line x1="'+center+'" y1="0" x2="'+center+'" y2="'+svgSize+'" stroke="#333" stroke-width="2"/>';
      
      const polyPts = ex.visualData.originalPolygon.map(p => (p.x * step + center) + ',' + (-p.y * step + center)).join(' ');
      const polygon = '<polygon points="' + polyPts + '" fill="rgba(66, 153, 225, 0.3)" stroke="#2b6cb0" stroke-width="2"/>';
      
      html += '<div style="margin-top: 15px; display: flex; justify-content: center;"><svg width="'+svgSize+'" height="'+svgSize+'" style="border: 1px solid #ccc; background: white;">' + gridLines + axes + polygon + '</svg></div>';
    }

    if (ex.visualData && ex.visualData.type === 'transversal') {
      const v = ex.visualData;
      const highlighted = v.highlightedAngles || [];
      const labels = v.angleLabels || {};
      
      const renderAngle = (id, cx, cy) => {
        const isHigh = highlighted.includes(id);
        const rawLabel = labels[id] || String(id);
        // 2 distinct font colors (Admin requirement):
        // Color 1: Bold Royal Purple (#6b21a8) for highlighted target angles
        // Color 2: Deep Navy Slate (#0f172a) for unhighlighted context angles
        const fontColor = isHigh ? '#6b21a8' : '#0f172a';
        const fontSize = isHigh ? '20' : '17';
        const fontWeight = '800';

        if (rawLabel.length > 2) {
          const pillW = Math.max(54, rawLabel.length * 10.5 + 16);
          const pillH = 28;
          return '<g>' +
            '<rect x="' + (cx - pillW / 2) + '" y="' + (cy - pillH / 2) + '" width="' + pillW + '" height="' + pillH + '" rx="6" fill="rgba(255, 255, 255, 0.95)" stroke="' + (isHigh ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (isHigh ? '1.5' : '1') + '"/>' +
            '<text x="' + cx + '" y="' + (cy + 6) + '" fill="' + fontColor + '" font-size="' + fontSize + '" font-weight="' + fontWeight + '" text-anchor="middle" font-family="Segoe UI, sans-serif">' + rawLabel + '</text>' +
          '</g>';
        }

        return '<g>' +
          '<circle cx="' + cx + '" cy="' + cy + '" r="15" fill="rgba(255, 255, 255, 0.90)" stroke="' + (isHigh ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (isHigh ? '1.5' : '0.8') + '"/>' +
          '<text x="' + cx + '" y="' + (cy + 6) + '" fill="' + fontColor + '" font-size="' + fontSize + '" font-weight="' + fontWeight + '" text-anchor="middle" font-family="Segoe UI, sans-serif">' + rawLabel + '</text>' +
        '</g>';
      };

      html += '<div style="margin: 12px auto; display: flex; justify-content: center; width: 100%; max-width: 780px;">' +
        '<svg viewBox="0 0 540 230" width="100%" height="auto" style="background: white; border-radius: 12px; border: 1.5px solid #cbd5e1; max-height: 40vh; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">' +
          '<defs>' +
            '<marker id="arrow-blue-lms" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
              '<path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#2563eb"/>' +
            '</marker>' +
            '<marker id="arrow-trans-lms" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
              '<path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#0f172a"/>' +
            '</marker>' +
          '</defs>' +
          '<line x1="30" y1="65" x2="490" y2="65" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue-lms)" marker-start="url(#arrow-blue-lms)"/>' +
          '<text x="502" y="71" fill="#2563eb" font-size="16" font-weight="bold">ℓ</text>' +
          '<line x1="30" y1="155" x2="490" y2="155" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arrow-blue-lms)" marker-start="url(#arrow-blue-lms)"/>' +
          '<text x="502" y="161" fill="#2563eb" font-size="16" font-weight="bold">m</text>' +
          '<line x1="130" y1="205" x2="390" y2="18" stroke="#0f172a" stroke-width="4" marker-end="url(#arrow-trans-lms)" marker-start="url(#arrow-trans-lms)"/>' +
          '<text x="398" y="24" fill="#0f172a" font-size="16" font-weight="bold">t</text>' +
          '<circle cx="325" cy="65" r="4.5" fill="#0f172a"/>' +
          '<circle cx="195" cy="155" r="4.5" fill="#0f172a"/>' +
          renderAngle(1, 375, 42) +
          renderAngle(2, 275, 42) +
          renderAngle(3, 270, 90) +
          renderAngle(4, 380, 90) +
          renderAngle(5, 245, 132) +
          renderAngle(6, 145, 132) +
          renderAngle(7, 140, 180) +
          renderAngle(8, 250, 180) +
        '</svg>' +
      '</div>';
    }

    if (ex.visualData && ex.visualData.type === 'triangle-angles') {
      const v = ex.visualData;
      const highlighted = v.highlightedAngles || [];
      const labels = v.angleLabels || {};
      const hasExt = v.hasExteriorAngle !== false;

      const renderTriAngle = (id, cx, cy) => {
        const isHigh = highlighted.includes(id);
        const rawLabel = labels[id] || String(id);
        const fontColor = isHigh ? '#6b21a8' : '#0f172a';
        const fontSize = isHigh ? '20' : '17';
        const fontWeight = '800';

        if (rawLabel.length > 2) {
          const pillW = Math.max(54, rawLabel.length * 10.5 + 16);
          const pillH = 28;
          return '<g>' +
            '<rect x="' + (cx - pillW / 2) + '" y="' + (cy - pillH / 2) + '" width="' + pillW + '" height="' + pillH + '" rx="6" fill="rgba(255, 255, 255, 0.95)" stroke="' + (isHigh ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (isHigh ? '1.5' : '1') + '"/>' +
            '<text x="' + cx + '" y="' + (cy + 6) + '" fill="' + fontColor + '" font-size="' + fontSize + '" font-weight="' + fontWeight + '" text-anchor="middle" font-family="Segoe UI, sans-serif">' + rawLabel + '</text>' +
          '</g>';
        }

        return '<g>' +
          '<circle cx="' + cx + '" cy="' + cy + '" r="15" fill="rgba(255, 255, 255, 0.90)" stroke="' + (isHigh ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (isHigh ? '1.5' : '0.8') + '"/>' +
          '<text x="' + cx + '" y="' + (cy + 6) + '" fill="' + fontColor + '" font-size="' + fontSize + '" font-weight="' + fontWeight + '" text-anchor="middle" font-family="Segoe UI, sans-serif">' + rawLabel + '</text>' +
        '</g>';
      };

      html += '<div style="margin: 12px auto; display: flex; justify-content: center; width: 100%; max-width: 780px;">' +
        '<svg viewBox="0 0 540 230" width="100%" height="auto" style="background: white; border-radius: 12px; border: 1.5px solid #cbd5e1; max-height: 40vh; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">' +
          '<defs>' +
            '<marker id="arrow-blue-tri" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
              '<path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#2563eb"/>' +
            '</marker>' +
          '</defs>' +
          '<polygon points="240,40 100,180 370,180" fill="rgba(59, 130, 246, 0.05)" stroke="none"/>' +
          (hasExt ? '<line x1="370" y1="180" x2="500" y2="180" stroke="#64748b" stroke-width="3" stroke-dasharray="5 5" marker-end="url(#arrow-blue-tri)"/>' : '') +
          '<line x1="100" y1="180" x2="370" y2="180" stroke="#0f172a" stroke-width="3.5"/>' +
          '<line x1="100" y1="180" x2="240" y2="40" stroke="#0f172a" stroke-width="3.5"/>' +
          '<line x1="240" y1="40" x2="370" y2="180" stroke="#0f172a" stroke-width="3.5"/>' +
          '<circle cx="240" cy="40" r="4.5" fill="#0f172a"/>' +
          '<text x="240" y="28" fill="#0f172a" font-size="15" font-weight="bold" text-anchor="middle">A</text>' +
          '<circle cx="100" cy="180" r="4.5" fill="#0f172a"/>' +
          '<text x="80" y="196" fill="#0f172a" font-size="15" font-weight="bold" text-anchor="middle">B</text>' +
          '<circle cx="370" cy="180" r="4.5" fill="#0f172a"/>' +
          '<text x="370" y="202" fill="#0f172a" font-size="15" font-weight="bold" text-anchor="middle">C</text>' +
          (hasExt ? '<text x="510" y="185" fill="#64748b" font-size="14" font-weight="bold">D</text>' : '') +
          renderTriAngle(1, 240, 78) +
          renderTriAngle(2, 145, 160) +
          renderTriAngle(3, 315, 160) +
          (hasExt ? renderTriAngle(4, 420, 150) : '') +
        '</svg>' +
      '</div>';
    }

    if (ex.visualData && ex.visualData.type === 'similar-triangles') {
      const v = ex.visualData;
      const highlighted = v.highlightedAngles || [];
      const labels = v.angleLabels || {};
      const tri1 = v.triangle1 || {};
      const tri2 = v.triangle2 || {};
      const t1Label = tri1.label || '△ABC';
      const t2Label = tri2.label || '△DEF';

      html += '<div style="margin: 10px auto; display: flex; justify-content: center; max-width: 480px;">' +
        '<svg viewBox="0 0 480 190" width="100%" height="auto" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; max-height: 22vh;">' +
          '<polygon points="110,45 50,155 170,155" fill="rgba(59, 130, 246, 0.05)" stroke="none"/>' +
          '<polygon points="340,30 250,165 430,165" fill="rgba(16, 185, 129, 0.05)" stroke="none"/>' +
          '<line x1="110" y1="45" x2="50" y2="155" stroke="#0f172a" stroke-width="2.5"/>' +
          '<line x1="50" y1="155" x2="170" y2="155" stroke="#0f172a" stroke-width="2.5"/>' +
          '<line x1="170" y1="155" x2="110" y2="45" stroke="#0f172a" stroke-width="2.5"/>' +
          '<line x1="340" y1="30" x2="250" y2="165" stroke="#0f172a" stroke-width="3"/>' +
          '<line x1="250" y1="165" x2="430" y2="165" stroke="#0f172a" stroke-width="3"/>' +
          '<line x1="430" y1="165" x2="340" y2="30" stroke="#0f172a" stroke-width="3"/>' +
          '<text x="110" y="22" fill="#2563eb" font-size="12" font-weight="bold" text-anchor="middle">' + t1Label + '</text>' +
          '<text x="340" y="18" fill="#059669" font-size="12" font-weight="bold" text-anchor="middle">' + t2Label + '</text>' +
          '<text x="110" y="38" fill="#0f172a" font-size="10" font-weight="bold" text-anchor="middle">A</text>' +
          '<text x="42" y="165" fill="#0f172a" font-size="10" font-weight="bold" text-anchor="middle">B</text>' +
          '<text x="178" y="165" fill="#0f172a" font-size="10" font-weight="bold" text-anchor="middle">C</text>' +
          '<text x="340" y="26" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">D</text>' +
          '<text x="240" y="175" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">E</text>' +
          '<text x="440" y="175" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">F</text>' +
          '<rect x="96" y="65" width="' + ((labels[1] || '1').length > 2 ? 46 : 28) + '" height="20" rx="4" fill="rgba(255, 255, 255, 0.95)" stroke="' + (highlighted.includes(1) ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (highlighted.includes(1) ? '1.5' : '0.8') + '"/>' +
          '<text x="' + (96 + ((labels[1] || '1').length > 2 ? 23 : 14)) + '" y="79" fill="' + (highlighted.includes(1) ? '#6b21a8' : '#0f172a') + '" font-size="' + (highlighted.includes(1) ? '12' : '11') + '" font-weight="800" text-anchor="middle" font-family="Segoe UI, sans-serif">' + (labels[1] || '1') + '</text>' +
          '<rect x="70" y="136" width="' + ((labels[2] || '2').length > 2 ? 46 : 28) + '" height="20" rx="4" fill="rgba(255, 255, 255, 0.95)" stroke="' + (highlighted.includes(2) ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (highlighted.includes(2) ? '1.5' : '0.8') + '"/>' +
          '<text x="' + (70 + ((labels[2] || '2').length > 2 ? 23 : 14)) + '" y="150" fill="' + (highlighted.includes(2) ? '#6b21a8' : '#0f172a') + '" font-size="' + (highlighted.includes(2) ? '12' : '11') + '" font-weight="800" text-anchor="middle" font-family="Segoe UI, sans-serif">' + (labels[2] || '2') + '</text>' +
          '<rect x="130" y="136" width="' + ((labels[3] || '3').length > 2 ? 46 : 28) + '" height="20" rx="4" fill="rgba(255, 255, 255, 0.95)" stroke="' + (highlighted.includes(3) ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (highlighted.includes(3) ? '1.5' : '0.8') + '"/>' +
          '<text x="' + (130 + ((labels[3] || '3').length > 2 ? 23 : 14)) + '" y="150" fill="' + (highlighted.includes(3) ? '#6b21a8' : '#0f172a') + '" font-size="' + (highlighted.includes(3) ? '12' : '11') + '" font-weight="800" text-anchor="middle" font-family="Segoe UI, sans-serif">' + (labels[3] || '3') + '</text>' +
          '<rect x="325" y="60" width="' + ((labels[4] || '4').length > 2 ? 48 : 30) + '" height="20" rx="4" fill="rgba(255, 255, 255, 0.95)" stroke="' + (highlighted.includes(4) ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (highlighted.includes(4) ? '1.5' : '0.8') + '"/>' +
          '<text x="' + (325 + ((labels[4] || '4').length > 2 ? 24 : 15)) + '" y="74" fill="' + (highlighted.includes(4) ? '#6b21a8' : '#0f172a') + '" font-size="' + (highlighted.includes(4) ? '12' : '11') + '" font-weight="800" text-anchor="middle" font-family="Segoe UI, sans-serif">' + (labels[4] || '4') + '</text>' +
          '<rect x="280" y="145" width="' + ((labels[5] || '5').length > 2 ? 48 : 30) + '" height="20" rx="4" fill="rgba(255, 255, 255, 0.95)" stroke="' + (highlighted.includes(5) ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (highlighted.includes(5) ? '1.5' : '0.8') + '"/>' +
          '<text x="' + (280 + ((labels[5] || '5').length > 2 ? 24 : 15)) + '" y="159" fill="' + (highlighted.includes(5) ? '#6b21a8' : '#0f172a') + '" font-size="' + (highlighted.includes(5) ? '12' : '11') + '" font-weight="800" text-anchor="middle" font-family="Segoe UI, sans-serif">' + (labels[5] || '5') + '</text>' +
          '<rect x="375" y="145" width="' + ((labels[6] || '6').length > 2 ? 48 : 30) + '" height="20" rx="4" fill="rgba(255, 255, 255, 0.95)" stroke="' + (highlighted.includes(6) ? '#c084fc' : '#e2e8f0') + '" stroke-width="' + (highlighted.includes(6) ? '1.5' : '0.8') + '"/>' +
          '<text x="' + (375 + ((labels[6] || '6').length > 2 ? 24 : 15)) + '" y="159" fill="' + (highlighted.includes(6) ? '#6b21a8' : '#0f172a') + '" font-size="' + (highlighted.includes(6) ? '12' : '11') + '" font-weight="800" text-anchor="middle" font-family="Segoe UI, sans-serif">' + (labels[6] || '6') + '</text>' +
        '</svg>' +
      '</div>';
    }

    if (ex.type === 'matching' && ex.matchingPrompts && ex.matchingOptions) {
        const shiftedOptions = [...ex.matchingOptions];
        if (shiftedOptions.length > 1) {
            shiftedOptions.unshift(shiftedOptions.pop());
        }
        html += '<div style="display: flex; justify-content: space-around; width: 100%; margin-top: 15px; font-size: 0.85em; text-align: left;">' +
        '<div><ul style="list-style-type: decimal; padding-left: 20px;">' + ex.matchingPrompts.map(p => '<li style="margin-bottom:8px;">' + renderMath(p.text) + '</li>').join('') + '</ul></div>' +
        '<div><ul style="list-style-type: upper-alpha; padding-left: 20px;">' + shiftedOptions.map(o => '<li style="margin-bottom:8px;">' + renderMath(o.text) + '</li>').join('') + '</ul></div>' +
        '</div>';
      }

      if (ex.type === 'drag-and-drop' && ex.prompts && ex.options) {
      html += '<div style="margin-top: 15px; font-size: 0.85em; text-align: left; width: 100%;">' +
        '<div style="border: 1px dashed #666; padding: 10px; margin-bottom: 10px; text-align: center; border-radius: 4px;"><strong>Word Bank:</strong><br/>' + ex.options.map(o => renderMath(o)).join(' &nbsp;|&nbsp; ') + '</div>' +
        '<div style="display: flex; gap: 10px; justify-content: space-between;">' + 
        ex.prompts.map(p => '<div style="flex: 1; border: 1px solid #333; height: 100px; display: flex; flex-direction: column; align-items: center; border-radius: 4px; overflow: hidden;"><div style="background: #f1f5f9; width: 100%; text-align: center; padding: 4px; border-bottom: 1px solid #333; font-weight: bold;">' + renderMath(p.text) + '</div></div>').join('') +
        '</div></div>';
    }
    
    return html;
  };

  const [comments, setComments] = useState({}); // Grouped by section
  const [activeCommentSection, setActiveCommentSection] = useState(null);
  const [shoutouts, setShoutouts] = useState({});
  useEffect(() => { fetch('/shoutouts.json').then(r => r.json()).then(d => setShoutouts(d)).catch(e => console.error('No shoutouts found', e)); }, []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGeneratingPptx, setIsGeneratingPptx] = useState(false);
  const [pptxProgress, setPptxProgress] = useState(null);

        const handlePrintGuidedNotes = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup was blocked! Please allow popups.");
      return;
    }
    
    // Parse direct instruction and replace bold text with blanks
    let notesContent = plan.direct_instruction || 'No notes provided.';
    notesContent = notesContent.split(/##+\s*(?:Tiered\s+)?Differentiation/i)[0].trim();
    notesContent = renderMath(notesContent);
    // Convert markdown to HTML but replace **bold** with fill in the blank lines
    
    let parsedNotes = window.marked ? window.marked.parse(notesContent, { breaks: true }) : notesContent;
    parsedNotes = parsedNotes.replace(/<strong>(.*?)<\/strong>/g, '<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong> <span style="color: white; font-size: 1px;">$1</span>');

    let guidedHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = guidedChunk.map((ex, i) => {
        return `
          <div style="margin-bottom: 20px; break-inside: avoid;">
            <p style="font-size: 16px; margin-bottom: 5px;"><strong>Example ${i + 1}.</strong> ${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</p>
            <div style="border: 1px dashed #aaa; height: 120px; border-radius: 4px;"></div>
          </div>
        `;
      }).join('');
    }

    const html = 
      '<html>' +
        '<head>' +

          '<title>' + plan.topic + ' - Guided Notes</title>' +
          '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
          '<style>' +
            'body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; padding: 20px 40px; line-height: 1.6; color: #333; }' +
            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 10px; margin-bottom: 20px; font-size: 16px; }' +
            'h2 { text-align: center; color: #2d3748; margin-top: 0; margin-bottom: 20px; font-size: 20px; }' +
            'h3 { color: #4a5568; margin-top: 15px; margin-bottom: 5px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; }' +
            '@media print { body { padding: 0; margin: 0.5in; } }' +
            '.notes-content { font-size: 16px; margin-bottom: 30px; }' +
            '.notes-content p { margin-bottom: 15px; }' +
            '.notes-content hr { border: 0; border-top: 1px dashed #ccc; margin: 20px 0; }' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div class="header">' +
            '<div><strong>Name:</strong> _________________________________</div>' +
            '<div><strong>Date:</strong> ____________________</div>' +
          '</div>' +
          '<h2>Guided Notes: ' + plan.topic + '</h2>' +
          
          '<h3>Class Notes</h3>' +
          '<div class="notes-content">' + parsedNotes + '</div>' +
          
          '<h3>Guided Practice (We Do)</h3>' +
          guidedHTML +
          
          '<script>' +
            'window.onload = function() { setTimeout(() => window.print(), 500); };' +
          ('<' + '/script>') + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><' + '/script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);<' + '/script>' + '</body>' +
      '</html>';
      
    printWindow.document.write(html);
    printWindow.document.close();
  };

    const handlePrintWorksheet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Worksheet popup was blocked! Please allow popups.");
      return;
    }
    
    let worksheetProblemsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      let indChunk;
      if (plan.structured_exemplars.length >= 21) {
        indChunk = plan.structured_exemplars.slice(6, 21);
      } else if (plan.structured_exemplars.length >= 15 && plan.week_label === 'Emergency Sub Plans') {
        indChunk = plan.structured_exemplars.slice(0, 15);
      } else if (plan.structured_exemplars.length > 6) {
        indChunk = plan.structured_exemplars.slice(6);
      } else {
        indChunk = plan.structured_exemplars;
      }
      worksheetProblemsHTML = indChunk.map((ex, i) => {
        return `
          <div style="margin-bottom: 30px;">
            <p style="font-size: 18px;"><strong>${i + 1}.</strong> ${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</p>
            <div style="border: 1px solid #aaa; height: 150px; margin-top: 10px; border-radius: 4px;"></div>
          </div>
        `;
      }).join('');
    }

    const doNowContent = renderMath(plan.do_now || '');
    const exitTicketContent = renderMath(plan.exit_ticket || '');

    const html = 
      '<html>' +
        '<head>' +
          '<title>' + plan.topic + ' - Worksheet</title>' +
          '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
          '<style>' +
            'body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; line-height: 1.6; color: #333; }' +
            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 15px; margin-bottom: 30px; font-size: 18px; }' +
            'h2 { text-align: center; color: #2d3748; margin-bottom: 40px; }' +
            'h3 { color: #4a5568; margin-top: 30px; }' +
            '.box { border: 1px solid #aaa; height: 120px; margin-bottom: 30px; border-radius: 4px; }' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div class="header">' +
            '<div><strong>Name:</strong> _________________________________</div>' +
            '<div><strong>Date:</strong> ____________________</div>' +
          '</div>' +
          '<h2>' + plan.topic + '</h2>' +
          
          (doNowContent ? 
            '<h3>Warm Up (Do Now)</h3>' +
            '<p style="font-size: 18px; white-space: pre-wrap;">' + doNowContent + '</p>' +
            '<div class="box"></div>'
          : '') +

          '<h3>Practice Problems</h3>' +
          worksheetProblemsHTML +
          
          (exitTicketContent ? 
            '<h3>Exit Ticket</h3>' +
            '<p style="font-size: 18px; white-space: pre-wrap;">' + exitTicketContent + '</p>' +
            '<div class="box"></div>'
          : '') +

          '<script>' +
            'window.onload = function() { setTimeout(() => window.print(), 500); };' +
          ('<' + '/script>') + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><' + '/script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);<' + '/script>' + '</body>' +
      '</html>';
      
    printWindow.document.write(html);
    printWindow.document.close();
  };

  
    
  const buildPresentationSlides = (p, wPlans) => {
    if (!p) return [];
    const getEssentialQuestion = (obj) => {
        if (!obj) return "What is the core concept of today's lesson?";
        let topic = obj.toLowerCase();
        const m = topic.match(/involving (.*?) \(/);
        if (m) {
           return `How can we apply our understanding of ${m[1]} to solve real-world problems?`;
        }
        return "How can we apply today's concept to solve real-world problems?";
      };

    const problemsSlides = [];

        
      // Guided Practice (2 problems - separate slides)
      const guidedSlides = [];
      if (p.structured_exemplars && p.structured_exemplars.length >= 2 ) {
        const guidedChunk = p.structured_exemplars.slice(0, 2);
        guidedChunk.forEach((ex, idx) => {
          guidedSlides.push({
            title: `8. Guided Practice (Problem ${idx + 1})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
</div>

<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
          });
        });
      }
  
      // Group Practice (4 problems - separate slides)
      const groupSlides = [];
      if (p.structured_exemplars && p.structured_exemplars.length >= 6) {
        const groupChunk = p.structured_exemplars.slice(2, 6);
        groupChunk.forEach((ex, idx) => {
          groupSlides.push({
            title: `10. Group Practice (Problem ${idx + 3})`,
            content: `<div class="transition-banner" style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 8px 14px; border-radius: 6px; margin-bottom: 12px; font-size: 14px; color: #1e40af; text-align: left;"><strong>🔁 Transition:</strong> <em>We just explored worked examples together... Now we will collaborate on Group Practice problems... so we can test our reasoning and discuss strategies with our peers.</em></div><div style="font-size: 24px; text-align: center; margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
</div>

<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
          });
        });
      }


    // Independent Practice (every problem on its own slide for presentation)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        // Always show the directions first with a 15 min timer
        problemsSlides.push({ 
          title: "12. Independent Practice (Directions)", 
          content: `<strong>Directions:</strong>\n${p.independent_practice || 'Complete the assigned independent practice problems quietly.'}\n\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>`
        });
        
        const indChunk = p.structured_exemplars.slice(6, 14);
        indChunk.forEach((ex, idx) => {
          problemsSlides.push({
            title: `12. Independent Practice (Problem ${idx + 7})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex, idx)}
</div>

<div class="timer" onclick="startTimer(this, 3)">3:00</div>`
          });
        });
      } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: `<strong>Directions:</strong>\n${p.independent_practice || 'Complete the assigned independent practice problems quietly.'}\n\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>`
      });
    }

    // Process Direct Instruction into multiple slides if --- is present
    
      const diSlides = [];
      if (p.direct_instruction) {
        let diText = p.direct_instruction;
        // Strip out any Differentiation and Lesson Purpose from student-facing slides
        diText = diText.split(/##+\s*(?:Tiered\s+)?Differentiation/i)[0];
        diText = diText.replace(/##+\s*(?:Lesson\s+)?Purpose[\s\S]*?(?=##\s+[A-Z]|$)/i, '').trim();

        // Inject telescope launch for 9/21
        if (p.date_start === '2026-09-21' && !diText.includes('telescope')) {
           diText = diText.replace(/## Direct Instruction\s*---/i, "## Launch: The Telescope\n---\nImagine you are looking at a star through a telescope. The star doesn't change its actual shape, but the lenses inside the telescope *scale* the image up so your eye can see it. Today, we are going to learn how to mathematically build that telescope.\n\n## Direct Instruction\n---");
        }
        
        // Split by markdown level-2 headings (## ) so subsections (### ) stay on the slide
        const blocks = diText.split(/(?=\n##\s+[A-Za-z0-9])/);
        
        blocks.forEach((block, idx) => {
          if (!block.trim()) return;
          
          let title = "Direct Instruction";
          const titleMatch = block.match(/##+ (.*?)\n/);
          if (titleMatch) {
             title = titleMatch[1].trim();
             block = block.replace(/##+ .*?\n/, '');
          }
          if (title.toLowerCase().includes('differentiation') || block.toLowerCase().includes('differentiation') || title.toLowerCase().includes('lesson purpose') || block.toLowerCase().includes('our why')) {
             return;
          }
          block = block.replace(/^---\n/, ''); // remove stray dashes

          let content = block.trim();

          if (p.structured_exemplars && p.structured_exemplars.length >= 2) {
             // Guided Practice slides will present Problem 1 and Problem 2 ("We Do").
             // Strip out any redundant Example 1/2 blocks from Direct Instruction ("I Do") to eliminate extra focus problems and slide duplication.
             content = content.replace(/\*\*Example\s*1\*\*[\s\S]*/i, '').trim();
             if (content && content.replace(/[#\-\s]/g, '').length > 0) {
                diSlides.push({
                   title: title,
                   content: content
                });
             }
          } else if (content.includes('**Example 1**') && content.includes('**Example 2**')) {
             const ex1split = content.split('**Example 2**');
             diSlides.push({
              title: `${title} (Example 1)`,
              content: ex1split[0].replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 0 ? renderQuestionContent(p.structured_exemplars[0]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
             diSlides.push({
              title: `${title} (Example 2)`,
              content: (`**Example 2**` + ex1split[1]).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 1 ? renderQuestionContent(p.structured_exemplars[1]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
          } else {
             diSlides.push({
              title: title,
              content: content.replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 0 ? renderQuestionContent(p.structured_exemplars[0]) : ''}</div>`).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 1 ? renderQuestionContent(p.structured_exemplars[1]) : ''}</div>`) + (content.includes('Example') ? `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` : '')
             });
          }
        });
      }


    const cfuStrategies = [
      'Turn and Talk: Discuss the core concept with your neighbor.',
      'Stop and Jot: Write down the most important thing you learned in the last 5 minutes.',
      'Think-Pair-Share: Think about the core concept for 30 seconds, then pair up and share your thoughts.',
      'Fist to Five: Rate your understanding from 0 (completely lost) to 5 (I could teach it) by holding up your fingers.',
      'Thumbs Up/Down: Show a thumbs up if you feel confident about the concept, or thumbs down if you need more help.',
      'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.'
    ];
    // Hash the topic string to consistently pick the same CFU strategy for the same lesson p
    const hashStr = (p.topic || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const defaultCfu = cfuStrategies[hashStr % cfuStrategies.length];

    
      var cfuText = p.checks_for_understanding && p.checks_for_understanding.length > 0 
        ? p.checks_for_understanding[0].cfu 
        : defaultCfu;
      if (p.date_start === '2026-09-21') {
         cfuText = 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.';
      }


    
      const expectationsContent = `<div style="display: flex; align-items: center; justify-content: space-around; padding: 20px;">
        <ul style="font-size: 32px; line-height: 2.2;">
          <li>No Cellphones</li>
          <li>Drop pencils when completed</li>
          <li>Communicate with respect</li>
          <li>Raise your hand</li>
        </ul>
        <div><img src="${window.location.origin}${getDayOwlImage(p.date_start)}" alt="Owl" onerror="this.onerror=null; this.src='${window.location.origin}/owl-transparent.png';" style="height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" /></div>
      </div>`;


    const baseSlides = [
      { title: p.topic ? p.topic.replace(/\[.*?\]\s*/, '') : '', content: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0; text-align: center;"><h2>Welcome to Class!</h2><p>Get ready to start.</p></div>` },
      { 
        title: "1. Spiraled Do Now", 
        content: `**Directions:**\n${(p.do_now || '').split('\n').filter(l => !l.trim().match(/^\*?Answer:/i)).join('\n')}\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` 
      },
      { 
        title: "2. Classroom Expectations", 
        content: expectationsContent 
      },
      { 
        title: "3. Today @ A Glance", 
        content: (() => {
          const framing = getFramingArc(p, wPlans);
          const framingHTML = framing ? `
<div style="background: white; border-radius: 10px; padding: 16px 20px; border-left: 6px solid var(--kms-teal); box-shadow: 0 4px 8px rgba(0,0,0,0.06); margin-bottom: 20px; text-align: left;">
  <div style="font-size: 14px; font-weight: 800; color: var(--kms-teal-dark); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">🎯 Learning Progression Framing</div>
  <p style="font-size: 17px; margin: 6px 0; line-height: 1.5; color: #1e293b;"><strong>⏪ Yesterday we...</strong> ${framing.yesterday}</p>
  <p style="font-size: 17px; margin: 6px 0; line-height: 1.5; color: #1e293b;"><strong>🎯 Today we will...</strong> ${framing.today}</p>
  <p style="font-size: 17px; margin: 6px 0; line-height: 1.5; color: #1e293b;"><strong>💡 So that...</strong> ${framing.soThat}</p>
</div>
` : '';
          return `${framingHTML}**Essential question of the day:**\n${getEssentialQuestion(p.objective_3m)}\n\n**Agenda**\n- Do Now - completed\n- Notes - Direct Instruction\n- Guided & Group Practice: We Do\n- Independent Practice\n- Exit Ticket`;
        })()
      },
      ...(getLessonPurpose(p) ? [{
        title: `Lesson Purpose ("Our Why?")`,
        content: `<div style="background: white; border-radius: 8px; padding: 25px; border-left: 6px solid var(--kms-purple); box-shadow: 0 4px 6px rgba(0,0,0,0.05); font-size: 22px; line-height: 1.6;">
### Our Why
${getLessonPurpose(p)}
</div>`
      }] : []),
      { 
        title: "4. Student Shoutouts", 
          content: (() => {
             
             const dateShoutouts = getShoutoutsForDate(shoutouts, p.date_start);
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; padding: 40px 0; pointer-events: none; z-index: -1;"></div>
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s3}</p>
    </div>
  </div>
</div>`;
          })()
        },
...diSlides,
      { 
        title: `7. Formative Assessment #1 (${(p.checks_for_understanding && p.checks_for_understanding[0]?.method) || 'Turn & Talk'})`, 
        content: `**Check for understanding (${(p.checks_for_understanding && p.checks_for_understanding[0]?.method) || 'Turn & Talk'}):**\n${(p.checks_for_understanding && p.checks_for_understanding[0]?.cfu) || cfuText}\n\n<div class="timer" onclick="startTimer(this, 2)">2:00</div>` 
      },
      ...guidedSlides,
      ...(p.checks_for_understanding && p.checks_for_understanding[1] ? [{
        title: `9. Formative Assessment #2 (${p.checks_for_understanding[1].method || 'Cold Call'})`,
        content: `**Check for understanding (${p.checks_for_understanding[1].method || 'Cold Call'}):**\n${p.checks_for_understanding[1].cfu}` + 
          (p.checks_for_understanding[1].cfu.toLowerCase().includes('angle') ? `\n\n${renderQuestionContent({ visualData: { type: 'transversal', angleLabels: { '1': '115°', '5': '?' }, highlightedAngles: [1, 5] } })}` : '') +
          `\n\n<div class="timer" onclick="startTimer(this, 2)">2:00</div>`
      }] : []),
      { 
        title: "Classroom Expectations (Reminder)", 
        content: expectationsContent 
      },
      ...groupSlides,
      ...(p.checks_for_understanding && p.checks_for_understanding[2] ? [{
        title: `11. Formative Assessment #3 (${p.checks_for_understanding[2].method || 'Warm Call'})`,
        content: `**Check for understanding (${p.checks_for_understanding[2].method || 'Warm Call'}):**\n${p.checks_for_understanding[2].cfu}\n\n<div class="timer" onclick="startTimer(this, 2)">2:00</div>`
      }] : []),
      { 
        title: "Classroom Expectations (Reminder)", 
        content: expectationsContent 
      },
      ...problemsSlides,
      ...(p.checks_for_understanding && p.checks_for_understanding[3] ? [{
        title: `13. Formative Assessment #4 (${p.checks_for_understanding[3].method || 'Batch Call'})`,
        content: `**Check for understanding (${p.checks_for_understanding[3].method || 'Batch Call'}):**\n${p.checks_for_understanding[3].cfu}\n\n<div class="timer" onclick="startTimer(this, 2)">2:00</div>`
      }] : []),
      ...(p.structured_exemplars && p.structured_exemplars.length >= 16 ? [
        {
          title: "14. Exit Ticket (Problem 15)",
          content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(p.structured_exemplars[14], 14)}
</div>

<div class="timer" onclick="startTimer(this, 3)">3:00</div>`
        },
        {
          title: "14. Exit Ticket (Problem 16)",
          content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(p.structured_exemplars[15], 15)}
</div>

<div class="timer" onclick="startTimer(this, 3)">3:00</div>`
        }
      ] : [
        { 
          title: "14. Exit Ticket", 
          content: `**Directions:**\n${p.exit_ticket || ''}\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` 
        }
      ])
    ];

    const processedSlides = baseSlides.map(slide => {
      let content = slide.content || "";
      content = content.replace(/<\s*or\s*>/gi, '&lt; or &gt;');
      content = content.replace(/\bpi\b/gi, '$\\\\pi$');
      content = renderMath(content);
      if (window.marked) {
        content = window.marked.parse(content, { breaks: true });
        content = content.replace(/<div class="timer"/g, '<div class="timer-container"><div class="timer"');
        content = content.replace(/<\/div><\/p>/g, '</div></div></p>');
      }
      return { ...slide, content };
    });
    return processedSlides;
  };
  

  const handlePrintSlideshow = async () => {
    if (isGeneratingPptx) return;
    setIsGeneratingPptx(true);
    setPptxProgress("Preparing slides...");
    try {
      const slides = buildPresentationSlides(plan, weekPlans);
      if (!slides || slides.length === 0) {
        alert("No slides found to export.");
        return;
      }
      const pres = new pptxgen();
      pres.layout = "LAYOUT_16x9";

      const stage = document.createElement("div");
      stage.id = "pptx-offscreen-stage";
      stage.style.cssText = "position: fixed; left: -9999px; top: 0; width: 1280px; height: 720px; z-index: -9999; background: linear-gradient(135deg, #6a0dad, #008080); display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; padding: 24px 36px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow: hidden;";

      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
        #pptx-offscreen-stage .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; margin: 8px 0; }
        #pptx-offscreen-stage .katex { max-width: 100%; white-space: normal; word-wrap: break-word; }
        #pptx-offscreen-stage .content-wrapper {
          width: 100%;
          max-height: 672px;
          background: rgba(255, 255, 255, 0.98);
          padding: 20px 32px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
        }
        #pptx-offscreen-stage h1 {
          font-size: 26px;
          color: #300052;
          margin-top: 0;
          margin-bottom: 12px;
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1.5px;
          flex-shrink: 0;
        }
        #pptx-offscreen-stage .content {
          font-size: 18px;
          line-height: 1.45;
          color: #1e293b;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        #pptx-offscreen-stage .content p { margin-bottom: 8px; }
        #pptx-offscreen-stage .content ul, #pptx-offscreen-stage .content ol { margin-top: 4px; margin-bottom: 8px; padding-left: 30px; }
        #pptx-offscreen-stage .content li { margin-bottom: 6px; }
        #pptx-offscreen-stage .content strong { color: #334155; }
        #pptx-offscreen-stage .content svg { max-width: 100%; height: auto; max-height: 40vh; display: block; margin: 8px auto; }
        #pptx-offscreen-stage .problems-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 15px; margin-bottom: 15px; }
        #pptx-offscreen-stage .problem-box {
          word-wrap: break-word; overflow-wrap: break-word; word-break: break-word;
          border: 2px solid #cbd5e1; padding: 18px; border-radius: 12px;
          background: #fff; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          display: flex; align-items: center; justify-content: center; min-height: 90px;
        }
        #pptx-offscreen-stage .timer {
          position: absolute;
          top: 18px;
          right: 28px;
          z-index: 1000;
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          font-size: 20px;
          font-weight: bold;
          padding: 8px 18px;
          border-radius: 10px;
          border: 3px solid #fff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        #pptx-offscreen-stage .transition-banner {
          background: #eff6ff;
          border-left: 4px solid #2563eb;
          padding: 8px 14px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #1e40af;
          text-align: left;
        }
      `;
      stage.appendChild(styleEl);

      const slideBody = document.createElement("div");
      slideBody.style.cssText = "width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;";
      stage.appendChild(slideBody);
      document.body.appendChild(stage);

      for (let i = 0; i < slides.length; i++) {
        setPptxProgress(`Slide ${i + 1} of ${slides.length}...`);
        const s = slides[i];

        slideBody.innerHTML = `
          <div class="content-wrapper">
            <h1>${s.title}</h1>
            <div class="content">${s.content}</div>
          </div>
        `;

        const imgs = slideBody.querySelectorAll('img');
        if (imgs.length > 0) {
          await Promise.all(Array.from(imgs).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(res => {
              img.onload = res;
              img.onerror = res;
              setTimeout(res, 200);
            });
          }));
        }

        await new Promise(r => setTimeout(r, 60));

        const canvas = await html2canvas(stage, {
          scale: 1.5,
          useCORS: true,
          logging: false,
          backgroundColor: null
        });

        const imgData = canvas.toDataURL("image/png");
        const pptSlide = pres.addSlide();
        pptSlide.addImage({
          data: imgData,
          x: 0,
          y: 0,
          w: "100%",
          h: "100%"
        });

        if (s.title) {
          const plainNotes = (s.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          pptSlide.addNotes(s.title + (plainNotes ? "\n\n" + plainNotes : ''));
        }
      }

      if (stage.parentNode) {
        stage.parentNode.removeChild(stage);
      }

      setPptxProgress("Saving PowerPoint...");
      const cleanTopic = (cleanMathText(plan?.topic) || "Lesson").replace(/[^a-zA-Z0-9_\-\s]/g, '').trim();
      await pres.writeFile({ fileName: `${cleanTopic}_Slides.pptx` });
    } catch (err) {
      console.error("Failed to generate PPTX:", err);
      alert("Could not generate PowerPoint: " + (err?.message || err));
    } finally {
      setIsGeneratingPptx(false);
      setPptxProgress(null);
    }
  };
  

  const handlePresent = () => {
    const presentWindow = window.open('', '_blank');
    if (!presentWindow) {
      alert("Presentation popup was blocked! Please allow popups for this site to view the presentation.");
      return;
    }
    const processedSlides = buildPresentationSlides(plan, weekPlans);
    const slidesJSON = JSON.stringify(processedSlides).replace(/</g, '\\u003c');

    const html = `
      <html>
        <head>
          <title>Presentation: ${plan.topic}</title>
          <link rel="stylesheet" href="${window.location.origin}/katex/katex.min.css">
          <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js">${"<"}/script>
          
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #6a0dad, #008080); color: #1e293b; overflow: hidden; }
            .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; }
            .katex { max-width: 100%; white-space: normal; word-wrap: break-word; }
            .slide-container {
              display: flex; flex-direction: column; justify-content: center; align-items: center;
              height: 100vh; padding: 20px 40px 75px 40px; box-sizing: border-box; overflow-y: auto;
            }
            h1 { font-size: clamp(20px, 2.8vw, 34px); color: #300052; margin-top: 0; margin-bottom: 12px; text-align: center; text-transform: uppercase; font-weight: bold; letter-spacing: 1.5px;}
            .content-wrapper { width: 100%; max-width: 1280px; max-height: calc(100vh - 100px); background: rgba(255, 255, 255, 0.96); padding: 20px 32px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); box-sizing: border-box; overflow-y: auto; }
            .content { font-size: clamp(14px, 1.25vw, 20px); line-height: 1.4; }
            .content p { margin-bottom: 8px; }
            .content ul, .content ol { margin-top: 4px; margin-bottom: 8px; padding-left: 30px; }
            .content li { margin-bottom: 6px; }
            .content strong { color: #334155; }
            .content svg { max-width: 100%; height: auto; max-height: 40vh; display: block; margin: 8px auto; }
            
            /* Practice Problems Grid */
            .problems-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px; margin-bottom: 20px;}
            .problem-box { 
              word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; hyphens: auto; overflow: auto; max-width: 100%; 
              border: 2px solid #cbd5e1; padding: 20px; border-radius: 12px; 
              background: #fff; text-align: center; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              display: flex; align-items: center; justify-content: center; min-height: 100px;
            }
            .problem-box p { margin: 0; }
            
            .controls {
              position: fixed; bottom: 0; width: 100%; display: flex; justify-content: space-between;
              background: #fff; border-top: 1px solid #e2e8f0; padding: 15px 40px; box-sizing: border-box;
            }
            button {
              padding: 12px 24px; font-size: 18px; border: none; background: #e0e7ff; color: #4338ca; 
              border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.2s;
            }
            button:hover:not(:disabled) { background: #c7d2fe; }
            button:disabled { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
            .progress { font-size: 20px; font-weight: bold; padding-top: 10px; color: #64748b; }

            /* Timer Styles */
            .timer {
              position: fixed;
              top: 25px;
              right: 40px;
              z-index: 1000;
              display: inline-block;
              background: linear-gradient(135deg, #f59e0b, #d97706);
              color: white;
              font-size: 2.5vw;
              font-weight: bold;
              padding: 15px 30px;
              border-radius: 12px;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
              transition: transform 0.1s;
              text-align: center;
              border: 4px solid #fff;
            }
            .timer:active { transform: scale(0.95); }
            .timer-container { }
          </style>
        </head>
        <body tabindex="0">
          <div id="slide-content" class="slide-container"></div>
          <div class="controls">
            <button id="prevBtn" onclick="prevSlide()">Previous</button>
            <div id="progress" class="progress"></div>
            <button id="nextBtn" onclick="nextSlide()">Next</button>
          </div>
          <script>
            const slides = ${slidesJSON};
            let current = 0;
            let activeTimer = null;
            
            renderSlide();
            
            function renderSlide() {
              if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
              const currentSlide = slides[current];
              let parsedContent = currentSlide.content;

              document.getElementById('slide-content').innerHTML = 
                '<div class="content-wrapper">' +
                  '<h1>' + currentSlide.title + '</h1>' +
                  '<div class="content">' + parsedContent + '</div>' +
                '</div>';
              
              // Retry KaTeX rendering until the script is loaded
              
              
              
              if (parsedContent.includes('confetti-container')) {
                 setTimeout(() => {
                   if(window.confetti) window.confetti({particleCount: 200, spread: 180});
                 }, 300);
              }

              document.getElementById('progress').innerText = (current + 1) + ' / ' + slides.length;
              document.getElementById('prevBtn').disabled = current === 0;
              document.getElementById('nextBtn').disabled = current === slides.length - 1;
            }

            function startTimer(el, minutes) {
              if (el.dataset.running) return;
              el.dataset.running = "true";
              let time = minutes * 60;
              
              if (activeTimer) clearInterval(activeTimer);
              
              activeTimer = setInterval(() => {
                time--;
                let m = Math.floor(time / 60);
                let s = time % 60;
                el.innerText = m + ":" + (s < 10 ? "0" : "") + s;
                if (time <= 0) {
                  clearInterval(activeTimer);
                  el.style.background = "linear-gradient(135deg, #ef4444, #b91c1c)";
                  el.innerText = "TIME'S UP!";
                }
              }, 1000);
            }

            function nextSlide() {
              if (current < slides.length - 1) {
                current++;
                renderSlide();
              }
            }

            function prevSlide() {
              if (current > 0) {
                current--;
                renderSlide();
              }
            }

            document.addEventListener('keydown', (e) => {
              if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
                e.preventDefault(); 
                nextSlide();
              } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) {
                e.preventDefault(); 
                prevSlide();
              } else if (e.key === 'b' || e.key === '.') {
                 // Black screen toggle for clicker
                 const body = document.body;
                 body.style.backgroundColor = body.style.backgroundColor === 'black' ? '#f8fafc' : 'black';
                 document.getElementById('slide-content').style.display = body.style.backgroundColor === 'black' ? 'none' : 'flex';
                 document.querySelector('.controls').style.display = body.style.backgroundColor === 'black' ? 'none' : 'flex';
              }
            });

            try {
              window.focus();
              document.body.focus();
            } catch(e) {}
            
            try {
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(e => console.log('Fullscreen rejected.'));
              } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
              }
            } catch(e) {
              console.log('Fullscreen error:', e);
            }
            
            // Allow scripts to load before rendering first slide
            setTimeout(renderSlide, 100);
          ${"<"}/script>
        </body>
      </html>
    `;
    presentWindow.document.write(html);
    presentWindow.document.close();
  };
  

  const viewerRef = React.useRef(null);
  useEffect(() => {
    let retries = 0;
    const tryRender = () => {
      if (viewerRef.current && window.renderMathInElement) {
        window.renderMathInElement(viewerRef.current, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      } else if (retries < 20) {
        retries++;
        setTimeout(tryRender, 100);
      }
    };
    tryRender();
  });

  useEffect(() => {
    if (plan) {
      fetchComments();
      setActiveCommentSection(null);
    }
  }, [plan]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('lesson_plan_id', plan.id)
      .order('created_at', { ascending: true });
      
    if (!error && data) {
      const grouped = data.reduce((acc, c) => {
        if (!acc[c.section]) acc[c.section] = [];
        acc[c.section].push(c);
        return acc;
      }, {});
      setComments(grouped);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !activeCommentSection) return;
    setLoading(true);

    const { error } = await supabase
      .from('comments')
      .insert([{
        lesson_plan_id: plan.id,
        section: activeCommentSection,
        comment: newComment,
        author_pin: viewerPin,
        author_name: adminName || null
      }]);

    if (!error) {
      setNewComment('');
      fetchComments();
    }
    setLoading(false);
  };

  const getDifferentiationContent = (p) => {
    if (!p) return null;
    if (p.confidential_tiered_differentiation) return p.confidential_tiered_differentiation;
    if (p.tiered_differentiation) return p.tiered_differentiation;
    if (p.differentiation) return p.differentiation;
    if (p.direct_instruction) {
      const match = p.direct_instruction.match(/##+\s*(?:Confidential\s+)?(?:Tiered\s+)?Differentiation[\s\S]*/i);
      if (match) {
        return match[0]
          .replace(/^##+\s*(?:Confidential\s+)?(?:Tiered\s+)?Differentiation\s*/i, '')
          .replace(/^---\s*\n?/m, '')
          .trim();
      }
    }
    return null;
  };

  const getCleanDirectInstruction = (p) => {
    if (!p) return '';
    let di = p.direct_instruction || '';
    di = di.split(/##+\s*(?:Confidential\s+)?(?:Tiered\s+)?Differentiation/i)[0].trim();
    di = di.replace(/##+\s*(?:Lesson\s+)?Purpose[\s\S]*?(?=##\s+[A-Z]|$)/i, '').trim();
    return di;
  };

  const Section = ({ title, content, id, children }) => {
    const sectionComments = comments[id] || [];
    
    return (
      <div 
        style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#fafafa', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--kms-purple)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: activeCommentSection === id ? '0 0 0 2px var(--kms-teal)' : 'none'
        }}
        onClick={() => setActiveCommentSection(id)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0, color: 'var(--kms-purple-dark)' }}>{title}</h4>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: sectionComments.length > 0 ? 'var(--kms-teal)' : '#aaa' }}>
            <MessageSquare size={14} /> {sectionComments.length}
          </span>
        </div>
        
        {content && <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{content}</p>}
        {(!content && !children) && <em style={{ color: '#999' }}>Not provided</em>}
        {children}
        
        {/* Comments Panel for this Section */}
        {activeCommentSection === id && (
          <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #ddd' }} onClick={e => e.stopPropagation()}>
            <h5 style={{ margin: '0 0 10px 0', color: '#555' }}>Comments</h5>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
              {sectionComments.map(c => (
                <div key={c.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
                    <strong>{c.author_name || `Admin (PIN: ${c.author_pin})`}</strong> - {format(new Date(c.created_at), 'MMM d, h:mm a')}
                  </div>
                  <div style={{ fontSize: '14px' }}>{c.comment}</div>
                </div>
              ))}
              {sectionComments.length === 0 && <p style={{ fontSize: '12px', color: '#999' }}>No comments yet.</p>}
            </div>
            
            <form onSubmit={submitComment} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Add a comment..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                style={{ padding: '8px' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '8px 15px' }} disabled={loading || !newComment.trim()}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };

  
    const buildSlideshowHTML = (p) => {
        
    const cfuStrategies = [
      'Turn and Talk: Discuss the core concept with your neighbor.',
      'Stop and Jot: Write down the most important thing you learned in the last 5 minutes.',
      'Think-Pair-Share: Think about the core concept for 30 seconds, then pair up and share your thoughts.',
      'Fist to Five: Rate your understanding from 0 (completely lost) to 5 (I could teach it) by holding up your fingers.',
      'Thumbs Up/Down: Show a thumbs up if you feel confident about the concept, or thumbs down if you need more help.',
      'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.'
    ];
    const hashStr = (p.topic || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const defaultCfu = cfuStrategies[hashStr % cfuStrategies.length];
    
    let cfuText = p.checks_for_understanding && p.checks_for_understanding.length > 0 
      ? p.checks_for_understanding[0].cfu 
      : defaultCfu;
      
    if (p.date_start === '2026-09-21') {
       cfuText = 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.';
    }


      const eqMatch = p.objective_3m ? p.objective_3m.match(/SWBATs+(.*)/i) : null;
      const getEssentialQuestion = (obj) => {
        if (!obj) return "What is the core concept of today's lesson?";
        let topic = obj.toLowerCase();
        const m = topic.match(/involving (.*?) \(/);
        if (m) {
           return `How can we apply our understanding of ${m[1]} to solve real-world problems?`;
        }
        return "How can we apply today's concept to solve real-world problems?";
      };

      const problemsSlides = [];

      // Guided Practice (2 problems - separate slides)
      const guidedSlides = [];
      if (p.structured_exemplars && p.structured_exemplars.length >= 2 ) {
        const guidedChunk = p.structured_exemplars.slice(0, 2);
        guidedChunk.forEach((ex, idx) => {
          guidedSlides.push({
            title: `8. Guided Practice (Problem ${idx + 1})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
</div>`
          });
        });
      }
  
      // Group Practice (4 problems - separate slides)
      const groupSlides = [];
      if (p.structured_exemplars && p.structured_exemplars.length >= 6) {
        const groupChunk = p.structured_exemplars.slice(2, 6);
        groupChunk.forEach((ex, idx) => {
          groupSlides.push({
            title: `10. Group Practice (Problem ${idx + 3})`,
            content: `<div class="transition-banner" style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 8px 14px; border-radius: 6px; margin-bottom: 12px; font-size: 14px; color: #1e40af; text-align: left;"><strong>🔁 Transition:</strong> <em>We just explored worked examples together... Now we will collaborate on Group Practice problems... so we can test our reasoning and discuss strategies with our peers.</em></div><div style="font-size: 24px; text-align: center; margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
</div>`
          });
        });
      }

      // Independent Practice (every problem on its own slide for printing)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        problemsSlides.push({ 
          title: "12. Independent Practice (Directions)", 
          content: `<strong>Directions:</strong>\n${p.independent_practice || 'Complete the assigned independent practice problems quietly.'}`
        });
        
        const indChunk = p.structured_exemplars.slice(6, 14);
        indChunk.forEach((ex, idx) => {
          problemsSlides.push({
            title: `12. Independent Practice (Problem ${idx + 7})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex, idx)}
</div>`
          });
        });
      } else {
        problemsSlides.push({ 
          title: "11. Independent Practice", 
          content: `<strong>Directions:</strong>
${p.independent_practice || 'Complete the assigned independent practice problems quietly.'}`
        });
      }

      
      const diSlides = [];
      if (p.direct_instruction) {
        let diText = p.direct_instruction;
        // Strip out any Differentiation and Lesson Purpose from student-facing slides
        diText = diText.split(/##+\s*(?:Tiered\s+)?Differentiation/i)[0];
        diText = diText.replace(/##+\s*(?:Lesson\s+)?Purpose[\s\S]*?(?=##\s+[A-Z]|$)/i, '').trim();

        // Inject telescope launch for 9/21
        if (p.date_start === '2026-09-21' && !diText.includes('telescope')) {
           diText = diText.replace(/## Direct Instruction\s*---/i, "## Launch: The Telescope\n---\nImagine you are looking at a star through a telescope. The star doesn't change its actual shape, but the lenses inside the telescope *scale* the image up so your eye can see it. Today, we are going to learn how to mathematically build that telescope.\n\n## Direct Instruction\n---");
        }
        
        // Split by markdown headings
        const blocks = diText.split(/(?=##+ )/);
        
        blocks.forEach((block, idx) => {
          if (!block.trim()) return;
          
          let title = "Direct Instruction";
          const titleMatch = block.match(/##+ (.*?)\n/);
          if (titleMatch) {
             title = titleMatch[1].trim();
             block = block.replace(/##+ .*?\n/, '');
          }
          if (title.toLowerCase().includes('differentiation') || block.toLowerCase().includes('differentiation') || title.toLowerCase().includes('lesson purpose') || block.toLowerCase().includes('our why')) {
             return;
          }
          block = block.replace(/^---\n/, ''); // remove stray dashes

          let content = block.trim();
          
          if (content.includes('**Example 1**') && content.includes('**Example 2**')) {
             const ex1split = content.split('**Example 2**');
             diSlides.push({
              title: `${title} (Example 1)`,
              content: ex1split[0].replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 0 ? renderQuestionContent(p.structured_exemplars[0]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
             diSlides.push({
              title: `${title} (Example 2)`,
              content: (`**Example 2**` + ex1split[1]).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 1 ? renderQuestionContent(p.structured_exemplars[1]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
          } else {
             diSlides.push({
              title: title,
              content: content.replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 0 ? renderQuestionContent(p.structured_exemplars[0]) : ''}</div>`).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${p.structured_exemplars && p.structured_exemplars.length > 1 ? renderQuestionContent(p.structured_exemplars[1]) : ''}</div>`) + (content.includes('Example') ? `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` : '')
             });
          }
        });
      }


      
      const expectationsContent = `<div style="display: flex; align-items: center; justify-content: space-around; padding: 20px;">
        <ul style="font-size: 32px; line-height: 2.2;">
          <li>No Cellphones</li>
          <li>Drop pencils when completed</li>
          <li>Communicate with respect</li>
          <li>Raise your hand</li>
        </ul>
        <div><img src="${window.location.origin}${getDayOwlImage(p.date_start)}" alt="Owl" onerror="this.onerror=null; this.src='${window.location.origin}/owl-transparent.png';" style="height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" /></div>
      </div>`;


      const baseSlides = [
        { title: p.topic ? p.topic.replace(/\[.*?\]\s*/, '') : '', content: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0; text-align: center;"><h2>Welcome to Class!</h2><p>Get ready to start.</p></div>` },
        { title: "1. Spiraled Do Now", content: `**Directions:**\n${p.do_now || ''}` },
        { title: "2. Classroom Expectations", content: expectationsContent },
        { 
        title: "3. Today @ A Glance", 
        content: (() => {
          const framing = getFramingArc(p || plan, weekPlans);
          const framingHTML = framing ? `
<div style="background: white; border-radius: 10px; padding: 16px 20px; border-left: 6px solid var(--kms-teal); box-shadow: 0 4px 8px rgba(0,0,0,0.06); margin-bottom: 20px; text-align: left;">
  <div style="font-size: 14px; font-weight: 800; color: var(--kms-teal-dark); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">🎯 Learning Progression Framing</div>
  <p style="font-size: 17px; margin: 6px 0; line-height: 1.5; color: #1e293b;"><strong>⏪ Yesterday we...</strong> ${framing.yesterday}</p>
  <p style="font-size: 17px; margin: 6px 0; line-height: 1.5; color: #1e293b;"><strong>🎯 Today we will...</strong> ${framing.today}</p>
  <p style="font-size: 17px; margin: 6px 0; line-height: 1.5; color: #1e293b;"><strong>💡 So that...</strong> ${framing.soThat}</p>
</div>
` : '';
          return `${framingHTML}**Essential question of the day:**\n${getEssentialQuestion((p || plan).objective_3m)}\n\n**Agenda**\n- Do Now - completed\n- Notes - Direct Instruction\n- Guided & Group Practice: We Do\n- Independent Practice\n- Exit Ticket`;
        })()
      },
      ...(getLessonPurpose(p || plan) ? [{
        title: `Lesson Purpose ("Our Why?")`,
        content: `<div style="background: white; border-radius: 8px; padding: 25px; border-left: 6px solid var(--kms-purple); box-shadow: 0 4px 6px rgba(0,0,0,0.05); font-size: 20px; line-height: 1.6;">
${renderMath(getLessonPurpose(p || plan))}
</div>`
      }] : []),
      { 
        title: "4. Student Shoutouts", 
          content: (() => {
             
             const dateShoutouts = getShoutoutsForDate(shoutouts, p.date_start);
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; padding: 40px 0; pointer-events: none; z-index: -1;"></div>
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s3}</p>
    </div>
  </div>
</div>`;
          })()
        },
...diSlides,
        { 
          title: `7. Formative Assessment #1 (${(p.checks_for_understanding && p.checks_for_understanding[0]?.method) || 'Turn & Talk'})`, 
          content: `**Check for understanding (${(p.checks_for_understanding && p.checks_for_understanding[0]?.method) || 'Turn & Talk'}):**\n${(p.checks_for_understanding && p.checks_for_understanding[0]?.cfu) || cfuText}` 
        },
        ...guidedSlides,
        ...(p.checks_for_understanding && p.checks_for_understanding[1] ? [{
          title: `9. Formative Assessment #2 (${p.checks_for_understanding[1].method || 'Cold Call'})`,
          content: `**Check for understanding (${p.checks_for_understanding[1].method || 'Cold Call'}):**\n${p.checks_for_understanding[1].cfu}`
        }] : []),
        { title: "Classroom Expectations (Reminder)", content: expectationsContent },
        ...groupSlides,
        ...(p.checks_for_understanding && p.checks_for_understanding[2] ? [{
          title: `11. Formative Assessment #3 (${p.checks_for_understanding[2].method || 'Warm Call'})`,
          content: `**Check for understanding (${p.checks_for_understanding[2].method || 'Warm Call'}):**\n${p.checks_for_understanding[2].cfu}`
        }] : []),
        { title: "Classroom Expectations (Reminder)", content: expectationsContent },
        ...problemsSlides,
        ...(p.checks_for_understanding && p.checks_for_understanding[3] ? [{
          title: `13. Formative Assessment #4 (${p.checks_for_understanding[3].method || 'Batch Call'})`,
          content: `**Check for understanding (${p.checks_for_understanding[3].method || 'Batch Call'}):**\n${p.checks_for_understanding[3].cfu}`
        }] : []),
        ...(p.structured_exemplars && p.structured_exemplars.length >= 16 ? [
          {
            title: "14. Exit Ticket (Problem 15)",
            content: `<div class="problem-box"><div class="problem-header">Problem 15</div><div class="problem-body">${renderQuestionContent(p.structured_exemplars[14], 14)}</div></div>`
          },
          {
            title: "14. Exit Ticket (Problem 16)",
            content: `<div class="problem-box"><div class="problem-header">Problem 16</div><div class="problem-body">${renderQuestionContent(p.structured_exemplars[15], 15)}</div></div>`
          }
        ] : [
          {
          title: "14. Exit Ticket",
          content: `**Directions:**\n${p.exit_ticket || ''}`
        }
      ]),
      ];

      // Convert Markdown to HTML for all slides
      
      const parseMd = (text) => {
        if (!text) return '';
        let t = renderMath(text);
        if (window.marked) {
          t = window.marked.parse(t, { breaks: true });
        }
        return t;
      };


      const slideHTML = baseSlides.map((slide, idx) => {
          return `
            <div class="slide-page">
                <div class="slide-header">${slide.title}</div>
                <div class="slide-content">${parseMd(slide.content)}</div>
            </div>
          `;
      }).join('');

      
        return slideHTML;
    };


    const handlePrintWeekSlideshows = async () => {
    if (isGeneratingPptx) return;
    setIsGeneratingPptx(true);
    setPptxProgress("Preparing week slides...");
    try {
      const pres = new pptxgen();
      pres.layout = "LAYOUT_16x9";

      const stage = document.createElement("div");
      stage.id = "pptx-offscreen-stage-week";
      stage.style.cssText = "position: fixed; left: -9999px; top: 0; width: 1280px; height: 720px; z-index: -9999; background: linear-gradient(135deg, #6a0dad, #008080); display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; padding: 24px 36px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow: hidden;";

      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
        #pptx-offscreen-stage-week .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; margin: 8px 0; }
        #pptx-offscreen-stage-week .katex { max-width: 100%; white-space: normal; word-wrap: break-word; }
        #pptx-offscreen-stage-week .content-wrapper {
          width: 100%;
          max-height: 672px;
          background: rgba(255, 255, 255, 0.98);
          padding: 20px 32px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
        }
        #pptx-offscreen-stage-week h1 {
          font-size: 26px;
          color: #300052;
          margin-top: 0;
          margin-bottom: 12px;
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1.5px;
          flex-shrink: 0;
        }
        #pptx-offscreen-stage-week .content {
          font-size: 18px;
          line-height: 1.45;
          color: #1e293b;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        #pptx-offscreen-stage-week .content p { margin-bottom: 8px; }
        #pptx-offscreen-stage-week .content ul, #pptx-offscreen-stage-week .content ol { margin-top: 4px; margin-bottom: 8px; padding-left: 30px; }
        #pptx-offscreen-stage-week .content li { margin-bottom: 6px; }
        #pptx-offscreen-stage-week .content strong { color: #334155; }
        #pptx-offscreen-stage-week .content svg { max-width: 100%; height: auto; max-height: 40vh; display: block; margin: 8px auto; }
        #pptx-offscreen-stage-week .problems-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 15px; margin-bottom: 15px; }
        #pptx-offscreen-stage-week .problem-box {
          word-wrap: break-word; overflow-wrap: break-word; word-break: break-word;
          border: 2px solid #cbd5e1; padding: 18px; border-radius: 12px;
          background: #fff; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          display: flex; align-items: center; justify-content: center; min-height: 90px;
        }
        #pptx-offscreen-stage-week .timer {
          position: absolute;
          top: 18px;
          right: 28px;
          z-index: 1000;
          display: inline-block;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          font-size: 20px;
          font-weight: bold;
          padding: 8px 18px;
          border-radius: 10px;
          border: 3px solid #fff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        #pptx-offscreen-stage-week .transition-banner {
          background: #eff6ff;
          border-left: 4px solid #2563eb;
          padding: 8px 14px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #1e40af;
          text-align: left;
        }
      `;
      stage.appendChild(styleEl);

      const slideBody = document.createElement("div");
      slideBody.style.cssText = "width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;";
      stage.appendChild(slideBody);
      document.body.appendChild(stage);

      const plansToExport = weekPlans && weekPlans.length > 0 ? weekPlans : [plan];
      const allDaysData = plansToExport.map(p => ({
        plan: p,
        dayLabel: p.date_start ? format(parseISO(p.date_start), 'EEEE (M/d)') : 'Lesson',
        slides: buildPresentationSlides(p, weekPlans)
      }));

      const totalSlides = allDaysData.reduce((acc, d) => acc + d.slides.length, 0);
      let slideCount = 0;

      for (const day of allDaysData) {
        for (const s of day.slides) {
          slideCount++;
          setPptxProgress(`Slide ${slideCount} of ${totalSlides} (${day.dayLabel})...`);

          slideBody.innerHTML = `
            <div class="content-wrapper">
              <h1>${s.title}</h1>
              <div class="content">${s.content}</div>
            </div>
          `;

          const imgs = slideBody.querySelectorAll('img');
          if (imgs.length > 0) {
            await Promise.all(Array.from(imgs).map(img => {
              if (img.complete) return Promise.resolve();
              return new Promise(res => {
                img.onload = res;
                img.onerror = res;
                setTimeout(res, 200);
              });
            }));
          }

          await new Promise(r => setTimeout(r, 50));

          const canvas = await html2canvas(stage, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            backgroundColor: null
          });

          const imgData = canvas.toDataURL("image/png");
          const pptSlide = pres.addSlide();
          pptSlide.addImage({
            data: imgData,
            x: 0,
            y: 0,
            w: "100%",
            h: "100%"
          });

          if (s.title) {
            const plainNotes = (s.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            pptSlide.addNotes(s.title + (plainNotes ? "\n\n" + plainNotes : ''));
          }
        }
      }

      if (stage.parentNode) {
        stage.parentNode.removeChild(stage);
      }

      setPptxProgress("Saving Week PowerPoint...");
      await pres.writeFile({ fileName: "Week_Slides.pptx" });
    } catch (err) {
      console.error("Failed to generate Week PPTX:", err);
      alert("Could not generate Week PowerPoint: " + (err?.message || err));
    } finally {
      setIsGeneratingPptx(false);
      setPptxProgress(null);
    }
  };

    const handlePrintWeekSlideshowsOld = () => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Slideshow popup was blocked! Please allow popups.");
        return;
      }
      
      if (!weekPlans || weekPlans.length === 0) return;
      
      const slideHTML = weekPlans.map(p => buildSlideshowHTML(p)).join('<div style="page-break-after: always; height: 0; padding: 0; border: none; margin: 0;"></div>');
      
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Week Slideshows</title>
            <link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
              .slide-page { width: 1024px; height: 768px; margin: 20px auto; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; page-break-after: always; page-break-inside: avoid; position: relative; }
              .slide-header { background: #4B0082; color: white; padding: 25px 40px; font-size: 32px; font-weight: bold; border-bottom: 6px solid #008080; }
              .slide-content { flex: 1; padding: 40px; font-size: 28px; line-height: 1.6; overflow-y: auto; }
              .timer-container { position: absolute; bottom: 30px; right: 40px; }
              .timer { background: #008080; color: white; padding: 10px 25px; border-radius: 30px; font-weight: bold; font-family: monospace; font-size: 32px; border: 3px solid #004c4c; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
              .problem-box { border: 2px solid #ccc; border-radius: 8px; background: white; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
              .problem-header { background: #f8f9fa; padding: 15px 20px; border-bottom: 2px solid #eee; font-weight: bold; color: #4B0082; font-size: 24px; }
              .problem-body { padding: 20px; }
              
              /* Math rendering fixes */
              .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; }
              .katex { max-width: 100%; white-space: normal; word-wrap: break-word; }
              
              @media print {
                @page { size: landscape; margin: 0; }
                body { background: white; }
                .slide-page { margin: 0; box-shadow: none; border-radius: 0; width: 100%; height: 100vh; }
              }
            </style>
          </head>
          <body>
            ${slideHTML}
            <script>window.onload = function() { setTimeout(() => window.print(), 1000); };</script>
            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
            <script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>
          </body>
        </html>`;
        
      printWindow.document.write(html);
      printWindow.document.close();
    };


  return (
    <div ref={viewerRef}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', color: 'var(--kms-purple-dark)' }}>{plan.topic}</h2>
          {plan.week_label === 'Emergency Sub Plans' ? (
            <p style={{ margin: 0, color: '#666' }}><strong>{plan.week_label}</strong></p>
          ) : (
            <p style={{ margin: 0, color: '#666' }}>Date: <strong>{format(new Date(plan.date_start), 'MMMM d, yyyy')}</strong> | Week: <strong>{plan.week_label}</strong></p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          
            <button onClick={handlePresent} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--kms-purple)', color: 'white' }}>
              <Play size={18} /> Present
            </button>
            <button 
              onClick={handlePrintSlideshow} 
              disabled={isGeneratingPptx}
              className="btn-secondary" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isGeneratingPptx ? 0.7 : 1, cursor: isGeneratingPptx ? 'wait' : 'pointer' }}
            >
              <Download size={18} /> {isGeneratingPptx ? (pptxProgress || 'Generating PPT...') : 'PPT Slideshow'}
            </button>
            
            <button onClick={handlePrintGuidedNotes} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Guided Notes
            </button>
            <button onClick={handlePrintWorksheet} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Worksheet
            </button>
            {plan.pdf_url && (
              <a href={plan.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Download size={18} /> PDF
              </a>
            )}
          </div>
          {weekPlans && weekPlans.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'var(--kms-purple)', marginRight: '10px' }}>Entire Week:</span>
              <button 
                onClick={handlePrintWeekSlideshows} 
                disabled={isGeneratingPptx}
                className="btn-secondary" 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isGeneratingPptx ? 0.7 : 1, cursor: isGeneratingPptx ? 'wait' : 'pointer' }}
              >
                <Download size={18} /> {isGeneratingPptx ? (pptxProgress || 'Generating PPT...') : 'PPT Week Slideshows'}
              </button>
            </div>
          )}
      </div>

      <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '20px', fontSize: '14px' }}>
        Click on any section to view or add comments.
      </p>

      <Section id="objective_3m" title="3M Objective" content={plan.objective_3m} />
      <Section id="standard" title="Standard" content={STANDARD_MAP[plan.standard] || plan.standard} />
      <Section id="lesson_purpose" title='Lesson Purpose ("Our Why?")'>
        {getLessonPurpose(plan) ? (
          <div 
            style={{ lineHeight: '1.7', fontSize: '15px' }}
            dangerouslySetInnerHTML={{
              __html: window.marked 
                ? window.marked.parse(renderMath(getLessonPurpose(plan)))
                : renderMath(getLessonPurpose(plan)).replace(/\n/g, '<br/>')
            }}
          />
        ) : (
          <em style={{ color: '#999' }}>Not provided</em>
        )}
      </Section>
      <Section id="lesson_framing" title='Lesson Framing & Transitions (Admin Format)'>
        {(() => {
          const framing = getFramingArc(plan, weekPlans);
          if (!framing) return <em style={{ color: '#999' }}>Not provided</em>;
          return (
            <div style={{ lineHeight: '1.7', fontSize: '15px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid var(--kms-teal)', marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--kms-teal-dark)', fontSize: '16px' }}>🎯 Beginning of Lesson Framing</h4>
                <p style={{ margin: '4px 0' }}><strong>Yesterday we...</strong> {framing.yesterday}</p>
                <p style={{ margin: '4px 0' }}><strong>Today we will...</strong> {framing.today}</p>
                <p style={{ margin: '4px 0' }}><strong>So that...</strong> {framing.soThat}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#1e293b', fontSize: '16px' }}>🔁 Activity Transition Bridges ("We just... Now we will... so...")</h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Do Now ➔ Direct Instruction:</strong> <em>We just activated our prior math knowledge on the Do Now... Now we will dive into Direct Instruction and take our core notes... so we understand the new concepts, vocabulary, and visual models.</em>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Direct Instruction ➔ Group Practice:</strong> <em>We just analyzed worked examples together as a whole class... Now we will collaborate on Group Practice problems at our tables... so we can test our reasoning, support our teammates, and catch any misconceptions early.</em>
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <strong>Group Practice ➔ Independent Practice:</strong> <em>We just solved and discussed problems collaboratively in our groups... Now we will open TicketOut and work through our Independent Practice problems quietly... so we can build individual confidence and prove our personal mastery.</em>
                  </li>
                  <li>
                    <strong>Independent Practice ➔ Exit Ticket:</strong> <em>We just completed our independent practice problems... Now we will take our 2-question Exit Ticket on TicketOut... so we can showcase our learning and check our progress for today.</em>
                  </li>
                </ul>
              </div>
            </div>
          );
        })()}
      </Section>
      <Section id="do_now" title="Do Now (Spiral Topics)" content={plan.do_now} />
      <Section id="direct_instruction" title="Direct Instruction (Launch)" content={getCleanDirectInstruction(plan)} />
      
        {/* Advanced Exemplar Section */}
        {plan.exemplar_image_url && (
            <Section id="exemplar_image" title="Handwritten Exemplar">
                <div style={{ marginBottom: '20px' }}>
                    <a href={plan.exemplar_image_url} target="_blank" rel="noopener noreferrer">
                        <img 
                            src={plan.exemplar_image_url} 
                            alt="Handwritten Exemplar" 
                            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid #ddd' }} 
                        />
                    </a>
                </div>
            </Section>
        )}

        

        <Section id="group_practice" title="Group Practice">
            {plan.structured_exemplars && plan.structured_exemplars.length >= 6 ? (
                <div>
                    {plan.structured_exemplars.slice(2, 6).map((ex, idx) => (
                        <div key={'group-'+idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                                Problem {idx + 3}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0)) }} />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }}>
                                <div style={{ flex: '1 1 50%', padding: '15px', borderRight: '1px solid #eee' }}>
                                    <div style={{ color: 'var(--kms-teal-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <CheckCircle2 size={16} /> Correct Process / Answer
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.correct_answer}</div>
                                </div>
                                <div style={{ flex: '1 1 50%', padding: '15px', backgroundColor: '#fff5f5' }}>
                                    <div style={{ color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <AlertTriangle size={16} /> Anticipated Misconception & Intervention
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.misconception}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' }}>
                    No group practice problems found.
                </div>
            )}
        </Section>

        <Section id="independent_practice" title="Independent Practice">
            {plan.structured_exemplars && plan.structured_exemplars.length >= 6 ? (
                <div>
                    {plan.structured_exemplars.slice(6).map((ex, idx) => (
                        <div key={'ind-'+idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                                Problem {idx + 7}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0)) }} />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }}>
                                <div style={{ flex: '1 1 50%', padding: '15px', borderRight: '1px solid #eee' }}>
                                    <div style={{ color: 'var(--kms-teal-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <CheckCircle2 size={16} /> Correct Process / Answer
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.correct_answer}</div>
                                </div>
                                <div style={{ flex: '1 1 50%', padding: '15px', backgroundColor: '#fff5f5' }}>
                                    <div style={{ color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                                        <AlertTriangle size={16} /> Anticipated Misconception & Intervention
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.misconception}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' }}>
                    No independent practice problems found.
                </div>
            )}
        </Section>

      
      <Section id="criteria_for_success" title="Criteria for Success" content={plan.criteria_for_success} />
      <Section id="tiered_differentiation" title="Confidential Tiered Differentiation" content={getDifferentiationContent(plan)}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ 
            display: 'inline-block',
            backgroundColor: '#ef4444', 
            color: 'white', 
            padding: '4px 10px', 
            borderRadius: '4px', 
            fontSize: '11px', 
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>
            CONFIDENTIAL — FERPA &amp; IEP / 504 PROTECTED (TEACHER &amp; ADMIN ONLY)
          </span>
        </div>
      </Section>
      <Section id="exit_ticket" title="Exit Ticket" content={plan.exit_ticket} />

      {/* Legacy check to avoid errors if not defined in older data */}
      {plan.checks_for_understanding && plan.checks_for_understanding.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fafafa', borderRadius: '8px', borderLeft: '4px solid var(--kms-teal)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--kms-purple-dark)' }}>Checks for Understanding</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--kms-teal-light)' }}>
                <th style={{ padding: '8px 0', width: '50%' }}>CFU</th>
                <th style={{ padding: '8px 0' }}>Method/DOK</th>
              </tr>
            </thead>
            <tbody>
              {plan.checks_for_understanding.map((cfu, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px 0' }}>{cfu.cfu}</td>
                  <td style={{ padding: '8px 0' }}>{cfu.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default LessonPlanViewer;

