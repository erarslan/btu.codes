"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/writeClient";

export const createProject = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, githubRepo, email } =
    Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "pitch" && key !== "image")
    );

  const parsedCategory = JSON.parse(category as string);
  const slug = slugify(title as string, { lower: true, strict: true });
  const imageFile = form.get("image") as File | null;

  try {
    let imageAsset;

    if (imageFile && imageFile.size > 0) {
      const imageBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);
      imageAsset = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
      });
    }

    const project: any = {
      title,
      author: {
        _type: "reference",
        _ref: session.id,
      },
      slug: {
        _type: "slug",
        current: slug,
      },
      description,
      category: parsedCategory,
      githubRepo,
      pitch,
    };

    if (email) {
      project.email = email;
    }

    if (imageAsset) {
      project.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }

    const result = await writeClient.create({
      _type: "project",
      ...project,
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateProject = async (
  state: any,
  form: FormData,
  pitch: string,
  projectId: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, githubRepo, email } =
    Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "pitch" && key !== "image")
    );

  const parsedCategory = JSON.parse(category as string);
  const slug = slugify(title as string, { lower: true, strict: true });
  const imageFile = form.get("image") as File | null;

  try {
    let imageAsset;

    if (imageFile && imageFile.size > 0) {
      const imageBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(imageBuffer);
      imageAsset = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
      });
    }

    const project: any = {
      title,
      slug: {
        _type: "slug",
        current: slug,
      },
      description,
      category: parsedCategory,
      githubRepo,
      pitch,
    };

    if (email) {
      project.email = email;
    }

    if (imageAsset) {
      project.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }

    const result = await writeClient.patch(projectId).set(project).commit();

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const deleteProject = async (projectId: string) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    const result = await writeClient.delete(projectId);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
