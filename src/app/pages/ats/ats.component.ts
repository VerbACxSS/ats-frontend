import {Component} from '@angular/core';
import {
  ItButtonDirective,
  ItCalloutComponent,
  ItChipComponent,
  ItCollapseComponent,
  ItIconComponent,
  ItSelectComponent,
  ItTableComponent,
  ItTextareaComponent,
  ItTooltipDirective,
  SelectControlGroup,
  SelectControlOption
} from 'design-angular-kit';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {PredictionService} from '../../services/prediction.service';
import {PredictionResult} from '../../model/PredictionResult';
import {ReadabilityMetrics} from '../../model/ReadabilityMetrics';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-ats',
  styleUrl: './ats.component.scss',
  templateUrl: './ats.component.html',
  standalone: true,
  imports: [
    ItTextareaComponent,
    ItSelectComponent,
    ItButtonDirective,
    ItTableComponent,
    ItCollapseComponent,
    ItIconComponent,
    NgStyle,
    ItChipComponent,
    ItTooltipDirective,
    ItCalloutComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AtsComponent {

  public readonly ATS_DEFAULT: Array<SelectControlOption> = [
    {
      selected: true,
      value: "",
      text: 'Scegli un modello'
    }
  ];

  public readonly MODELS_ATS: Array<SelectControlGroup> = [
    {
      label: 'SEMPL-IT',
      options: [
        {
          text: 'mt5-small',
          value: 'sempl-it-mt5-small'
        },
        {
          text: 'mt5-small',
          value: 'sempl-it-mt5-small'
        },
        {
          text: 'gpt2-small-italian',
          value: 'sempl-it-gpt2-small-italian'
        }
      ]
    },
  ];

  public simplificationFormGroup: FormGroup;

  public results: Array<PredictionResult> = [];

  constructor(private alertService: AlertService,
              private predictionService: PredictionService) {
    this.simplificationFormGroup = new FormGroup({
      text: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
    });
  }

  public simplify() {
    this.simplificationFormGroup.markAllAsTouched();
    if (!this.simplificationFormGroup.valid) {
      this.alertService.showError('Errore', 'Compilare tutti i campi');
      return;
    }

    this.predictionService.predict(this.simplificationFormGroup.value.text, this.simplificationFormGroup.value.model)
      .subscribe({
        next: (response) => {
          this.results = response;
          for (let i = 0; i < this.results.length; i++) {
            this.results[i].selectedSimplifiedParagraphIndex = 0;
          }
        },
        error: (error) => {
          this.alertService.showError('Errore', error.message);
        }
      })
  }

  public getAverageSimilarityScore(): number {
    let sum = 0;
    for (let i = 0; i < this.results.length; i++) {
      sum += this.results[i].simplifiedParagraphs[this.results[i].selectedSimplifiedParagraphIndex].similarityScore;
    }
    return sum / this.results.length;
  }

  public getAverageOriginalReadabilityMetrics(): ReadabilityMetrics {
    return {
      vdb: this.results.reduce((sum, result) => sum + result.cleanedParagraph.readabilityMetrics.vdb, 0) / this.results.length,
      tokens: this.results.reduce((sum, result) => sum + result.cleanedParagraph.readabilityMetrics.tokens, 0),
      gulpease: this.results.reduce((sum, result) => sum + result.cleanedParagraph.readabilityMetrics.gulpease, 0) / this.results.length,
      fleschVacca: this.results.reduce((sum, result) => sum + result.cleanedParagraph.readabilityMetrics.fleschVacca, 0) / this.results.length,
    }
  }

  public getAverageSimplifiedReadabilityMetrics(): ReadabilityMetrics {
    return {
      vdb: this.results.reduce((sum, result) => sum + result.simplifiedParagraphs[result.selectedSimplifiedParagraphIndex].readabilityMetrics.vdb, 0) / this.results.length,
      tokens: this.results.reduce((sum, result) => sum + result.simplifiedParagraphs[result.selectedSimplifiedParagraphIndex].readabilityMetrics.tokens, 0),
      gulpease: this.results.reduce((sum, result) => sum + result.simplifiedParagraphs[result.selectedSimplifiedParagraphIndex].readabilityMetrics.gulpease, 0) / this.results.length,
      fleschVacca: this.results.reduce((sum, result) => sum + result.simplifiedParagraphs[result.selectedSimplifiedParagraphIndex].readabilityMetrics.fleschVacca, 0) / this.results.length,
    }
  }

  public getSematicSimilarityColor(similarityScore: number): string {
    if (similarityScore >= 0.75) {
      return 'rgb(0, 255, 0)';
    } else if (similarityScore >= 0.5) {
      return 'rgb(85,170,0)';
    } else if (similarityScore >= 0.25) {
      return 'rgb(170,85,0)';
    } else {
      return 'rgb(255, 0, 0)';
    }
  }

  public getVdbColor(vdb: number): string {
    if (vdb >= 0.75) {
      return 'rgb(0, 255, 0)';
    } else if (vdb >= 0.5) {
      return 'rgb(85,170,0)';
    } else if (vdb >= 0.25) {
      return 'rgb(170,85,0)';
    } else {
      return 'rgb(255, 0, 0)';
    }
  }

  public getGulpeaseColor(gulpeaseIndex: number): string {
    if (gulpeaseIndex >= 80) {
      return 'rgb(0, 255, 0)';
    } else if (gulpeaseIndex >= 60) {
      return 'rgb(85,170,0)';
    } else if (gulpeaseIndex >= 40) {
      return 'rgb(170,85,0)';
    } else {
      return 'rgb(255, 0, 0)';
    }
  }

  public getFleschReadingEaseColor(fleschReadingEase: number): string {
    if (fleschReadingEase >= 90) {
      return 'rgb(0, 255, 0)';
    } else if (fleschReadingEase >= 80) {
      return 'rgb(51,204,0)';
    } else if (fleschReadingEase >= 70) {
      return 'rgb(102,153,0)';
    } else if (fleschReadingEase >= 60) {
      return 'rgb(153,102,0)';
    } else if (fleschReadingEase >= 50) {
      return 'rgb(204,51,0)';
    } else {
      return 'rgb(255,0,0)';
    }
  }

  public getFleschVaccaColor(fleschKincaidGrade: number): string {
    if (fleschKincaidGrade >= 14) {
      return 'rgb(255,0,0)';
    } else if (fleschKincaidGrade >= 13) {
      return 'rgb(204,51,0)';
    } else if (fleschKincaidGrade >= 9) {
      return 'rgb(153,102,0)';
    } else if (fleschKincaidGrade >= 6) {
      return 'rgb(102,153,0)';
    } else if (fleschKincaidGrade >= 1) {
      return 'rgb(51,204,0)';
    } else {
      return 'rgb(0, 255, 0)';
    }
  }

  public next(predictionResult: PredictionResult): void {
    if (predictionResult.selectedSimplifiedParagraphIndex >= predictionResult.simplifiedParagraphs.length - 1) {
      return;
    }
    predictionResult.selectedSimplifiedParagraphIndex++;
  }

  public prev(predictionResult: PredictionResult): void {
    if (predictionResult.selectedSimplifiedParagraphIndex <= 0) {
      return;
    }
    predictionResult.selectedSimplifiedParagraphIndex--;
  }

  public autogrow(e: any): void {
    e.target.style.overflow = 'hidden';
    e.target.style.height = '0px';
    e.target.style.height = (e.target.scrollHeight) + 'px';
  }

}
