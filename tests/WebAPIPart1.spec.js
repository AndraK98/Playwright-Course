const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayload = {
  userEmail: "rahi.shet@example.com",
  userPassword: "RahiShet1!",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Place the order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  const productName = "zara coat 3";
  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink*='orders']").click();
  await page.locator("h1:has-text('Your Orders')").waitFor();

  const orderIdHistoryCount = await page
    .locator("table .ng-star-inserted [scope='row']")
    .count();

  for (let i = 0; i < orderIdHistoryCount; i++) {
    const id = await page
      .locator("table .ng-star-inserted [scope='row']")
      .nth(i)
      .textContent();
    console.log(id);
    if (response.orderId.includes(id)) {
      expect(response.orderId.includes(id)).toBeTruthy();
      break;
    }
  }
});

// Verify if order created is showing in history page
// Precondition - create order - get order ID
