let Login = require ('../functions/login');
let login;
let MainPage = require ('../functions/mainPage');
let mainPage;

const { browser, element } = require('protractor');
const {url} = require ('../data/userData.json');
const { async } = require('q');

var EC = protractor.ExpectedConditions;

describe('Login User', function () {
    beforeEach(function(done){
         login = new Login();
         mainPage = new MainPage();
         browser.waitForAngularEnabled(false);
         browser.get(url);
         browser.driver.manage().window().maximize();
         done();
    });


    afterEach(function(done){
        login.deleteCookies();
        done()
    })

    it('Login with a valid user', async(done)=>{
        await login.loginUser();
        await mainPage.loginSuccessful()
        done();
    });

    it('Login with an invalid user', async(done) =>{
        await login.invalidUser()
        done();
    });

    it('Logout form the home page', async (done) =>{
        await login.loginUser();
        await mainPage.loginSuccessful();
        await mainPage.logout();
        browser.wait(EC.visibilityOf(login.loginButton), 600);
        expect(login.loginButton.isPresent()).toBe(true)
        done();
    });

});