import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";

const sourcePath = process.argv[2];

if (!sourcePath) {
  throw new Error("Pass the decorative SVG path as the first argument");
}

const outputDirectory = resolve("public/email-assets");
await mkdir(outputDirectory, { recursive: true });

const logoResponse = await fetch("https://lh3.googleusercontent.com/d/1keeR8xgOoTt0EM0WEuTqsNDLfb_LgwuR?authuser=2");
if (!logoResponse.ok) throw new Error("Could not download the Reputation House logo");

await sharp(Buffer.from(await logoResponse.arrayBuffer()))
  .resize({ width: 162 })
  .png()
  .toFile(resolve(outputDirectory, "reputation-house-logo.png"));

const shapeSource = await readFile(sourcePath, "utf8");
const croppedShape = shapeSource.replace(
  /<svg[^>]+>/,
  '<svg width="174" height="206" viewBox="291 27 174 206" fill="none" xmlns="http://www.w3.org/2000/svg">',
);

await writeFile(resolve(outputDirectory, "reputation-house-shape.svg"), croppedShape);
await sharp(Buffer.from(croppedShape), { density: 288 })
  .resize({ width: 348 })
  .png()
  .toFile(resolve(outputDirectory, "reputation-house-shape.png"));

const photoPlaceholder = `
  <svg width="310" height="310" viewBox="0 0 310 310" xmlns="http://www.w3.org/2000/svg">
    <rect width="310" height="310" fill="#F3F5F0"/>
    <text x="155" y="170" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#52604C">Photo</text>
  </svg>
`;

await sharp(Buffer.from(photoPlaceholder))
  .png()
  .toFile(resolve(outputDirectory, "photo-placeholder.png"));

const icons = [
  ["phone", faPhone, "circle"],
  ["envelope", faEnvelope, "circle"],
  ["linkedin", faLinkedinIn, "square"],
  ["instagram", faInstagram, "square"],
  ["youtube", faYoutube, "square"],
];

const renderIcon = (definition, background) => {
  const [width, height, , , path] = definition.icon;
  const scale = Math.min(23 / width, 23 / height);
  const offsetX = (48 - width * scale) / 2;
  const offsetY = (48 - height * scale) / 2;
  const backdrop = background === "circle"
    ? '<circle cx="24" cy="24" r="23" fill="#979797"/>'
    : '<rect x="1" y="1" width="46" height="46" rx="7" fill="#929292"/>';

  return `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${backdrop}<path d="${path}" fill="#fff" transform="translate(${offsetX} ${offsetY}) scale(${scale})"/></svg>`;
};

for (const [name, definition, background] of icons) {
  const svg = renderIcon(definition, background);
  await sharp(Buffer.from(svg), { density: 192 })
    .resize({ width: 96, height: 96 })
    .png()
    .toFile(resolve(outputDirectory, `${name}.png`));
}
