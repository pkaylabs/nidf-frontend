export function isImageFileByExtension(file: any): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const fileName = file?.toLowerCase();
  return imageExtensions.some((extension) => fileName?.endsWith(extension));
}
