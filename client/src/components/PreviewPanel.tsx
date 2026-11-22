import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";
import type { AspectRatio, IThumbnail } from "../assets/assets";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;
  const onDownload = () => {
    if (!thumbnail?.image_url) return;

    const link = document.createElement("a");
    link.href = thumbnail?.image_url.replace(
      "/upload",
      "/upload/fl_attachment",
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
        {/* preview content */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--page-bg)]/80">
            <Loader2Icon className="size-8 animate-spin text-[var(--navy-blue)]" />
            <div className="text-center">
              <p className="text-sm font-medium text-[var(--body-text)]">
                AI is creating your thumbnail…
              </p>
              <p className="mt-1 text-xs text-[var(--muted-text)]">
                This may take 10-20 seconds
              </p>
            </div>
          </div>
        )}
        {/*image preview */}
        {!isLoading && thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                console.error(
                  "[PreviewPanel] Image failed to load:",
                  thumbnail.image_url,
                );
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const errorDiv = document.createElement("div");
                  errorDiv.className =
                    "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--page-bg)]/80";
                  errorDiv.innerHTML = `
                                        <div class="flex size-20 items-center justify-center rounded-full bg-[var(--border)]">
                                            <svg class="size-10 text-[var(--muted-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div class="text-center">
                                            <p class="font-medium text-[var(--body-text)]">Failed to load image</p>
                                            <p class="mt-1 text-xs text-[var(--muted-text)]">The image URL may be invalid</p>
                                        </div>
                                    `;
                  parent.appendChild(errorDiv);
                }
              }}
              onLoad={() => {
                console.log(
                  "[PreviewPanel] Image loaded successfully:",
                  thumbnail.image_url,
                );
              }}
            />

            <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={onDownload}
                type="button"
                className="mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/80 ring-2 ring-[var(--border)] backdrop-blur hover:scale-105 active:scale-95 text-[var(--body-text)]"
              >
                <DownloadIcon className="size-4" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )}
        {/* Empty state */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--page-bg)]/80">
            <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full bg-[var(--card-bg)]">
              <ImageIcon className="size-10 text-[var(--muted-text)]" />
            </div>
            <div className="px-4 text-center">
              <p className="font-medium text-[var(--body-text)]">
                Generate your first thumbnail
              </p>
              <p className="mt-1 text-xs text-[var(--muted-text)]">
                Fill out the form and click Generate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PreviewPanel;
