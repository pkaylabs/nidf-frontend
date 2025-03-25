import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page } from "react-pdf";
import { PdfProps } from "./types";
import { pdfjs } from "react-pdf";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * A helper component used in continuous scroll mode.
 * It wraps a <Page /> and uses IntersectionObserver to notify when the page is in view.
 */
function ObservedPage({
  pageNumber,
  scale,
  onVisible,
}: {
  pageNumber: number;
  scale: number;
  onVisible: (pageNumber: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When at least 60% of the page is visible, call onVisible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            onVisible(pageNumber);
          }
        });
      },
      { threshold: 0.6 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [pageNumber, onVisible]);

  return (
    <div ref={ref}>
      <Page pageNumber={pageNumber} scale={scale} />
    </div>
  );
}

export default function PdfReactPdf({ src }: PdfProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [scale, setScale] = useState<number>(1.0);
  const [isContinuous, setIsContinuous] = useState<boolean>(false);

  // For continuous scroll mode: keep refs for each page so we can scroll to them.
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Called when the PDF document is loaded
  function onDocumentLoadSuccess(pdf: any): void {
    setNumPages(pdf.numPages);
    setPdfDocument(pdf);
  }

  // Navigation functions: In continuous mode, scroll smoothly to the next/prev page container.
  const nextPage = () => {
    setPageNumber((currentPage) => {
      if (currentPage < numPages) {
        const next = currentPage + 1;
        if (isContinuous && pageRefs.current[next - 1]) {
          pageRefs.current[next - 1]?.scrollIntoView({ behavior: "smooth" });
        }
        return next;
      }
      return currentPage;
    });
  };

  const prevPage = () => {
    setPageNumber((currentPage) => {
      if (currentPage > 1) {
        const prev = currentPage - 1;
        if (isContinuous && pageRefs.current[prev - 1]) {
          pageRefs.current[prev - 1]?.scrollIntoView({ behavior: "smooth" });
        }
        return prev;
      }
      return currentPage;
    });
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  // Toggle between single page and continuous scroll mode.
  const toggleContinuous = () => {
    setIsContinuous((prev) => !prev);
  };

  // Callback passed to ObservedPage to update the active page when a page comes into view.
  const handlePageVisible = useCallback(
    (visiblePageNumber: number) => {
      if (isContinuous) {
        setPageNumber(visiblePageNumber);
      }
    },
    [isContinuous]
  );

  return (
    <div style={{ width: "100%", height: "100%" }} className="font-poppins ">
      <>
        <div className="flex h-full gap-4">
          {/* Thumbnails */}
          <div className="px-4 py-2 shadow-md bg-white flex flex-col gap-2 overflow-y-auto">
            {pdfDocument &&
              Array.from({ length: numPages }, (_, index) => {
                const thumbPageNumber = index + 1;
                return (
                  <div
                    key={thumbPageNumber}
                    className={`cursor-pointer p-1 rounded-md ${
                      pageNumber === thumbPageNumber
                        ? "border-2 border-primary-500"
                        : "border border-transparent"
                    }`}
                    onClick={() => {
                      if (isContinuous) {
                        // In continuous mode, scroll to the corresponding page container.
                        pageRefs.current[thumbPageNumber - 1]?.scrollIntoView({
                          behavior: "smooth",
                        });
                        setPageNumber(thumbPageNumber);
                      } else {
                        setPageNumber(thumbPageNumber);
                      }
                    }}
                  >
                    <Page
                      pageNumber={thumbPageNumber}
                      scale={0.2}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      pdf={pdfDocument}
                    />
                  </div>
                );
              })}
          </div>

          {/* Main PDF Viewer */}
          <div className="h-full flex-1 overflow-y-auto">
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              className="my-react-pdf"
            >
              {isContinuous ? (
                // Continuous scroll: render all pages wrapped in ObservedPage
                Array.from({ length: numPages }, (_, index) => {
                  const pNumber = index + 1;
                  return (
                    <div
                      key={`page_${pNumber}`}
                      ref={(el) => (pageRefs.current[index] = el)}
                      className="border-b border-gray-300"
                    >
                      <ObservedPage
                        pageNumber={pNumber}
                        scale={scale}
                        onVisible={handlePageVisible}
                      />
                    </div>
                  );
                })
              ) : (
                // Single page mode
                <Page pageNumber={pageNumber} scale={scale} />
              )}
            </Document>
          </div>
        </div>

        {/* Navigation, Zoom, and Mode Toggle Controls */}
        <div className="absolute z-10 bottom-2 right-5 p-2 flex items-center gap-3">
          <button
            className="flex items-center gap-2 border border-gray-300 rounded-md py-1 px-2 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={prevPage}
            disabled={pageNumber <= 1}
          >
            <IoIosArrowBack />
            Previous
          </button>
          <button
            className="flex items-center gap-2 border border-gray-300 rounded-md py-1 px-2 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextPage}
            disabled={pageNumber >= numPages}
          >
            Next
            <IoIosArrowForward />
          </button>
          <button
            className="flex items-center gap-1 border border-gray-300 rounded-md py-1 px-2 text-xs cursor-pointer"
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            - Zoom Out
          </button>
          <span className="font-light text-xs">
            {(scale * 100).toFixed(0)}%
          </span>
          <button
            className="flex items-center gap-1 border border-gray-300 rounded-md py-1 px-2 text-xs cursor-pointer"
            onClick={zoomIn}
            disabled={scale >= 3.0}
          >
            + Zoom In
          </button>
          <button
            className={`flex items-center gap-2 border border-gray-300 rounded-md py-1 px-2 text-xs  ${
              isContinuous ? "bg-primary-500 text-white" : ""
            } transition-all duration-150 ease-in-out cursor-pointer `}
            onClick={toggleContinuous}
          >
            {isContinuous ? "Continuous" : "Single Page"}
          </button>
        </div>

        {/* Page Info */}
        <p className="absolute font-medium bottom-2 left-5 p-2 text-xs ">
          Page {pageNumber} of {numPages}
        </p>
      </>
    </div>
  );
}
