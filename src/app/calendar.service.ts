import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Calendars, Task } from './task';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasksFromLocalStorage());
  tasks$ = this.tasksSubject.asObservable();

  constructor(private taskService: TaskService) {
    this.tasksSubject.next(this.loadTasksFromLocalStorage());

  }
  

  generateDaysInJanuary(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 0, 1, 5); 
    let id = 1;

    while (date.getMonth() === 0) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1);
    }

    return days;
  }
  generateDaysInFebruary(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 1, 1, 5); 
    let id = 1;

    while (date.getMonth() === 1) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInMarch(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 2, 1, 5); 
    let id = 1;

    while (date.getMonth() === 2) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInApril(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 3, 1, 5); 
    let id = 1;

    while (date.getMonth() === 3) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInMay(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 4, 1, 5); 
    let id = 1;

    while (date.getMonth() === 4) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInJune(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 5, 1, 5); 
    let id = 1;

    while (date.getMonth() === 5) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInJuly(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 6, 1, 5); 
    let id = 1;

    while (date.getMonth() === 6) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInAugust(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 7, 1, 5); 
    let id = 1;

    while (date.getMonth() === 7) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInSeptember(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 8, 1, 5); 
    let id = 1;

    while (date.getMonth() === 8) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInOctober(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 9, 1, 5); 
    let id = 1;

    while (date.getMonth() === 9) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInNovember(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 10, 1, 5); 
    let id = 1;

    while (date.getMonth() === 10) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  generateDaysInDecember(year: number): Calendars[] {
    const days: Calendars[] = [];
    const date = new Date(year, 11, 1, 5); 
    let id = 1;

    while (date.getMonth() === 11) { 
      days.push({ id: id++, date: date.toISOString().split('T')[0] });
      date.setDate(date.getDate() + 1); 
    }

    return days;
  }
  getTasksByDate(tasks: Task[]): { [key: string]: Task[] } {
    const tasksByDate: { [key: string]: Task[] } = {};
    tasks.forEach(task => {
      const dateKey = task.dueDate.toISOString().split('T')[0];
      if (!tasksByDate[dateKey]) {
        tasksByDate[dateKey] = [];
      }
      tasksByDate[dateKey].push(task);
    });
    return tasksByDate;
  }

  private loadTasksFromLocalStorage(): Task[] {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      // Convert string dates to Date objects
      tasks.forEach((task: Task) => task.dueDate = new Date(task.dueDate));
      return tasks;
    }
    return [];
  }

  saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks); // Update the BehaviorSubject
  }
  
  
}
