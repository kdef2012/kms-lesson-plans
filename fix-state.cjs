const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

if (!code.includes('const [shoutouts, setShoutouts]')) {
    code = code.replace(/const \[selectedPlanId, setSelectedPlanId\] = useState\(null\);/, 
    "const [selectedPlanId, setSelectedPlanId] = useState(null);\n  const [shoutouts, setShoutouts] = useState({});\n  useEffect(() => { fetch('/shoutouts.json').then(r=>r.json()).then(data=>setShoutouts(data)).catch(e=>console.log(e)); }, []);");
}

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Injected state!");
