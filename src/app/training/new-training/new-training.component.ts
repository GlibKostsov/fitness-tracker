import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  exercises!: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.exercises = this.firestore
      .collection('availableExercises')
      .valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
