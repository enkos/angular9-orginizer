import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

interface Day {
  value: moment.Moment
  isActive: boolean
  isDisabled: boolean
  isSelected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[]

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day)
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('isoWeek')
    const endDay = now.clone().endOf('month').endOf('isoWeek')
    const date = startDay.clone().subtract(1, 'day')
    const calendar = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: [... new Array(7).keys()]
          .map(() => {
            const value = date.add(1, 'day').clone()
            const isActive = moment().isSame(value, 'date')
            const isDisabled = !now.isSame(value, 'month')
            const isSelected = now.isSame(value, 'date')

            return { value, isActive, isDisabled, isSelected }
          })
      })
    }

    this.calendar = calendar
  }

}
