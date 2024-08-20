#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2] || "arcnode-project";
const templatePath = path.resolve(__dirname, "../templates/default-template");
const targetPath = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetPath)) {
  console.error(`Directory ${projectName} already exists. Choose a different name.`);
  process.exit(1);
}

fs.mkdirSync(targetPath);
fs.cpSync(templatePath, targetPath, { recursive: true });
const packageJsonPath = path.join(targetPath, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
packageJson.name = projectName;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

const green = '\x1b[32m';
const blue = '\x1b[34m';
const reset = '\x1b[0m';

console.log(`Created ${projectName} at ${targetPath}`);
console.log(`${green}Installing dependencies...${reset}`);
console.log(`${blue}\nProject setup complete!${reset}`);
console.log(`${blue}Navigate to your project directory:${reset} and install dependencies`);
console.log(`  cd ${projectName} && npm install`);
console.log(`${blue}Start the development server:${reset}`);
console.log(`  npm start`);
console.log(`${blue}Build for development:${reset}`);
console.log(`  npm run build:dev`);
console.log(`${blue}Build for production:${reset}`);
console.log(`  npm run build:prod`);
