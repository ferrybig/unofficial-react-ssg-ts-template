#!/usr/bin/env node
import fs from "fs";

function renamePackageJsonName(targetDir, projectName) {
	const packageJsonPath = `${targetDir}/package.json`;
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
	packageJson.name = projectName;
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

if (process.argv.length < 3) {
	console.log("Please provide a project name");
	process.exit(1);
}

const targetDir = process.argv[2];
const projectName = targetDir.split("/").pop();

fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(`${__dirname}/../template`, targetDir, { recursive: true, errorOnExist: true });
renamePackageJsonName(targetDir, projectName);
console.log(`Finished generating your project ${projectName}`);
console.log(`cd ${projectName}`);
console.log(`npm install`);
console.log(`npm run dev`);
