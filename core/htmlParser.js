// htmlParser.js
export function html(strings, ...values) {
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const processedValues = values.map((value) => {
    if (typeof value === "string") {
      return escapeHtml(value);
    }
    if (typeof value === "number") {
      return value;
    }
    if (value instanceof Node) {
      return value.outerHTML;
    }
    return value !== undefined && value !== null ? value : "";
  });

  return strings.reduce(
    (acc, str, i) =>
      acc + str + (processedValues[i] !== undefined ? processedValues[i] : ""),
    "",
  );
}