import { useState } from "react";
import { saveReceipt } from "../utils/storageUtil";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { validateReceipt } from "../utils/receiptValidation/receiptValidation";

export default function Cadastro() {
  const [receipt, setReceipt] = useState<string>("");
  const [codTax, setCodTax] = useState("");
  const [receiptValue, setReceiptValue] = useState("");
  const [state, setState] = useState("");
  const [supplier, setSupplier] = useState("");

  async function handleNewReceipt() {
    
   if (validateReceipt({receipt, codTax, receiptValue, state, supplier})) { 
    const data = {
      id: String(new Date().getTime()),
      receipt,
      codTax,
      receiptValue,
      state,
      supplier
    };

    await saveReceipt(data);
    setReceipt("");
    setCodTax("");
    setReceiptValue("");
    setState("");
    setSupplier("");
  }
  }

  return (
    <View style={styles.ViewContainer}>
      <Text style={styles.Title}>Cadastro de nota fiscal</Text>
      <View style={styles.InputsContainer}>
        <TextInput
          style={styles.Input}
          placeholder="Nota fiscal"
          keyboardType="numeric"
          maxLength={9}
          value={receipt}
          onChangeText={(value) => setReceipt(value)}
        ></TextInput>
        <TextInput
          style={styles.Input}
          placeholder="Código do imposto"
          keyboardType="numeric"
          maxLength={4}
          value={codTax}
          onChangeText={(value) => setCodTax(value)}
        ></TextInput>
        <TextInput
          style={styles.Input}
          placeholder="Valor da nota fiscal"
          keyboardType="numeric"
          value={receiptValue}
          onChangeText={(value) => setReceiptValue(value)}
        ></TextInput>
        <TextInput
          style={styles.Input}
          placeholder="Estado"
          value={state}
          onChangeText={(value) => setState(value.toUpperCase())}
          maxLength={2}
        ></TextInput>
        <TextInput
          style={styles.Input}
          placeholder="Fornecedor"
          autoCapitalize="none"
          maxLength={40}
          value={supplier}
          onChangeText={(value) => setSupplier(value.toLowerCase())}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={handleNewReceipt}
      >
        <Text style={styles.Button}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 30,
    justifyContent: "center",
  },
  InputsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  Title: {
    fontSize: 25,
  },
  Input: {
    width: "90%",
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 17,
  },
  ButtonContainer: {
    width: "90%",
    height: 50,
    backgroundColor: "#060202",
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    color: "#FFF",
  },
});
