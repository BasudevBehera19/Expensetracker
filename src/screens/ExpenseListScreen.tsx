import React, { useContext } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { ExpenseContext } from "../context/Expensecontext";
import ExpenseItem from "../components/ExpenseItem";
import { Expense } from "../types/Expense";

const ExpenseListScreen = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  console.log("All expenses:", expenses);
  console.log("Total amount spent:", totalExpense);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.totalText}>
          Total Spent: ₹{totalExpense.toFixed(2)}
        </Text>

        {expenses.length === 0 ? (
          <Text style={styles.emptyText}>No expenses added yet.</Text>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <ExpenseItem
                item={item}
                onDelete={() => deleteExpense(item.id)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default ExpenseListScreen;
