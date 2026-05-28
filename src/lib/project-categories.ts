import { categories as staticCategories } from "@/data/projects";
import type { Project, ProjectCategory, ProjectFilter } from "@/types/content";

export function buildProjectFilters(
  projectCategories: ProjectCategory[],
  projects: Project[]
): ProjectFilter[] {
  const filters: ProjectFilter[] = [{ id: "all", label: "All Projects" }];

  if (projectCategories.length > 0) {
    return [...filters, ...projectCategories];
  }

  const seen = new Map<string, string>();
  for (const project of projects) {
    if (project.category && !seen.has(project.category)) {
      seen.set(project.category, project.categoryLabel || project.category);
    }
  }

  for (const [id, label] of seen) {
    filters.push({ id, label });
  }

  if (filters.length === 1) {
    return staticCategories;
  }

  return filters;
}
