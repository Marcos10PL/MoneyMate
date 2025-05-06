type ErrorsProps = {
  error: string | null | undefined;
};

export default function Error({ error }: ErrorsProps) {
  if (!error) return null;

  return <div className="mt-4 text-red-400 text-sm text-center">{error}</div>;
}
