"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { usePapers } from "@/contexts/PaperContext"
import { motion } from "framer-motion"
import {
    groupSubjectsByLetter,
    getAvailableLetters,
} from "@/utils/subjectSearch"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

// Global state for communication between components
interface GlobalAlphabetRefs {
    current: Record<string, HTMLDivElement | null>
}

// Store refs globally for access between components
let globalSectionRefs: GlobalAlphabetRefs = {
    current: {},
}

// The component that displays just the A-Z bar
export const AlphabetBar = () => {
    const { meta } = usePapers()
    const [availableLetters, setAvailableLetters] = useState<Set<string>>(
        new Set()
    )
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [hoverLetter, setHoverLetter] = useState<string | null>(null)

    // Determine which letters have subjects
    useEffect(() => {
        if (meta?.standardSubjects?.length) {
            setAvailableLetters(getAvailableLetters(meta.standardSubjects))
        }
    }, [meta?.standardSubjects])

    const scrollToSection = (letter: string) => {
        if (globalSectionRefs.current[letter]) {
            globalSectionRefs.current[letter]?.scrollIntoView({
                behavior: "smooth",
            })
            setActiveSection(letter)
        }
    }

    return (
        <div className="w-full mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {ALPHABET.map((letter) => (
                    <button
                        key={letter}
                        onClick={() =>
                            availableLetters.has(letter) &&
                            scrollToSection(letter)
                        }
                        onMouseEnter={() => setHoverLetter(letter)}
                        onMouseLeave={() => setHoverLetter(null)}
                        className={`
              flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-out
              h-10 w-10 text-base
              sm:h-11 sm:w-11 sm:text-lg
              md:h-11 md:w-11 md:text-lg
              lg:h-11 lg:w-11 lg:text-lg
              ${
                  availableLetters.has(letter)
                      ? activeSection === letter
                          ? "bg-brand text-white shadow-md ring-2 ring-brand/50"
                          : hoverLetter === letter
                          ? "bg-brand/10 text-brand border border-brand/20 shadow-sm"
                          : "bg-secondary text-content/80 hover:bg-brand/10 hover:text-brand"
                      : "cursor-default opacity-40 bg-secondary/80"
              }
            `}
                        disabled={!availableLetters.has(letter)}
                        aria-label={`Jump to subjects starting with letter ${letter}`}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    )
}

// Main component with subject listing
const SubjectAlphabetList = () => {
    const { meta } = usePapers()
    const router = useRouter()
    const [subjectsByLetter, setSubjectsByLetter] = useState<
        Record<string, string[]>
    >({})
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

    // Group subjects by their first letter
    useEffect(() => {
        if (meta?.standardSubjects?.length) {
            setSubjectsByLetter(groupSubjectsByLetter(meta.standardSubjects))
        }
    }, [meta?.standardSubjects])

    // Connect local refs to the global refs
    useEffect(() => {
        globalSectionRefs = {
            current: sectionRefs.current,
        }
    }, [])

    // Handle subject selection
    const handleSubjectClick = (subject: string) => {
        router.push(`/papers?subject=${encodeURIComponent(subject)}`)
    }

    // Ref callback for setting the section refs
    const setSectionRef = (letter: string) => (el: HTMLDivElement | null) => {
        sectionRefs.current[letter] = el
    }

    return (
        <div className="w-full mx-auto">
            {/* Subject Sections */}
            <div className="space-y-16">
                {ALPHABET.map((letter) => {
                    if (!subjectsByLetter[letter]?.length) return null

                    return (
                        <motion.div
                            key={letter}
                            ref={setSectionRef(letter)}
                            className="scroll-mt-32"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center mb-6">
                                <h2 className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-lg bg-brand text-xl sm:text-2xl font-bold text-white shadow-md">
                                    {letter}
                                </h2>
                                <div className="h-px flex-1 bg-accent/50 ml-4"></div>
                            </div>

                            <div className="grid gap-x-6 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {subjectsByLetter[letter]?.map(
                                    (subject, index) => (
                                        <motion.div
                                            key={subject}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.03,
                                            }}
                                            className="group"
                                        >
                                            <div className="inline-block relative w-full">
                                                <button
                                                    onClick={() =>
                                                        handleSubjectClick(
                                                            subject
                                                        )
                                                    }
                                                    className="text-left py-2.5 px-2.5 text-content transition-colors duration-200 w-full text-base sm:text-lg font-medium group-hover:text-brand"
                                                >
                                                    {subject}
                                                </button>
                                                {/* Animated underline limited to text width */}
                                                <div className="absolute bottom-0 left-0 w-full h-[1.5px] overflow-hidden">
                                                    <div className="w-full h-full bg-brand transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default SubjectAlphabetList
