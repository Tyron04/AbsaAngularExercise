import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardModule } from './auth-guard.module';

import { LoginComponent } from '../login/login.component';
import { CreateScreenComponent } from '../createUser/create-screen.component';
import { ViewScreenComponent } from '../viewUser/view-screen.component';
import { EditScreenComponent } from '../editUser/edit-screen.component';
import { FunParentComponent } from '../fun/fun-parent.component'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'create',
        component: CreateScreenComponent,
        canActivate: [AuthGuardModule]
    },
    {
        path: 'users',
        component: ViewScreenComponent,
        canActivate: [AuthGuardModule]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'edit/:id',
        component: EditScreenComponent,
        canActivate: [AuthGuardModule]
    },
    {
        path: 'fun',
        component: FunParentComponent,
        canActivate: [AuthGuardModule]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
