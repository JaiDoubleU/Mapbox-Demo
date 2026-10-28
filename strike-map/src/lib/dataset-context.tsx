"use client";

import * as React from "react";
import type { StrikeDataset } from "./strike-data";
import { loadStrikeDataset } from "./data-source";

const DatasetContext = React.createContext<StrikeDataset | null>(null);

export function DatasetProvider({ children }: { children: React.ReactNode }) {
  const [data] = React.useState(loadStrikeDataset);
  return <DatasetContext.Provider value={data}>{children}</DatasetContext.Provider>;
}

export function useDataset(): StrikeDataset {
  const d = React.useContext(DatasetContext);
  if (!d) throw new Error("useDataset must be used inside <DatasetProvider>");
  return d;
}
