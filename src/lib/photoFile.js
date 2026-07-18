const OUTPUT_SIZE = 155;
const MAX_SOURCE_CANVAS_SIZE = 1024;
const JPEG_QUALITIES = [0.88, 0.82, 0.76, 0.7, 0.64, 0.58];
const TARGET_DATA_URL_LENGTH = 3400;
let imageResizerPromise;

const getImageResizer = () => {
  imageResizerPromise ??= import("pica").then(({ default: createPica }) => createPica());
  return imageResizerPromise;
};

const loadImage = (file) => new Promise((resolve, reject) => {
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();

  image.addEventListener("load", () => {
    URL.revokeObjectURL(objectUrl);
    resolve(image);
  }, { once: true });
  image.addEventListener("error", () => {
    URL.revokeObjectURL(objectUrl);
    reject(new Error("Could not decode the image"));
  }, { once: true });
  image.src = objectUrl;
});

const createSquareSource = (image) => {
  const sourceCanvas = document.createElement("canvas");
  const context = sourceCanvas.getContext("2d");

  if (!context) throw new Error("Canvas is unavailable");

  const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
  const sourceX = (image.naturalWidth - sourceSize) / 2;
  const sourceY = (image.naturalHeight - sourceSize) / 2;
  const canvasSize = Math.min(sourceSize, MAX_SOURCE_CANVAS_SIZE);

  sourceCanvas.width = canvasSize;
  sourceCanvas.height = canvasSize;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvasSize, canvasSize);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceSize,
    sourceSize,
    0,
    0,
    canvasSize,
    canvasSize,
  );

  return sourceCanvas;
};

export const optimizePhotoFile = async (file) => {
  const image = await loadImage(file);

  if (!image.naturalWidth || !image.naturalHeight) {
    throw new Error("The image has invalid dimensions");
  }

  const sourceCanvas = createSquareSource(image);
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = OUTPUT_SIZE;
  outputCanvas.height = OUTPUT_SIZE;

  const imageResizer = await getImageResizer();
  await imageResizer.resize(sourceCanvas, outputCanvas, {
    filter: "mks2013",
  });

  let smallestDataUrl = "";

  for (const quality of JPEG_QUALITIES) {
    const dataUrl = outputCanvas.toDataURL("image/jpeg", quality);
    smallestDataUrl = dataUrl;

    if (dataUrl.length <= TARGET_DATA_URL_LENGTH) {
      return {
        dataUrl,
        outputSize: OUTPUT_SIZE,
      };
    }
  }

  return {
    dataUrl: smallestDataUrl,
    outputSize: OUTPUT_SIZE,
  };
};
