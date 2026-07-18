import * as clipboard from "clipboard-polyfill";

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
      // Try the legacy ponyfill below.
    }
  }

  try {
    await clipboard.writeText(text);
    return;
  } catch {
    // Fall through to the final synchronous fallback.
  }

  if (copyWithExecCommand(text)) return;
  throw new Error("Clipboard API is unavailable");
};

export const copyRichText = async (html, text) => {
  try {
    clipboard.suppressWarnings();
    const clipboardData = new clipboard.DT();
    clipboardData.setData("text/html", html);
    await clipboard.write(clipboardData);
    return;
  } catch {
    // Try the modern Clipboard API below.
  }

  if (navigator.clipboard?.write && window.ClipboardItem) {
    try {
      const item = new window.ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
      });
      await navigator.clipboard.write([item]);
      return;
    } catch {
      // Fall through to the final synchronous fallback with a plain-text variant.
    }
  }

  if (copyWithExecCommand(text, html)) return;
  throw new Error("Rich clipboard API is unavailable");
};

const compactInlineStyles = (html) => html.replace(
  /style="([^"]*)"/g,
  (_match, styles) => `style="${styles
    .replace(/\s*:\s*/g, ":")
    .replace(/;\s*/g, ";")
    .replace(/;$/, "")}"`,
);

export const createEmailHtml = (element) => compactInlineStyles(
  element.cloneNode(true).outerHTML,
);
