const fs = require('fs');

const data = fs.readFileSync('info.txt', 'utf-8');
console.log("Sync read:", data);

fs.readFile('info.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("Async read:", data);
});

fs.readFile('info.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  const summary = `This file was read successfully and contains ${data.length} characters.`;
  
  fs.writeFile('summary.txt', summary, (err) => {
    if (err) throw err;
    console.log("summary.txt created!");
  });
});