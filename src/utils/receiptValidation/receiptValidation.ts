import { Alert } from "react-native";
import { ReceiptDTO } from "./receiptValidation.dto";

const acceptableCodes = ["1234", "6789", "1708", "5952"];
const acceptableStates = ["RJ", "SP", "MG"];
const acceptableSuppliers = ["totvs", "microsoft"];

export function validateReceipt(data : ReceiptDTO) {
  if (
    data.receipt.trim() == "" ||
    data.codTax.trim() == "" ||
    data.receiptValue.trim() == "" ||
    data.state.trim() == "" ||
    data.supplier.trim() == ""
  ) {
    Alert.alert("Campo(s) inválido(s)", "Favor preencher o(s) campo(s)");
    return false;
  }
  if (!acceptableCodes.includes(data.codTax.trim().toLowerCase())) {
    Alert.alert("Código inválido", "Favor inserir um código válido");
    return false;
  }
  if (!acceptableStates.includes(data.state.trim().toUpperCase())) {
    Alert.alert("Estado inválido", "Favor inserir um estado válido");
    return false;
  }
  if (!acceptableSuppliers.includes(data.supplier.trim().toLowerCase())) {
    Alert.alert("Fornecedor inválido", "Favor inserir um fornecedor válido");
    return false;
  }
  return true;
}
