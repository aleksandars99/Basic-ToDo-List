import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: Task[], filterBy: string) {
    if (!tasks || !filterBy) {
      return tasks;
    }
    return tasks.filter(task => task.title.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
  }

}
