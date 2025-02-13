import { components } from "@/lib/backend/apiV1/schema";

type PostDto = components["schemas"]["PostDto"];
type PostItemPageDto = components["schemas"]["PageDto"];

export default async function Page({
  searchParams,
}: {
  searchParams: {
    keywordType?: "title" | "content";
    keyword: string;
  };
}) {
  const { keywordType = "title", keyword = "" } = await searchParams;
  const response = await fetch(
    `http://localhost:8080/api/v1/posts?keywordType=${keywordType}&keyword=${keyword}`
  );

  if (!response.ok) {
    throw new Error("에러");
  }

  const rsData = await response.json();
  const pageDto: PostItemPageDto = rsData.data;

  return (
    <div>
      <h1>글 목록</h1>

      <div>응답 코드: {rsData.code}</div>
      <div>결과 메시지: {rsData.msg}</div>

      <div>totalPages: {pageDto.totalPages}</div>
      <div>totalItems: {pageDto.totalItems}</div>
      <div>currentPageNo: {pageDto.currentPageNo}</div>
      <div>pageSize: {pageDto.pageSize}</div>

      <hr />

      <ul>
        {pageDto.items.map((item: PostDto) => {
          // java 스트림에서 map()을 사용하는 것과 유사하다
          // any로 뭐든 들어올 수 있다고 알려준다. (java에서 Object와 비슷한 느낌)
          // 자바 스크립트가 HTML을 반복문으로 만들려면, key를 넣어줘야 한다 (반복문 안에 있으면)
          return (
            <li className="border-2 border-red-500 my-2 p-2" key={item.id}>
              <div>id: {item.id}</div>
              <div>title: {item.title}</div>
              <div>authorId: {item.authorId}</div>
              <div>authorName: {item.authorName}</div>
              <div>published: {`${item.published}`}</div>
              <div>listed: {`${item.listed}`}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
