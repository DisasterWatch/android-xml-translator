import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Root from "./components/Root";
import { ColorModeProvider, useColorMode } from "./context/ColorMode";

export function AppWithColorModeProvider() {
    return (
        <ColorModeProvider>
            <App />
        </ColorModeProvider>
    );
}

function App() {
    let { colorMode } = useColorMode();

    return (
        <>
            <MantineProvider forceColorScheme={colorMode}>
                <Root />
            </MantineProvider>
        </>
    );
}
