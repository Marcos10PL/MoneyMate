import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
      <Logo />
      <h2 className="font-bold text-xl">404 | NOT FOUND</h2>
      <p>Sorry, but the page you were looking for was not found.</p>
      <Button asChild variant="outline">
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
