'use client';
import React, { forwardRef, useEffect, useRef } from 'react';
import Quill from 'quill';
import { en } from '@src/constants/lang/en';
import EditorToolbar from './EditorToolbar';

interface QuillEditorProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  value: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  isUpdating: boolean;
  isAdd: boolean;
}

type QuillEditorRefType = Quill | null;

const QuillEditor = forwardRef<QuillEditorRefType, QuillEditorProps>(
  (
    {
      isEditing,
      value,
      setValue,
      setIsEditing,
      isUpdating,
      isAdd,
      placeholder = en.common.addContentPlaceholder,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const quillInstanceRef = useRef<Quill | null>(null);

    useEffect(() => {
      if (!containerRef.current || quillInstanceRef.current) return; // Prevent reinitialization

      const quill = new Quill(containerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: 'toolbar',
          clipboard: { matchVisual: false },
        },
        readOnly: !isEditing,
        placeholder,
      });

      quillInstanceRef.current = quill;
      quill.root.innerHTML = value;

      quill.on('text-change', () => {
        if (setValue) setValue(quill.root.innerHTML);
      });

      return () => {
        quill.off('text-change');
        quillInstanceRef.current = null;
      };
    }, [ref]);

    useEffect(() => {
      if (quillInstanceRef.current) {
        const quill = quillInstanceRef.current;
        if (quill.root.innerHTML !== value) {
          quill.root.innerHTML = value;
        }
      }
    }, [value]);

    useEffect(() => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current.enable(isEditing);
      }
    }, [isEditing]);

    return (
      <div className="quillHeader flex flex-col h-full">
        <EditorToolbar
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isUpdating={isUpdating}
          isAdd={isAdd}
        />

        <div ref={containerRef}></div>
      </div>
    );
  },
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
