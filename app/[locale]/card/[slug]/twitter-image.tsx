export { default } from './opengraph-image'

// Re-exported route segment config is not statically analyzable, so the
// twitter card image declares the same TTL as its Open Graph twin.
export const revalidate = 3600
