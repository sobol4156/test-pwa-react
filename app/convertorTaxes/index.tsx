import React from "react";

export default function ConvertorTaxes() {
  const [income, setIncome] = React.useState("");
  const [tax, setTax] = React.useState("");
  const [result, setResult] = React.useState("");

  const calculateTax = () => {
    const incomeNum = parseFloat(income);
    const taxNum = parseFloat(tax);
    if (isNaN(incomeNum) || isNaN(taxNum)) {
      alert("Пожалуйста, введите корректные числа для дохода и налога.");
      return;
    }

    setResult((incomeNum - (incomeNum / 100 * taxNum)).toFixed(2));
  };
  return (
    <div className="p-4 flex items-center justify-center flex-col min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Мой налог</h1>
      {result ? (
        <p className="mt-4 text-lg text-gray-600">После вычета налога останется: {result}р</p>
      ) : (
        ""
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateTax();
        }}
        className="mt-6 w-full max-w-sm bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <label className="text-gray-700 font-medium" htmlFor="income">
          Ваш доход
        </label>
        <input
          id="income"
          type="text"
          placeholder="Введите доход..."
          className="border border-gray-300 text-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setIncome(e.target.value)}
          value={income}
        />

        <label className="text-gray-700 font-medium" htmlFor="tax">
          Процент налога
        </label>
        <input
          id="tax"
          type="text"
          placeholder="Введите налог..."
          className="border border-gray-300 text-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setTax(e.target.value)}
          value={tax}
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Рассчитать
        </button>
      </form>
    </div>
  );
}
