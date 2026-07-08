import { createFileRoute } from "@tanstack/react-router";
import { ProjectsIndex } from "../site";

export const Route = createFileRoute("/")({
  component: ProjectsIndex,
});
