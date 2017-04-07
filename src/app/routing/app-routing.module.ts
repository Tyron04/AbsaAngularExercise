import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { CreateScreenComponent } from '../createUser/create-screen.component';
import { ViewScreenComponent } from '../viewUser/view-screen.component';
import { EditScreenComponent } from '../editUser/edit-screen.component';
import {FunParentComponent} from '../fun/fun-parent.component'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'create',
        component: CreateScreenComponent
    },
    {
        path: 'users',
        component: ViewScreenComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'edit/:id',
        component: EditScreenComponent
    },
    {
        path: 'fun',
        component: FunParentComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
