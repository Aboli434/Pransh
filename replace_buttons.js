const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // We find instances of <a or <Link with px- or py- classes that signify buttons
  // and wrap them with the motion div, injecting the hover element.
  
  // Actually, a simpler way is to just inject the exact motion wrapper around matching <a> and <Link> tags
  // but keeping their original background/text colors intact, while adding hover:bg-[#EAE5D9] hover:text-[#1B2B1F]

  // This is an advanced regex
  // Match `<a ... className="... px-8 py-4 ... hover:bg-[...] ...">TEXT</a>`
  const buttonRegex = /(<(?:a|Link)[^>]*className="[^"]*?(px-[0-9]+|py-[0-9]+|border)[^"]*?"[^>]*>)([\s\S]*?)(<\/(?:a|Link)>)/g;

  content = content.replace(buttonRegex, (match, openTag, trigger, innerContent, closeTag) => {
    // If it's already using motion, skip
    if (match.includes('motion.div') || match.includes('bg-transparent') || match.includes('nav') || match.includes('menu')) {
      return match;
    }
    
    // Check if it's a structural link (like image wrapper)
    if (innerContent.includes('<Image') || innerContent.includes('<svg') || innerContent.includes('span') && !innerContent.match(/[a-zA-Z]/)) {
      return match;
    }

    // It's likely a text button!
    // Strip old hover classes
    let newOpenTag = openTag
      .replace(/hover:bg-\S+/g, '')
      .replace(/hover:text-\S+/g, '')
      .replace(/hover:scale-\S+/g, '')
      .replace(/transition-colors/g, '');
    
    // Add new hover classes and structural classes
    newOpenTag = newOpenTag.replace(/className="/, 'className="relative flex items-center justify-center transition-colors duration-300 focus:outline-none hover:bg-[#EAE5D9] hover:text-[#1B2B1F] ');

    let newInnerContent = innerContent.trim();
    
    // If not already wrapped in relative z-10, wrap text
    if (!newInnerContent.includes('relative z-10')) {
      newInnerContent = `<span className="relative z-10">${newInnerContent}</span>`;
    }

    const motionGlow = `\n<motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1B2B1F]/10 to-transparent skew-x-12" initial={{ x: "-150%" }} whileHover={{ x: "150%" }} transition={{ duration: 0.7, ease: "easeInOut" }} />\n`;

    return `<motion.div className="rounded-[6px] overflow-hidden inline-block" whileHover={{ y: -2, boxShadow: "0 6px 16px -4px rgba(0,0,0,0.3)" }} transition={{ duration: 0.3, ease: "easeOut" }}>\n${newOpenTag}\n${newInnerContent}${motionGlow}\n${closeTag}\n</motion.div>`;
  });

  if (content !== original) {
    // Ensure framer-motion is imported
    if (!content.includes('framer-motion')) {
      content = `import { motion } from 'framer-motion';\n` + content;
    }
    
    // Ensure 'use client' is present
    if (!content.includes("'use client'") && !content.includes('"use client"')) {
      content = `'use client';\n` + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.tsx') && !dirPath.includes('Navbar') && !dirPath.includes('Hero')) {
      processFile(dirPath);
    }
  });
}

walkDir('./src');
