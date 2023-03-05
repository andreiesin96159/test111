const puppeteer = require('puppeteer');

async function getItems() {
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
page.on('dialog', async dialog => {
console.log("massage:", dialog.message());
dialog.dismiss();
});
await page.goto('https://www.demoblaze.com/index.html');
const clickLaptops = await page.waitForXPath("//a[contains(text(), 'Laptops')]");
await clickLaptops.click();
const clickSony = await page.waitForXPath("//a[contains(text(), 'Sony vaio i5')]");
await clickSony.click();
const clickAdd = await page.waitForXPath("//a[contains(text(), 'Add to cart')]");
await clickAdd.click();
await page.waitForTimeout(2000);

const clickLogo = await page.waitForXPath("//a[@class='navbar-brand']");
await clickLogo.click();
const clickLaptops2 = await page.waitForXPath("//a[contains(text(), 'Laptops')]");
await clickLaptops2.click();
const clickDell = await page.waitForXPath("//a[contains(text(), 'Dell i7 8gb')]");
await clickDell.click();
const clickAddDell = await page.waitForXPath("//a[contains(text(), 'Add to cart')]");
await clickAddDell.click();
await page.waitForTimeout(2000);

const clickCart = await page.waitForXPath("//a[contains(text(), 'Cart')]");
await clickCart.click();
const clickDelete = await page.waitForXPath("/html/body/div[6]/div/div[1]/div/table/tbody/tr[1]/td[4]/a"); //не надежный способ
await clickDelete.click();
await page.waitForTimeout(2000);
const clickOrder = await page.waitForXPath("//button[contains(text(), 'Place Order')]");
await clickOrder.click();
await page.waitForTimeout(100); //Дожидаемся когда форма раскроется
const clickInputName = await page.waitForXPath("//input[@id='name']"); // Поиск поля имени
await page.waitForTimeout(100); //Пауза перед заполнение
await clickInputName.type('Kate'); //Заполнение поля с именем
const clickInputCountry = await page.waitForXPath("//input[@id='country']");
await clickInputCountry.type('Russia');
const clickInputCity = await page.waitForXPath("//input[@id='city']");
await clickInputCity.type('Tolyatti');
const clickInputCard = await page.waitForXPath("//input[@id='card']");
await clickInputCard.type('4111111111111111');
const clickInputMonth = await page.waitForXPath("//input[@id='month']");
await clickInputMonth.type('4');
const clickInputYear = await page.waitForXPath("//input[@id='year']");
await clickInputYear.type('4');

const clickPurchase = await page.waitForXPath("//button[contains(text(), 'Purchase')]");
await clickPurchase.click();




const priceCart = await page.waitForXPath("//h3[@id='totalp']");
const priceCartValue = await page.evaluate(el => el.textContent, priceCart);
console.log('priceCart=', priceCartValue);

const priceOrder = await page.waitForXPath("/html/body/div[10]/p/text()[2]");
const priceOrderValue = await page.evaluate(el => el.textContent, priceOrder);
const priceOrderValue2 = priceOrderValue.slice(8, 11);
console.log('priceOrderValue=', priceOrderValue2);

if (priceCartValue === priceOrderValue2) {
console.log('priceCartValue === priceOrderValue2')
const clickOk = await page.waitForXPath("//button[contains(text(), 'OK')]");
await clickOk.click();
} else {
console.log('eror price');

}

await page.waitForTimeout(200);

browser.close();
}

getItems();