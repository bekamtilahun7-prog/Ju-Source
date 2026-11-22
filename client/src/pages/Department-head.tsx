import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  UploadCloud,
  X,
  PencilLine,
  Plus,
  FolderKanban,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Drop-down";
import UploadField from "../components/Upload";

const COURSE_OPTIONS = [
  "Geography",
  "General Physics",
  "Mathematics",
  "General Psychology",
  "Logic and Critical Thinking",
  "Communicative English I",
  "Physical Fitness",
];

const RESOURCE_TYPES = ["Lecture Notes", "Past Exam", "Assignment"];
const ACCEPTED_EXTENSIONS = ["pdf", "docx", "pptx"];
const MAX_FILE_SIZE = 15 * 1024 * 1024;

type UploadedResource = {
  id: number;
  course: string;
  title: string;
  type: string;
  description: string;
  fileName: string;
};

const SAMPLE_RESOURCES: UploadedResource[] = [
  {
    id: 1,
    course: "General Physics",
    title: "Mechanics Lecture Notes",
    type: "Lecture Notes",
    description:
      "Weekly review notes covering force, motion, and acceleration.",
    fileName: "mechanics-notes.pdf",
  },
  {
    id: 2,
    course: "Mathematics",
    title: "Calculus Revision Set",
    type: "Past Exam",
    description:
      "Practice exam with derivations and problem-solving walkthroughs.",
    fileName: "calculus-revision.pdf",
  },
];

