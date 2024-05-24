import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import {faArrowRight, faAnglesRight, faCalendarWeek, faNoteSticky, faSquare, faSliders, faRightFromBracket, faPlus, faChevronRight, faX, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnInit {

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

  isDisabled:boolean = true
  isDarkMode: boolean;

  tasks:any[];

  getTasksForNext7Days = this.taskService.getTasksForNext7Days();
  theme = localStorage.getItem('theme');

  constructor(private taskService: TaskService, private router: Router, private elementRef: ElementRef) {
    this.tasks = taskService.tasks;

    if (this.theme === 'dark') {
      this.isDarkMode = true;
    }
    else {
      this.isDarkMode = false;
    }
    
  }
  getAllTasks() :Task[] {
    return this.taskService.tasks;
  }

  ngOnInit(): void {
    this.tasks = this.taskService.tasks;
    this.applyTheme();
  }
  openToday() {
    this.router.navigate([''])
  }
  openCalendar() {
    this.router.navigate(['calendar'])
  }
  quit() {
    window.history.back();
  }
  editTask(taskid: number) {
    this.router.navigate(['task/'+taskid], {queryParams: {edit: 'true'}});
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

    const back: HTMLElement = this.elementRef.nativeElement.querySelector('*');
    back.classList.add('dark');

    const menuDivC:HTMLElement = this.elementRef.nativeElement.querySelector('.menuDivC');
    menuDivC.classList.remove('menuDivC');
    menuDivC.classList.add('darkMenuDivC');

    const search: HTMLElement = this.elementRef.nativeElement.querySelector('.search');
    search.classList.remove('search');
    search.classList.add('darkSearch');

    const upcomingDiv: HTMLElement = this.elementRef.nativeElement.querySelector('.upcomingDiv');
    upcomingDiv.classList.remove('upcomingDiv');
    upcomingDiv.classList.add('upcomingDivDark');

    const taskText: HTMLElement = this.elementRef.nativeElement.querySelector('.taskText');
    taskText.classList.remove('taskText');
    taskText.classList.add('taskTextDark');
    
    const buttonTask: HTMLElement = this.elementRef.nativeElement.querySelector('.buttonTask');
    buttonTask.classList.remove('buttonTask');
    buttonTask.classList.add('buttonTaskDark');

    

  }
  lightMode() {
    
  }

  
}
