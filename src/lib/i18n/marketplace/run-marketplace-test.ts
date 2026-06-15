import { runEncodingTest } from "./encoding-test";
import { runImportTest } from "./import-test";
import { runMarketplaceTest } from "./marketplace-test";
import { runUpdateTest } from "./update-test";
import { runSignatureTest } from "./signature-test";

const marketplaceResult = runMarketplaceTest();
const importResult = runImportTest();
const encodingResult = runEncodingTest();
const signatureResult = runSignatureTest();
const updateResult = runUpdateTest();

console.log("Marketplace Test Result");
console.log(marketplaceResult);

console.log("Import Test Result");
console.log(importResult);

console.log("Encoding Test Result");
console.log(encodingResult);

console.log("Signature Test Result");
console.log(signatureResult);

console.log("Update Test Result");
console.log(updateResult);