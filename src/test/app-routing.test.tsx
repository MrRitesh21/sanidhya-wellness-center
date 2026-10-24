import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.routeId).toBe("/");
  });

  it("matches a page for /about", () => {
    const matches = router.matchRoutes("/about");
    expect(matches.at(-1)?.routeId).toBe("/about");
  });

  it("matches a page for /services", () => {
    const matches = router.matchRoutes("/services");
    expect(matches.at(-1)?.routeId).toBe("/services");
  });

  it("matches a page for /booking", () => {
    const matches = router.matchRoutes("/booking");
    expect(matches.at(-1)?.routeId).toBe("/booking");
  });

  it("matches a page for /contact", () => {
    const matches = router.matchRoutes("/contact");
    expect(matches.at(-1)?.routeId).toBe("/contact");
  });
});
