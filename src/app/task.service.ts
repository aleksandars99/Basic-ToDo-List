import { Injectable } from '@angular/core';
import { Task, daysInYear } from './task';
import { taskEnum } from './task';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Console } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  numOfTasks: number = 0;
  numOfTasksPersonal: number = 0;
  numOfTasksWork: number = 0;
  numOfTasksList1: number = 0;
  constructor() { 
    for (let i in this.tasks) {
      this.numOfTasks++;
    }
    this.loadTasksFromLocalStorage();
  }

  tasks: Task[] = [{
    taskId: 1,
    title: 'Visit doctor',
    description: 'Doctor appointment for knee pain, bring your medical id',
    listPlace: 'Personal',
    dueDate: new Date('2024-01-30')
  },{
    taskId: 2,
    title: 'Call Anthony',
    description: 'Ask Anthony from work for help',
    listPlace: 'Work',
    dueDate: new Date("2024-04-26")
  },{
    taskId: 3,
    title: 'Ride a bike',
    description: 'Remember to bring water',
    listPlace: 'List1',
    dueDate: new Date('2024-04-26')
  },{
    taskId: 4,
    title: "Mike's birthday",
    description: 'Call Mike and wish him a happy birthday',
    listPlace: 'Personal',
    dueDate: new Date('2024-05-02')
  },{
    taskId: 5,
    title: "Drink water",
    description: 'Remember to drink water',
    listPlace: 'Personal',
    dueDate: new Date('2024-01-22')
  }
]
  filteredTasks: Task[];

  today: string = 'Today';
  upcoming: string = 'Upcoming';
  calendar: string = 'Calendar';

  selectedButton: string = 'Today'

  private subject = new Subject<any>; // we recieve and send data from menu-div.component to date.component with two methods below
  sendData(data: any) {
    this.subject.next(data);
  }
  getData(): Observable<any> {
    return this.subject.asObservable();
  }
  isDisabled: boolean = true;
  private subject2 = new Subject<boolean>
  unDisable(data: boolean) {
    this.subject2.next(data);
  } 
  getUnDisable(): Observable<boolean> {
    return this.subject2.asObservable();
  }
  
  getTask(id: number) {
    var index = this.tasks.findIndex(task => task.taskId === id);
    return this.tasks[index]
  }
  deleteTask(id: number) {
    var index = this.tasks.findIndex(task => task.taskId === id);
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }
  updateTask(id: number, task: Task) {
    var index = this.tasks.findIndex(task => task.taskId === id);
    this.tasks[index] = task
    this.saveTasksToLocalStorage();
  }
  addTask(task: Task) {
    var index = this.tasks[this.tasks.length -1 ].taskId + 1;
    task.taskId = index;
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }
  taskCount(listPlace: string): number {
    return this.tasks.filter(task => task.listPlace === listPlace).length
  }
  getTaskCount(): number {
    return this.tasks.length;
  }
  counter: number = 0;
  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.counter++;
      this.tasks = JSON.parse(storedTasks).map((task: Task) => ({
        ...task,
        dueDate: new Date(task.dueDate)
      }));
    }
    this.counter = storedTasks.split("},{").length;
    console.log(this.counter)
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  getTasksForNext7Days() {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    return this.tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= today && taskDate <= next7Days;
    });
  }
  

}
