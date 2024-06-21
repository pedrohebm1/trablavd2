import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { loadReceipt, removeReceipt } from "../utils/storageUtil";
import Receipt from "../components/Receipts/Receipts";
import ReceiptDetails from "../components/ReceiptDetails/ReceiptDetails";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Props[] = await loadReceipt();
        setReceipts(data);
      } catch (error) {
        console.warn("Error ao carregar as notas fiscais", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.ViewContainer}>
      <Text style={styles.Title}>Receipts</Text>
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
      {selectedReceipt !== null && (
        <ReceiptDetails
          data={selectedReceipt}
          handleRemoveReceipt={handleRemoveReceipt}
          handleCloseMenu={handleCloseMenu}
        />
      )}
      <View>
        <Text>Total de notas fiscais: {receipts.length}</Text>
        <Text>
          Valor total Notas Fiscais:{" "}
          {receipts.reduce(
            (acc, receipt) => (acc += parseFloat(receipt.receiptValue)),
            0
          )}
        </Text>
      </View>
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
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  Heading: {
    flex: 1,
  },
});
