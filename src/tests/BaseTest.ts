import { test as baseTest } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage'; // переконайся, що шлях правильний

// Оголошуємо типи фікстур (сторінок), які будуть доступні в тестах
type MyFixtures = {
  searchPage: GoogleSearchPage;
};

export const test = baseTest.extend<MyFixtures>({
  searchPage: async ({ page }, use) => {
    // Автоматично створюємо об'єкт сторінки
    const searchPage = new GoogleSearchPage(page);
    // Передаємо його в тест
    await use(searchPage);
  },
});

export { expect } from '@playwright/test';