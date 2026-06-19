import fs from "fs";
import path from "path";

export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  type:
    | "Website"
    | "Web App"
    | "Game"
    | "Automation"
    | "AI Model"
    | "Research Project"
    | "PDF / Paper"
    | "GitHub Repository"
    | "Tool";
  thumbnail?: string;
  videoUrl?: string;
  order?: number;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjects = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      try {
        return JSON.parse(fileContents) as Project;
      } catch (e) {
        console.error(`Error parsing project JSON file ${fileName}:`, e);
        return null;
      }
    })
    .filter((project): project is Project => project !== null);

  // Sort projects by order (ascending), fallback to title alphabetically
  return allProjects.sort((a, b) => {
    const orderA = a.order !== undefined ? a.order : 999;
    const orderB = b.order !== undefined ? b.order : 999;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.title.localeCompare(b.title);
  });
}
