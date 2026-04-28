import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');

const moveRules = [
  { from: 'components/home', to: 'features/home/components' },
  { from: 'components/auth', to: 'features/auth/components' },
  { from: 'components/dashboard', to: 'features/dashboard/components' },
  { from: 'components/layout', to: 'features/dashboard/layout' },
  { from: 'pages/Admin.jsx', to: 'features/admin/pages/Admin.jsx' },
  { from: 'pages/Login.jsx', to: 'features/auth/pages/Login.jsx' },
  { from: 'vendor', to: 'features/provider/legacy' }
];

// 1. Build a map of old absolute paths to new absolute paths
const fileMap = {};

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
};

const allFiles = walk(SRC_DIR);

allFiles.forEach(oldAbsPath => {
  let newAbsPath = oldAbsPath;
  const relPath = path.relative(SRC_DIR, oldAbsPath).replace(/\\/g, '/');
  
  for (const rule of moveRules) {
    if (relPath === rule.from || relPath.startsWith(rule.from + '/')) {
      newAbsPath = path.join(SRC_DIR, rule.to, relPath.substring(rule.from.length));
      break;
    }
  }
  fileMap[oldAbsPath] = newAbsPath;
});

// 2. Read all contents, compute new imports, and write to new locations
const fixImports = (content, oldAbsPath, newAbsPath) => {
  // Regex to match import ... from "..."
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  
  return content.replace(importRegex, (match, importPath) => {
    // We only care about relative imports
    if (!importPath.startsWith('.')) return match;
    
    // Resolve what the old import was pointing to
    const oldImportAbsPath = path.resolve(path.dirname(oldAbsPath), importPath);
    
    // Find if the target was moved
    let targetNewAbsPath = null;
    
    // Check exact match (with or without extension)
    const possibleExts = ['', '.js', '.jsx', '/index.js', '/index.jsx'];
    for (const ext of possibleExts) {
      if (fileMap[oldImportAbsPath + ext]) {
        targetNewAbsPath = fileMap[oldImportAbsPath + ext];
        // Remove extension for the final import string if we added one, to keep it clean
        if (ext === '.js' || ext === '.jsx') {
           targetNewAbsPath = targetNewAbsPath.replace(/\.jsx?$/, '');
        } else if (ext === '/index.js' || ext === '/index.jsx') {
           targetNewAbsPath = path.dirname(targetNewAbsPath);
        }
        break;
      }
    }
    
    // If target didn't move, its new path is its old path
    if (!targetNewAbsPath) {
      targetNewAbsPath = oldImportAbsPath;
    }

    // Compute new relative path from the file's NEW location to the target's NEW location
    let newRelPath = path.relative(path.dirname(newAbsPath), targetNewAbsPath).replace(/\\/g, '/');
    if (!newRelPath.startsWith('.')) newRelPath = './' + newRelPath;

    return match.replace(importPath, newRelPath);
  });
};

// 3. Execute moves and rewrites
Object.entries(fileMap).forEach(([oldAbsPath, newAbsPath]) => {
  const content = fs.readFileSync(oldAbsPath, 'utf8');
  const newContent = fixImports(content, oldAbsPath, newAbsPath);
  
  if (oldAbsPath !== newAbsPath) {
    const newDir = path.dirname(newAbsPath);
    if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });
    fs.writeFileSync(newAbsPath, newContent);
    fs.unlinkSync(oldAbsPath);
    console.log(`Moved & Updated: ${path.relative(SRC_DIR, oldAbsPath)} -> ${path.relative(SRC_DIR, newAbsPath)}`);
  } else {
    // Even if the file didn't move, its imports might point to files that DID move
    if (content !== newContent) {
      fs.writeFileSync(oldAbsPath, newContent);
      console.log(`Updated Imports in: ${path.relative(SRC_DIR, oldAbsPath)}`);
    }
  }
});

// Clean up empty directories
const cleanEmptyDirs = (dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    fs.rmdirSync(dir);
  } else {
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        cleanEmptyDirs(fullPath);
      }
    });
    // check again after cleaning children
    if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  }
};

cleanEmptyDirs(SRC_DIR);

console.log("Frontend Migration Complete!");
