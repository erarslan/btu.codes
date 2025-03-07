import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && defined(slug.current) && !defined($search) || category[] match $search || title match $search || author->name match $search] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
  githubRepo,
  email
}`);

export const PROJECT_BY_ID_QUERY =
  defineQuery(`*[_type == "project" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  githubRepo,
  email,
  pitch
}`);

export const PROJECT_VIEWS_QUERY =
  defineQuery(`*[_type == "project" && _id == $id][0]{
  views
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
  name,
  username,
  email,
  image,
  bio
}`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0]{
  _id,
  name,
  username,
  email,
  image,
  bio
}`);

export const PROJECTS_BY_AUTHOR_ID_QUERY =
  defineQuery(`*[_type == "project" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
  githubRepo,
  email
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{_id, title, slug, _createdAt, author->{_id, name, slug, image, bio}, views, description, category, image, githubRepo, email, pitch}
}`);
