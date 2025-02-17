import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import client from "./app/client";

export async function middleware(request: NextRequest) {
  const reqToken = request.cookies.get("accessToken");

  // 브라우저가 nextJS에게 요청한 URL
  console.log(request.nextUrl.toString());
  if (request.nextUrl.pathname.startsWith("/post/edit/")) {
    return new NextResponse("로그인이 필요합니다.", {
      status: 401,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  // 스프링부트 서버가 준 쿠키를 nextResponse에 심어주면 된다.
  const nextResponse = NextResponse.next(); // NextJS의 Response

  // 스프링부트 서버에 한번 더 내정보 조회 요청
  const response = await client.GET("/api/v1/members/me", {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  // 스프링부트 서버에서 받은 응답 set-cookie를 next응답으로 설정
  const springCookie = response.response.headers.getSetCookie();
  console.log(springCookie);
  nextResponse.headers.set("set-cookie", String(springCookie));
  return nextResponse;
}

export const config = {
  matcher: "/:path*",
};
