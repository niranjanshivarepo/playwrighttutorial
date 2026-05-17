const { test, expect} = require('@playwright/test');

test("Calender Validations",async ({page})=>
{

    const monthNumber="03"
    const date="19"
    const year='2025'
    const expectedList=[monthNumber,date,year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("[class='react-date-picker__inputGroup']").click()
    await page.locator("[class='react-calendar__navigation__label']").click()
    await page.locator("[class='react-calendar__navigation__label']").click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click()
    await page.locator("//abbr[text()='"+date+"']").click();
    const inputs=page.locator("[class='react-date-picker__inputGroup']")

    for(let i=0;i<expectedList;++i){

       const value= await inputs.nth(i).inputValue()
       expect(value).expectedList([i])
    }






}

)