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

const acceptableCodes = ["1234", "6789", "1708", "5952"];
const acceptableStates = ["RJ", "SP", "MG"];
const acceptableSuppliers = ["totvs", "microsoft"];

export default function Cadastro() {
  const [receipt, setReceipt] = useState("");
  const [codTax, setCodTax] = useState("");
  const [receiptValue, setReceiptValue] = useState("");
  const [state, setState] = useState("");
  const [supplier, setSupplier] = useState("");

  async function handleNewReceipt() {
    if (
      receipt.trim() == "" ||
      codTax.trim() == "" ||
      receiptValue.trim() == "" ||
      state.trim() == "" ||
      supplier.trim() == ""
    )
      return Alert.alert("Campo(s) inválido(s)", "Favor preencher o(s) campo(s)");
      console.log("u")
    if (!acceptableCodes.includes(codTax.trim().toLowerCase()))
      return Alert.alert("Código inválido", "Favor inserir um código válido");
    console.log("i")
    if (!acceptableStates.includes(state.trim().toUpperCase()))
      return Alert.alert("Estado inválido", "Favor inserir um estado válido");
    console.log("e")
    if (!acceptableSuppliers.includes(supplier.trim().toLowerCase()))
      return Alert.alert(
        "Fornecedor inválido",
        "Favor inserir um fornecedor válido"
      );

      console.warn("a")

    const data = {
      id: String(new Date().getTime()),
      receipt,
      codTax,
      receiptValue,
      state,
      supplier,
    };

    await saveReceipt(data);
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
          value={supplier}
          onChangeText={(value) => setSupplier(value)}
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
