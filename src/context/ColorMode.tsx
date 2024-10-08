import { useLocalStorage } from "@mantine/hooks";
import { createContext, useContext, ReactNode } from "react";

type ColorModeContextType = {
    colorMode: "dark" | "light";
    toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(
    undefined
);

export function ColorModeProvider({ children }: { children: ReactNode }) {
    const [colorMode, setColorMode] = useLocalStorage<"dark" | "light">({
        key: "colorMode",
        defaultValue: "dark",
    });

    const toggleColorMode = () => {
        setColorMode((prevScheme) =>
            prevScheme === "light" ? "dark" : "light"
        );
    };

    const contextValue: ColorModeContextType = {
        colorMode,
        toggleColorMode,
    };

    return (
        <ColorModeContext.Provider value={contextValue}>
            {children}
        </ColorModeContext.Provider>
    );
}

export const useColorMode = (): ColorModeContextType => {
    const context = useContext(ColorModeContext);
    if (!context) {
        throw new Error("useColorMode must be used within a ColorModeProvider");
    }
    return context;
};
