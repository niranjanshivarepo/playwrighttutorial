const {test, expect}= require('@playwright/test');

test('Browser context Playwright test',async ({browser})=>{

    const context= await browser.newContext();
    const page=await context.newPage();
    const username=page.locator('#username');
    const signIn=page.locator("#signInBtn")
    const cardTitles=page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css, xpath
    await page.locator('#username').fill("Niranjan")
    await page.locator("[type='password']").fill("Learning@830$3mK2")
    await page.locator("#signInBtn").click()
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click()
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.nth(1).textContent())
    const allTitles=await cardTitles.allTextContents()
    console.log(allTitles)


    
    


} );


test('Page Playwright test',async ({page})=>{

    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");


} );

test('UI Controls',async ({page})=>{

    const username=page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy")
    await page.locator("[type='password']").fill("Learning@830$3mK2")
    const checkbox=page.locator("span.checkmark").last()
    await checkbox.click()
    await page.locator("[id='okayBtn']").click()
    const dropdown=page.locator('select.form-control')
    await dropdown.selectOption("consult")
    await page.locator("[id='terms']").click()
    await page.locator("[id='terms']").uncheck()
    await page.locator("[name='signin']").click()
    
    const documentLink = page.locator("[href*='documents-request']")
    await expect(documentLink).toHaveAttribute("class","blinkingTexts")



    
    

    


    


} );


test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 }
);


 