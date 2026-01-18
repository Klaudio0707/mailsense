import type { IAnalysisResult } from "./IAnalysisResult";

export interface IResultSectionProps {
    result: IAnalysisResult | null;
    loading: boolean;
  }