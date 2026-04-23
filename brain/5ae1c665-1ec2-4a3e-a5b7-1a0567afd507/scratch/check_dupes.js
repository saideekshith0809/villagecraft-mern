const fs = require('fs');
const content = fs.readFileSync('d:/VillageCraft/myapp/src/translations/index.js', 'utf8');

// Simple regex to find keys in objects
const lines = content.split('\n');
let currentObject = '';
const objects = {};

lines.forEach((line, index) => {
    const objMatch = line.match(/(\w+):\s*{/);
    if (objMatch) {
        currentObject = objMatch[1];
        objects[currentObject] = objects[currentObject] || [];
    }
    const keyMatch = line.match(/^\s*(\w+):/);
    if (keyMatch && currentObject) {
        const key = keyMatch[1];
        if (objects[currentObject].includes(key)) {
            console.log(`Duplicate key "${key}" in object "${currentObject}" at line ${index + 1}`);
        }
        objects[currentObject].push(key);
    }
});
