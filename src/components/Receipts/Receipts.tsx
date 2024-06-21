import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  id: string;
  receipt: string;
  codTax: string;
  receiptValue: string;
  state: string;
  supplier: string;
}

export default function Receipt({ data, setSelectedReceipt }: any) {
  const [isMenu, setMenu] = useState(false);

  function caseFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function openMenu(data: Props) {
    Alert.alert(
      `Detalhes da NF\n${data.id}`,
      `Fornecedor: ${data.supplier}\nValor: R$ ${data.receiptValue}\nEstado: ${data.state.toUpperCase()}`
    );
  }

  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{data.id}</Text>
      <Text style={styles.cell}>{caseFirstLetter(data.supplier.toLowerCase())}</Text>
      <Text style={styles.cell}>{data.receiptValue}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedReceipt(data)}>
        <Entypo name="dots-three-horizontal" size={15} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 8,
    elevation: 1,
  },
  cell: {
    flex: 1,
    textAlign: "left",
    fontSize: 12.5
  },
  button: {
    textAlign: 'center',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
