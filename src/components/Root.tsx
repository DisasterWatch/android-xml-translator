import { Container } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import FilePicker from "./FilePicker";
import Editor from "./Editor";
import { FLoatingColorModeButton } from "./FLoatingColorModeButton";

export default function Root() {
    let [untranslatedData, setUntranslatedData, clearUntranslatedData] =
        useLocalStorage<Record<string, string> | null>({
            key: "untranslatedData",
            defaultValue: null,
            serialize: JSON.stringify,
            deserialize: (localStorageValue) => {
                if (!localStorageValue) {
                    return null;
                }
                return JSON.parse(localStorageValue);
            },
        });

    let [translatedData, setTranslatedData, clearTranslatedData] =
        useLocalStorage<Record<string, string> | null>({
            key: "translatedData",
            defaultValue: null,
            serialize: JSON.stringify,
            deserialize: (localStorageValue) => {
                if (!localStorageValue) {
                    return null;
                }
                return JSON.parse(localStorageValue);
            },
        });

    return (
        <Container>
            {!untranslatedData || !translatedData ? (
                <FilePicker
                    onFileSelected={(strings) => {
                        let result: Record<string, string> = {};
                        for (let str of strings) {
                            result[str.name] = str.value;
                        }
                        setUntranslatedData(result);

                        let empty: Record<string, string> = {};
                        for (let str of strings) {
                            empty[str.name] = "";
                        }
                        setTranslatedData(empty);
                    }}
                />
            ) : (
                <Editor
                    clearTranslatedData={clearTranslatedData}
                    clearUntranslatedData={clearUntranslatedData}
                    setTranslatedData={setTranslatedData}
                    setUntranslatedData={setUntranslatedData}
                    translatedData={translatedData}
                    untranslatedData={untranslatedData}
                />
            )}
            <FLoatingColorModeButton />
        </Container>
    );
}
