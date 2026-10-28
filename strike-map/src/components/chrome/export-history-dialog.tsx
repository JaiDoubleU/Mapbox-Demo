"use client";

import * as React from "react";
import { Download, Inbox, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { ExportJob } from "@/lib/types";
import { cn } from "@/lib/utils";

function RowIconButton({
  icon: Icon,
  title,
  danger,
  loading,
  onClick,
}: {
  icon: typeof Download;
  title: string;
  danger?: boolean;
  loading?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      title={title}
      aria-label={title}
      disabled={loading}
      onClick={onClick}
      className={cn(
        "flex size-[30px] shrink-0 items-center justify-center rounded-md border border-border bg-transparent outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        loading ? "cursor-default opacity-70" : "cursor-pointer",
        danger
          ? "text-[var(--error)] enabled:hover:border-[var(--error)] enabled:hover:bg-[var(--error-surface)]"
          : "text-s-text enabled:hover:border-s-line-strong enabled:hover:bg-s-chip",
      )}
    >
      {loading ? <Loader2 size={15} strokeWidth={1.75} className="animate-spin" /> : <Icon size={15} strokeWidth={1.75} />}
    </button>
  );
}

function JobName({ name, onRename }: { name: string; onRename: (name: string) => void }) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(name);
  if (editing) {
    const commit = () => {
      if (value.trim()) onRename(value.trim());
      setEditing(false);
    };
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            e.stopPropagation();
            setValue(name);
            setEditing(false);
          }
        }}
        aria-label="Export name"
        className="h-6 w-full rounded-sm border border-primary bg-transparent px-1.5 font-mono text-sm font-semibold text-s-text outline-none"
      />
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold text-s-text">
      <span className="truncate font-mono">{name}</span>
      <button
        title="Rename"
        onClick={() => {
          setValue(name);
          setEditing(true);
        }}
        className="flex cursor-pointer border-none bg-transparent p-0.5 text-s-muted"
      >
        <Pencil size={12} strokeWidth={1.75} />
      </button>
    </div>
  );
}

interface ExportHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobs: ExportJob[];
  onDownload: (job: ExportJob) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function ExportHistoryDialog({ open, onOpenChange, jobs, onDownload, onDelete, onRename }: ExportHistoryDialogProps) {
  const [busy, setBusy] = React.useState<Record<string, boolean>>({});
  const download = (job: ExportJob) => {
    setBusy((b) => ({ ...b, [job.id]: true }));
    onDownload(job);
    window.setTimeout(
      () =>
        setBusy((b) => {
          const n = { ...b };
          delete n[job.id];
          return n;
        }),
      1000,
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[84vh] w-[min(720px,94vw)] rounded-2xl">
        <div className="border-b border-border px-[22px] py-[18px]">
          <DialogTitle className="text-xl font-semibold tracking-[-0.2px]">Export History</DialogTitle>
          <DialogDescription className="mt-0.5 text-[13px]">Exports will be removed after 7 days</DialogDescription>
        </div>
        {jobs.length ? (
          <div className="flex-1 overflow-y-auto">
            {jobs.map((job, i) => (
              <div
                key={job.id}
                className={cn("flex items-center gap-3 px-4 py-3 md:gap-3.5 md:px-[22px]", i !== jobs.length - 1 && "border-b border-border")}
              >
                <RowIconButton icon={Download} title="Download" loading={!!busy[job.id]} onClick={() => download(job)} />
                <div className="min-w-0 flex-[2]">
                  <JobName name={job.name} onRename={(name) => onRename(job.id, name)} />
                  <div className="mt-0.5 text-[12.5px] text-s-muted">{job.details}</div>
                  {/* Phones: date and status move under the details. */}
                  <div className="mt-0.5 flex flex-wrap gap-x-2 text-[12.5px] md:hidden">
                    <span className="text-s-text">{job.time}</span>
                    <span className="text-xs leading-[19px] font-bold tracking-[.3px] text-primary">{job.status}</span>
                  </div>
                </div>
                <div className="hidden min-w-0 flex-[1.3] text-[12.5px] text-s-text md:block">{job.time}</div>
                <span className="hidden w-[92px] shrink-0 text-xs font-bold tracking-[.3px] text-primary md:inline">{job.status}</span>
                <RowIconButton icon={Trash2} title="Delete" danger onClick={() => onDelete(job.id)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="px-[22px] py-12 text-center text-sm text-s-muted">
            <Inbox size={30} strokeWidth={1.75} color="var(--s-faint)" className="mx-auto mb-3" />
            No downloads to manage.
          </div>
        )}
        <div className="flex items-center justify-end gap-3 border-t border-border px-[22px] py-3.5">
          <Button onClick={() => onOpenChange(false)} className="px-[18px]">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
