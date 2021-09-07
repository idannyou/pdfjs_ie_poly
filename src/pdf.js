import * as pdfjs from "./legacy.pdf";
import pdfjsWorker from "./legacy.pdf.worker";

if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerPort = new pdfjsWorker();
}

console.log({ pdfjs });

export default pdfjs;
