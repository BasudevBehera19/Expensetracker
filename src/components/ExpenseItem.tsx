import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Expense } from "../types/Expense";
import { Ionicons } from "@expo/vector-icons";

const ExpenseItem = ({
  item,
  onDelete,
}: {
  item: Expense;
  onDelete: () => void;
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color="#ff4d4f" />
      </TouchableOpacity>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.amount}>₹ {item.amount}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    color: "#1a73e8",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});

export default ExpenseItem;
