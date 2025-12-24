"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Redo,
    Undo,
    Heading1,
    Heading2,
    AlignLeft,
    AlignRight,
} from 'lucide-react'

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] p-4',
            },
        },
    })

    if (!editor) {
        return null
    }

    const MenuButton = ({
        onClick,
        isActive = false,
        children
    }: {
        onClick: () => void,
        isActive?: boolean,
        children: React.ReactNode
    }) => (
        <button
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-200 text-gsg-teal' : 'text-gray-600'
                }`}
        >
            {children}
        </button>
    )

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-gsg-teal/20 focus-within:border-gsg-teal transition-all bg-white">
            <div className="flex flex-wrap items-center gap-1 p-1 border-b border-gray-100 bg-gray-50/50">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                >
                    <Bold className="w-4 h-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                >
                    <Italic className="w-4 h-4" />
                </MenuButton>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                >
                    <Heading1 className="w-4 h-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                >
                    <Heading2 className="w-4 h-4" />
                </MenuButton>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                >
                    <List className="w-4 h-4" />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                >
                    <ListOrdered className="w-4 h-4" />
                </MenuButton>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                >
                    <Quote className="w-4 h-4" />
                </MenuButton>
                <div className="flex-1" />
                <MenuButton onClick={() => editor.chain().focus().undo().run()}>
                    <Undo className="w-4 h-4" />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().redo().run()}>
                    <Redo className="w-4 h-4" />
                </MenuButton>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}
