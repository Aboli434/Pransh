const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Check if file contains 'use client'
  if (content.includes("'use client'") || content.includes('"use client"')) {
    // Remove all occurrences
    content = content.replace(/'use client';?\r?\n?/g, '');
    content = content.replace(/"use client";?\r?\n?/g, '');
    
    // Add it exactly once at the top
    content = "'use client';\n" + content.trimStart();
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed use client in', filePath);
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
