import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Expense } from "../types/Expense";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ExpensecontextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}

export const ExpenseContext = createContext<ExpensecontextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
});

const USER_KEY = "user_expenses";

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadExpensesData = async () => {
      const data = await AsyncStorage.getItem(USER_KEY);
      if (data) {
        setExpenses(JSON.parse(data));
      }
    };
    loadExpensesData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(USER_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id != id));
  };

  return (
    <ExpenseContext.Provider
      value={{expenses, addExpense, deleteExpense}}
    >{children}</ExpenseContext.Provider>
  );
};
