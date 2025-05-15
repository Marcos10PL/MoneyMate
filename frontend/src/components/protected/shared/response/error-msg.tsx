import Layout from "./layout";

export default function ErrorMsg({ msg }: { msg: string }) {
  return (
    <Layout>
      <p className="text-red-400">{msg}</p>
    </Layout>
  );
}
