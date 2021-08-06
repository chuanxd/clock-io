module.exports = {
    'Open browser': function(browser) {
        browser
        .url(browser.launchUrl)
    },

    'Sign in': function (browser) {
        let envVariable = browser.globals
        browser
        .waitForElementVisible('body')
        .click('xpath', "//div[contains(@class,'lang-dropdown')]")
        .click('a[id="en"]')
        .setValue('input[id="dept_input"]', envVariable.CompanyID)
        .setValue('input[id="username_input"]', envVariable.EmployeeID)
        .setValue('input[id="password-input"]', envVariable.Password)
        .click('button[id="login-button"]').pause(1200)
        // .pause(5000)
    },
    'Setup timesheet page': function (browser) {
        let envVariable = browser.globals
        browser
        .click('a[href="/attendance_record"]').pause(1200)
        // set start date
        .click('input[id="date_start"]')
        .keys(browser.Keys.END) 
        .getValue('input[id="date_start"]', function(result) { 
            console.log(result.value); 
            (new Array(result.value.length)).fill().forEach( () => { 
                browser.keys(browser.Keys.BACK_SPACE) 
            })
        })
        .keys(envVariable.StartDate)
        // set end date
        .click('input[id="date_end"]')
        .keys(browser.Keys.END) 
        .getValue('input[id="date_end"]', function(result) { 
            console.log(result.value); 
            (new Array(result.value.length)).fill().forEach( () => { 
                browser.keys(browser.Keys.BACK_SPACE) 
            })
        })
        .keys(envVariable.EndDate)
        .click('button[id="filter"]').pause(1200)
        // set filter tag
        .setValue('select[name="table_content_length"]', "100")
        .setValue('xpath', '//*[@id="table_content_filter"]/label/input', envVariable.Search)
        // .click('xpath', "//label[contains(text(),'Absent')]").pause(200)
        // .pause(5000)
        
    },
    'Punch Card': punchInOut,
    // 'Punch last month': punchLastMonth,
    // 'Punch this month': punchThisMonth,
    'Close Browser': function (browser) { browser.end() }
  };

function punchInOut(browser) {
    punchIn(browser)
    punchOut(browser)
}

function punchIn(browser) {
    browser
    .elements('xpath', '//i[@id="add"]', function(result) {
        result.value.forEach(function(element){
            let elementID = element.ELEMENT
            browser
            .moveTo(elementID).pause(1000)
            .elementIdClick(elementID).pause(1000)
            .waitForElementPresent("h4[class='modal-title']", 2000)
            .click('xpath', "//label[@for='clockinSection']")
            // .setValue('select[name="hour"]', "09")
            .setValue('xpath', '//*[@id="correctionTime"]//select[@name="hour"]', '09')
            // .setValue('input[name="remark"]', "Correction").pause(1000)
            .setValue('xpath', '//*[@id="save_form"]/div/div[4]/div/input', 'Correction').pause(1000)
            .click('xpath', '//button[contains(text(),"Confirm")]').pause(1300)
            .element('css selector', 'button[id="close"]', function(result) {
                if(result.status != -1) browser.click('button[id="close"]').pause(1000)
            })
            // .pause(1000)
        })
    })
}
function punchOut(browser) {
    browser
    .click('xpath', "//label[contains(text(),'Missed punch')]")
    .elements('xpath', '//i[@id="add"]', function(result) {
        result.value.forEach(function(element){
            let elementID = element.ELEMENT
            browser
            .elementIdClick(elementID).pause(1000)
            .waitForElementPresent("h4[class='modal-title']", 2000)
            .click('xpath', "//label[@for='clockoutSection']")
            // .setValue('select[name="hour"]', "18")
            .setValue('xpath', '//*[@id="correctionTime"]//select[@name="hour"]', '18')
            // .setValue('input[name="remark"]', "Correction").pause(1000)
            .setValue('xpath', '//*[@id="save_form"]/div/div[4]/div/input', 'Correction').pause(1000)
            .click('xpath', '//button[contains(text(),"Confirm")]').pause(1300)
            // .click('button[id="close"]').pause(300)
            // .pause(1000)
        })
    })
}