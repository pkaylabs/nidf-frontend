// helpers.ts
import CryptoJS from "crypto-js";

export const computeSignature = (params: Record<string, any>, secret: string): string => {
  // Sort keys to ensure consistent ordering
  const sortedKeys = Object.keys(params).sort();
  const paramsSorted = new URLSearchParams();
  
  sortedKeys.forEach((key) => {
    // Make sure to convert the value to string
    paramsSorted.append(key, params[key]?.toString().trim() || "");
  });
  
  // URLSearchParams.toString() will encode spaces as "+"
  const queryString = paramsSorted.toString();
  console.log("Computed Query String:", queryString);
  
  return CryptoJS.HmacSHA256(queryString, secret).toString();
};
