const { test, expect } = require('@playwright/test');
 
 
 
 
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerlink*='/dashboard/cart']").click()
   await page.locator("div li").first().waitFor()
   const bool=page.locator("h3:has-text('ZARA COAT 3')").isVisible()
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click()
   await page.locator("[placeholder*='Select Country']").pressSequentially("ind",{delay : 100})
   const dropdown=page.locator("[class*='ta-results']")
   await dropdown.waitFor()
   const optionsCount= await dropdown.locator("button").count()
   for(let i =0;i<optionsCount;++i){

      const text=await dropdown.locator("button").nth(i).textContent()
      if(text===" India"){
         await dropdown.locator("button").nth(i).click()
         break

      }
   }
   expect ( page.locator("[class='user__name mt-5'] [type='text']").first()).toHaveText(email)
   await page.locator("[class='btnn action__submit ng-star-inserted']").click()
   expect(page.locator("[class='hero-primary']")).toHaveText(" Thankyou for the order. ")
   const orderID=await page.locator("[class='em-spacer-1'] [class='ng-star-inserted']").textContent()
   await console.log(orderID)
   await page.locator("li [routerlink='/dashboard/myorders']").click()
   await page.locator("tbody").waitFor()
   const rows=await page.locator("tbody tr")

   for( let i=0;i< await rows.count();++i){

      const rowOrderId=await rows.nth(i).locator("th").textContent()
      if(orderID.includes(rowOrderId)){
         await rows.nth(i).locator("button").first().click()
         break



      }


   }

const orderIdDetails=await page.locator(".col-text").first().textContent()
expect(orderID.includes(orderIdDetails)).toBeTruthy()

}

);
