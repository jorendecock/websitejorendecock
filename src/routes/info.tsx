import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "../site";

export const Route = createFileRoute("/info")({
  head: () => ({ meta: [{ title: "info — joren de cock" }] }),
  component: InfoPage,
});
