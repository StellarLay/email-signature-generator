const copyWithExecCommand = (text, html) => {
  const activeElement = document.activeElement;
  const selection = window.getSelection();
  const savedRanges = selection
    ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange())
    : [];
  const copyTarget = document.createElement(html ? "div" : "textarea");

  copyTarget.setAttribute("aria-hidden", "true");
  copyTarget.style.position = "fixed";
  copyTarget.style.left = "-9999px";
  copyTarget.style.top = "0";
  copyTarget.style.opacity = "0";

  if (html) {
    copyTarget.contentEditable = "true";
    copyTarget.innerHTML = html;
  } else {
    copyTarget.value = text;
    copyTarget.setAttribute("readonly", "");
  }

  document.body.appendChild(copyTarget);

  if (html && selection) {
    const range = document.createRange();
    range.selectNodeContents(copyTarget);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    copyTarget.select();
    copyTarget.setSelectionRange(0, copyTarget.value.length);
  }

  let copyEventHandled = false;
  const handleCopy = (event) => {
    if (!event.clipboardData) return;
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
    if (html) event.clipboardData.setData("text/html", html);
    copyEventHandled = true;
  };

  document.addEventListener("copy", handleCopy);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    document.removeEventListener("copy", handleCopy);
    copyTarget.remove();

    if (selection) {
      selection.removeAllRanges();
      savedRanges.forEach((range) => selection.addRange(range));
    }
    if (activeElement instanceof HTMLElement) activeElement.focus({ preventScroll: true });
  }

  return copied && copyEventHandled;
};

export const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the synchronous fallback used by older and restricted browsers.
    }
  }

  if (copyWithExecCommand(text)) return;
  throw new Error("Clipboard API is unavailable");
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
      // Fall through to the synchronous fallback used by older and restricted browsers.
    }
  }

  if (copyWithExecCommand(text, html)) return;
  throw new Error("Rich clipboard API is unavailable");
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
