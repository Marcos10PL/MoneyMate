import Layout from "./layout";

export default function NotFoundMsg({ msg }: { msg: string }) {
  return (
    <Layout>
      <p className="text-muted-foreground">{msg}</p>
    </Layout>
  );
}
