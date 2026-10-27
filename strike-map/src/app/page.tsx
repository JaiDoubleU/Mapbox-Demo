import { StrikeApp } from "@/components/strike-app";
import { DatasetProvider } from "@/lib/dataset-context";

export default function Page() {
  return (
    <DatasetProvider>
      <StrikeApp />
    </DatasetProvider>
  );
}
