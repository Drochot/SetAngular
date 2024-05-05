import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'play/:gameId', component: BoardComponent}

];
