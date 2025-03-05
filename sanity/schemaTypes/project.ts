import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "views",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.min(1)
          .max(5)
          .required()
          .error("En az 1, en fazla 5 kategori seçmelisiniz"),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required().error("Image is required"),
    }),
    defineField({
      name: "githubRepo",
      type: "url",
      validation: (Rule) =>
        Rule.required().error("GitHub repo linki zorunludur"),
    }),
    defineField({
      name: "pitch",
      type: "markdown",
      validation: (Rule) => Rule.required().error("Pitch is required"),
    }),
  ],
});
