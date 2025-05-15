import BackButton from "./back-button";

type HeaderProps = {
  title: string;
  backButton?: true;
};

export default function Header({ title, backButton }: HeaderProps) {
  return (
    <>
      <header className="relative border-b pt-2 pb-4 flex w-full justify-center items-center">
        {backButton && <BackButton className="absolute left-0" />}
        <h1 className="text-center font-bold uppercase">{title}</h1>
      </header>
    </>
  );
}
