const { test, expect } = require("@playwright/test");

test("@Web Browser Context Playwright Test", async ({ browser }) => {
  // initialization
  const context = await browser.newContext();
  const page = await context.newPage();
  // page.route('**/*.css', route => route.abort()); // abort network loading .css file
  // page.route('**/*.{jpg, png, jpeg}', route => route.abort()); // abort network loading images
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  // Listeners for request and response
  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  // css, xpath selectors
  // //input[@id='username'] - xpath
  await userName.type("rahulshetty");
  await page.locator("#password").type("learning");
  await signIn.click();

  //console.log(await page.locator("[style*='block']").textContent());

  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password."
  );
  // type - fill (for input) - fill will clear existing content in the text field

  await userName.fill("");
  await userName.fill("rahulshettyacademy");

  // race condition for the wait, since allTextContents() doesn't have auto-wait attached
  await Promise.all([page.waitForNavigation(), signIn.click()]);

  // console.log(await page.locator(".card-body a").first().textContent()); -> to get the first element
  // this particular locator has 4 elements on the page, it will cause strict violation error

  // --> console.log(await cardTitles.nth(0).textContent());

  // since the wait is automatic with specific elements, some tests will come out as flaky
  // if you don't read the documentation which particular functions have an auto-wait attached
  // for instance, allTextContent() doesn't have auto-wait, so it can potentially fail while
  // loading a page
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents']");

  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked()); // this returns a boolean value
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  // assertion

  //await page.pause();
});

test("Child windows handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents']");
  const userName = page.locator("#username");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(), // opens the link in a separate window, we have to switch focus to assert text there
  ]);

  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const domain = text.split("@")[1].split(" ")[0];
  console.log(domain);
  await userName.type(domain);
  //await page.pause();
  console.log(await userName.textContent());

});
