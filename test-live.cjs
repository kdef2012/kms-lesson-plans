fetch('https://kms-lesson-plans.vercel.app/').then(r=>r.text()).then(html=>{
  const m = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if(m) return fetch('https://kms-lesson-plans.vercel.app'+m[1]);
  return null;
}).then(r=>r?r.text():'').then(js => console.log('Bundle fetched, owl match:', js.includes('owl.jpg'), 'shoutouts match:', js.includes('Highest TicketOut Scores!')));
