const pdfjs = require("pdfjs-dist/build/pdf.js");
const PdfjsWorker = require("./pdf.worker.ts");

if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerPort = new PdfjsWorker();
}

export default pdfjs;
