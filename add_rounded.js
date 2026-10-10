const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/className=\"relative flex items-center justify-center transition-colors/g, 'className=\"relative flex items-center justify-center rounded-[6px] transition-colors');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Added rounded corners in', filePath);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      processFile(dirPath);
    }
  });
}

walkDir('./src');
