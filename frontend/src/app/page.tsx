import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <div>메인 페이지입니다.</div>
      <button>button</button>
      <Button variant="outline">Button</Button>
      <Button variant="destructive">Button</Button>
      버튼에 테일윈드 CSS도 적용 가능하다.
      <Button className="bg-yellow-300 w[100px]" variant="outline">
        Button
      </Button>
    </>
  );
}
