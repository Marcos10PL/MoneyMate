import ButtonLink from "./button-link";

export default function ManagementList() {
  const links = [
    { title: "Manage users", href: "/admin/users" },
    { title: "Manage categories", href: "/admin/categories" },
  ];

  return (
    <section className="pt-4 pb-2 space-y-2">
      {links.map(link => (
        <ButtonLink key={link.title} title={link.title} href={link.href} />
      ))}
    </section>
  );
}
