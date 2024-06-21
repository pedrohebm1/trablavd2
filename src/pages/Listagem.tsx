import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { loadReceipt, removeReceipt } from "../utils/storageUtil";
import Receipt from "../components/Receipts/Receipts";
import ReceiptDetails from "../components/ReceiptDetails/ReceiptDetails";
import { useFocusEffect } from "@react-navigation/native";
import calculateTax from "../utils/calculateTax";

type Props = {
  id: string;
  receipt: string;
  codTax: string;
  receiptValue: string;
  state: string;
  supplier: string;
};

export default function Listagem() {
  const [receipts, setReceipts] = useState<Props[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Props | null>(null);

  const handleCloseMenu = () => {
    setSelectedReceipt(null);
  };

  const fetchData = async () => {
    try {
      const data: Props[] = await loadReceipt();
      setReceipts(data);
    } catch (error) {
      console.warn("Error ao carregar as notas fiscais", error);
    }
  };

  function handleRemoveReceipt(id: String) {
    Alert.alert("Remover", "Remover Nota Fiscal", [
      {
        text: "Sim",
        onPress: () => {
          setReceipts(receipts.filter((receipt) => receipt.id !== id));
          removeReceipt(id);
          setSelectedReceipt(null);
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function showInformation() {
    return (
      <View>
        <Text style={styles.TitleSmall}>Informações</Text>
        <View style={styles.InformationContainer}>
          <View style={styles.Informations}>
            <Text>Fornecedor Totvs</Text>
            <Text>Estado RJ</Text>
            <Text style={styles.TextSmall}>
              Quantidade Total:
              {
                receipts.filter(
                  (receipt) =>
                    receipt.state === "RJ" &&
                    receipt.supplier.toLowerCase() === "totvs"
                ).length
              }
            </Text>
            <Text style={styles.TextSmall}>
              Valor Total: R$
              {receipts
                .filter(
                  (receipt) =>
                    receipt.state === "RJ" &&
                    receipt.supplier.toLowerCase() === "totvs"
                )
                .reduce(
                  (acc, receipt) => (acc += (parseFloat(receipt.receiptValue)+calculateTax(receipt.codTax, receipt.state, parseFloat(receipt.receiptValue)))),
                  0
                ).toFixed(2)}
            </Text>
            <Text>Estado SP</Text>
            <Text style={styles.TextSmall}>
              Quantidade Total:
              {
                receipts.filter(
                  (receipt) =>
                    receipt.state === "SP" &&
                    receipt.supplier.toLowerCase() === "totvs"
                ).length
              }
            </Text>
            <Text style={styles.TextSmall}>
              Valor Total: R$
              {receipts
                .filter(
                  (receipt) =>
                    receipt.state === "SP" &&
                    receipt.supplier.toLowerCase() === "totvs"
                )
                .reduce(
                  (acc, receipt) => (acc += (parseFloat(receipt.receiptValue)+calculateTax(receipt.codTax, receipt.state, parseFloat(receipt.receiptValue)))),
                  0
                ).toFixed(2)}
            </Text>
            <Text>Estado MG</Text>
            <Text style={styles.TextSmall}>
              Quantidade Total:{" "}
              {
                receipts.filter(
                  (receipt) =>
                    receipt.state === "MG" &&
                    receipt.supplier.toLowerCase() === "totvs"
                ).length
              }
            </Text>
            <Text style={styles.TextSmall}>
              Valor Total: R$
              {receipts
                .filter(
                  (receipt) =>
                    receipt.state === "MG" &&
                    receipt.supplier.toLowerCase() === "totvs"
                )
                .reduce(
                  (acc, receipt) => (acc += (parseFloat(receipt.receiptValue)+calculateTax(receipt.codTax, receipt.state, parseFloat(receipt.receiptValue)))),
                  0
                ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.Informations}>
            <Text>Fornecedor Microsoft</Text>
            <Text>Estado RJ</Text>
            <Text style={styles.TextSmall}>
              Quantidade Total:
              {
                receipts.filter(
                  (receipt) =>
                    receipt.state === "RJ" &&
                    receipt.supplier.toLowerCase() === "microsoft"
                ).length
              }
            </Text>
            <Text style={styles.TextSmall}>
              Valor Total: R$
              {receipts
                .filter(
                  (receipt) =>
                    receipt.state === "RJ" &&
                    receipt.supplier.toLowerCase() === "microsoft"
                )
                .reduce(
                  (acc, receipt) => (acc += (parseFloat(receipt.receiptValue)+calculateTax(receipt.codTax, receipt.state, parseFloat(receipt.receiptValue)))),
                  0
                ).toFixed(2)}
            </Text>
            <Text>Estado SP</Text>
            <Text style={styles.TextSmall}>
              Quantidade Total:
              {
                receipts.filter(
                  (receipt) =>
                    receipt.state === "SP" &&
                    receipt.supplier.toLowerCase() === "microsoft"
                ).length
              }
            </Text>
            <Text style={styles.TextSmall}>
              Valor Total: R$
              {receipts
                .filter(
                  (receipt) =>
                    receipt.state === "SP" &&
                    receipt.supplier.toLowerCase() === "microsoft"
                )
                .reduce(
                  (acc, receipt) => (acc += (parseFloat(receipt.receiptValue)+calculateTax(receipt.codTax, receipt.state, parseFloat(receipt.receiptValue)))),
                  0
                ).toFixed(2)}
            </Text>
            <Text>Estado MG</Text>
            <Text style={styles.TextSmall}>
              Quantidade Total:
              {
                receipts.filter(
                  (receipt) =>
                    receipt.state === "MG" &&
                    receipt.supplier.toLowerCase() === "microsoft"
                ).length
              }
            </Text>
            <Text style={styles.TextSmall}>
              Valor Total: R$
              {receipts
                .filter(
                  (receipt) =>
                    receipt.state === "MG" &&
                    receipt.supplier.toLowerCase() === "microsoft"
                )
                .reduce(
                  (acc, receipt) => (acc += (parseFloat(receipt.receiptValue)+calculateTax(receipt.codTax, receipt.state, parseFloat(receipt.receiptValue)))),
                  0
                ).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.ViewContainer}>
      <Text style={styles.Title}>Notas fiscais</Text>
      <View style={styles.Header}>
        <Text style={styles.Heading}>Id</Text>
        <Text style={styles.Heading}>Fornecedor</Text>
        <Text style={styles.Heading}>Valor</Text>
      </View>
      <FlatList
        data={receipts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Receipt data={item} setSelectedReceipt={setSelectedReceipt} />
        )}
      />
      {showInformation()}
      {selectedReceipt !== null && (
        <ReceiptDetails
          data={selectedReceipt}
          handleRemoveReceipt={handleRemoveReceipt}
          handleCloseMenu={handleCloseMenu}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    gap: 20,
    paddingTop: 40,
    paddingHorizontal: 30,
    paddingVertical: 30,
    height: "50%",
  },
  Title: {
    fontSize: 30,
    alignSelf: "center",
  },
  TitleSmall: {
    fontSize: 20,
    alignSelf: "center",
    padding: 20,
  },
  TextSmall: {
    fontSize: 10,
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  Heading: {
    flex: 1,
  },
  InformationContainer: {
    flexDirection: "row",
  },
  Informations: {
    flex: 1,
    gap: 10,
  },
});
