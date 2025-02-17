import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import client from "./app/client";

export async function middleware(request: NextRequest) {
  const myCookies = await cookies();
  const accessToken = myCookies.get("accessToken");
  const nextResponse = NextResponse.next();
  let isExpired = true;
  let payload = null;
  if (accessToken) {
    try {
      const tokenParts = accessToken.value.split(".");
      payload = JSON.parse(Buffer.from(tokenParts[1], "base64").toString());
      const expTimestamp = payload.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
      isExpired = Date.now() > expTimestamp;
      console.log("토큰 만료 여부:", isExpired);
    } catch (e) {
      console.error("토큰 파싱 중 오류 발생:", e);
    }
  }
  let isLogin = payload !== null; // payload가 있으면 로그인된 상태

  console.log("------------------");
  console.log(isLogin, isExpired);

  // 만료되었을 때만 새로 받아오기
  if (isLogin && isExpired) {
    const nextResponse = NextResponse.next();

    const response = await client.GET("/api/v1/members/me", {
      headers: {
        cookie: (await cookies()).toString(),
      },
    });

    // 스프링부트 서버에서 받아온 쿠키 적용
    const springCookie = response.response.headers.getSetCookie();
    nextResponse.headers.set("set-cookie", String(springCookie));
    return nextResponse;
  }

  if (!isLogin && isProtectedRoute(request.nextUrl.pathname)) {
    return createUnauthorizedResponse();
  }
}
function isProtectedRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/post/write") || pathname.startsWith("/post/edit")
  );
}

function createUnauthorizedResponse(): NextResponse {
  return new NextResponse("로그인이 필요합니다.", {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
export const config = {
  matcher: "/((?!.*\\.|api\\/).*)",
};
