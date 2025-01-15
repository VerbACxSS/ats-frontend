import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PredictionRequest} from '../model/PredictionRequest';
import {PredictionResult} from '../model/PredictionResult';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) {
  }

  public predict(text: string, model: string): Observable<Array<PredictionResult>> {
    const predictionRequest: PredictionRequest = {
      model: model,
      paragraphs: text.split('\n\n')
    }
    return this.http.post<Array<PredictionResult>>(environment.BACKEND_URL + '/api/v1/predict/', predictionRequest)
  }
}
