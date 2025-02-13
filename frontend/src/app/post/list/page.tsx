import { components } from "@/lib/backend/apiV1/schema";

type PostDto = components["schemas"]["PostDto"];
type PostItemPageDto = components["schemas"]["PageDto"];

export default async function Page() {
  // api 호출
  const response = await fetch("http://localhost:8080/api/v1/posts");
  // const json = response.json(); 이런 식으로 response를 사용하기 위해선, 위 함수의 응답이 들어와야 한다.
  // 응답이 돌아올 때 까지 대기 하기 위해 await을 사용한다. await을 사용하는 함수는 async가 되어야 한다.

  if (!response.ok) {
    // response 응답이 OK가 아니면 에러 발생
    throw new Error("에러");
  }

  const rsData = await response.json(); // 서버는 JSON으로 응답한다. json()으로 넘어온 데이터를 역직렬화해서 객체로 쓸 수 있게 해준다.
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
        {pageDto.items?.map((item: PostDto) => {
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
