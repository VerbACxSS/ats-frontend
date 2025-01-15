import {Paragraph} from './Paragraph';
import {PredictedParagraph} from './PredictedParagraph';

export interface PredictionResult {
  cleanedParagraph: Paragraph
  simplifiedParagraphs: Array<PredictedParagraph>;
  selectedSimplifiedParagraphIndex: number;
}
