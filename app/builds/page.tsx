import React from "react";
import { getAllProjects } from "@/lib/projects";
import BuildsClient from "./BuildsClient";

export default function BuildsPage() {
  const projects = getAllProjects();
  return <BuildsClient initialProjects={projects} />;
}
