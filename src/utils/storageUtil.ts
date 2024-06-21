import AsyncStorage from "@react-native-community/async-storage";

type Props = {
  id: string;
  receipt: string;
  codTax: string;
  receiptValue: string;
  state: string;
  supplier: string;
};

/**
 * @param {Props[]} object
 * @returns {Promise<void>}
 */

export const saveReceipt = async (object: Props): Promise<void> => {
  try {
    const jsonData = await AsyncStorage.getItem("@receipt_storage");
    let parsedJsonData = [];

    if (jsonData !== null) {
      try {
        parsedJsonData = JSON.parse(jsonData);
        if (!Array.isArray(parsedJsonData)) {
          parsedJsonData = [];
        }
      } catch (e) {
        console.error("Falha ao formatar o arquivo", e);
        parsedJsonData = [];
      }
    }

    parsedJsonData.push(object);

    await AsyncStorage.setItem(
      "@receipt_storage",
      JSON.stringify(parsedJsonData)
    );
  } catch (error) {
    console.warn("Falha ao salvar o item", error);
  }
};

/**
 * @returns {Promise<Props[]>}
 */
export const loadReceipt = async (): Promise<Props[]> => {
  const jsonData = await AsyncStorage.getItem("@receipt_storage");
  const parsedJsonData = jsonData != null ? JSON.parse(jsonData) : [];
  return parsedJsonData;
};

/**
 * @param {id: String}
 * @returns {Promise<Props[]>}
 */
export const removeReceipt = async (id: String): Promise<void> => {
  try {
    const jsonData = await AsyncStorage.getItem("@receipt_storage");
    let parsedJsonData = [];

    if (jsonData !== null) {
      try {
        parsedJsonData = JSON.parse(jsonData);
        if (!Array.isArray(parsedJsonData)) {
          parsedJsonData = [];
        }
      } catch (e) {
        console.error("Erro: houve um erro ao tentar converter", e);
        parsedJsonData = [];
      }
    }

    const updatedData = parsedJsonData.filter((item: Props) => item.id !== id);

    await AsyncStorage.setItem("@receipt_storage", JSON.stringify(updatedData));
  } catch (error) {
    console.warn("Erro ao remover o item", error);
  }
};
