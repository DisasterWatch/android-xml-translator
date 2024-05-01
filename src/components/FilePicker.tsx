import { Alert, FileInput, Flex, Title } from "@mantine/core";
import { useState } from "react";
import { StringItem } from "../types/types";
import { parseStringsXMLFile } from "../xml/parse";
import { IconInfoCircle } from "@tabler/icons-react";

export default function FilePicker({
    onFileSelected,
}: {
    onFileSelected: (result: StringItem[]) => void;
}) {
    const [error, setError] = useState<Error | null>(null);

    return (
        <Flex
            direction="column"
            style={{ minHeight: "100vh" }}
            justify="center"
            align="center"
            gap="xl"
        >
            <Title>Select a file to translate</Title>
            <FileInput
                style={{ minWidth: "300px" }}
                accept="text/xml"
                onChange={async (file) => {
                    if (file && file instanceof File) {
                        let text = await file.text();
                        let result = parseStringsXMLFile(text);
                        if (result instanceof Error) {
                            setError(result);
                        } else {
                            setError(null);
                            onFileSelected(result);
                        }
                    }
                }}
            />
            {error ? (
                <Alert
                    variant="light"
                    color="red"
                    title="An error occured"
                    icon={<IconInfoCircle />}
                >
                    {error.message}
                </Alert>
            ) : null}
        </Flex>
    );
}
