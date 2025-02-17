"use client";

import { components } from "@/lib/backend/apiV1/schema";
import Link from "next/link";

export default function ClientPage({
  post,
}: {
  post: components["schemas"]["PostWithContnetDto"];
}) {
  return (
    <>
      <div>
        <div>번호: {post.id}</div>
        <div>제목: {post.title}</div>
        <div>내용: {post.content}</div>
        <div>등록일: {post.createdDate}</div>
        <div>수정일: {post.modifiedDate}</div>
        <div>공개 여부: {`${post.published}`}</div>
        <div>리스팅 여부: {`${post.listed}`}</div>
      </div>
      <div>
        <Link href={`${post.id}/edit`}>수정</Link>
      </div>
    </>
  );
}
