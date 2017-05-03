import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';
import { FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../services/country/country.service';
import { Country } from '../models/country/country';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'edit-user',
    templateUrl: './edit-screen.component.html',
    styleUrls: ['./edit-screen.component.css']
})

export class EditScreenComponent implements OnInit {
    user: User;
    countries: Country[];


    editForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Surname: ['', Validators.required],
        Country: ['', Validators.required]
    });

    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private countryService: CountryService) { }

    ngOnInit(): void {
        this.getCountries();
        this.route.params
            .switchMap((params: Params) => this.userService.getUser(+params['id']))
            .subscribe(user => {
                this.user = user;
                this.editForm.setValue({
                    Name: this.user.Name,
                    Surname: this.user.Surname,
                    Country: this.user.Country
                });
            },
            error => console.log(error));
    };

    getCountries(): void {
        this.countryService.getCountries()
            .subscribe(countries => this.countries = countries,
            error => console.log(error));
    }

    update(): void {
        let updatedUser = this.editForm.value as User;
        updatedUser._id = this.user._id;
        this.userService.update(updatedUser)
            .subscribe(() => {
                this.router.navigate(['/users']);
            },
            error => console.log(error));
    };

    cancel(): void {
        this.router.navigate(['/users']);
    }
}
