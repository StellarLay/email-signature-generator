const GOOGLE_DRIVE_HOSTS = new Set([
  "drive.google.com",
  "docs.google.com",
]);

export const getGoogleDriveFileId = (value) => {
  if (!value) return "";

  try {
    const url = new URL(value.trim());
    if (!GOOGLE_DRIVE_HOSTS.has(url.hostname)) return "";

    const pathMatch = url.pathname.match(/\/d\/([^/]+)/);
    return pathMatch?.[1] || url.searchParams.get("id") || "";
  } catch {
    return "";
  }
};

export const normalizePhotoUrl = (value) => {
  const trimmedValue = value.trim();
  const googleDriveFileId = getGoogleDriveFileId(trimmedValue);

  if (!googleDriveFileId) return trimmedValue;
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(googleDriveFileId)}`;
};
