const copyWithExecCommand = (text, html) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const handleCopy = (event) => {
    if (!html) return;
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
    event.clipboardData.setData("text/html", html);
  };

  document.addEventListener("copy", handleCopy, { once: true });
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) throw new Error("Copy command was rejected");
};

export const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back when clipboard permissions are denied after async image work.
    }
  }

  copyWithExecCommand(text);
};

export const copyRichText = async (html, text) => {
  if (navigator.clipboard?.write && window.ClipboardItem) {
    try {
      const item = new window.ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      });
      await navigator.clipboard.write([item]);
      return;
    } catch {
      // Some browsers reject rich clipboard items containing embedded images.
    }
  }

  copyWithExecCommand(text, html);
};

const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => resolve(reader.result), { once: true });
  reader.addEventListener("error", () => reject(reader.error), { once: true });
  reader.readAsDataURL(blob);
});

export const createPortableHtml = async (element) => {
  const clone = element.cloneNode(true);
  const sourceImages = [...element.querySelectorAll("img")];
  const clonedImages = [...clone.querySelectorAll("img")];

  await Promise.all(sourceImages.map(async (image, index) => {
    try {
      const source = new URL(image.currentSrc || image.src);
      if (source.protocol === "data:") return;

      const isLocalAsset = source.origin === window.location.origin;
      const response = await fetch(source, {
        signal: AbortSignal.timeout(isLocalAsset ? 5000 : 3000),
      });
      if (!response.ok) return;

      const dataUrl = await blobToDataUrl(await response.blob());
      clonedImages[index].setAttribute("src", dataUrl);
    } catch {
      // Keep the original public URL when a custom photo server blocks CORS.
    }
  }));

  return clone.outerHTML;
};
