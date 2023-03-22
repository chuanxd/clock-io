const argv = require('minimist')(process.argv.slice(2), { 
    boolean: 'observe',
    default: { observe: false }
})
const ora = require('ora')
const { chromium } = require('playwright')

(async () => {
    var spinner = ora('Processing......').start()
    const browser = await chromium.launch({
        channel: 'chrome',
        headless: !argv.observe // if dev -> set false
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://cloud.nueip.com/login")
    // Switch lang
    spinner.text = 'Login now......'
    await page.click("div .lang-dropdown")
    await page.click("id=en")
    // Login
    await page.fill("id=dept_input", "nextdrive");
    await page.fill("id=username_input", argv.id);
    await page.fill("id=password-input", argv.password);
    await page.click("id=login-button")
    spinner.succeed("Login success")
    // Set seaching time
    spinner = ora("Peparing to punch card......").start()
    await page.goto("https://portal.nueip.com/home")
    const CLOCK_IN_SELECTOR = '#view-gridlayout > div:nth-child(4) > div.vue-grid-item.por-punch-clock.cssTransforms.grid-card > div > div.grid-card__content > div > div.por-punch-clock__content--button > div > div:nth-child(1) > button'
    await page.click(CLOCK_IN_SELECTOR)
    spinner.succeed("Ready to work")
})()
