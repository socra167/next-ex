"use client";

import client from "@/app/client";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();
  async function write(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (title.trim().length == 0) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (content.trim().length == 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    const response = await client.POST("/api/v1/posts", {
      body: {
        title,
        content,
        published: true,
        listed: true,
      },
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    const post = response.data.data;

    // 목록으로 이동, 내가 방금 작성한 글 상세 페이지 이동
    router.push(`${post.id}`);
  }

  return (
    <>
      <form onSubmit={(e) => write(e)} className="flex flex-col w-1/4 gap-3">
        <input
          type="text"
          name="title"
          placeholder="제목 입력"
          className="border-2 border-black"
        />
        <textarea name="content" className="border-2 border-black" />
        <input type="submit" value="등록" />
      </form>
    </>
  );
}
