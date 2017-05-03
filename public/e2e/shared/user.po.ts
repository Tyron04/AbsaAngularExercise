import { element, by, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class User {
    getContainer(): ElementFinder {
        return element(by.css('form'));
    }
    getNameInput(): ElementFinder {
        return element(by.css("input[formControlName=Name]"))
    }
    getSurnameInput(): ElementFinder {
        return element(by.css("input[formControlName=Surname]"))
    }
    getCountryInput(): ElementFinder {
        return element(by.css("select[formControlName=Country]"))
    }
     getCountries(): ElementArrayFinder {
        return element.all(by.css("select[formControlName=Country] option"))
    }
    getSubmitButton(): ElementFinder {
        return element(by.css('button[type=submit]'));
    }

    setNameInput(name: string): void {
        this.getNameInput().sendKeys(name);
    }
    setSurnameInput(surname: string): void {
        this.getSurnameInput().sendKeys(surname);
    }
    setCountryInput(country: string): void {
        this.getCountryInput().sendKeys(country);
    }
    
    submitForm(): promise.Promise<any> {
        return this.getSubmitButton().click();
    }
}