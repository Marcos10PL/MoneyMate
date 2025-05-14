import Card from "./card";

type DashboardHeaderProps = {
  incomes: number;
  expenses: number;
  balance: number;
  isLoading: boolean;
};

export default function DashboardHeader({
  incomes,
  expenses,
  balance,
  isLoading,
}: DashboardHeaderProps) {
  const cards = [
    { title: "your incomes", amount: incomes, color: "income" },
    { title: "Your expenses", amount: expenses, color: "expense" },
    { title: "Your balance", amount: balance, color: "balance" },
  ] as const;

  return (
    <header className="flex flex-wrap-reverse items-center justify-center pb-4 pt-2 *:grow *:px-12 gap-2 border-b">
      {cards.map(card => (
        <Card
          key={card.title}
          title={card.title}
          amount={card.amount}
          isLoading={isLoading}
          color={card.color}
        />
      ))}
    </header>
  );
}
