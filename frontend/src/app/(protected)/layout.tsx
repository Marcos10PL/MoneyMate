import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import Logout from "@/components/protected/navbar/logout";
import Nav from "@/components/protected/navbar/nav";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full flex items-center sticky top-0 justify-between px-3 md:justify-evenly border-b dark:border-neutral-800 py-2">
        <Logo />
        <Nav />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Logout />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
