const {yourCart, overview, successfulOrder, yourInfo, complete} = require ('../data/generalData.json')
const { element, browser } = require("protractor");
let EC = protractor.ExpectedConditions;
const { async } = require('q');


class MainPage {
    constructor(){
        this.logo = element(by.className("app_logo"));
        this.menuButton = element(by.id("react-burger-menu-btn"));
        this.logoutButton = element(by.id("logout_sidebar_link"));
        this.sortProductsDropDown = element(by.className("product_sort_container"));
        this.lowToHigh = element(by.xpath("//option[@value='lohi']"));
        this.itemPrice = element.all(by.className("inventory_item_price"));
        this.shoppingCart = element(by.className('shopping_cart_link'))
        this.title = element(by.className("title"));
        this.itemAddedToCart = element.all(by.className('inventory_item_name'));
        this.checkoutButton = element(by.id("checkout"));
        this.inputName = element(by.id("first-name"));
        this.inputLastName = element(by.id("last-name"));
        this.inputZip = element(by.id("postal-code"));
        this.continueButton  = element(by.id('continue'));
        this.finishButton = element(by.id("finish"));
        this.completeHeader = element(by.className("complete-header"));
    
        this.loginSuccessful = async ()=>{
            browser.wait(EC.visibilityOf(this.logo), 300);
            await expect(this.logo.isPresent()).toBe(true)
        }
    
        this.logout = async() => {
            browser.wait(EC.visibilityOf(this.menuButton), 300);
            await this.menuButton.click();
            browser.wait(EC.visibilityOf(this.logoutButton), 300);
            await this.logoutButton.click();
        }
    
        this.sortProducts = async() =>{
            await this.sortProductsDropDown.click();
            await this.lowToHigh.click();
             var itemPriceText = await this.itemPrice.map( async(price)=>{
                return price.getText();
            });
    
            for(let i =0; i<itemPriceText.length; i++){
                let j = i;
                 expect(itemPriceText[i] <= itemPriceText[j++]).toBe(true);
            }
        }
    
        this.addItem = async(itemName)=>{
            const item = element(by.id(`add-to-cart-${itemName}`));
            await item.click();
        }
    
        this.addedItem = async(itemName)=>{
            const itemN = element(by.xpath(`//div[text()= '${itemName}']`));
            expect(itemN.isPresent()).toBe(true);
    
        }
    
        this.addItemToShoppingCart = async(item)=>{
            await this.addItem(item);
            await this.shoppingCart.click();
            browser.wait(EC.visibilityOf(this.title), 300);
            await expect(this.title.getText()).toBe(yourCart)
        }
    
        this.userGeneralInfo = async(name, lastName, zip) =>{
            await this.checkoutButton.click();
            browser.wait(EC.visibilityOf(this.title), 300);
            await expect(this.title.getText()).toBe(yourInfo);
            await this.inputName.sendKeys(name);
            await this.inputLastName.sendKeys(lastName);
            await this.inputZip.sendKeys(zip);
        }
    
        this.completePurchase = async()=>{
            await this.continueButton.click();
            browser.wait(EC.visibilityOf(this.title), 300);
            await expect(this.title.getText()).toBe(overview);
            await this.finishButton.click();
            browser.wait(EC.visibilityOf(this.title), 300);
            await expect(this.title.getText()).toBe(complete);
            await expect(this.completeHeader.getText()).toBe(successfulOrder);
        }
    }
    
} 

module.exports = new MainPage();