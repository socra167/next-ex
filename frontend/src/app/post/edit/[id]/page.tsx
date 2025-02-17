import client from "@/app/client";
import ClientPage from "./ClientPage";

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
    console.log(response.error.msg);
    return;
  }

  const post = response.data.data;

  return <ClientPage post={post} />;
}
