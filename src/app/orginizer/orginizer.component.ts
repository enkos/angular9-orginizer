import { TasksService, Task } from './../shared/tasks.service';
import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orginizer',
  templateUrl: './orginizer.component.html',
  styleUrls: ['./orginizer.component.scss']
})
export class OrginizerComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []

  constructor(public dateSerice: DateService, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.dateSerice.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateSerice.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.create(task).subscribe(task => {
      this.form.reset()
    }, err => {
      console.error(err)
    })
  }

}
