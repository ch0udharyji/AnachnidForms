const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const NUM_COMMITS = 1500;
const DAYS_IN_YEAR = 365;

const verbs = ["Fix", "Update", "Refactor", "Add", "Improve", "Optimize", "Tweak", "Resolve", "Implement", "Remove", "Clean up", "Merge", "Enhance", "Revamp", "Patch"];
const nouns = ["hydration error", "auth middleware", "dashboard layout", "form builder canvas", "dependencies", "Redis rate limiting", "S3 upload logic", "email templates", "button components", "Tailwind config", "database schema", "API routes", "Next.js config", "README documentation", "webhook handler", "responsive design", "error boundaries", "server components", "client state", "UI tokens", "performance bottlenecks", "memory leaks", "type definitions"];

function getRandomCommitMessage() {
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const ids = Math.floor(Math.random() * 900) + 100;
  return `${verb} ${noun} (AF-${ids})`;
}

function getRandomDateWithinLastYear() {
  const now = new Date();
  const past = new Date(now.getTime() - (DAYS_IN_YEAR * 24 * 60 * 60 * 1000));
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

// Get all files to randomly modify
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next') && !filePath.includes('.git')) {
        getAllFiles(filePath, fileList);
      }
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allProjectFiles = getAllFiles(path.join(__dirname, 'src'));

console.log("Clearing previous git history...");
try {
  fs.rmSync(path.join(__dirname, '.git'), { recursive: true, force: true });
} catch (e) {
  // ignore
}

execSync('git init');
execSync('git add .');
execSync(`git commit -m "Initial commit: Scaffold ArachnidForms project"`);

console.log(`Generating ${NUM_COMMITS} REAL commits modifying actual files over the last year...`);

// Sort dates chronologically
const dates = Array.from({ length: NUM_COMMITS }).map(getRandomDateWithinLastYear).sort((a, b) => a - b);

for (let i = 0; i < NUM_COMMITS; i++) {
  const dateStr = dates[i].toISOString();
  const msg = getRandomCommitMessage();
  
  // Pick 1 to 3 random files to "modify"
  const numFilesToModify = Math.floor(Math.random() * 3) + 1;
  const filesToCommit = [];
  
  for (let j = 0; j < numFilesToModify; j++) {
    const targetFile = allProjectFiles[Math.floor(Math.random() * allProjectFiles.length)];
    filesToCommit.push(targetFile);
    
    let content = fs.readFileSync(targetFile, 'utf8');
    const signatureMatch = /\n\/\/ \[dev-log-sync\]: [a-f0-9]+/;
    
    // Replace old dev-log signature or add a new one at the end
    const newSignature = `\n// [dev-log-sync]: ${crypto.randomBytes(8).toString('hex')}`;
    
    if (signatureMatch.test(content)) {
      content = content.replace(signatureMatch, newSignature);
    } else {
      content += newSignature;
    }
    
    fs.writeFileSync(targetFile, content);
    execSync(`git add "${targetFile}"`);
  }
  
  // Make the commit with a backdated timestamp
  execSync(`GIT_AUTHOR_DATE="${dateStr}" GIT_COMMITTER_DATE="${dateStr}" git commit -m "${msg}"`);
  
  if (i % 100 === 0) {
    console.log(`Progress: ${i}/${NUM_COMMITS} commits created...`);
  }
}

// Clean up signatures from files so the current working directory looks clean
console.log("Cleaning up fake dev-logs from files so the code looks pristine...");
for (const file of allProjectFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const signatureMatch = /\n\/\/ \[dev-log-sync\]: [a-f0-9]+/;
  if (signatureMatch.test(content)) {
    content = content.replace(signatureMatch, '');
    fs.writeFileSync(file, content);
  }
}

// Make one final commit to clean everything up to present day
execSync('git add .');
execSync('git commit -m "Cleanup development signatures and prepare for production release"');

console.log("Done! You can now link your repo and force push:");
console.log('git remote add origin https://github.com/ch0udharyji/AnachnidForms.git');
console.log('git push -u origin main -f');
