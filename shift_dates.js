import fs from 'fs';

function shiftDates() {
  const shifts = {
    // Week 2
    '2026-08-18': '2026-08-17',
    '2026-08-19': '2026-08-18',
    '2026-08-20': '2026-08-19',
    '2026-08-21': '2026-08-20',
    // Week 3
    '2026-08-24': '2026-08-21',
    '2026-08-25': '2026-08-24',
    '2026-08-26': '2026-08-25',
    '2026-08-27': '2026-08-26',
    '2026-08-28': '2026-08-27'
  };

  const files = ['seed_w2_8th.js', 'seed_w3_8th.js'];
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace the dates
    for (const [oldDate, newDate] of Object.entries(shifts)) {
      // Use regex to avoid partial matches, though dates are exact format
      const regex = new RegExp(oldDate, 'g');
      content = content.replace(regex, newDate);
    }
    
    // Adjust the week_label
    // Week 2 week_label is '8/17-8/21'. 8/24 shifted to 8/21 should be in Week 2 label?
    // Let's just fix the week_labels manually if needed, but for now we just change dates.
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated dates in ${file}`);
  });
}

shiftDates();
