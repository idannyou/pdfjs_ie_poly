const pdfjs = require("pdfjs-dist/build/pdf");
const PdfjsWorker = require("./pdf.worker.js");

if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerPort = new PdfjsWorker();
}

export default pdfjs;
