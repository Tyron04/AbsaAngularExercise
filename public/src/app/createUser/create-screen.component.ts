import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../services/country/country.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Country } from '../models/country/country';

@Component({
    selector: 'create-user',
    templateUrl: './create-screen.component.html',
    styleUrls: ['./create-screen.component.css']
})

export class CreateScreenComponent implements OnInit {
    @Input() user: User;
    countries: Country[];

    createForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Surname: ['', Validators.required],
        Country: ['', Validators.required]
    });

    constructor(private router: Router,
        private countryService: CountryService,
        private userService: UserService,
        private formBuilder: FormBuilder) { }


    ngOnInit(): void {
        this.getCountries();
    };

    create(): void {
        console.log(this.createForm.value as User);
        this.userService.create(this.createForm.value)
            .subscribe(() => {
                this.router.navigate(['/users']);
            },
            error => console.log(error));
    };

    getCountries(): void {
        this.countryService.getCountries()
            .subscribe(countries => this.countries = countries as Country[],
            error => console.log(error));
    };

    cancel(): void {
        this.router.navigate(['/users']);
    };

}
