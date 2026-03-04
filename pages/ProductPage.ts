import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async verifyProduct(name: string, priceHeading?: string) {
    await expect(this.page.locator('h2')).toContainText(name);
    await expect(this.page.locator('#imgp img')).toBeVisible();
    if (priceHeading) {
      await expect(this.page.getByRole('heading', { name: priceHeading })).toBeVisible();
    }
  }

  async addToCart() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
    const dialog = await dialogPromise;
    await dialog.dismiss();
  }
}
