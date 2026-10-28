/** Saves text as a file through a temporary object URL. */
export function downloadText(filename: string, text: string, type = "text/csv") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export const fileSafe = (s: string) => s.replace(/[^\w-]+/g, "_");
