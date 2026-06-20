import { test, expect } from '@playwright/test';
import { fazerLogin } from './helpers/auth';

test('CRUD completo de coleção', async ({ page }) => {

    const nome = `Coleção ${Date.now()}`;

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/cadastroColecao'
    );

    await page.fill(
        '[name="nome"]',
        nome
    );

    await page.fill(
        '[name="descricao"]',
        'Descrição teste'
    );

    await page.locator(
        'button[type="submit"]'
    ).click();

    await expect(
        page.getByText(/cadastrado com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();


    await page.goto(
        'https://lumina.local/painel/colecao'
    );

    await expect(
        page.getByText(nome)
    ).toBeVisible();


    await page.getByText(nome)
        .locator('..')
        .getByRole('button', {
            name: /editar/i
        })
        .click();

    await page.fill(
        '[name="nome"]',
        `${nome} Editada`
    );

    await page.locator(
        'button[type="submit"]'
    ).click();

    await expect(
        page.getByText(/atualizada com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(
        page.getByText(`${nome} Editada`)
    ).toBeVisible();


    await page.getByText(`${nome} Editada`)
        .locator('..')
        .getByRole('button', {
            name: /excluir/i
        })
        .click();

    await page.getByRole('button', {
        name: 'Sim, excluir'
    }).click();

    await expect(
        page.getByText(/removida com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(
        page.getByText(`${nome} Editada`)
    ).not.toBeVisible();

});

test('falha ao cadastrar coleção sem nome', async ({ page }) => {
    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/cadastroColecao'
    );

    await page.fill(
        '[name="descricao"]',
        'Descrição teste'
    );

    await page.locator(
        'button[type="submit"]'
    ).click();

    await expect(
        page.getByText(/nome.*obrigatório/i)
    ).toBeVisible();

    await expect(page).toHaveURL(/cadastroColecao/);
});

test('falha ao editar coleção removendo o nome', async ({ page }) => {
    const nome = `Coleção ${Date.now()}`;

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/cadastroColecao'
    );

    await page.fill('[name="nome"]', nome);
    await page.fill('[name="descricao"]', 'Descrição teste');
    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/cadastrado com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await page.goto('https://lumina.local/painel/colecao');

    await page.getByText(nome)
        .locator('..')
        .getByRole('button', { name: /editar/i })
        .click();

    await page.fill('[name="nome"]', '');

    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/nome.*obrigatório/i)
    ).toBeVisible();

    await page.goto('https://lumina.local/painel/colecao');

    await page.getByText(nome)
        .locator('..')
        .getByRole('button', { name: /excluir/i })
        .click();

    await page.getByRole('button', { name: 'Sim, excluir' }).click();

    await expect(
        page.getByText(/removida com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();
});