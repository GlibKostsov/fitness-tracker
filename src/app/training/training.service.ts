import { Injectable } from '@angular/core';
import { find, map, Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ExternalReference } from '@angular/compiler';
@Injectable()
export class TrainingService {
  private availableExercises!: Exercise[];

  private runningExercise: Exercise | undefined;
  selectedExercise = new Subject<Exercise | undefined>();
  exercisesChanged = new Subject<Exercise[]>();
  private exercises: Exercise[] = [];

  constructor(private firestore: AngularFirestore) {}

  fetchAvailableExercises() {
    this.firestore
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((doc) => {
            const id = doc.payload.doc.id;
            const data = <Object>doc.payload.doc.data();
            return {
              id,
              ...data,
            };
          });
        })
      )
      .subscribe((exercises: any) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
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
