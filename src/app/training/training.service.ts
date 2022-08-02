import { Injectable } from '@angular/core';
import { find, Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise | undefined;
  selectedExercise = new Subject<Exercise | undefined>();
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    const foundExercise = this.availableExercises.find(
      (ex) => ex.id == selectedId
    );
    this.runningExercise = foundExercise;
    this.selectedExercise.next(<Exercise>{ ...foundExercise });
  }

  completeExercise() {
    if (this.runningExercise)
      this.exercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed',
      });
    this.runningExercise = undefined;
    this.selectedExercise.next(undefined);
  }

  cancelExercise(progress: number) {
    if (this.runningExercise)
      this.exercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'cancelled',
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
      });
    this.runningExercise = undefined;
    this.selectedExercise.next(undefined);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
