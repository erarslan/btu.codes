import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { project } from "./project";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, project],
};
