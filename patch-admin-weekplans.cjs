const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

code = code.replace(
  '<LessonPlanViewer plan={selectedPlan} viewerPin={pin} adminName={adminName} />',
  '<LessonPlanViewer plan={selectedPlan} weekPlans={groupedPlans[selectedPlan.week_label]} viewerPin={pin} adminName={adminName} />'
);

fs.writeFileSync('src/components/AdminDashboard.jsx', code);
console.log('Patched AdminDashboard.jsx');
