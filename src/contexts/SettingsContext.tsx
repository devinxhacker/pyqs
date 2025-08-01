"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useEffect,
} from "react"

type CursorStyle = "default" | "ghost"

interface SettingsContextType {
    cursorStyle: CursorStyle
    setCursorStyle: (style: CursorStyle) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
    undefined
)

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [cursorStyle, setCursorStyleState] = useState<CursorStyle>("ghost")
    const [isInitialized, setIsInitialized] = useState(false)

    // Load cursor style from localStorage on component mount
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const savedCursorStyle = localStorage.getItem(
                    "cursor-style"
                ) as CursorStyle
                if (
                    savedCursorStyle &&
                    (savedCursorStyle === "default" ||
                        savedCursorStyle === "ghost")
                ) {
                    setCursorStyleState(savedCursorStyle)
                }
            }
        } catch (error) {
            console.warn(
                "Failed to load cursor style from localStorage:",
                error
            )
        }
        setIsInitialized(true)
    }, [])

    // Save cursor style to localStorage whenever it changes
    const setCursorStyle = (style: CursorStyle) => {
        setCursorStyleState(style)
        try {
            if (typeof window !== "undefined") {
                localStorage.setItem("cursor-style", style)
            }
        } catch (error) {
            console.warn("Failed to save cursor style to localStorage:", error)
        }
    }

    const value = useMemo(
        () => ({
            cursorStyle,
            setCursorStyle,
        }),
        [cursorStyle]
    )

    // Don't render until we've loaded the saved preferences
    if (!isInitialized) {
        return null
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const context = useContext(SettingsContext)
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider")
    }
    return context
}
