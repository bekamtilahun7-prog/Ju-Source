"use client";

import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

type UploadFieldProps = {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  onRemove: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  error?: string;
};

export default function UploadField({
  file,
  onFileSelect,
  onRemove,
  inputRef,
  error,
}: UploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const localInputRef = useRef<HTMLInputElement | null>(null);
  const resolvedRef = inputRef ?? { current: localInputRef.current };

  const triggerFilePicker = () => {
    const target = inputRef?.current ?? localInputRef.current;
    if (target) {
      target.click();
    }
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;
    onFileSelect(selectedFile);
  };

  return (
    <div>
      <input
        ref={resolvedRef as React.RefObject<HTMLInputElement>}
        type="file"
        accept=".pdf,.docx,.pptx"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0] ?? null);
        }}
      />

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files?.[0] ?? null);
        }}
        className={`relative overflow-hidden rounded-[22px] border border-dashed p-6 text-center transition-all ${
          isDragging
            ? "border-[var(--navy-blue)] bg-[var(--navy-blue)]/5 shadow-[0_12px_28px_rgba(59,130,246,0.14)]"
            : "border-[var(--border)] bg-[var(--card-bg)]"
        }`}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--navy-blue)]/10 text-[var(--navy-blue)]">
          <UploadCloud className="h-6 w-6" />
        </div>

        <p className="text-base font-medium text-[var(--heading)]">
          Drag and drop your file here
        </p>
        <p className="mt-2 text-sm text-[var(--muted-text)]">
          PDF, DOCX, or PPTX up to 15MB
        </p>

        <button
          type="button"
          onClick={triggerFilePicker}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--page-bg)] px-4 py-2.5 text-sm font-medium text-[var(--body-text)] transition hover:border-[var(--navy-blue)]/50 hover:text-[var(--navy-blue)]"
        >
          <FileText className="h-4 w-4" />
          Browse Files
        </button>

        {file && (
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--page-bg)] px-3 py-2 text-left">
            <p className="truncate text-sm font-medium text-[var(--body-text)]">
              {file.name}
            </p>
            <div className="mt-1 flex items-center justify-between text-xs text-[var(--muted-text)]">
              <span>{file.type || "Document file"}</span>
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center gap-1 text-[var(--navy-blue)] hover:underline"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-xs text-[var(--error)]">{error}</p>}
    </div>
  );
}
