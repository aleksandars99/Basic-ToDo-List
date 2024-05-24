import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Calendars, Task } from '../task';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  currentMonth: string = 'January'
  daysInJanuary: Calendars[] = [];
  daysInFebruary: Calendars[] = [];
  daysInMarch: Calendars[] = [];
  daysInApril: Calendars[] = [];
  daysInMay: Calendars[] = [];
  daysInJune: Calendars[] = [];
  daysInJuly: Calendars[] = [];
  daysInAugust: Calendars[] = [];
  daysInSeptember: Calendars[] = [];
  daysInOctober: Calendars[] = [];
  daysInNovember: Calendars[] = [];
  daysInDecember: Calendars[] = [];
  tasks: Task[] = [];
  tasksByDate: { [key: string]: Task[] } = {};
  private subscription: Subscription;
  isDarkMode: boolean;
  whatClass:string;
  january:boolean = true;
  february: boolean = false;
  march: boolean = false;
  april: boolean = false;
  may: boolean = false;
  june: boolean = false;
  july: boolean = false;
  august: boolean = false;
  september: boolean = false;
  october: boolean = false;
  november: boolean = false;
  december: boolean = false;
  theme = localStorage.getItem('theme');
  monthNow: string;
  dateToday = new Date();
  month = this.dateToday.getMonth();  
  storedMonth:string | number;
  
  constructor(
    private router: Router,
    private taskService: TaskService,
    private calendarService: CalendarService,
    private elementRef: ElementRef
  ) {
    if (this.theme === 'dark') {
      this.isDarkMode = true;
    }
    else {
      this.isDarkMode = false;
    }
    console.log(this.isDarkMode)
  }

  setCurrentMonthToLocalStorage() {
    const today = new Date();
    const month = today.getMonth();
    localStorage.setItem('month', JSON.stringify(month))
  }

  return() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.daysInJanuary = this.calendarService.generateDaysInJanuary(2024);
    this.daysInFebruary = this.calendarService.generateDaysInFebruary(2024);
    this.daysInMarch = this.calendarService.generateDaysInMarch(2024);
    this.daysInApril = this.calendarService.generateDaysInApril(2024);
    this.daysInMay = this.calendarService.generateDaysInMay(2024);
    this.daysInJune = this.calendarService.generateDaysInJune(2024);
    this.daysInJuly = this.calendarService.generateDaysInJuly(2024);
    this.daysInAugust = this.calendarService.generateDaysInAugust(2024);
    this.daysInSeptember = this.calendarService.generateDaysInSeptember(2024);
    this.daysInOctober = this.calendarService.generateDaysInOctober(2024);
    this.daysInNovember = this.calendarService.generateDaysInNovember(2024);
    this.daysInDecember = this.calendarService.generateDaysInDecember(2024);

    this.subscription = this.calendarService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.refreshTasksByDate();
    });
    
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    if (this.february === true) {
      this.switchToFeb();
    }
    this.applyMonth();
  }
  ngAfterViewInit(): void {
    this.applyTheme();
    this.setCurrentMonthToLocalStorage();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshTasksByDate() {
    this.tasksByDate = this.calendarService.getTasksByDate(this.tasks);
  }

  getTasksForDate(date: string): Task[] {
    return this.tasksByDate[date] || [];
  }

  applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.darkMode2();
      console.log("dark mode applied")
    } else {
      this.lightMode2();
      console.log('light mpde applied')
    }
  }

  applyDate() {
    
  }

  applyMonth() {
    this.storedMonth = JSON.parse(localStorage.getItem('month'))

    if (this.month === 0) {
      this.switchToMay();
    }
    else if (this.month === 1) {
      this.switchToMay();
    }
    else if (this.month === 2) {
      this.switchToMay();
    }
    else if (this.month === 3) {
      this.switchToMay();
    }
    else if (this.month === 4) {
      this.switchToMay();
    }
    else if (this.month === 5) {
      this.switchToMay();
    }
    else if (this.month === 6) {
      this.switchToMay();
    }
    else if (this.month === 7) {
      this.switchToMay();
    }
    else if (this.month === 8) {
      this.switchToMay();
    }
    else if (this.month === 9) {
      this.switchToMay();
    }
    else if (this.month === 10) {
      this.switchToMay();
    }
    else if (this.month === 11) {
      this.switchToMay();
    }
  }

  darkMode2() {
    const body:HTMLElement = this.elementRef.nativeElement.querySelector('.body');
    body.classList.remove('body');
    body.classList.add('darkBody');

    const day: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.day');
    day.forEach(dayElement => {
      if (dayElement) {
        dayElement.classList.remove('day');
        dayElement.classList.add('night');
      }
    });

    const page: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.pageLight');
    page.forEach(page => {
      if (page) {
        page.classList.remove('pageLight');
        page.classList.add('pageDark');
      }
    });
    
    const week: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.week');
    console.log(week)
    week.forEach(weekElement => {
      if (weekElement) {
        weekElement.classList.remove('week');
        weekElement.classList.add('darkWeek');
      }
    });

    const footer:HTMLElement = this.elementRef.nativeElement.querySelector('.footer');
    footer.classList.remove('footer');
    footer.classList.add('darkFooter');
    
  }
  lightMode2() {
  
  }
  editTask(taskid: number) {
    this.router.navigate(['task/'+taskid], {queryParams: {edit: 'true'}});
  }
  switchToJan() {
    this.january = true;
    this.currentMonth = 'January'
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToFeb() {
    this.january = false;
    this.february = true;
    this.currentMonth = 'February'
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToMar() {
    this.january = false;
    this.february = false;
    this.march = true;
    this.currentMonth = 'March'
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  } 
  switchToApr() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = true;
    this.currentMonth = 'April'
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToMay() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = true;
    this.currentMonth = 'May'
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToJun() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = true;
    this.currentMonth = 'June'
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToJul() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = true;
    this.currentMonth = 'July'
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToAug() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = true;
    this.currentMonth = 'August'
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToSep() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = true;
    this.currentMonth = 'September'
    this.october = false;
    this.november = false;
    this.december = false;
  }
  switchToOct() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = true;
    this.currentMonth = 'October'
    this.november = false;
    this.december = false;
  }
  switchToNov() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = true;
    this.currentMonth = 'November'
    this.december = false;
  }
  switchToDec() {
    this.january = false;
    this.february = false;
    this.march = false;
    this.april = false;
    this.may = false;
    this.june = false;
    this.july = false;
    this.august = false;
    this.september = false;
    this.october = false;
    this.november = false;
    this.december = true;
    this.currentMonth = 'December'
  }
}
