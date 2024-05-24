import {Component, OnInit } from '@angular/core';
import {faArrowRight, faAnglesRight, faCalendarWeek, faNoteSticky, faSquare, faSliders, faRightFromBracket, faPlus, faChevronRight, faX, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import EventEmitter from 'events';
import $ from 'jquery';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../task';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-task-id',
  templateUrl: './task-id.component.html',
  styleUrl: './task-id.component.css'
})
export class TaskIDComponent implements OnInit{
  faArrowRight = faArrowRight;
  faAnglesRight = faAnglesRight;
  faCalendarWeek = faCalendarWeek;
  faNoteSticky = faNoteSticky;
  faSquare = faSquare;
  faSliders = faSliders;
  faRightFromBracket = faRightFromBracket;
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faX = faX;
  faMagnifyingGlass = faMagnifyingGlass;


  upcoming = this.taskService.upcoming;
  today = this.taskService.today;
  calendar = this.taskService.calendar;

  val:string

  numOfTasks:number = this.taskService.numOfTasks;

  constructor(private taskService: TaskService, private router: Router, private route:ActivatedRoute, private elementRef: ElementRef) {
    this.subscription = this.taskService.getData().subscribe( res => {
      console.log(res)
      this.dta = res;
    });
  }

  selectTask(taskName: string) {
    this.taskService.sendData(taskName);
  }

  //dateCompo

  tasks = this.taskService.tasks
  numOfTasksDate = this.taskService.numOfTasks;
  taskSelected:string;
  subscription: Subscription;
  dta:string = 'Today'
  id: number = null;
  isDisabled = this.taskService.isDisabled;


  task: Task = new Task;

  //taskDiv

  desc:string = 'desc'
  titleName:string = 'titleName'

  edit: boolean = false;
  selectedTaskId: number;

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);

  }
  saveTask() {
    if ( this.id !== null) {
      console.log(this.task, this.task.taskId)
      this.taskService.updateTask(this.task.taskId, this.task)
    }
    else {
      console.log(this.task, this.task.taskId)
      this.taskService.addTask(this.task)
      this.taskService.counter++;
      console.log(this.task.dueDate)
      console.log(typeof(this.task.dueDate))
    } 
    this.router.navigate(['/toDoList']);   
  }
  back() {
    this.router.navigate(['/toDoList']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.edit = param['edit'];
      if (param['edit'] === 'true') {
        this.route.params.subscribe((params: Params) => {
          this.id =+params['id'];
          this.task = this.taskService.getTask(this.id);
        });
      }
    });
    this.applyTheme();
  }
  quit() {
    window.history.back();
  }
  applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.darkMode();
    } else {
      this.lightMode();
    }
  }
  darkMode() {
    const menuDiv: HTMLElement = this.elementRef.nativeElement.querySelector('.menuDiv');
    menuDiv.classList.add('darkMode1');
    const dateDiv: HTMLElement = this.elementRef.nativeElement.querySelector('.dateDiv');
    dateDiv.classList.add('darkMode2');
    const taskDiv: HTMLElement = this.elementRef.nativeElement.querySelector('.taskDiv');
    taskDiv.classList.add('darkMode1');
    const back: HTMLElement = this.elementRef.nativeElement.querySelector('*');
    back.classList.add('dark');

    const menuDivC:HTMLElement = this.elementRef.nativeElement.querySelector('.menuDivC');
    menuDivC.classList.remove('menuDivC');
    menuDivC.classList.add('darkMenuDivC');

    const allTasks: HTMLElement = this.elementRef.nativeElement.querySelector('.allTasks');
    allTasks.classList.add('darkAllTasks')

    const addNewTask: HTMLElement = this.elementRef.nativeElement.querySelector('.addNewTask');
    addNewTask.classList.remove('addNewTask');
    addNewTask.classList.add('darkAddNewTask');

    const search: HTMLElement = this.elementRef.nativeElement.querySelector('.search');
    search.classList.remove('search');
    search.classList.add('darkSearch');

    const taskDivCFields: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.taskDivCField');
    Array.from(taskDivCFields).forEach(taskDivCField => {
    taskDivCField.classList.remove('taskDivCField');
    taskDivCField.classList.add('darkTaskDivCField');
    })

    const numOfTasks: NodeListOf<HTMLElement>  = this.elementRef.nativeElement.querySelectorAll('.numOfTasks');
    Array.from(numOfTasks).forEach(numOfTasks => {
      numOfTasks.classList.remove('numOfTasks');
      numOfTasks.classList.add('darkNumOfTasks');
    })
  }

  lightMode() {
    const menuDiv: HTMLElement = this.elementRef.nativeElement.querySelector('.menuDiv');
    menuDiv.classList.remove('darkMode1');
    const dateDiv: HTMLElement = this.elementRef.nativeElement.querySelector('.dateDiv');
    dateDiv.classList.remove('darkMode2');
    const taskDiv: HTMLElement = this.elementRef.nativeElement.querySelector('.taskDiv');
    taskDiv.classList.remove('darkMode1');
    const back: HTMLElement = this.elementRef.nativeElement.querySelector('*');
    back.classList.remove('dark');

    const darkMenuDivC:HTMLElement = this.elementRef.nativeElement.querySelector('.darkMenuDivC');
    darkMenuDivC.classList.remove('darkMenuDivC');
    darkMenuDivC.classList.add('menuDivC');

    const allTasks: HTMLElement = this.elementRef.nativeElement.querySelector('.allTasks');
    allTasks.classList.remove('darkAllTasks')

    const darkAddNewTask: HTMLElement = this.elementRef.nativeElement.querySelector('.darkAddNewTask');
    darkAddNewTask.classList.remove('darkAddNewTask');
    darkAddNewTask.classList.add('addNewTask');

    const darkSearch: HTMLElement = this.elementRef.nativeElement.querySelector('.darkSearch');
    darkSearch.classList.remove('darkSearch');
    darkSearch.classList.add('search');

    const darkTaskDivCField: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.darkTaskDivCField');
    Array.from(darkTaskDivCField).forEach(darkTaskDivCField => {
      darkTaskDivCField.classList.remove('taskDivCField');
      darkTaskDivCField.classList.add('darkTaskDivCField');
    });
  }
  counter: number = this.taskService.counter;
}
