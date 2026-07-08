import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, ProjectDetail, type Project } from "../site";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = projects.find((x) => x.id === params.slug);
    return {
      meta: [
        { title: p ? `${p.title} — joren de cock` : "project" },
        ...(p?.cover ? [{ property: "og:image", content: p.cover }] : []),
      ],
    };
  },
  loader: ({ params }): Project => {
    const p = projects.find((x) => x.id === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="px-5 py-20 lowercase">
      <p>project niet gevonden.</p>
      <Link to="/" className="underline">terug</Link>
    </div>
  ),
  component: () => <ProjectDetail project={Route.useLoaderData() as Project} />,
});
