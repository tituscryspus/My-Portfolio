import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max").url();
}
