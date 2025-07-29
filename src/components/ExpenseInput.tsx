import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ExpenseContext } from "../context/Expensecontext";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../context/Themecontext";

let WebDatePicker: any = null;
if (Platform.OS === "web") {
  WebDatePicker = require("react-datepicker").default;
  require("react-datepicker/dist/react-datepicker.css");
}

const ExpenseInput = () => {
  const { theme } = useTheme();
  const { addExpense } = useContext(ExpenseContext);
  const navigation = useNavigation<any>();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Submit form
  const handleSubmit = () => {
    if (!amount || !description || !date) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (isNaN(Number(amount))) {
      Alert.alert("Invalid Input", "Amount must be a number.");
      return;
    }

    // Format date in local time

    const formatDateLocal = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    addExpense({
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description,
      date: formatDateLocal(date),
    });

    setAmount("");
    setDescription("");
    setDate(null);
    navigation.navigate("ExpenseList");
  };
  // Date Function
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Form validations

  const isFormValid =
    amount.trim() !== "" &&
    !isNaN(Number(amount)) &&
    Number(amount) > 0 &&
    /^[0-9]+(\.[0-9]{1,2})?$/.test(amount.trim()) &&
    description.trim() !== "" &&
    isNaN(Number(description.trim())) &&
    date !== null;

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      <Text style={[styles.label, theme === "dark" && styles.labelDark]}>
        Amount
      </Text>
      <TextInput
        value={amount}
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9.]/g, "");
          setAmount(cleaned);
        }}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
        style={[styles.input, theme === "dark" && styles.inputDark]}
      />

      <Text style={[styles.label, theme === "dark" && styles.labelDark]}>
        Description
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
        style={[styles.input, theme === "dark" && styles.inputDark]}
      />
      {description.trim() !== "" && !isNaN(Number(description.trim())) && (
        <Text style={{ color: "red" }}>
          Description must be text, not a number
        </Text>
      )}
      <Text style={[styles.label, theme === "dark" && styles.labelDark]}>
        Date
      </Text>

      {Platform.OS === "web" ? (
        <WebDatePicker
          selected={date}
          onChange={(d: Date) => setDate(d)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="web-datepicker"
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text
              style={[styles.dateText, theme === "dark" && styles.dateTextDark]}
            >
              {date ? date.toDateString() : "Select a date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </>
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!isFormValid}
        style={[
          styles.submitButton,
          theme === "dark" ? styles.submitButtonDark : styles.submitButtonLight,
          !isFormValid && styles.submitButtonDisabled,
        ]}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
  },
  labelDark: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputDark: {
    borderColor: "#555",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  dateText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
    color: "#333",
  },
  dateTextDark: {
    color: "#fff",
    borderColor: "#555",
    backgroundColor: "#1e1e1e",
  },
  submitButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonLight: {
    backgroundColor: "#6200ee",
  },
  submitButtonDark: {
    backgroundColor: "#bb86fc",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExpenseInput;
