import { components, paths } from "@/lib/backend/apiV1/schema";
import createClient from "openapi-fetch";

// type PostDto = components["schemas"]["PostDto"];
// type PostItemPageDto = components["schemas"]["PageDto"];
// client에서 꺼내면 타입이 정해지므로 이것도 이제 필요 없다!

const client = createClient<paths>({
  baseUrl: "http://localhost:8000",
});

export default async function Page({
  searchParams,
}: {
  searchParams: {
    keywordType?: "title" | "content";
    keyword: string;
  };
}) {
  const { keywordType = "title", keyword = "" } = await searchParams;

  const response = await client.GET("/api/v1/posts", {
    params: {
      query: {
        keyword: keyword,
        keywordType: keywordType,
      },
    },
  });

  // 타입정보를 주지 않아도 알아서 응답에 맞는 타입이 된다!
  const rsData = response.data!!;
  const pageDto = rsData.data;

  pageDto.items;

  //   const response = await fetch(
  //     `http://localhost:8080/api/v1/posts?keywordType=${keywordType}&keyword=${keyword}`
  //   );

  //   if (!response.ok) {
  //     throw new Error("에러");
  //   }

  //   const rsData = await response.json();
  //   const pageDto: PostItemPageDto = rsData.data; // 여기선 타입 정보를 직접 넘겼다.

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

      <form>
        <select name="keywordType">
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input
          placeholder="검색어 입력"
          type="text"
          name="keyword"
          defaultValue={keyword}
        ></input>
      </form>

      <ul>
        {pageDto.items.map((item) => {
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
