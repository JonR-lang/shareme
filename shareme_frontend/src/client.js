import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-12-03",
  useCdn: true,
  token: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  return builder.image(source);
};
