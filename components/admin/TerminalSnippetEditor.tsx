"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Code, Terminal, Zap, Eye, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface TerminalSnippet {
    fn: string
    command: string
    vision: string
    tech: string
    impact: string
}

interface TerminalSnippetEditorProps {
    value?: string
    onChange: (value: string) => void
    dir?: "ltr" | "rtl"
}

export function TerminalSnippetEditor({ value, onChange, dir = "ltr" }: TerminalSnippetEditorProps) {
    const [snippets, setSnippets] = useState<TerminalSnippet[]>([])

    // Parse initial value
    useEffect(() => {
        try {
            if (value) {
                const parsed = JSON.parse(value)
                if (Array.isArray(parsed)) {
                    setSnippets(parsed)
                }
            } else {
                setSnippets([])
            }
        } catch (e) {
            console.error("Failed to parse snippets JSON", e)
            setSnippets([])
        }
    }, []) // Only run on mount to avoid loops, parent manages persistence

    const updateSnippet = (index: number, field: keyof TerminalSnippet, newValue: string) => {
        const newSnippets = [...snippets]

        // Handle special formatting for 'tech' field (comma separated -> stringified array)
        if (field === "tech") {
            // We'll store it as is in the simplified state for now, 
            // but we need to match the expected "['A', 'B']" format for the actual output.
            // Wait, the interface says `tech` is string. 
            // If we want to simple input "A, B", we should process it before saving.
            // But for the input field itself, we want to show "A, B".
            // Let's handle this conversion in the render and onChange logic more carefully.
            // Actually, to avoid complexity, let's just update the snippet object directly
            // and perform the "comma -> format" conversion only when calling parent onChange.
        }

        newSnippets[index] = { ...newSnippets[index], [field]: newValue }
        setSnippets(newSnippets)
        triggerChange(newSnippets)
    }

    // Helper to format tech stack for display (JSON string array -> Comma separated)
    const formatTechDisplay = (techString: string) => {
        try {
            // Check if it looks like a JSON array
            if (techString.trim().startsWith("[") && techString.trim().endsWith("]")) {
                const arr = JSON.parse(techString)
                if (Array.isArray(arr)) return arr.join(", ")
            }
            return techString // Fallback or already simple string
        } catch {
            return techString
        }
    }

    // Helper to format tech stack for storage (Comma separated -> JSON string array)
    const formatTechStorage = (input: string) => {
        const arr = input.split(",").map(s => s.trim()).filter(Boolean)
        return JSON.stringify(arr) // Returns '["A","B"]'
    }

    const addSnippet = () => {
        const newSnippets = [
            ...snippets,
            {
                fn: "myFunction",
                command: "node script.js",
                vision: '"Vision"',
                tech: '["React", "Node"]',
                impact: "High",
            },
        ]
        setSnippets(newSnippets)
        triggerChange(newSnippets)
    }

    const removeSnippet = (index: number) => {
        const newSnippets = snippets.filter((_, i) => i !== index)
        setSnippets(newSnippets)
        triggerChange(newSnippets)
    }

    const triggerChange = (newSnippets: TerminalSnippet[]) => {
        onChange(JSON.stringify(newSnippets))
    }

    return (
        <div className="space-y-4" dir="ltr"> {/* Always LTR for code editing */}
            {snippets.map((snippet, index) => (
                <Card key={index} className="relative overflow-hidden border-l-4 border-l-primary">
                    <CardContent className="pt-6 grid gap-4">
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive/90"
                                onClick={() => removeSnippet(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Function Name */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                    <Code className="h-3 w-3" /> Function Name
                                </Label>
                                <Input
                                    value={snippet.fn}
                                    onChange={(e) => updateSnippet(index, "fn", e.target.value)}
                                    placeholder="e.g. buildFuture"
                                    className="font-mono text-sm"
                                />
                            </div>

                            {/* Command */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                    <Terminal className="h-3 w-3" /> Command
                                </Label>
                                <Input
                                    value={snippet.command}
                                    onChange={(e) => updateSnippet(index, "command", e.target.value)}
                                    placeholder="e.g. node build.js"
                                    className="font-mono text-sm"
                                />
                            </div>

                            {/* Vision */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                    <Eye className="h-3 w-3" /> Vision (with quotes)
                                </Label>
                                <Input
                                    value={snippet.vision}
                                    onChange={(e) => updateSnippet(index, "vision", e.target.value)}
                                    placeholder='e.g. "Palestine"'
                                    className="font-mono text-sm"
                                />
                            </div>

                            {/* Tech Stack */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                    <Zap className="h-3 w-3" /> Tech Stack (comma separated)
                                </Label>
                                <Input
                                    value={formatTechDisplay(snippet.tech)}
                                    onChange={(e) => updateSnippet(index, "tech", e.target.value)}
                                    onBlur={(e) => updateSnippet(index, "tech", formatTechStorage(e.target.value))}
                                    placeholder="e.g. AI, React, Cloud"
                                    className="font-mono text-sm"
                                />
                            </div>

                            {/* Impact */}
                            <div className="space-y-2 md:col-span-2">
                                <Label className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                    <Globe className="h-3 w-3" /> Impact
                                </Label>
                                <Input
                                    value={snippet.impact}
                                    onChange={(e) => updateSnippet(index, "impact", e.target.value)}
                                    placeholder="e.g. Global"
                                    className="font-mono text-sm"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addSnippet}
                className="w-full border-dashed"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Terminal Script
            </Button>

            {snippets.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">
                    No scripts added. The default animation will be used.
                </p>
            )}
        </div>
    )
}
