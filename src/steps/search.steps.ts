import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { World } from '../support/world';

Given('the application is loaded successfully', async function(this: World) {
    try {
        await this.page.goto(process.env.BASE_URL || 'https://www.udacity.com/catalog', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        
        // Wait for a specific element that indicates the page is ready
        await this.page.waitForSelector('.catalog-container', {
            state: 'visible',
            timeout: 30000
        });
    } catch (error) {
        console.error('Failed to load page:', error);
        throw error;
    }
});

Given('the user searches for {string}', async function(this: World, searchTerm: string) {
    this.searchTerm = searchTerm;
    // Wait for search box to be visible
    const searchBox = this.page.getByRole('searchbox');
    await searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await searchBox.fill(searchTerm);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
});

Given('the user clicks on the {string} dropdown', async function(this: World, dropdownName: string) {
    const dropdown = this.page.getByRole('button', { name: dropdownName });
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await dropdown.click();
    await this.page.waitForLoadState('networkidle');
});

When('the user searches for {string} in the Skill dropdown', async function(this: World, skillName: string) {
    const searchInput = this.page.getByPlaceholder('Search skills...');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill(skillName);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
});

Then('the user sees results matching the search term in the UI', async function(this: World) {
    const results = this.page.getByTestId('search-result');
    await results.first().waitFor({ state: 'visible', timeout: 10000 });
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
});

Then('the user fetches search results from the API', async function(this: World) {
    const apiResponse = await this.page.waitForResponse(
        response => response.url().includes('/api/search'),
        { timeout: 10000 }
    );
    this.apiResults = await apiResponse.json();
    expect(this.apiResults).toBeDefined();
});

Then('the UI results should match the API results', async function(this: World) {
    const uiResults = await this.page.getByTestId('search-result').allTextContents();
    expect(uiResults.length).toEqual(this.apiResults.length);
    expect(uiResults).toEqual(this.apiResults.map((result: any) => result.title));
});

Then('the user should see a {string} message', async function(this: World, message: string) {
    const noResultsMessage = this.page.getByText(message);
    await noResultsMessage.waitFor({ state: 'visible', timeout: 10000 });
    await expect(noResultsMessage).toBeVisible();
});

