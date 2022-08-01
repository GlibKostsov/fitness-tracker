import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining: boolean = false;
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.selectedExercise.subscribe(
      (exercise) => {
        if (exercise != undefined) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }
}
