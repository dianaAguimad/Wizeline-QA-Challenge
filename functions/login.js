const { element } = require("protractor");
const { async } = require('q');

const {userName, password, invalidUser} = require ('../data/userData.json');
const {userErrorMessage} = require ('../data/generalData.json')
let EC = protractor.ExpectedConditions;

class Login {
    constructor() {
        this.userNameInput = element(by.id('user-name'));
        this.userPasswordInput = element(by.id('password'));
        this.loginButton = element(by.id('login-button'));
        this.errorMessage= element(by.tagName('h3'))
    
          this.loginUser = async ()  =>{
            await this.userNameInput.sendKeys(userName[0]);
            await this.userPasswordInput.sendKeys(password);
            this.loginButton.click();
        }
    
        this.invalidUser = async() =>{
            await this.userNameInput.sendKeys(invalidUser);
            await this.userPasswordInput.sendKeys(password);
            await this.loginButton.click()
            expect(this.errorMessage.getText()).toBe(userErrorMessage);
    
        }
    
        this.deleteCookies = async()=>{
            browser.executeScript('window.localStorage.clear();');
            browser.executeScript('window.sessionStorage.clear();');
            browser.driver.manage().deleteAllCookies();
        }
    }
    
}

module.exports = new Login();