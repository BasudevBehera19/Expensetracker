import React from "react";
import { ExpenseProvider } from "./src/context/Expensecontext";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/context/Themecontext";

const App = () => {
  return (
    <ExpenseProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </ExpenseProvider>
  );
};

export default App;
