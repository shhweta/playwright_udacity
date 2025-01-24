import { type Page } from 'playwright';

class SearchPage {
  private page : Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Elements
  private searchInput = '#search-input';
  private skillDropdown = '#skill-dropdown';
  private searchButton = '#search-button';
  private noResultsMessage = '#no-results-message';
  private resultList = '#result-list .result-item';

  // Actions
  async searchFor(term: string) {
    await this.page.fill(this.searchInput, term);
    await this.page.click(this.searchButton);
  }

  async selectSkillDropdown() {
    await this.page.click(this.skillDropdown);
  }

  // Get UI Results
  async getUIResults() {
    return await this.page.$$(this.resultList).then((items: any) =>
      Promise.all(
        items.map(async (item: any) => ({
          title: await item.$eval('.result-title', (el: any) => el.textContent),
          description: await item.$eval('.result-description', (el: any) => el.textContent),
        }))
      )
    );
  }

  // Get No Results Message
  async getNoResultsMessage() {
    return await this.page.textContent(this.noResultsMessage);
  }
}

export default SearchPage;