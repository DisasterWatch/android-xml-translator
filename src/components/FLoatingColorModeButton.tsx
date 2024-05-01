import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useColorMode } from "../context/ColorMode";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function FLoatingColorModeButton() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Affix
            position={{ bottom: 20, right: 20 }}
            display="flex"
            style={{
                flexDirection: "column-reverse",
            }}
        >
            <ActionIcon
                size={45}
                variant="default"
                style={{ borderRadius: "50%" }}
                onClick={() => toggleColorMode()}
            >
                <Transition transition="slide-up" mounted>
                    {(transitionStyles) => (
                        <span style={transitionStyles}>
                            {colorMode === "dark" ? <IconSun /> : <IconMoon />}
                        </span>
                    )}
                </Transition>
            </ActionIcon>
        </Affix>
    );
}
