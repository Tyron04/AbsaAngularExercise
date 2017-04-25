"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var create_screen_component_1 = require("./create-screen.component");
var country_service_1 = require("../services/country/country.service");
var user_service_1 = require("../services/user/user.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var angular2_jwt_1 = require("angular2-jwt");
var comp;
var fixture;
var de;
var el;
var countries = [{
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
var firstname = 'Tyron';
var surname = 'Surajpal';
var country = countries[0].Name;
var validUser = {
    name: firstname,
    surname: surname,
    country: country
};
var countriesElem;
var mockAuthHttp;
var spy;
var mockRouter = {
    navigate: jasmine.createSpy('navigate')
};
describe('create user screen', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [create_screen_component_1.CreateScreenComponent],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule, http_1.HttpModule],
            providers: [country_service_1.CountryService,
                user_service_1.UserService,
                angular2_jwt_1.AUTH_PROVIDERS,
                { provide: router_1.Router, useValue: mockRouter },
                testing_2.MockBackend,
                http_1.BaseRequestOptions,
                {
                    provide: http_1.Http,
                    useFactory: function (backend, options) { return new http_1.Http(backend, options); },
                    deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                },
                { provide: angular2_jwt_1.AuthHttp, useExisting: http_1.Http }],
        }).compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(create_screen_component_1.CreateScreenComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(platform_browser_1.By.css('form'));
            el = de.nativeElement;
            countriesElem = fixture.debugElement.query(platform_browser_1.By.css('select')).nativeElement;
            fixture.detectChanges();
        }).catch(function (error) { return console.error(error); });
    }));
    describe('init', function () {
        it('should list the countries', testing_1.async(testing_1.inject([testing_2.MockBackend], function (mockBackend) {
            mockBackend.connections.subscribe(function (conn) {
                conn.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify(countries)
                })));
            });
            fixture.whenStable().then(function () {
                comp.ngOnInit();
                fixture.detectChanges();
                expect(countriesElem.children.length).toBe(4); //Add one more for the "--Select Country--" option
            });
        })));
    });
    function populateForm(firstName, surname, country) {
        comp.createForm.controls['name'].setValue(firstName);
        comp.createForm.controls['surname'].setValue(surname);
        comp.createForm.controls['country'].setValue(country);
    }
    describe('populated values', function () {
        it('should update from the form', testing_1.async(testing_1.inject([testing_2.MockBackend], function (mockBackend) {
            mockBackend.connections.subscribe(function (conn) {
                conn.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify(countries)
                })));
            });
            fixture.whenStable().then(function () {
                comp.ngOnInit();
                populateForm(firstname, surname, country);
                fixture.detectChanges();
                expect(comp.createForm.value).toEqual(validUser);
            });
        })));
        it('should create and return the new user', testing_1.async(testing_1.inject([testing_2.MockBackend], function (mockBackend) {
            mockBackend.connections.subscribe(function (conn) {
                if (conn.request.url.indexOf('/api/countries') > -1) {
                    conn.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        body: JSON.stringify(countries)
                    })));
                }
                if (conn.request.url.indexOf('/api/users') > -1) {
                    conn.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 201,
                        body: JSON.stringify(validUser)
                    })));
                }
            });
            fixture.whenStable().then(function () {
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
//# sourceMappingURL=create-screen.component.spec.js.map