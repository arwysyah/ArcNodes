export function isEncoded(str) {
    // Check if the string contains any encoded characters
    return /%[0-9A-Fa-f]{2}/.test(str);
  }
  