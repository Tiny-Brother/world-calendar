'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

import type { Block } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

type EditorProps = {
  onChange: (content: Block<any, any, any>[]) => void;
};

export function Editor({ onChange }: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'paragraph',
        content: 'Welcome to this demo!',
      },
      {
        type: 'heading',
        content: 'This is a heading block',
      },
      {
        type: 'paragraph',
        content: 'This is a paragraph block',
      },
      {
        type: 'paragraph',
      },
    ],
  });

  return (
    <BlockNoteView
      editor={editor}
      theme="light"
      onChange={() => {
        onChange(editor.document);
      }}
    />
  );
}
