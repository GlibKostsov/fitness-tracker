import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exerciseSubscription!: Subscription;
  exercises!: Exercise[];
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises: any) => {
        this.exercises = exercises;
      }
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
