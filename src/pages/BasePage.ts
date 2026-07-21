import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Навігація за відносним або абсолютним URL
   */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Очікування та безпечний клік по елементу
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Заповнення поля тексту з попереднім очищенням
   */
  async typeText(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Отримання тексту елемента
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() || '';
  }

  /**
   * Перевірка, чи елемент видимий на сторінці (без падіння тесту при timeout)
   */
  async isElementVisible(locator: Locator, timeout: number = 3000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Очікування зникнення елемента (наприклад, loader/spinner)
   */
  async waitForElementToDisappear(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Скрол до елемента
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Отримання поточного Title сторінки
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Отримання поточного URL сторінки
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Створення скріншота для звіту
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `./screenshots/${name}.png`, fullPage: true });
  }
}