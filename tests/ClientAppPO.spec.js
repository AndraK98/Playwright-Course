const { test, expect } = require("@playwright/test");
const { customtest } = require("../utils/test-base");
const { POManager } = require("../pageobjects/POManager");
// Json -> string -> js object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

for(const data of dataSet) {

test(`@Web Client App Login for ${data.productName}`, async ({ page }) => {
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.waitForItemsToLoad();
  expect(cartPage.isProductInCart(data.productName)).toBeTruthy();
  await cartPage.navigateToCheckout();

  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.searchForCountry("United States");
  expect(checkoutPage.isCorrectAccount(data.username)).toBeTruthy();
  await checkoutPage.navigateToConfirmation();

});
}

customtest(`Client App Login`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.waitForItemsToLoad();
  expect(cartPage.isProductInCart(testDataForOrder.productName)).toBeTruthy();
  await cartPage.navigateToCheckout();

  const checkoutPage = poManager.getCheckoutPage();
  await checkoutPage.searchForCountry("United States");
  expect(checkoutPage.isCorrectAccount(testDataForOrder.username)).toBeTruthy();
  await checkoutPage.navigateToConfirmation();

});
// test files will run in parallel
// inidividual tests in the file will run in sequence