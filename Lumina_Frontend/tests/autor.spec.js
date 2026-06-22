import { test, expect } from '@playwright/test';
import { fazerLogin } from './helpers/auth';


test('CRUD completo de autor', async ({ page }) => {

    const nome = `Autor ${Date.now()}`;

    await fazerLogin(page);


    await page.goto(
        'https://lumina.local/painel/cadastroAutor'
    );


    await page.fill(
        '[name="nome"]',
        nome
    );


    await page.fill(
        '[name="biografia"]',
        'Biografia teste do autor'
    );


    await page.setInputFiles(
        'input[type="file"]',
        'tests/fixtures/autorteste.jpg'
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
        'https://lumina.local/painel/autores'
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
        `${nome} Editado`
    );


    await page.fill(
        '[name="biografia"]',
        'Biografia editada'
    );


    await page.locator(
        'button[type="submit"]'
    ).click();


    await expect(
        page.getByText(/atualizado com sucesso/i)
    ).toBeVisible();


    await page.getByRole('button', {
        name: 'OK'
    }).click();


    await expect(
        page.getByText(`${nome} Editado`)
    ).toBeVisible();



    await page.getByText(`${nome} Editado`)
        .locator('..')
        .getByRole('button', {
            name: /excluir/i
        })
        .click();


    await page.getByRole('button', {
        name: 'Sim, excluir'
    }).click();


    await expect(
        page.getByText(/removido com sucesso/i)
    ).toBeVisible();


    await page.getByRole('button', {
        name: 'OK'
    }).click();


    await expect(
        page.getByText(`${nome} Editado`)
    ).not.toBeVisible();

});



test('falha ao cadastrar autor sem nome', async ({ page }) => {

    await fazerLogin(page);


    await page.goto(
        'https://lumina.local/painel/cadastroAutor'
    );


    await page.fill(
        '[name="biografia"]',
        'Biografia teste'
    );


    await page.setInputFiles(
        'input[type="file"]',
        'tests/fixtures/autorteste.jpg'
    );


    await page.locator(
        'button[type="submit"]'
    ).click();


    await expect(
        page.getByText(/nome.*obrigatório/i)
    ).toBeVisible();


    await expect(page)
        .toHaveURL(/cadastroAutor/);

});

test('falha ao editar autor sem nome', async ({ page }) => {

    const nome = `Autor ${Date.now()}`;

    await fazerLogin(page);

    await page.goto('https://lumina.local/painel/cadastroAutor');

    await page.fill(
        '[name="nome"]',
        nome
    );

    await page.fill(
        '[name="biografia"]',
        'Biografia teste'
    );

    await page.setInputFiles(
        'input[type="file"]',
        'tests/fixtures/autorteste.jpg'
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
        'https://lumina.local/painel/autores'
    );

    await page.getByText(nome)
        .locator('..')
        .getByRole('button', {
            name: /editar/i
        })
        .click();

    await page.fill(
        '[name="nome"]',
        ''
    );

    await page.locator(
        'button[type="submit"]'
    ).click();

    await expect(
        page.getByText(/nome.*obrigatório/i)
    ).toBeVisible();

    await page.goto(
        'https://lumina.local/painel/autores'
    );

    await page.getByText(nome)
        .locator('..')
        .getByRole('button', {
            name: /excluir/i
        })
        .click();

    await page.getByRole('button', {
        name: 'Sim, excluir'
    }).click();

    await expect(
        page.getByText(/removido com sucesso/i)
    ).toBeVisible();

    await page.getByRole('button', {
        name: 'OK'
    }).click();
});