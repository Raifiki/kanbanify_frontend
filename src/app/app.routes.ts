import { Routes } from '@angular/router';

// components
import { RegistrationComponent } from './registration/registration.component';
import { KanbanComponent } from './kanban/kanban.component';

export const routes: Routes = [
    {path: '', redirectTo: 'board', pathMatch: 'full'},
    {path: 'board', component: KanbanComponent},
    {path: 'register', component: RegistrationComponent}
];
