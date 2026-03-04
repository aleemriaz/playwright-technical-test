import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async selectCategory(category: 'Phones' | 'Laptops' | 'Monitors') {
    await this.page.getByRole('link', { name: category }).click();
  }

  async selectProduct(productName: string) {
    await this.page.locator('#tbodyid').getByRole('link', { name: productName }).click();
  }

  async goToCart() {
    await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
  }

  async goHome() {
    await this.page.getByRole('link', { name: 'Home (current)' }).click();
  }
}
