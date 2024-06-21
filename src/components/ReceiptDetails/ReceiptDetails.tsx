import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import calculateTax from "../../utils/calculateTax";

type Props = {
  data: {
    id: string;
    receipt: string;
    codTax: string;
    receiptValue: string;
    state: string;
    supplier: string;
  };
  handleRemoveReceipt: (id: String) => void;
  handleCloseMenu: any;
};

export default function ReceiptDetails({
  data,
  handleRemoveReceipt,
  handleCloseMenu
}: Props) {
  return (
    <SafeAreaView style={styles.ScreenCover}>
      <View style={styles.BackgroundCover}></View>
      <View style={styles.ViewContainer}>
        <Text style={styles.Title}>Detalhes</Text>
        <Text style={styles.Title2}>#{data.id}</Text>
        <View style={styles.Informations}>
          <Text>Nota fiscal: {data.receipt}</Text>
          <Text>Código imposto: {data.codTax}</Text>
          <Text>Valor nota fiscal: {data.receiptValue}</Text>
          <Text>Estado: {data.state}</Text>
          <Text>
            Valor imposto:{" "}
            {calculateTax(
              data.codTax,
              data.state,
              parseFloat(data.receiptValue)
            )}
          </Text>
        </View>
        <View style={styles.Options}>
          <TouchableOpacity onPress={() => handleRemoveReceipt(data.id)}>
            <Text>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseMenu}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ScreenCover: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  BackgroundCover: {
    backgroundColor: "#060202",
    opacity: 0.4,
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ViewContainer: {
    opacity: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  Title: {
    fontSize: 30,
  },
  Title2: {
    fontSize: 20,
  },
  Informations: {
    padding: 20,
    textAlign: "left",
  },
  Options: {
    flexDirection: 'row',
    gap: 20,
    padding: 10
  },
});
