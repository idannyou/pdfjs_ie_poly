import * as pdfjs from "pdfjs-dist/es5/build/pdf.js";

const Worker = require("worker-loader?esModule=false&filename=[name].js!./pdf.worker.js");

if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerPort = new Worker();
}

export default pdfjs;
