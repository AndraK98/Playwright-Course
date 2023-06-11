const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayload = {
  userEmail: "ra.hul@example.com",
  userPassword: "RahiShet1!",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};
// creating the fake response for empty cart, placing in the variable
const fakePayloadOrders = { data: [], message: "No Orders" };

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

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink*='orders']").click();
  
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63ce7b00568c3e9fb1ffa4c7",
  async route => await route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63ce78e2568c3e9fb1ffa04a'})
  );

  await page.locator("button:has-text('View')").first().click();
  await page.pause();

});
