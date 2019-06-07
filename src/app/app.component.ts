import { Component } from '@angular/core';
import { SchedulerEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import '@progress/kendo-date-math/tz/regions/Europe';
import '@progress/kendo-date-math/tz/regions/NorthAmerica';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    logText = '';
    selectedDate: Date = new Date('2018-10-22T00:00:00');
    formGroup: FormGroup;
    events: SchedulerEvent[] = [{
        id: 1,
        title: 'Breakfast',
        start: new Date('2018-10-22T09:00:00'),
        end: new Date('2018-10-22T09:30:00'),
        recurrenceRule: 'FREQ=DAILY;COUNT=5;'
    }];

    constructor(private formBuilder: FormBuilder) {
        this.createFormGroup = this.createFormGroup.bind(this);
    }

    createFormGroup(args: CreateFormGroupArgs): FormGroup {
        const dataItem = args.dataItem;

        this.formGroup = this.formBuilder.group({
            'id': args.isNew ? this.getNextId() : dataItem.id,
            'start': [dataItem.start, Validators.required],
            'end': [dataItem.end, Validators.required],
            'startTimezone': [dataItem.startTimezone],
            'endTimezone': [dataItem.endTimezone],
            'isAllDay': dataItem.isAllDay,
            'title': dataItem.title,
            'description': dataItem.description,
            'recurrenceRule': dataItem.recurrenceRule,
            'recurrenceId': dataItem.recurrenceId
        });

        return this.formGroup;
    }

    getNextId(): number {
        const len = this.events.length;

        return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
    }

    log(type: string): void {
      this.logText += type + '\n';
    }
}
