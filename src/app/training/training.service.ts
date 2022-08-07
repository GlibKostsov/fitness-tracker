import { Injectable } from '@angular/core';
import { find, Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
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
