import { test, expect } from '@playwright/test';

test('usuário faz login com sucesso', async ({ page }) => {

    await page.goto('https://lumina.local/entrar');

    await page.getByPlaceholder('Digite seu email')
        .fill('mariana@gmail.com');

    await page.getByPlaceholder('Digite sua senha')
        .fill('Mariana123!');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('https://lumina.local/');
});

test('login com senha inválida', async ({ page }) => {

    await page.goto('https://lumina.local/entrar');

    await page.getByPlaceholder('Digite seu email')
        .fill('mariana@gmail.com');

    await page.getByPlaceholder('Digite sua senha')
        .fill('senhaerrada');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/entrar/);

    await expect(
        page.getByText('Email ou senha inválidos')
    ).toBeVisible();

});