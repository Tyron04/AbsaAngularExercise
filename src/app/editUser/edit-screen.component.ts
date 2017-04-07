import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../services/country/country.service';
import {Country} from '../models/country/country';

import 'rxjs/add/operator/switchMap'

@Component({
    selector: 'edit-user',
    templateUrl: './edit-screen.component.html',
    styleUrls: ['./edit-screen.component.css']
})

export class EditScreenComponent implements OnInit {
    user: User;
    countries: Country[];

    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private countryService: CountryService) { }

    editForm = this.formBuilder.group({
        name: ["", Validators.required],
        surname: ["", Validators.required],
        country: ["", Validators.required]
    });
    ngOnInit(): void {
        this.getCountries();
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(+params['id']))
            .subscribe(user => {
                this.user = user;
                this.editForm.setValue({
                    name: this.user.Name,
                    surname: this.user.Surname,
                    country: this.user.Country
                });
            });
    };

    getCountries(): void {
        this.countryService.getCountries().then(countries => this.countries = countries);
    }

    update(): void {
        var updatedUser = this.editForm.value as User;
        updatedUser.Id = this.user.Id;
        this.userService.update(updatedUser).then(() => {
            this.router.navigate(['/users']);
        });
    };

    cancel(): void {
        this.router.navigate(['/users']);
    }
}