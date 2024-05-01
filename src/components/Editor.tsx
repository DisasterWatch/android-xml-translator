import {
    Button,
    Flex,
    Group,
    Modal,
    Text,
    Textarea,
    Title,
} from "@mantine/core";
import { IconFileDownload, IconTrash } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { StringItem } from "../types/types";
import { downloadFile } from "../utils/downloadFile";
import { serializeToStringsXML } from "../xml/serialize";

export default function Editor({
    clearTranslatedData,
    clearUntranslatedData,
    setTranslatedData,
    translatedData,
    untranslatedData,
}: {
    translatedData: Record<string, string>;
    untranslatedData: Record<string, string>;
    setTranslatedData: (value: Record<string, string> | null) => void;
    setUntranslatedData: (value: Record<string, string> | null) => void;
    clearTranslatedData: () => void;
    clearUntranslatedData: () => void;
}) {
    let keys = useMemo(() => Object.keys(untranslatedData), [untranslatedData]);
    let [showDeletionWarning, setShowDeletionWarning] = useState(false);

    const downloadResult = () => {
        let data = Object.entries(translatedData)
            .map<StringItem>(([name, value]) => ({ name, value }))
            .filter((item) => !!item.value);

        downloadFile(
            "strings-translated.xml",
            serializeToStringsXML(data),
            "text/xml"
        );
    };

    return (
        <Flex
            direction="column"
            gap="md"
            style={{ width: "100%", padding: "1em 0" }}
        >
            {keys.map((key) => (
                <Flex key={key} direction="column" style={{ width: "100%" }}>
                    <Text>{untranslatedData[key]}</Text>
                    <Textarea
                        autosize
                        minRows={2}
                        defaultValue={translatedData[key]}
                        onBlur={(e) =>
                            setTranslatedData({
                                ...translatedData,
                                [key]: e.target.value,
                            })
                        }
                    />
                </Flex>
            ))}
            <Group mt="sm">
                <Button
                    color="red"
                    leftSection={<IconTrash />}
                    onClick={() => setShowDeletionWarning(true)}
                >
                    Clear and Restart
                </Button>
                <Button
                    color="green"
                    leftSection={<IconFileDownload />}
                    onClick={downloadResult}
                >
                    Download Result
                </Button>
            </Group>
            <Modal
                opened={showDeletionWarning}
                onClose={() => setShowDeletionWarning(false)}
                title={<Title order={3}>Are you sure?</Title>}
                centered
            >
                <Text>This will delete all your progress</Text>
                <Group mt="lg" align="flex-end" style={{ width: "100%" }}>
                    <Button onClick={() => setShowDeletionWarning(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={() => {
                            clearTranslatedData();
                            clearUntranslatedData();
                        }}
                    >
                        Proceed
                    </Button>
                </Group>
            </Modal>
        </Flex>
    );
}
