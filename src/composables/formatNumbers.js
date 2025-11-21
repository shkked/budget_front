export default function formatNumbers(num, colName) {
  if (!num) return;
  if (colName == "numberOfSerial") {
    return num.toLocaleString("ru-RU", { style: "decimal" });
  }
  return num.toLocaleString("ru-RU", { style: "currency", currency: "RUB" }).replace(/\s?₽$/, "");
}
