import { test as base } from 'playwright-test-coverage';

export const test = base.extend({
	async page({ page, javaScriptEnabled }, use) {
		const goto = page.goto;
		page.goto = async (...params) => {
			const res = await goto.apply(page, params);
			if (javaScriptEnabled !== false) {
				// Wait for hydration
				await page.locator('#svelte-announcer').waitFor();
			}
			return res;
		};
		await use(page);
	},
});
