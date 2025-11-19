import validator from "validator";
export const isValidUrl = (str) => {
  return validator.isURL(str, { require_protocol: true });
};
export const codeRegex = /^[A-Za-z0-9]{6,8}$/;
