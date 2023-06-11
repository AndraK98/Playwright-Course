const base = require("@playwright/test");

// creating custom fixtures (such as browser and page which are default)
exports.customtest = base.test.extend(
    {
        testDataForOrder : {
            username : "rahi.shet@example.com",
            password : "RahiShet1!",
            productName : "zara coat 3"
        }
    }
)