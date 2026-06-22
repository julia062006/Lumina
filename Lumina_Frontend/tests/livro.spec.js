import { test, expect } from '@playwright/test';
import { fazerLogin } from './helpers/auth';


test('CRUD completo de livro', async ({ page }) => {

    const titulo = `Livro ${Date.now()}`;


    await fazerLogin(page);


    await page.goto(
        'https://lumina.local/painel/cadastroLivro'
    );


    await page.fill(
        '[name="titulo"]',
        titulo
    );


    await page.fill(
        '[name="descricao"]',
        'Descrição teste do livro'
    );


    await page.fill(
        '[name="preco"]',
        '59,90'
    );

    await page.locator(
        '[name="id_autor"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="id_categoria"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="id_editora"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="id_colecao"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="destaque"]'
    ).selectOption('true');


    await page.setInputFiles(
        '[name="capa_imagem"]',
        'tests/fixtures/capa.jpg'
    );

    await page.setInputFiles(
        '[name="arquivo_pdf"]',
        'tests/fixtures/livro.pdf'
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
        'https://lumina.local/painel/livros'
    );


    await expect(
        page.getByText(titulo)
    ).toBeVisible();


    await page.getByText(titulo)
        .locator('..')
        .getByRole('button', {
            name: /editar/i
        })
        .click();


    await page.fill(
        '[name="titulo"]',
        `${titulo} Editado`
    );


    await page.fill(
        '[name="descricao"]',
        'Descrição editada'
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
        page.getByText(`${titulo} Editado`)
    ).toBeVisible();


    await page.getByText(`${titulo} Editado`)
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
        page.getByText(`${titulo} Editado`)
    ).not.toBeVisible();

});




test('falha ao cadastrar livro sem título', async ({ page }) => {

    await fazerLogin(page);


    await page.goto(
        'https://lumina.local/painel/cadastroLivro'
    );


    await page.fill(
        '[name="descricao"]',
        'Descrição teste'
    );


    await page.fill(
        '[name="preco"]',
        '50'
    );


    await page.locator(
        '[name="id_autor"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="id_categoria"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="id_editora"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="destaque"]'
    ).selectOption('true');


    await page.locator(
        'button[type="submit"]'
    ).click();


    await expect(
        page.getByText(/título.*obrigatório/i)
    ).toBeVisible();


    await expect(page)
        .toHaveURL(/cadastroLivro/);

});




test('falha ao cadastrar livro sem capa', async ({ page }) => {

    await fazerLogin(page);


    await page.goto(
        'https://lumina.local/painel/cadastroLivro'
    );


    await page.fill(
        '[name="titulo"]',
        `Livro ${Date.now()}`
    );


    await page.fill(
        '[name="descricao"]',
        'Descrição teste'
    );


    await page.fill(
        '[name="preco"]',
        '50'
    );


    await page.locator(
        '[name="id_autor"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="id_categoria"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="id_editora"]'
    ).selectOption({
        index: 1
    });


    await page.locator(
        '[name="destaque"]'
    ).selectOption('true');


    await page.locator(
        'button[type="submit"]'
    ).click();


    await expect(
        page.getByText(/obrigatórios/i)
    ).toBeVisible();

});