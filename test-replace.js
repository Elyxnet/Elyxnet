const fs = require('fs');

const file = 'src/components/layout/Sidebar.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace class-[--color-something] with class-something
// Example: bg-[--color-bg-surface] -> bg-bg-surface
content = content.replace(/\[--color-([a-zA-Z0-9_-]+)\]/g, '$1');

console.log(content.includes('bg-bg-surface'));
console.log(content.includes('text-text-primary'));
