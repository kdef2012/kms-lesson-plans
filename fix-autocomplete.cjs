const fs = require('fs');
let code = fs.readFileSync('src/components/Login.jsx', 'utf8');
code = code.replace(/type="password"/g, 'type="password" autoComplete="new-password"');
fs.writeFileSync('src/components/Login.jsx', code);
