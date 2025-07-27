import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import ExpenseListScreen from "../screens/ExpenseListScreen";
import { useTheme } from "../context/Themecontext";
import { Button, Text } from "react-native";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="AddExpense"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "#333" : "#fff",
        },
        headerTintColor: theme === "dark" ? "#fff" : "#000",
        headerRight: () => (
          <Button
            onPress={toggleTheme}
            title={theme === "dark" ? "🌞" : "🌙"}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        ),
      }}
    >
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ title: "Add Expense" }}
      />
      <Stack.Screen
        name="ExpenseList"
        component={ExpenseListScreen}
        options={{ title: "Expense List" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
