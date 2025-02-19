"use client";

import Link from "next/link";
import client from "./client";
import { useRouter } from "next/navigation";
import { components } from "@/lib/backend/apiV1/schema";
import { faBookBookmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClinetLayout({
  children,
  me,
  fontVariable,
  fontClassName,
}: Readonly<{
  children: React.ReactNode;
  me: components["schemas"]["MemberDto"];
  fontVariable: string;
  fontClassName: string;
}>) {
  const router = useRouter();
  const isLoggedIn = !(me.id == 0);

  return (
    <html lang="en" className={`${fontVariable}`}>
      <body className={`min-h-[100dvh] flex flex-col ${fontVariable}`}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          className="fa-fw text-4xl text-[red]"
        />
        <FontAwesomeIcon icon={faBookBookmark} />
        <header className="flex gap-3">
          <Link href="/">메인</Link>
          <Link href="/about">소개</Link>
          <Link href="/post/list">글 목록</Link>
          {isLoggedIn && <Link href="/post/write">글 작성</Link>}
          {!isLoggedIn && <Link href="/member/login">로그인</Link>}
          {!isLoggedIn && <Link href="/member/join">회원가입</Link>}
          {isLoggedIn && (
            <Link
              href=""
              onClick={async (e) => {
                e.preventDefault();
                const response = await client.DELETE("/api/v1/members/logout", {
                  credentials: "include",
                });

                if (response.error) {
                  alert(response.error.msg);
                  return;
                }

                alert("로그아웃되었습니다.");

                // router.push("/post/list"); // 브라우저 방식 X, 넥스트JS 방식
                // window.location.href = "/"; // 브라우저 방식
                router.push("/");
                router.refresh(); // 🔥 서버 데이터 다시 불러오기
              }}
            >
              로그아웃
            </Link>
          )}
          <Link href="/member/me">내정보</Link>
        </header>
        <div className="flex-grow">{children}</div>
        <footer>푸터</footer>

        <input type="text" />
      </body>
    </html>
  );
}