export default function DepartmentHeadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentGuide, setStudentGuide] = useState("");
  const [resourceType, setResourceType] = useState(RESOURCE_TYPES[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [resources, setResources] =
    useState<UploadedResource[]>(SAMPLE_RESOURCES);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null,
  );

  const selectedFileName = useMemo(() => {
    return selectedFile ? selectedFile.name : "No file selected";
  }, [selectedFile]);

  const validateFile = (file: File | null) => {
    if (!file) {
      return "Please choose a file to upload.";
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
      return "Unsupported file type. Please upload a PDF, DOCX, or PPTX file.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File is too large. Please upload a file smaller than 15MB.";
    }

    return "";
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setError("");
      return;
    }

    const fileError = validateFile(file);
    if (fileError) {
      setError(fileError);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError("");
    setIsRemoved(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextError = !course
      ? "Please select a course."
      : !title.trim()
        ? "Resource title is required."
        : !description.trim()
          ? "Description is required."
          : validateFile(selectedFile);

    if (nextError) {
      setError(nextError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const newResource: UploadedResource = {
        id: Date.now(),
        course,
        title,
        type: resourceType,
        description,
        fileName: selectedFile?.name || selectedFileName,
      };

      setResources((current) => [newResource, ...current]);
      setIsSubmitting(false);
      resetForm();
      setSelectedResourceId(null);
    }, 600);
  };

  const resetForm = () => {
    setCourse("");
    setTitle("");
    setDescription("");
    setStudentGuide("");
    setResourceType(RESOURCE_TYPES[0]);
    setSelectedFile(null);
    setError("");
    setIsRemoved(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (resource: UploadedResource) => {
    setSelectedResourceId(resource.id);
    setCourse(resource.course);
    setTitle(resource.title);
    setDescription(resource.description);
    setResourceType(resource.type);
    setSelectedFile(null);
    setError("");
    setStudentGuide("");
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] px-4 pb-16 pt-28 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-[var(--body-text)] transition hover:border-[var(--navy-blue)]/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </button>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy-blue)]">
            <BookOpen className="h-4 w-4" />
            Department head dashboard
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--card-bg)] shadow-[0_18px_50px_rgba(59,130,246,0.08)]">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />

            <div className="relative px-5 py-8 md:px-8 lg:px-10">
              <div className="mb-8">
                <p className="mb-3 inline-flex rounded-full border border-[var(--border)] bg-[var(--page-bg)] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--navy-blue)]">
                  Materials
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--heading)] md:text-4xl">
                  Upload Learning Materials
                </h1>
                <p className="mt-2 text-sm text-[var(--muted-text)] md:text-base">
                  Add learning resources to a specific course.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-[1.05fr_1.2fr]">
                  <div className="space-y-6">
                    <div>
                      <Dropdown
                        label="Course"
                        value={course}
                        onChange={setCourse}
                        options={COURSE_OPTIONS}
                        placeholder="Select a course"
                        required
                      />
                      {!course && error.includes("course") && (
                        <p className="mt-2 text-xs text-[var(--error)]">
                          {error}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[var(--body-text)]">
                        Resource Type
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {RESOURCE_TYPES.map((type) => {
                          const isSelected = resourceType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setResourceType(type)}
                              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                                isSelected
                                  ? "border-[var(--navy-blue)] bg-[var(--navy-blue)]/10 text-[var(--navy-blue)] shadow-[0_8px_20px_rgba(59,130,246,0.12)]"
                                  : "border-[var(--border)] bg-[var(--page-bg)] text-[var(--body-text)] hover:border-[var(--navy-blue)]/50"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-[var(--body-text)]"
                      >
                        Resource Title{" "}
                        <span className="text-[var(--navy-blue)]">*</span>
                      </label>
                      <input
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="e.g. Introduction to Psychology - Lecture 1"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--page-bg)] px-4 py-3 text-[var(--body-text)] placeholder:text-[var(--muted-text)] outline-none transition focus:border-[var(--navy-blue)] focus:ring-2 focus:ring-[var(--navy-blue)]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-[var(--body-text)]"
                      >
                        Description{" "}
                        <span className="text-[var(--navy-blue)]">*</span>
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Describe what this material covers..."
                        rows={5}
                        className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--page-bg)] px-4 py-3 text-[var(--body-text)] placeholder:text-[var(--muted-text)] outline-none transition focus:border-[var(--navy-blue)] focus:ring-2 focus:ring-[var(--navy-blue)]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="studentGuide"
                        className="mb-2 block text-sm font-medium text-[var(--body-text)]"
                      >
                        Suggestions for Students
                      </label>
                      <textarea
                        id="studentGuide"
                        value={studentGuide}
                        onChange={(event) =>
                          setStudentGuide(event.target.value)
                        }
                        placeholder="Explain how students should use this material..."
                        rows={4}
                        className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--page-bg)] px-4 py-3 text-[var(--body-text)] placeholder:text-[var(--muted-text)] outline-none transition focus:border-[var(--navy-blue)] focus:ring-2 focus:ring-[var(--navy-blue)]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--page-bg)] p-4 md:p-5">
                      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--heading)]">
                        <UploadCloud className="h-4 w-4 text-[var(--navy-blue)]" />
                        Upload learning file
                      </div>

                      <UploadField
                        file={selectedFile}
                        onFileSelect={handleFileChange}
                        onRemove={() => {
                          setSelectedFile(null);
                          setError("");
                          setIsRemoved(true);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        inputRef={fileInputRef}
                        error={error}
                      />

                      {selectedFile && (
                        <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                              <div className="mt-0.5 rounded-lg bg-[var(--navy-blue)]/10 p-2 text-[var(--navy-blue)]">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-[var(--body-text)]">
                                  {selectedFile.name}
                                </p>
                                <p className="mt-1 text-xs text-[var(--muted-text)]">
                                  {selectedFile.type || "Document file"} •{" "}
                                  {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                setError("");
                                setIsRemoved(true);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                              className="rounded-full border border-[var(--border)] p-1.5 text-[var(--muted-text)] transition hover:border-[var(--navy-blue)]/40 hover:text-[var(--navy-blue)]"
                              aria-label="Remove file"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {isRemoved && !selectedFile && (
                        <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--muted-text)]">
                          File removed. Select a different file to continue.
                        </div>
                      )}

                      {error &&
                        !error.includes("course") &&
                        !error.includes("title") &&
                        !error.includes("Description") &&
                        !error.includes("required") && (
                          <p className="mt-3 text-xs text-[var(--error)]">
                            {error}
                          </p>
                        )}
                    </div>

                    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--page-bg)] p-4 md:p-5">
                      <div className="flex items-center gap-2 text-sm font-medium text-[var(--heading)]">
                        <CheckCircle2 className="h-4 w-4 text-[var(--navy-blue)]" />
                        Ready to publish
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted-text)]">
                        Your material will be visible to students once
                        published. Review the course, title, and file before
                        continuing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-6 py-3 text-sm font-medium text-[var(--body-text)] transition hover:border-[var(--navy-blue)]/40 hover:text-[var(--navy-blue)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-[var(--navy-blue)] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(59,130,246,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting
                      ? "Publishing..."
                      : selectedResourceId
                        ? "Update Material"
                        : "Publish Material"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--navy-blue)]">
                    Overview
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-[var(--heading)]">
                    Resource library
                  </h2>
                </div>
                <div className="rounded-full bg-[var(--navy-blue)]/10 p-2 text-[var(--navy-blue)]">
                  <FolderKanban className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--page-bg)] px-4 py-3">
                  <span className="text-sm text-[var(--muted-text)]">
                    Courses
                  </span>
                  <span className="text-sm font-semibold text-[var(--heading)]">
                    {COURSE_OPTIONS.length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--page-bg)] px-4 py-3">
                  <span className="text-sm text-[var(--muted-text)]">
                    Published
                  </span>
                  <span className="text-sm font-semibold text-[var(--heading)]">
                    {resources.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[var(--heading)]">
                  Uploaded materials
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--navy-blue)] px-3 py-2 text-xs font-medium text-white shadow-[0_8px_24px_rgba(59,130,246,0.24)]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="rounded-[20px] border border-[var(--border)] bg-[var(--page-bg)] p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[var(--heading)]">
                          {resource.title}
                        </p>
                        <p className="mt-1 text-xs text-[var(--muted-text)]">
                          {resource.course}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEdit(resource)}
                        className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-2 py-1.5 text-[10px] font-medium text-[var(--body-text)]"
                      >
                        <PencilLine className="h-3 w-3" />
                        Edit
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--muted-text)]">
                      <span className="rounded-full bg-[var(--card-bg)] px-2 py-1">
                        {resource.type}
                      </span>
                      <span>{resource.fileName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
