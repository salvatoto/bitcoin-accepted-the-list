import Image from "next/image";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function HalsMessage() {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  interface LoadSuccessArgs {
    numPages: number;
  }

  function onDocumentLoadSuccess({ numPages }: LoadSuccessArgs) {
    setNumPages(numPages);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="items-top mb-40 mt-12 flex min-h-screen flex-col justify-center sm:p-0 lg:mt-12 lg:flex-row">
      <div className="items-top flex flex-col lg:w-1/2">
        <div className="sm:w-4/5 md:w-3/5 lg:w-4/5">
          <Image
            src="/hal_finney.jpeg"
            alt="Hal Finney running"
            width={700}
            height={700}
          />
        </div>
        <h4 className="mt-2 text-left text-2xl font-bold leading-tight tracking-tighter lg:w-3/4 lg:pr-4">
          Don't skip leg day.
        </h4>
      </div>

      <div className="mt-10 flex w-3/5 flex-col lg:mt-0">
        <Document
          file="/bitcoin-white-paper.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            scale={1.5}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        <div className="flex w-full items-center justify-between">
          <button
            className="ml-6"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>

          <button
            className="ml-6"
            type="button"
            disabled={pageNumber >= (numPages ?? 0)}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
