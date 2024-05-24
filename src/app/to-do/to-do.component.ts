import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import {faArrowRight, faAnglesRight, faCalendarWeek, faNoteSticky, faSquare, faSliders, faRightFromBracket, faPlus, faChevronRight, faX, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import EventEmitter from 'events';
import $ from 'jquery';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../task';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements AfterViewInit, OnInit {

  ngOnInit(): void {
    this.applyTheme();
    this.loadTasksFromLocalStorage();
    this.numOfTasks = this.taskService.getTaskCount();
  }
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

  isDisabled = this.taskService.isDisabled;
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
    this.subscription = taskService.getUnDisable().subscribe( res => {
      console.log(this.isDisabled)
      this.isDisabled = res
    });

  }
  ngAfterViewInit(): void {
    $( document ).ready(function() {
      $('#todayButton').click(function() {
        $('#todayButton').addClass('active');
        $('#upcomingButton').removeClass('active');
        $('#calendarButton').removeClass('active');
      });
    $('#calendarButton').click(function() {
      $('#calendarButton').addClass('active');
      $('#upcomingButton').removeClass('active');
      $('#todayButton').removeClass('active');
    });
    $('#upcomingButton').click(function() {
      $('#upcomingButton').addClass('active');
      $('#calendarButton').removeClass('active');
      $('#todayButton').removeClass('active');
    });
    }
    );
  }


  selectTask(taskName: string) {
    this.taskService.sendData(taskName);
  }
  filterPipe = ''

  //dateCompo

  tasks = this.taskService.tasks
  taskSelected:string;
  subscription: Subscription;
  dta:string = 'Today'
  id: number = null;

  disab: boolean = false

  task: Task = new Task;
  addTask(isDisab: boolean = false) {
    this.taskService.unDisable(isDisab)
    
  }
  editTask(isDisab: boolean = false, taskid: number) {
    this.router.navigate(['task/'+ taskid], {queryParams: {edit: 'true'}});
    this.taskService.unDisable(isDisab)
  }
  removeTask(id: number) {
    this.taskService.deleteTask(id);
    this.counter--;
    this.taskService.counter--;
  }

  //taskDiv

  desc:string = 'desc'
  titleName:string = 'titleName'

  edit: boolean = false;
  selectedTaskId: number;

  saveTask( isDisab: boolean = true) {
    if ( this.id !== null) {
      this.taskService.updateTask(this.task.taskId, this.task)
      this.taskService.unDisable(isDisab)
    }
    else {
      this.taskService.addTask(this.task)
      this.taskService.unDisable(isDisab)
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
      darkTaskDivCField.classList.remove('darkTaskDivCField');
      darkTaskDivCField.classList.add('taskDivCField');
    });

    const darkNumOfTasks: NodeListOf<HTMLElement>  = this.elementRef.nativeElement.querySelectorAll('.darkNumOfTasks');
    Array.from(darkNumOfTasks).forEach(darkNumOfTasks => {
      darkNumOfTasks.classList.remove('darkNumOfTasks');
      darkNumOfTasks.classList.add('numOfTasks');
    })
  }
  applyDarkTheme() {
    localStorage.setItem('theme', 'dark');
    this.applyTheme();
  }
  applyLightTheme() {
    localStorage.setItem('theme', 'light')
    this.applyTheme();
  }
  applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.darkMode();
    } else {
      this.lightMode();
    }
  }
  filteredTasks = this.taskService.tasks
  quit() {
    window.history.back();
  }
  activeFilter: string = 'all'
  filterTasks(filter: string) {
    this.activeFilter = filter;
    switch(filter) {
      case 'personal': 
        this.filteredTasks = this.tasks.filter(task => task.listPlace === 'Personal');
        break;
      case 'work':
        this.filteredTasks = this.tasks.filter(task => task.listPlace === 'Work');
        break;
      case 'list1':
        this.filteredTasks = this.tasks.filter(task => task.listPlace === 'List1');
        break;
      default:
        this.showAll();
    }
  }
  showAll() {
    this.activeFilter = 'all'
    this.filteredTasks = this.tasks;
  }
  taskCount(listPlace: string): number {
    return this.taskService.taskCount(listPlace);
  }
  openCalendar() {
    this.router.navigate(['calendar'])
  }
  openUpcoming() {
    this.router.navigate(['upcoming'])
  }
  loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks).map((task: Task) => ({
        ...task,
        dueDate: new Date(task.dueDate) // Ensure the dueDate is a Date object
      }));
    }
  }
  counter = this.taskService.counter;
}
