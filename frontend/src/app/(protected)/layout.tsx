import Footer from "@/components/footer";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import Logout from "@/components/protected/shared/navbar/logout";
import Nav from "@/components/protected/shared/navbar/nav";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full sticky top-0 border-b dark:border-neutral-800 py-2 flex items-center justify-center bg-white dark:bg-black z-50">
        <div className="w-full md:w-11/12 xl:w-3/4 flex items-center justify-between px-4">
          <Logo />
          <Nav />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Logout />
          </div>
        </div>
      </header>
      <main className="py-2 px-4 my-2 mx-auto md:border rounded-md w-full md:w-11/12 xl:w-3/4">
        {children}
      </main>
      <Footer />
    </>
  );
}
