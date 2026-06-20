import { test, expect } from '@playwright/test';
import { fazerLogin } from './helpers/auth';

test('CRUD completo de editora', async ({ page }) => {
    const nome = `Editora ${Date.now()}`;

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/cadastroEditora'
    );

    await page.fill('[name="nome"]', nome);

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

    await page.getByRole('button', {
        name: 'OK'
    }).click();

    await page.goto(
        'https://lumina.local/painel/editoras'
    );

    await expect(
        page.getByText(nome)
    ).toBeVisible();


    await page.getByText(nome)
        .locator('..')
        .getByRole('button', { name: /editar/i })
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

    await page.getByRole('button', {
        name: 'OK'
    }).click();

    await expect(
        page.getByText(`${nome} Editada`)
    ).toBeVisible();

    await page.getByText(`${nome} Editada`)
        .locator('..')
        .getByRole('button', { name: /excluir/i })
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

test('falha ao cadastrar editora sem nome', async ({ page }) => {
    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/cadastroEditora'
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

    await expect(page).toHaveURL(/cadastroEditora/);
});

test('falha ao editar editora removendo o nome', async ({ page }) => {
    const nome = `Editora ${Date.now()}`;

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/cadastroEditora'
    );

    await page.fill('[name="nome"]', nome);
    await page.fill('[name="descricao"]', 'Descrição teste');
    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/cadastrado com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await page.goto('https://lumina.local/painel/editoras');

    await page.getByText(nome)
        .locator('..')
        .getByRole('button', { name: /editar/i })
        .click();

    await page.fill('[name="nome"]', '');

    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/nome.*obrigatório/i)
    ).toBeVisible();

    await page.goto('https://lumina.local/painel/editoras');

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

