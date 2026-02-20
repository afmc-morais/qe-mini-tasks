import { test, expect } from "@playwright/test";

const email = process.env.E2E_EMAIL || "demo@qe-mini-tasks.com";
const password = process.env.E2E_PASSWORD || "demo123";

test.describe("Auth - Smoke", () => {
    test("should redirect unauthenticated users to /login", async ({ page }) => {
        await page.goto("/app/tasks");
        await expect(page).toHaveURL(/\/login/);
        await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
    });

    test("should login and access protected area", async ({ page }) => {
        await page.goto("/login");

        await page.getByLabel("Email").fill(email);
        await page.getByLabel("Password").fill(password);
        await page.getByRole("button", { name: "Sign in" }).click();

        await expect(page).toHaveURL(/\/app\/tasks/);
        await expect(page.getByRole("heading", { name: "Your Tasks" })).toBeVisible();
    });

    test("should keep session after navigation", async ({ page }) => {
        // login
        await page.goto("/login");
        await page.getByLabel("Email").fill(email);
        await page.getByLabel("Password").fill(password);
        await page.getByRole("button", { name: "Sign in" }).click();
        await expect(page).toHaveURL(/\/app\/tasks/);

        // navigate away and back
        await page.goto("/app/tasks");
        await expect(page.getByRole("heading", { name: "Your Tasks" })).toBeVisible();
    });

    test("should logout and lose access to protected area", async ({ page }) => {
        await page.goto("/login");
        await page.getByLabel("Email").fill(email);
        await page.getByLabel("Password").fill(password);
        await page.getByRole("button", { name: "Sign in" }).click();
        await expect(page).toHaveURL(/\/app\/tasks/);

        await page.getByRole("button", { name: "Logout" }).click();
        await expect(page).toHaveURL(/\/login/);

        // Try to access protected area again
        await page.goto("/app/tasks");
        await expect(page).toHaveURL(/\/login/);
    });

});
