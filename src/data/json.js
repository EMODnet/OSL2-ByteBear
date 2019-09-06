const fs = require('fs');

const data = fs.readFileSync(process.argv[2]);
const x = [];
const y = [];

data.toString().split('\n').forEach((line) => {
  const parts = line.split('\t');

  y.push(parts[0]);
  x.push(parts[1]);
})

fs.writeFileSync(process.argv[2] + '.json', JSON.stringify({ x, y }, null, 2));
