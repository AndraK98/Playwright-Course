const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const loginPayload = {
  userEmail: "rahi.shet@example.com",
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

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63ca6e3f568c3e9fb1fd6044",
    async (route) => {
      // intercepting response - API Response -> { playwright fakeresponse} -> browser -> render data on front end
      const response = await page.request.fetch(route.request());
      let body = fakePayloadOrders;
      route.fulfill({
        response,
        body,
      });
    }
  );
  // to fake the call we need to first make the fake body and then execute a click to that page
  await page.locator("button[routerlink*='orders']").click();

  console.log(await page.locator(".mt-4").textContent());
});
