import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status, Step } from '../models/wizard';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
})
export class WizardComponent implements OnInit {
  steps: Step[] = [];
  currentStep = 1;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.initSteps();
  }

  initSteps() {
    this.steps = [
      {
        Id: 1,
        Header: 'Genre',
        Status: Status.Active,
      },
      {
        Id: 2,
        Header: 'Subgenre',
        Status: Status.Inactive,
      },
      {
        Id: 3,
        Header: 'Add new subgenre',
        Status: Status.Inactive,
      },
      {
        Id: 4,
        Header: 'Information',
        Status: Status.Inactive,
      },
    ];
  }
  getClassName(status: Status) {
    let result = '';
    switch (status) {
      case Status.Active:
        result = 'active';
        break;
      case Status.Done:
        result = 'done';
        break;
      case Status.Inactive:
        result = 'inactive';
    }
    return result;
  }

  back() {
    let index = this.steps.findIndex((el) => el.Id == this.currentStep);
    this.steps[index].Status = Status.Inactive;
    --index;
    this.currentStep = this.steps[index].Id;
    this.steps[index].Status = Status.Active;
  }

  submit() {
    let index = this.steps.findIndex((el) => el.Id == this.currentStep);
    this.steps[index].Status = Status.Done;
    if (index < this.steps.length - 1) {
      ++index;
      this.currentStep = this.steps[index].Id;
      this.steps[index].Status = Status.Active;
    } else {
      this.route.navigate(['/success']);
    }
  }
}
