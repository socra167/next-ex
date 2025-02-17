import client from "@/app/client";
import ClientPage from "./ClientPage";
import path from "path";

export default async function Page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { id } = await params;

  const response = await client.GET("/api/v1/posts/{id}", {
    params: {
      path: {
        id,
      },
    },
    credentials: "include",
  });

  if (response.error) {
    alert(response.error.msg);
    return;
  }

  const post = response.data.data;

  return <ClientPage post={post} />;
}
