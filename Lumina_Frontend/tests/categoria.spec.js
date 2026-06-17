import { test, expect } from '@playwright/test';
import { fazerLogin } from './helpers/auth';

test('criar categoria com sucesso', async ({ page }) => {

    await fazerLogin(page);

    await page.goto('https://lumina.local/painel/cadastroCategoria');

    await page.fill('[name="nome"]', 'Categoria Teste');

    await page.fill(
        '[name="descricao"]',
        'Descrição da categoria'
    );

    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/sucesso/i)
    ).toBeVisible();

});

test('falha ao criar categoria sem nome', async ({ page }) => {

    await fazerLogin(page);

    await page.goto('https://lumina.local/painel/cadastroCategoria');

    await page.fill(
        '[name="descricao"]',
        'Descrição teste'
    );

    await page.locator('button[type="submit"]').click();

    await expect(
        page.getByText(/obrigatório/i)
    ).toBeVisible();

});

test('listar categorias com sucesso', async ({ page }) => {

    await page.goto(
        'https://lumina.local/categorias'
    );

    await expect(
        page.getByRole('heading', {
            name: 'CATEGORIAS'
        })
    ).toBeVisible();

    await expect(
        page.locator('button').first()
    ).toBeVisible();

});

test('falha ao listar categorias', async ({ page }) => {

    await page.route(
        '**/api/categorias',
        route => route.abort()
    );

    await page.goto(
        'https://lumina.local/categorias'
    );

    await expect(
        page.getByText(
            'Não foi possível carregar as categorias.'
        )
    ).toBeVisible();

});

test('editar categoria com sucesso', async ({ page }) => {

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/categorias'
    );

    await page.getByRole('button', {
        name: /editar/i
    }).first().click();

    await page.fill(
        '[name="nome"]',
        'Categoria Editada'
    );

    await page.locator(
        'button[type="submit"]'
    ).click();

    await expect(
        page.getByText(/atualizada/i)
    ).toBeVisible();

});

test('falha ao editar categoria sem nome', async ({ page }) => {

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/categorias'
    );

    await page.getByRole('button', {
        name: /editar/i
    }).first().click();

    await page.fill(
        '[name="nome"]',
        ''
    );

    await page.locator(
        'button[type="submit"]'
    ).click();

    await expect(
        page.getByText(/obrigatório/i)
    ).toBeVisible();

});

test('excluir categoria com sucesso', async ({ page }) => {

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/categorias'
    );

    const categoria = page.getByText(
        'Categoria Teste'
    );

    await expect(categoria).toBeVisible();

    await page.getByRole('button', {
        name: /excluir/i
    }).last().click();

    await page.getByRole('button', {
        name: 'Sim, excluir'
    }).click();

    await expect(categoria)
        .not.toBeVisible();

});

test('cancelar exclusão da categoria', async ({ page }) => {

    await fazerLogin(page);

    await page.goto(
        'https://lumina.local/painel/categorias'
    );

    const categoria = page.getByText(
        'Categoria Editada'
    );

    await expect(categoria).toBeVisible();

    await page.getByRole('button', {
        name: /excluir/i
    }).first().click();

    await page.getByRole('button', {
        name: /cancelar/i
    }).click();

    await expect(categoria).toBeVisible();

});