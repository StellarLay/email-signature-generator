import * as clipboard from "clipboard-polyfill";

const copyElementWithExecCommand = (element) => {
  const activeElement = document.activeElement;
  const selection = window.getSelection();
  const savedRanges = selection
    ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange())
    : [];

  if (!selection) return false;

  const range = document.createRange();
  range.selectNode(element);
  selection.removeAllRanges();
  selection.addRange(range);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    selection.removeAllRanges();
    savedRanges.forEach((savedRange) => selection.addRange(savedRange));
    if (activeElement instanceof HTMLElement) activeElement.focus({ preventScroll: true });
  }

  return copied;
};

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

export const copyRichText = async (element, html, text) => {
  // Copying the rendered table itself produces the same browser-native rich
  // clipboard fragment as a manual selection + Cmd/Ctrl+C. Gmail handles that
  // payload more reliably than HTML written only through the Clipboard API.
  if (copyElementWithExecCommand(element)) return;

  if (navigator.clipboard?.write && window.ClipboardItem) {
    try {
      const item = new window.ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      });
      await navigator.clipboard.write([item]);
      return;
    } catch {
      // Try the ponyfill below.
    }
  }

  try {
    clipboard.suppressWarnings();
    const clipboardData = new clipboard.DT();
    clipboardData.setData("text/html", html);
    clipboardData.setData("text/plain", text);
    await clipboard.write(clipboardData);
    return;
  } catch {
    // Fall through to the final synchronous fallback.
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
