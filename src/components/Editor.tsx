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
  let [missingTranslationsWarning, setMissingTranslationsWarning] =
    useState(false);
  let [missingTranslationsModal, setMissingTranslationsModal] = useState(false);

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
          <Textarea
            id={"textarea-" + key}
            error={
              missingTranslationsWarning &&
              translatedData[key].trim() == "" &&
              "You haven't translated this yet"
            }
            label={<Text>{untranslatedData[key]}</Text>}
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
      <Group mt="sm" justify="space-evenly">
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
          onClick={() => {
            const untranslatedElement = keys.find(
              (key) => translatedData[key]?.trim().toString() == ""
            );
            if (!!untranslatedElement) {
              setMissingTranslationsModal(true);
              setMissingTranslationsWarning(true);
              document
                .getElementById("textarea-" + untranslatedElement)
                ?.scrollIntoView({
                  block: "center",
                  behavior: "instant",
                });
            } else {
              downloadResult();
            }
          }}
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
        <Group mt="lg" justify="flex-end" style={{ width: "100%" }}>
          <Button onClick={() => setShowDeletionWarning(false)}>Cancel</Button>
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
      <Modal
        opened={missingTranslationsModal}
        onClose={() => setMissingTranslationsModal(false)}
        title={<Title order={3}>Some missing translations</Title>}
        centered
      >
        <Text>You have some texts which you have not translated yet</Text>
        <Group mt="lg" justify="flex-end" style={{ width: "100%" }}>
          <Button
            variant="subtle"
            onClick={() => {
              setMissingTranslationsModal(false);
              downloadResult();
            }}
          >
            Download Anyway
          </Button>
          <Button onClick={() => setMissingTranslationsModal(false)}>
            Continue Translating
          </Button>
        </Group>
      </Modal>
    </Flex>
  );
}
