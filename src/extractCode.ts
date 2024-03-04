export function extractCode(str: string): string | null {
  const lines = str.split("\n");
  let startLineIndex = -1;

  for (let idx = 0; idx < lines.length; idx++) {
    if (lines[idx]?.startsWith("```")) {
      if (startLineIndex === -1) {
        // Found the start of code block
        startLineIndex = idx;
      } else {
        // Found the end of code block, return the extracted code
        return lines.slice(startLineIndex, idx + 1).join("\n");
      }
    }
  }

  // If no code block is found, return null
  return null;
}
