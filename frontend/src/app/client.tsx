import createClient from "openapi-fetch";
import { paths } from "../lib/backend/apiV1/schema";

const client = createClient<paths>({
  baseUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 다른 데에서 쓰려면 내보내야 함
export default client;
