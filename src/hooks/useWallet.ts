import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}

export const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simuler le chargement des données
    setBalance(150);
    setTransactions([
      {
        id: "1",
        type: "credit",
        amount: 100,
        description: "Recharge wallet",
        date: "2024-03-10T10:00:00Z",
      },
      {
        id: "2",
        type: "debit",
        amount: 50,
        description: "Achat commande #123",
        date: "2024-03-09T15:30:00Z",
      },
      {
        id: "3",
        type: "credit",
        amount: 100,
        description: "Recharge wallet",
        date: "2024-03-08T09:15:00Z",
      },
    ]);
  }, []);

  const addCredit = async () => {
    // Simuler l'ajout de crédit
    const amount = 50; // À remplacer par un montant choisi par l'utilisateur
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "credit",
        amount,
        description: "Recharge wallet",
        date: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return {
    balance,
    transactions,
    addCredit,
  };
};
