import { components, paths } from "@/lib/backend/apiV1/schema";
import Link from "next/link";
import createClient from "openapi-fetch";
import ClientPage from "./ClientPage";
import { pages } from "next/dist/build/templates/app-page";

const client = createClient<paths>({
  baseUrl: "http://localhost:8080",
});

export default async function Page({
  searchParams,
}: {
  searchParams: {
    keywordType?: "title" | "content";
    keyword: string;
    pageSize: number;
    page: number;
  };
}) {
  const {
    keywordType = "title",
    keyword = "",
    pageSize = 10,
    page = 1,
  } = await searchParams;

  const response = await client.GET("/api/v1/posts", {
    params: {
      query: {
        keyword,
        keywordType,
        pageSize,
        page,
      },
    },
  });

  const rsData = response.data!!;
  const pageDto = rsData.data;

  return (
    <ClientPage
      rsData={rsData}
      pageSize={pageSize}
      keyword={keyword}
      keywordType={keywordType}
      page={page}
    />
  );
}
