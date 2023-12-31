import test, { expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("REST Countries API App");
});

test("searching for a country shows the correct result and directs to the page for more info", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Search for country").click();
  await page.getByLabel("Search for country").fill("Baha");
  await page.getByRole("link", { name: "The flag of the Bahamas is" }).click();
  await page.getByText("Commonwealth of the Bahamas").first().click();
  await page.getByText("Currencies:").click();
  await page.getByText("Bahamian dollar").click();
});

test("clicking on the button loads more countries", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "View More" }).click();
});

test("clicking the region in the filter menu shows the correct results", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Filter by Region" }).click();
  await page.getByRole("menuitem", { name: "Oceania" }).click();
});
