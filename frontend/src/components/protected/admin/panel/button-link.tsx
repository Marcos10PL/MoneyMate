import { Button } from "@/components/ui/button";
import Link from "next/link";

type ButtonLinkProps = {
  title: string;
  href: string;
};

export default function ButtonLink({ title, href }: ButtonLinkProps) {
  return (
    <Button asChild className="w-full py-10" variant={"outline"}>
      <Link href={href}>
        <h1 className="text-xl font-bold">{title}</h1>
      </Link>
    </Button>
  );
}
