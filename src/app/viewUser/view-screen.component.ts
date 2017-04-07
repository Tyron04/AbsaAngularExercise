import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';

@Component({
    selector: 'view-users',
    templateUrl: './view-screen.component.html',
    styles:[`.viewScreen
    {
        width:75%; 
        margin-left:5%;
    }
    `]
})

export class ViewScreenComponent implements OnInit {
    users: User[];

    constructor(private userService: UserService) { }
    ngOnInit(): void {
        this.userService.getUsers().then(users => this.users = users);
    }

}