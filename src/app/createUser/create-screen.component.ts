import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../services/country/country.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import {Country} from '../models/country/country';

@Component({
    selector: 'create-user',
    templateUrl: './create-screen.component.html',
    styleUrls:['./create-screen.component.css']
})

export class CreateScreenComponent implements OnInit {
    @Input() user: User;
    countries: Country[];

    constructor(private router: Router,
        private countryService: CountryService,
        private userService: UserService,
        private formBuilder: FormBuilder) { }

    createForm = this.formBuilder.group({
        name: ["", Validators.required],
        surname: ["", Validators.required],
        country: ["", Validators.required]
    });

    ngOnInit(): void {
        this.getCountries();
    };

    create(): void {
         this.userService.create(this.createForm.value as User).then(() => {
             this.router.navigate(['/users']);
        });
    };

    getCountries(): void {
        this.countryService.getCountries()
            .then(countries => this.countries = countries)
            .catch(error => console.log(error));
    };

    cancel(): void {
          this.router.navigate(['/users']);
    };

}