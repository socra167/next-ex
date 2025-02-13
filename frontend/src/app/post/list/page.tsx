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
  console.log(rsData.code);
  console.log(rsData.msg);
  console.log(rsData.data);

  return (
    <div>
      <h1>글 목록</h1>

      <div>응답 코드: {rsData.code}</div>
      <div>결과 메시지: {rsData.msg}</div>
      <div>결과 게시물: {rsData.data.items}</div>

      <hr />

      <ul>
        <li>글1</li>
        <li>글2</li>
      </ul>
    </div>
  );
}
