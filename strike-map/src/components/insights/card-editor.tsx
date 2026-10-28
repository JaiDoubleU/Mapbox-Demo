"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/* Form pieces for the InsightCard edit drawer. Each field is a <label> wrapping its control, so
   the label is the control's accessible name. */

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-s-text">
      {label}
      {children}
      {hint && <span className="font-normal text-s-muted">{hint}</span>}
    </label>
  );
}

/** Two or more small fields side by side. */
export function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}

export function GroupLabel({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-border pb-1 text-xs font-semibold text-s-text uppercase">{children}</div>;
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <Field label={label}>
      <Select value={value} onValueChange={(v) => onChange(v as T)}>
        <SelectTrigger aria-label={label} className="h-8 w-full rounded-md px-2 text-xs font-normal">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([v, l]) => (
            <SelectItem key={v} value={v} className="text-xs">
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

export function SwitchField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 text-xs font-medium text-s-text">
      {label}
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </label>
  );
}

/**
 * A number input that edits freely and commits on blur or Enter. Out-of-range or non-numeric
 * text reverts to the last good value; `integer` rounds.
 */
export function NumberField({
  label,
  value,
  min,
  max,
  integer,
  hint,
  onCommit,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  integer?: boolean;
  hint?: string;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = React.useState(String(value));
  React.useEffect(() => setDraft(String(value)), [value]);
  const parsed = Number(draft);
  const ok = draft.trim() !== "" && Number.isFinite(parsed) && (min == null || parsed >= min) && (max == null || parsed <= max);
  const commit = () => {
    if (!ok) return setDraft(String(value));
    const v = integer ? Math.round(parsed) : parsed;
    setDraft(String(v));
    if (v !== value) onCommit(v);
  };
  return (
    <Field label={label} hint={!ok && draft !== String(value) ? `Enter ${min != null ? `${min}` : "a number"}${max != null ? ` to ${max}` : "+"}` : hint}>
      <Input
        inputMode="decimal"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        aria-invalid={!ok || undefined}
        className={cn("h-8 px-2 text-xs font-normal tabular-nums", !ok && "border-destructive")}
      />
    </Field>
  );
}

/** Bottom action row: optional left slot, Reset and Done. */
export function EditorActions({
  onReset,
  onDone,
  left,
  doneLabel = "Done",
  doneDisabled,
}: {
  onReset?: () => void;
  onDone: () => void;
  left?: React.ReactNode;
  doneLabel?: string;
  doneDisabled?: boolean;
}) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-3">
      {left}
      <div className="ml-auto flex gap-2">
        {onReset && (
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset
          </Button>
        )}
        <Button size="sm" onClick={onDone} disabled={doneDisabled}>
          {doneLabel}
        </Button>
      </div>
    </div>
  );
}
