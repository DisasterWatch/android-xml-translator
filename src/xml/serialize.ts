import { StringItem } from "../types/types";

export function serializeToStringsXML(stringItems: Array<StringItem>): string {
    let xmlString = `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n`;

    stringItems.forEach((item) => {
        xmlString += `  <string name="${item.name}">${item.value}</string>\n`;
    });

    xmlString += `</resources>`;
    return xmlString;
}
