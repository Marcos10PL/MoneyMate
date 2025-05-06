import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
        <header className="py-4 flex items-center justify-between w-full max-w-sm">
          <Logo />
          <ModeToggle />
        </header>
        <div className="w-full max-w-sm mb-20">{children}</div>
      </main>
    </>
  );
}
