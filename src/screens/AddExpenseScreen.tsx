import React from "react";
import { SafeAreaView, View } from "react-native";
import ExpenseInput from "../components/ExpenseInput";

const AddExpenseScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ExpenseInput />
    </SafeAreaView>
  );
};

export default AddExpenseScreen;
