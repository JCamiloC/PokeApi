export function asset(path: string): string {
  const clean = path.replace(/^\//, '')
  // Prefix with Vite base URL for GitHub Pages or any subpath deployment
  return `${import.meta.env.BASE_URL}${clean}`
}
