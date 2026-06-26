import OgImage, { alt as ogAlt, contentType as ogContentType, size as ogSize } from "./opengraph-image";

// Pre-render once at build time so the image ships as a static asset (output: export).
export const dynamic = "force-static";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default OgImage;
