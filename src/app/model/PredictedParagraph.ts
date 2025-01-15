import {ReadabilityMetrics} from './ReadabilityMetrics';

export interface PredictedParagraph {
  text: string;
  similarityScore: number;
  readabilityMetrics: ReadabilityMetrics;
}
