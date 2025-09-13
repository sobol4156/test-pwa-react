import type { Route } from "./+types/home";
import ConvertorTaxes from "~/convertorTaxes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Мой налог" },
    { name: "description", content: "Приложение для подсчёта ваших денюжек после уплаты налога" },
  ];
}

export default function Home() {
  return <ConvertorTaxes />;
}
