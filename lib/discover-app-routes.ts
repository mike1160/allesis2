import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

const APP_DIR = join(process.cwd(), "app");

export type DiscoveredRoute = { path: string; pageFile: string };

/**
 * Vindt alle routes met een page.tsx onder /app (route groups zonder segment in URL).
 */
export function discoverAppRoutes(): DiscoveredRoute[] {
  const out: DiscoveredRoute[] = [];

  function walk(dir: string, segments: string[]): void {
    const pageFile = join(dir, "page.tsx");
    if (existsSync(pageFile)) {
      const path = segments.length === 0 ? "/" : `/${segments.join("/")}`;
      out.push({ path, pageFile });
    }

    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const name = ent.name;
      if (name.startsWith("_")) continue;
      if (name === "api") continue;
      if (name.startsWith("(") && name.endsWith(")")) {
        walk(join(dir, name), segments);
        continue;
      }
      walk(join(dir, name), [...segments, name]);
    }
  }

  walk(APP_DIR, []);
  return out;
}

export function getLastModified(pageFile: string): Date {
  try {
    return statSync(pageFile).mtime;
  } catch {
    return new Date();
  }
}
