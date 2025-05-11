import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
        <header className="py-4 flex items-center justify-between w-full max-w-sm">
          <div className="font-bold text-lg">
            Welcome to
            <Logo className="inline-block mx-1.5" />
          </div>
          <ModeToggle />
        </header>
        <div className="w-full max-w-sm mb-20 text-lg text-justify space-y-6">
          <p>
            Take control of your finances, track your expenses, and reach your saving goals — all in one place.
          </p>
          <Button variant="outline" className="w-full uppercase" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
