import Papa from "papaparse";

type DownloadOptions = {
  data?: any;
  url?: string;
  fileName: string;
  isJSON?: boolean;
  isAsync?: boolean;
  fileType?: string;
  fetchCallback?: () => Promise<{ data: Blob }>; // Callback for refetching file data (e.g., for PPT downloads)
};

const convertToCSV = (data: any) =>
  Papa.unparse(data, {
    quotes: true,
    quoteChar: '"',
    escapeChar: '"',
  });

export const getUserDetails = () => {
  const user = sessionStorage.getItem("UserDetails");
  return user ? JSON.parse(user) : null;
};

export const downloadFile = async (options: DownloadOptions) => {
  const {
    data,
    url,
    fileName,
    isJSON = false,
    isAsync = false,
    fileType,
    fetchCallback,
  } = options;

  try {
    let blob: Blob;
    if (isAsync && url) {
      const response = await fetch(url);
      blob = await response.blob();
    } else if (fetchCallback) {
      const response = await fetchCallback();
      blob = response.data;
    } else if (data) {
      const payload = isJSON ? JSON.stringify(data) : convertToCSV(data);
      const type =
        fileType ||
        `${isJSON ? "application/json" : "text/csv"};charset=utf-8;`;
      blob = new Blob([payload], { type });
    } else {
      throw new Error(
        "Invalid download parameters. Provide data, url, or fetchCallback."
      );
    }

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
