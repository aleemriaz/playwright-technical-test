import { Page, expect } from '@playwright/test';

export interface OrderDetails {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
}

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillOrder(details: OrderDetails) {
    await this.page.locator('#name').fill(details.name);
    await this.page.locator('#country').fill(details.country);
    await this.page.locator('#city').fill(details.city);
    await this.page.locator('#card').fill(details.card);
    await this.page.locator('#month').fill(details.month);
    await this.page.locator('#year').fill(details.year);
  }

  async purchase() {
    await this.page.getByRole('button', { name: 'Purchase' }).click();
  }

  async verifyConfirmation() {
    await expect(this.page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
    await expect(this.page.locator('body')).toContainText('Thank you for your purchase!');
    await this.page.getByRole('button', { name: 'OK' }).click();
  }
}
