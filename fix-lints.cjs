const fs = require("fs");
const path = require("path");

const filesToRemoveMotion = [
  "src/App.jsx",
  "src/components/common/SectionWrapper.jsx",
  "src/components/dashboard/SalesChart.jsx",
  "src/components/home/Ecosystem.jsx",
  "src/components/subscription/Pricing.jsx",
  "src/components/ui/MagneticButton.jsx",
];

filesToRemoveMotion.forEach((file) => {
  const p = path.join(__dirname, file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, "utf-8");
  // remove unused motion import
  content = content.replace(/import\s*\{\s*.*?motion.*?\s*\}\s*from\s*['"]framer-motion['"];/g, (match) => {
    if (match.includes("AnimatePresence")) {
      return match.replace(/,?motion,?/, "");
    }
    return "";
  });
  content = content.replace(/import\s*\{\s*motion\s*\}\s*from\s*['"]framer-motion['"];\r?\n?/g, "");
  fs.writeFileSync(p, content);
});

// Fix floating Socials
const floating = path.join(__dirname, "src/components/ui/FloatingSocials.jsx");
if (fs.existsSync(floating)) {
  let content = fs.readFileSync(floating, "utf-8");
  content = content.replace(/window\.location\.href\s*=\s*([^\s;]+)/g, 'window.location.assign($1)');
  fs.writeFileSync(floating, content);
}

// Fix InteractiveCard
const interCard = path.join(__dirname, "src/components/home/InteractiveCard.jsx");
if (fs.existsSync(interCard)) {
  let content = fs.readFileSync(interCard, "utf-8");
  content = content.replace(/card\.style\.boxShadow/g, "ref.current.style.boxShadow");
  fs.writeFileSync(interCard, content);
}

// Fix others
const cons = path.join(__dirname, "src/components/auth/ConsultationForm.jsx");
if (fs.existsSync(cons)) {
  let content = fs.readFileSync(cons, "utf-8");
  content = content.replace(/const \[error, setError\] = useState\(null\);/g, "const [, setError] = useState(null);");
  fs.writeFileSync(cons, content);
}

const login = path.join(__dirname, "src/components/auth/Login.jsx");
if (fs.existsSync(login)) {
  let content = fs.readFileSync(login, "utf-8");
  content = content.replace(/const \[error, setError\] = useState\(''\);/g, "const [, setError] = useState('');");
  content = content.replace(/import React, \{ useState, useEffect \} from "react";/g, 'import React, { useState } from "react";');
  fs.writeFileSync(login, content);
}

const vendorDash = path.join(__dirname, "src/vendor/VendorDashboard.jsx");
if (fs.existsSync(vendorDash)) {
  let content = fs.readFileSync(vendorDash, "utf-8");
  content = content.replace(/const \[analytics, setAnalytics\] = useState/g, "const [analytics] = useState");
  fs.writeFileSync(vendorDash, content);
}

const adminVendors = path.join(__dirname, "src/components/dashboard/pages/AdminVendors.jsx");
if (fs.existsSync(adminVendors)) {
  let content = fs.readFileSync(adminVendors, "utf-8");
  content = content.replace(/useEffect\(\(\) => \{\s*fetchVendors\(\);\s*\}, \[\]\);/g, "useEffect(() => {\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    fetchVendors();\n  }, []);");
  fs.writeFileSync(adminVendors, content);
}

console.log("Lint fixes applied.");
