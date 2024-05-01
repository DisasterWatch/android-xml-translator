export function downloadFile(
    fileName: string,
    textContent: string,
    type = "text/plain"
): void {
    const blob = new Blob([textContent], { type });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
