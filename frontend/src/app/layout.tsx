import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import client from "./client";
import { cookies } from "next/headers";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// 폰트 적용
const pretendard = localFont({
  src: "./../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await client.GET("/api/v1/members/me", {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  const me = response.data
    ? response.data.data
    : {
        id: 0,
        nickname: "",
        createdDate: "",
        modifiedDate: "",
      };

  return (
    <ClientLayout
      me={me}
      fontVariable={pretendard.variable}
      fontClassName={pretendard.className}
    >
      {children}
    </ClientLayout>
  );
}
