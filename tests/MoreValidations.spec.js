const {test, expect} = require('@playwright/test');

// running tests in parallel, the other mode is 'serial', which is default with some modifications
test.describe.configure({mode:'parallel'});
test("Popup validations", async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    
    await page.locator("#confirmbtn").click();
    // dialog handling
    page.on("dialog", dialog => dialog.accept());

    await page.locator("#mousehover").hover();

    // working on different frames, new page object is created as a context
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    const subscribersNo = textCheck.split(" ")[1];
    console.log(subscribersNo);

})

test("Screenshot and Visual comparison", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

// Visual testing -> screenshot -store -> screenshot -> file-to-file comparison

test('@Web visual', async ({page}) => {
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})