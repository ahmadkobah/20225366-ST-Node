const fsSync = require('fs');
const fs = require('fs').promises;

fsSync.writeFileSync('step1.txt', 'This is Step 1');
fsSync.writeFileSync('step2.txt', 'This is Step 2');
fsSync.writeFileSync('step3.txt', 'This is Step 3');

async function readSteps() {
  try {
    const data1 = await fs.readFile('step1.txt', 'utf8');
    console.log('Step 1:', data1);

    const data2 = await fs.readFile('step2.txt', 'utf8');
    console.log('Step 2:', data2);

    const data3 = await fs.readFile('step3.txt', 'utf8');
    console.log('Step 3:', data3);
  } catch (err) {
    console.error('Error:', err);
  }
}

readSteps();