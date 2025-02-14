"use client";

import { components } from "@/lib/backend/apiV1/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClientPage({
  rsData,
  keywordType,
  keyword,
  pageSize,
  page,
}: {
  rsData: components["schemas"]["RsDataPageDto"];
  keywordType?: "title" | "content";
  keyword: string;
  pageSize: number;
  page: number;
}) {
  const router = useRouter(); // Next.js의 useRouter()를 사용하면 페이지를 새로고침하지 않고 주소를 바꿀 수 있다. router.push()
  const pageDto = rsData.data;

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

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const searchKeyword = formData.get("keyword") as string;
          const searchKeywordType = formData.get("keywordType") as string;
          const page = 1;
          const pageSize = formData.get("pageSize") as string;

          router.push(
            `/post/list?keywordType=${searchKeywordType}&keyword=${searchKeyword}&pageSize=${pageSize}&page=${page}`
          );
        }}
      >
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
        <input type="submit" value="검색"></input>
        <label className="ml-2">페이지당 행 개수</label>
        <select name="pageSize" defaultValue="30">
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </form>
      <div className="flex gap-3">
        {Array.from({ length: pageDto.totalPages }, (_, i) => i + 1).map(
          (pageNo) => {
            return (
              <Link
                key={pageNo}
                className={pageNo == page ? `text-blue-500` : ""}
                href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${pageNo}`}
              >
                {pageNo}
              </Link>
            );
          }
        )}
      </div>
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
