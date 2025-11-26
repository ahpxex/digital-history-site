import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardBody className="flex flex-col items-center space-y-6 py-8">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <MagnifyingGlassIcon className="w-10 h-10 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800">
              页面未找到
            </h2>
            <p className="text-gray-600">
              您要查找的页面不存在或已被移动。
            </p>
          </div>
          <div className="flex gap-3 w-full">
            <Button
              as={Link}
              href="/"
              color="primary"
              variant="solid"
              className="flex-1"
            >
              返回首页
            </Button>
            <Button
              as={Link}
              href="/errors/404"
              variant="bordered"
              className="flex-1"
            >
              查看演示
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
