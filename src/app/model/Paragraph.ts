import {ReadabilityMetrics} from './ReadabilityMetrics';

export interface Paragraph {
  text: string;
  readabilityMetrics: ReadabilityMetrics;
}
