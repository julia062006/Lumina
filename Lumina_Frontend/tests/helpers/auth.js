export async function fazerLogin(page) {

    await page.goto('https://lumina.local/entrar');

    await page.getByPlaceholder('Digite seu email')
        .fill('gilberto@gmail.com');

    await page.getByPlaceholder('Digite sua senha')
        .fill('Gilberto123!');

    await page.locator('button[type="submit"]').click();

    await page.waitForURL('https://lumina.local/');
}