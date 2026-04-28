const fs = require("fs");
const path = require("path");

const filesToRestoreMotion = [
  "src/App.jsx",
  "src/components/common/SectionWrapper.jsx",
  "src/components/dashboard/SalesChart.jsx",
  "src/components/home/Ecosystem.jsx",
  "src/components/subscription/Pricing.jsx",
];

filesToRestoreMotion.forEach((file) => {
  const p = path.join(__dirname, file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, "utf-8");
  
  if (file === "src/App.jsx") {
    content = content.replace(/import\s*\{\s*AnimatePresence,\s*\}\s*from\s*['"]framer-motion['"];/g, 
                             "// eslint-disable-next-line no-unused-vars\nimport { AnimatePresence, motion } from 'framer-motion';");
  } else {
    if (!content.includes('import { motion }')) {
      content = "// eslint-disable-next-line no-unused-vars\nimport { motion } from \"framer-motion\";\n" + content;
    }
  }
  
  fs.writeFileSync(p, content);
});

console.log("Restored motion imports.");
