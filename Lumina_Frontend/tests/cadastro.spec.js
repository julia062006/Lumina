import { test, expect } from '@playwright/test';

test('cadastro de usuário com sucesso e exclusão da conta', async ({ page }) => {
    const email = 'emailteste@gmail.com';
    const senha = 'Teste123!';
    const cpf = '62967359017'

    await page.goto('https://lumina.local/cadastroUsuario');

    await page.getByPlaceholder('Digite seu nome')
        .fill('Usuário Teste');

    await page.getByPlaceholder('Digite seu email')
        .fill(email);

    await page.getByPlaceholder('Digite sua senha')
        .fill(senha);

    await page.getByPlaceholder('Confirme sua senha')
        .fill(senha);

    await page.getByPlaceholder('Digite seu CPF')
        .fill(cpf);

    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/Cadastro realizado com sucesso!/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();


    await expect(page).toHaveURL('https://lumina.local/entrar');

    await page.getByPlaceholder('Digite seu email')
        .fill(email);

    await page.getByPlaceholder('Digite sua senha')
        .fill(senha);

    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/sucesso!/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();


    await page.goto('https://lumina.local/perfil');

    await page.getByRole('button', { name: /excluir minha conta/i })
        .click();

    await page.getByRole('button', { name: 'Sim, excluir' })
        .click();

    await expect(
        page.getByText(/excluída com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(page).toHaveURL(/entrar/);
});

test('falha ao cadastrar usuário sem nome', async ({ page }) => {

    await page.goto('https://lumina.local/cadastroUsuario');

    await page.getByPlaceholder('Digite seu email')
        .fill('teste@gmail.com');

    await page.getByPlaceholder('Digite sua senha')
        .fill('Teste123!');

    await page.getByPlaceholder('Confirme sua senha')
        .fill('Teste123!');

    await page.getByPlaceholder('Digite seu CPF')
        .fill('52998224725');

    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText('O nome é obrigatório')
    ).toBeVisible();

});