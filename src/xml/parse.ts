import { StringItem } from "../types/types";

export function parseStringsXMLFile(
    xmlFile: string
): Array<StringItem> | Error {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlFile, "text/xml");

    const resourcesNode = xmlDoc.getElementsByTagName("resources")[0];
    if (!resourcesNode) {
        return new Error("XML data is missing the 'resources' tag.");
    }

    const stringNodes = resourcesNode.getElementsByTagName("string");
    const stringItems: StringItem[] = [];

    for (let i = 0; i < stringNodes.length; i++) {
        const stringNode = stringNodes[i];
        const nameAttr = stringNode.getAttribute("name");
        const value = stringNode.textContent?.trim();
        const translatable = stringNode.getAttribute("translatable");

        if (translatable?.toString() === "false") {
            continue;
        }

        if (!nameAttr) {
            return new Error(
                `String tag at index ${i} is missing the 'name' attribute.`
            );
        }
        if (value === null || value === undefined || value === "") {
            return new Error(
                `String tag with name '${nameAttr}' has no value.`
            );
        }

        stringItems.push({ name: nameAttr, value: value });
    }

    return stringItems;
}
