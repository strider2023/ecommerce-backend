const cron = require("node-cron");
  
// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
cron.schedule("*/10 * * * * *", function() {
    console.log("running a task every 10 second");
});