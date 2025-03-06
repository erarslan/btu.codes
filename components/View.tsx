import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { PROJECT_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/writeClient";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views } = await client
    .withConfig({ useCdn: false })
    .fetch(PROJECT_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit()
  );

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3 border-2 px-2 py-1 rounded-full bg-gray-100 z-10">
      <div className="absolute -top-1 -right-2">
        <Ping />
      </div>
      <p>
        <span>{views + 1} görüntüleme </span>
      </p>
    </div>
  );
};

export default View;
