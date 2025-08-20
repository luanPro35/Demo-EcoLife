import React, { useState, useEffect } from "react";

const FilePreview = ({ file, onClose }) => {
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFile = async () => {
      try {
        setLoading(true);
        setError(null);

        // For images, we can display them directly
        if (file.type.startsWith("image/")) {
          setFileContent(URL.createObjectURL(file));
        }
        // For PDFs, we can use the browser's built-in PDF viewer
        else if (file.type === "application/pdf") {
          setFileContent(URL.createObjectURL(file));
        }
        // For other file types, we'll show metadata
        else {
          setFileContent(null);
        }
      } catch (err) {
        console.error("Error loading file:", err);
        setError("Không thể tải tệp để xem trước.");
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [file]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return (
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (fileType === "application/pdf") {
      return (
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {file.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[70vh]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Lỗi</h3>
              <p className="mt-1 text-sm text-gray-500">{error}</p>
            </div>
          ) : (
            <div>
              {file.type.startsWith("image/") ? (
                <div className="text-center">
                  <img
                    src={fileContent}
                    alt={file.name}
                    className="max-w-full max-h-[60vh] object-contain mx-auto"
                  />
                </div>
              ) : file.type === "application/pdf" ? (
                <div className="text-center">
                  <iframe
                    src={fileContent}
                    title={file.name}
                    className="w-full h-[60vh]"
                    onError={() => setError("Không thể hiển thị tệp PDF.")}
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {file.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Loại tệp: {file.type}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Kích thước: {formatFileSize(file.size)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Tệp này không thể xem trước trực tiếp. Bạn có thể tải xuống
                    để xem.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end">
          <a
            href={fileContent}
            download={file.name}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Tải xuống
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
