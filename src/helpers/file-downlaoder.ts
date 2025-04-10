import toast from "react-hot-toast";

export function downloadFileFromURL(url: string, filename?: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || url.split("/").pop() || "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadFile(
  url: string,
  filename: string
): Promise<void> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      toast(
        JSON.stringify({
          type: "error",
          title: `Failed to download ${filename}: ${response.statusText}`,
        })
      );
      throw new Error(`Failed to download ${filename}: ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download error:", error);
    toast(
      JSON.stringify({
        type: "error",
        title: `Failed to download ${filename}: ${error}`,
      })
    );
  }
}
