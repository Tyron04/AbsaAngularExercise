import { element, by, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Login {
    getContainer(): ElementFinder {
        return element(by.css('.loginForm'));
    }
    getUsernameInput(): ElementFinder {
        return element(by.css("input[formControlName=username]"))
    }
    getPasswordInput(): ElementFinder {
        return element(by.css("input[formControlName=password]"))
    }
    getSubmitButton(): ElementFinder {
        return element(by.css('button'));
    }
    login(): promise.Promise<any> {
        this.getUsernameInput().sendKeys('surajpal.tyron@gmail.com');
        this.getPasswordInput().sendKeys('P@$$w0rd');
        return this.getSubmitButton().click();
    }
}