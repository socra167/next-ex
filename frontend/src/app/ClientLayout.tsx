"use client";

import Link from "next/link";
import client from "./client";
import { useRouter } from "next/navigation";
import { components } from "@/lib/backend/apiV1/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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

  async function handleLogout(e: React.MouseEvent): Promise<void> {
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
  }

  return (
    <html lang="en" className={`${fontVariable}`}>
      <body className={`min-h-[100dvh] flex flex-col ${fontVariable}`}>
        <header className="flex gap-3 px-4">
          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex gap-1">
                <FontAwesomeIcon icon={faHouse} className="self-center" />
                <Link href="/">Home</Link>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href="/member/me">내정보</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/about">소개</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/post/list">글 목록</Link>
              </DropdownMenuItem>
              {isLoggedIn && (
                <DropdownMenuItem>
                  <Link href="/post/write">글 작성</Link>
                </DropdownMenuItem>
              )}
              {!isLoggedIn && (
                <DropdownMenuItem>
                  <Link href="/member/login">로그인</Link>
                </DropdownMenuItem>
              )}
              {!isLoggedIn && (
                <DropdownMenuItem>
                  <Link href="/member/join">회원가입</Link>
                </DropdownMenuItem>
              )}
              {isLoggedIn && (
                <DropdownMenuItem>
                  <Link href="" onClick={handleLogout}>
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="flex-grow">{children}</div>
        <footer>푸터</footer>

        <input type="text" />
      </body>
    </html>
  );
}
