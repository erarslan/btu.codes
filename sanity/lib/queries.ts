import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY =
  defineQuery(`*[_type == 'project' && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    id, image, name, bio
  },
  views,
  description,
  category,
  image
}`);
