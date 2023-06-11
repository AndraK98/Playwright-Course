class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdownResults = page.locator(".ta-results");
    this.dropdownResult = this.dropdownResults.locator("button");
    this.submit = page.locator(".action__submit");
  }

  async searchForCountry(countryName) {
    await this.country.type(countryName, { delay: 100 });
    await this.dropdownResults.waitFor();
    const optionsCount = await this.dropdownResult.count();
    for (let i = 0; i < optionsCount; ++i) {
      if (
        (await this.dropdownResult.nth(i).textContent()).trim() === countryName
      ) {
        await this.dropdownResult.nth(i).click();
        break;
      }
    }
  }

  async navigateToConfirmation() {
    await this.submit.click();
  }

  async isCorrectAccount(username) {
    if (this.page.locator(".user__name label").textContent() === username) {
      return true;
    }
    return false;
  }
}

module.exports = { CheckoutPage };
