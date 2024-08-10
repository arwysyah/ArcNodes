#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2] || "arcnode-project";
const templatePath = path.resolve(__dirname, "../templates/default-template");
const targetPath = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetPath)) {
  console.error(
    `Directory ${projectName} already exists. Choose a different name.`,
  );
  process.exit(1);
}

fs.mkdirSync(targetPath);
fs.cpSync(templatePath, targetPath, { recursive: true });
const packageJsonPath = path.join(targetPath, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
packageJson.name = projectName;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Created ${projectName} at ${targetPath}`);
console.log("Installing dependencies...");
execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });
console.log("Project is ready!");
