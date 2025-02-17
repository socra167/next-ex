import { cookies } from "next/headers";
import ClientPage from "./ClientPage";
import client from "@/app/client";

export default async function Page({ params }: { params: { id: number } }) {
  // Nextjs에선 서버 컴포넌트가 파라미터를 받을 때 비동기로 처리해야 한다.
  // params가 다 받아지면, 안에 있는 걸 꺼내 사용한다.
  //   const id = await params.id;
  const { id } = await params; // 파라미터의 값을 순서대로 대응한다.

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
  const fetchMeResponse = await client.GET("/api/v1/members/me", {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });
  if (fetchMeResponse.error) {
    alert(fetchMeResponse.error.msg);
    return;
  }
  const post = rsData.data;
  const me = fetchMeResponse.data.data;

  return <ClientPage post={post} me={me} />;
}
