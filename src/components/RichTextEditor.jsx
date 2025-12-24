import React, { useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { debounce } from "lodash";

export default function RichTextEditor({ content, setContent }) {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
  });

  // Cập nhật content với debounce để tránh re-render mỗi ký tự
  useEffect(() => {
    if (!editor) return;
    const updateContent = debounce(() => {
      const html = editor.getHTML();
      if (html !== content) setContent(html);
    }, 200); // 200ms delay

    editor.on("update", updateContent);
    return () => editor.off("update", updateContent);
  }, [editor, content, setContent]);

  if (!editor) return null;

  const btnClass = useCallback(
    (active) =>
      `p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150 ${
        active ? "bg-gray-200 dark:bg-gray-700" : "text-gray-600 dark:text-gray-300"
      }`,
    []
  );

  const setLink = () => {
    const url = prompt("Nhập URL link:");
    if (!url) return;

    if (editor.state.selection.empty) {
      alert("Vui lòng chọn một đoạn văn bản để thêm link.");
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
useEffect(() => {
  if (!editor) return;

  if (content && content !== editor.getHTML()) {
    editor.commands.setContent(content, false); // 🔥 quan trọng
  }
}, [content]);


  return (
    <div className="flex flex-col w-full">
      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
        Nội dung bài viết
      </p>

      <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary dark:focus-within:border-primary transition-all">
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-background-light dark:bg-gray-900/50">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btnClass(editor.isActive("bold"))}
          >
            <span className="material-symbols-outlined text-xl">format_bold</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btnClass(editor.isActive("italic"))}
          >
            <span className="material-symbols-outlined text-xl">format_italic</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={btnClass(editor.isActive("underline"))}
          >
            <span className="material-symbols-outlined text-xl">format_underlined</span>
          </button>

          <div className="w-px h-6 bg-gray-300 dark:border-gray-700 mx-1"></div>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={btnClass(editor.isActive("bulletList"))}
          >
            <span className="material-symbols-outlined text-xl">format_list_bulleted</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={btnClass(editor.isActive("orderedList"))}
          >
            <span className="material-symbols-outlined text-xl">format_list_numbered</span>
          </button>

          <div className="w-px h-6 bg-gray-300 dark:border-gray-700 mx-1"></div>

          {/* Link */}
          <button
            type="button"
            onClick={setLink}
            className={btnClass(editor.isActive("link"))}
          >
            <span className="material-symbols-outlined text-xl">link</span>
          </button>
        </div>

        {/* Editor */}
            <EditorContent
            editor={editor}
            className="w-full min-h-[15rem] p-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800
                        focus:outline-none
                        [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1"
            placeholder="Viết nội dung của bạn ở đây..."
            />

      </div>
    </div>
  );
}
