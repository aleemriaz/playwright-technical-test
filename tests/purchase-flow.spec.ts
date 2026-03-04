import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Product Purchase Flow', () => {
  test('add single product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();
    await homePage.selectCategory('Phones');
    await homePage.selectProduct('Samsung galaxy s7');
    await productPage.verifyProduct('Samsung galaxy s7');
    await productPage.addToCart();

    await homePage.goToCart();
    await cartPage.verifyContains('Samsung galaxy s7');
  });

  test('purchase multiple products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goto();

    await homePage.selectCategory('Phones');
    await homePage.selectProduct('Samsung galaxy s7');
    await productPage.verifyProduct('Samsung galaxy s7');
    await productPage.addToCart();

    await homePage.goHome();

    await homePage.selectCategory('Laptops');
    await homePage.selectProduct('MacBook Pro');
    await productPage.verifyProduct('MacBook Pro', '$1100 *includes tax');
    await productPage.addToCart();

    await homePage.goToCart();
    await cartPage.verifyContains('Samsung galaxy s7', 'MacBook Pro');
    await cartPage.verifyTotalPrice(1900);
    await cartPage.placeOrder();

    await checkoutPage.fillOrder({
      name: 'James Smith',
      country: 'United Kingdom',
      city: 'London',
      card: '098765432123456',
      month: '11',
      year: '28',
    });
    await checkoutPage.purchase();
    await checkoutPage.verifyConfirmation();
  });

  test('verify product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await homePage.selectCategory('Laptops');
    await homePage.selectProduct('MacBook Pro');
    await productPage.verifyProduct('MacBook Pro', '$1100 *includes tax');
  });
});
