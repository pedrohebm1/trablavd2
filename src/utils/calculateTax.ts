export default function calculateTax<Number>(
  codTax: string,
  state: string,
  receiptValue: number
): number {
  if ((codTax === "1234" || codTax === "6789") && state === "RJ") {
    return (receiptValue * 1) / 100;
  }
  if ((codTax === "1234" || codTax === "6789") && state === "SP") {
    return (receiptValue * 2) / 100;
  }
  if ((codTax === "1234" || codTax === "6789") && state === "MG") {
    return (receiptValue * 3) / 100;
  }
  return 0;
}