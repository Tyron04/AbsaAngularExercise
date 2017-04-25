import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CreateScreenComponent } from './create-screen.component';
import { CountryService } from '../services/country/country.service';
import { UserService } from '../services/user/user.service';
import { Country } from '../models/country/country';
import { User } from '../models/user/user';
import { Observable } from 'rxjs/Rx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpModule, ResponseOptions, Response, Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';

let comp: CreateScreenComponent;
let fixture: ComponentFixture<CreateScreenComponent>;
let de: DebugElement;
let el: HTMLElement;
let countries: Country[] = [{
    Id: 1,
    Name: 'South Africa'
},
{
    Id: 2,
    Name: 'Botswana'
},
{
    Id: 3,
    Name: 'Lesotho'
}];
let firstname = 'Tyron';
let surname = 'Surajpal';
let country = countries[0].Name;

let validUser = {
    name: firstname,
    surname: surname,
    country: country
};
let countriesElem: HTMLElement;
let mockAuthHttp: any;
let spy: any;
let mockRouter = {
    navigate: jasmine.createSpy('navigate')
}

describe('create user screen', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateScreenComponent], // declare the test component
            imports: [ReactiveFormsModule, FormsModule, HttpModule],
            providers: [CountryService,
                UserService,
                AUTH_PROVIDERS,
                { provide: Router, useValue: mockRouter },
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: any, options: any) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
                { provide: AuthHttp, useExisting: Http }],
        }).compileComponents().then(() => {        // compile template and css
            fixture = TestBed.createComponent(CreateScreenComponent);
            comp = fixture.componentInstance;

            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
            countriesElem = fixture.debugElement.query(By.css('select')).nativeElement;
            fixture.detectChanges();
        }).catch(error => console.error(error));
    }));


    describe('init', () => {
        it('should list the countries', async(inject([MockBackend], (mockBackend: any) => {
            mockBackend.connections.subscribe((conn: any) => {
                conn.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(countries)
                })));
            });
            fixture.whenStable().then(() => {
                comp.ngOnInit();
                fixture.detectChanges();
                expect(countriesElem.children.length).toBe(4); //Add one more for the "--Select Country--" option
            });

        })));
    });

    function populateForm(firstName: string, surname: string, country: string) {
        comp.createForm.controls['name'].setValue(firstName);
        comp.createForm.controls['surname'].setValue(surname);
        comp.createForm.controls['country'].setValue(country);
    }

    describe('populated values', () => {
        it('should update from the form', async(inject([MockBackend], (mockBackend: any) => {
            mockBackend.connections.subscribe((conn: any) => {
                conn.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(countries)
                })));
            });
            fixture.whenStable().then(() => {

                comp.ngOnInit();
                populateForm(firstname, surname, country);
                fixture.detectChanges();

                expect(comp.createForm.value).toEqual(validUser);
            });

        })));

        it('should create and return the new user', async(inject([MockBackend], (mockBackend: any) => {
            mockBackend.connections.subscribe((conn: any) => {
                if (conn.request.url.indexOf('/api/countries') > -1) {
                    conn.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(countries)
                    })));
                }
                if (conn.request.url.indexOf('/api/users') > -1) {
                    conn.mockRespond(new Response(new ResponseOptions({
                        status: 201,
                        body: JSON.stringify(validUser)
                    })));
                }
            });
            fixture.whenStable().then(() => {
                comp.ngOnInit();
                localStorage.setItem('id_token', '');
                populateForm(firstname, surname, country);
                comp.create();
                fixture.detectChanges();

                expect(comp.createForm.value).toEqual(validUser);
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/users']);
            });

        })));
    });


});