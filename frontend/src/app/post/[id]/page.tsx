import createClient from "openapi-fetch";
import ClientPage from "./ClientPage";
import { paths } from "@/lib/backend/apiV1/schema";

const client = createClient<paths>({
  baseUrl: "http://localhost:8080",
});

export default async function Page({ params }: { params: { id: number } }) {
  const id = await params.id;

  const response = await client.GET("/api/v1/posts/{id}", {
    params: {
      path: {
        id,
      },
    },
  });

  if (response.error) {
    // 비어 있으면 if문 통과(에러가 없으면)
    console.log(response);
    return <div>{response.error.msg}</div>;
  }

  const rsData = response.data; // error를 체크하면 !!를 붙이지 않아도 컴파일 에러 발생 안함
  const post = rsData.data;

  return <ClientPage post={post} />;
}
