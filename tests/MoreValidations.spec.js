import {test, expect} from '@playwright/test';

test("Testing own", async ({page})=>{

    await page.goto("https://www.google.com/");
    await page.locator("[class='gLFyf']").fill("Jai Hanuman");
    await page.pause()

    



})

test("Popup Validations", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect( page.locator("[id='displayed-text']")).toBeVisible();
    await page.locator("[id='hide-textbox']").click()
    await expect( page.locator("[id='displayed-text']")).toBeHidden()
    //await page.pause()
    page.on('dialog',dialog => dialog.accept());
    await page.locator("[value='Confirm']").click()
   // await page.pause()
   await page.locator("#mousehover").hover()
   const framesPage= page.frameLocator("[id='courses-iframe']")
   await framesPage.locator("li [href*='lifetime-access']:visible").click()

   const textonit=await framesPage.locator("[class='text'] h2").textContent()
   console.log(textonit.split(" ")[1])




   


})


test("Screenshot & Visual Comparison", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect( page.locator("[id='displayed-text']")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path : 'partialscreenshot.png'})
    await page.locator("[id='hide-textbox']").click()

    await page.screenshot({path : "screenshot.png"})
    await expect( page.locator("[id='displayed-text']")).toBeHidden()
    



   


})


test.only('Visual test',async ({page})=>{

    await page.goto("https://www.flightaware.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing.png')


})