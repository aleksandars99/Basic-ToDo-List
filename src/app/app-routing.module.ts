import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';
import { TaskIDComponent } from './task-id/task-id.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

const routes: Routes = [
  {path: '', component: ToDoComponent},
  {path: 'toDoList', component: ToDoComponent},
  {path: 'task', component: TaskIDComponent},
  {path: 'task/:id', component: TaskIDComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'upcoming', component: UpcomingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
