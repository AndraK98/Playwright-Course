// Login UI -> .json
// test, cart-order, order details, order history
const { test, expect } = require("@playwright/test");

let webContext;

// storing all cookies in beforeAll so that the context can be used in all test cases 
test.beforeAll( async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("rahi.shet@example.com");
    await page.locator("#userPassword").fill("RahiShet1!");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    // storing all cookies on a project level
    await context.storageState({path: 'state.json'});

    webContext = await browser.newContext({storageState: 'state.json'});
})

test("Test Case 2`", async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
}
)

test("Client App Login", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  // Zara Coat 3
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    // chaining the scope of search, the locator call below will only search within
    // products locator child tags (everything within div .card-body in this case)
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // add that product to cart
      await products.nth(i).locator("text='Add To Cart'").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  // creating a wait until the products are loaded in the cart page using waitFor()
  await page.locator("div li").first().waitFor();
  // pseudo class
  const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); // this has two checks, if its h3, and has txt

  expect(bool).toBeTruthy();

  await page.locator("button:has-text('Checkout')").click();
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    if ((await dropdown.locator("button").nth(i).textContent()) === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name label")).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='orders']").click();
  await page.locator("h1:has-text('Your Orders')").waitFor();

  const orderIdHistoryCount = await page
    .locator("table .ng-star-inserted [scope='row']")
    .count();

  
  
  for(let i = 0; i < orderIdHistoryCount; i++){
    const id = await page.locator("table .ng-star-inserted [scope='row']").nth(i).textContent();
    console.log(id);
    if(orderId.includes(id)){
      console.log("actual id: " + id + " target id: " + orderId);
      expect(orderId.includes(id)).toBeTruthy();
      break;
    }
  }
});
