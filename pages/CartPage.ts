import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CartPage {
  constructor(private page: Page) {}

  async verifyContains(...productNames: string[]) {
    for (const name of productNames) {
      await expect(this.page.locator('#tbodyid')).toContainText(name);
    }
  }

  async getTotalPrice(): Promise<number> {
    const totalText = await this.page.locator('#totalp').textContent();
    return parseInt(totalText || '0');
  }

  async verifyTotalPrice(expectedTotal: number) {
    await expect(this.page.locator('#totalp')).toHaveText(expectedTotal.toString());
  }

  async placeOrder() {
    console.log(`Cart session: ${faker.string.uuid()}`);
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }
}
