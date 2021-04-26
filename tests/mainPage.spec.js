let Login = require ('../functions/login');
let login;
let MainPage = require ('../functions/mainPage');
let mainPage;

const { browser, element } = require('protractor');
const {url} = require ('../data/userData.json');
const {name, lastName, zip, yourCart} = require ('../data/generalData.json')
const {sauceLabsBackpack, sauceLabsBikeLight, sauceLabsFleeceJacket, itemsName, sauceLabsOnesie} = require ('../data/items.json');
const { async } = require('q');

var EC = protractor.ExpectedConditions;

describe('Main Page', function () {
    beforeEach(function(done){
         login = new Login();
         mainPage = new MainPage();
         browser.waitForAngularEnabled(false);
         browser.get(url);
         browser.driver.manage().window().maximize();
         browser.sleep(2000);
         done();
    });

    afterEach(function(done){
        login.deleteCookies();
        done()
    })

    it('Sort products by Price (low to high)', async (done) =>{
        await login.loginUser();
        await mainPage.loginSuccessful();
        await mainPage.sortProducts();
        done();
    });

    it('Add items to the shopping cart', async(done)=>{
        await login.loginUser();
        await mainPage.loginSuccessful();
        await mainPage.addItem(sauceLabsBackpack);
        await mainPage.addItem(sauceLabsBikeLight);
        await mainPage.addItem(sauceLabsFleeceJacket);
        await mainPage.shoppingCart.click();
        await mainPage.addedItem(itemsName[0]);
        await mainPage.addedItem(itemsName[1]);
        await mainPage.addedItem(itemsName[2]);
        done();
    });

    it('Add Sauce Labs Onesie', async(done)=>{
        await login.loginUser();
        await mainPage.loginSuccessful();
        await mainPage.addItemToShoppingCart(sauceLabsOnesie);
        await mainPage.addedItem(itemsName[3]);
        done();
    });

    it('Complete a purchase', async(done)=>{
        await login.loginUser();
        await mainPage.loginSuccessful();
        await mainPage.addItemToShoppingCart(sauceLabsOnesie);
        await mainPage.userGeneralInfo(name, lastName, zip);
        await mainPage.completePurchase()
        done();
    })

});