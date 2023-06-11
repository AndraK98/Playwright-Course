class CartPage {
    constructor(page){
        this.page = page;
        this.cartProducts = page.locator("div li");
        this.myProduct = page.locator("h3:has-text('zara coat 3')");
        this.checkout = page.locator("button:has-text('Checkout')");
    }

    async waitForItemsToLoad(){
        await this.cartProducts.first().waitFor();
    }

    async isProductInCart(myProduct){
        return await this.page.locator(`h3:has-text('${myProduct}')`).isVisible();
    }

    async navigateToCheckout(){
        await this.checkout.click();
    }

}

module.exports = {CartPage};