const { deleteJob } = require("./jobs.js");
const run_time_hours = 1000 * 60 * 10;
const run_time_minutes = 1000 * 60;
const run_time_seconds = 3000;
const hour = new Date().getHours();
const from_hour = 2;
const to_hour = 6;

async function clearDataBase() {
 const x = setInterval(async function() {
      if (hour >= from_hour && hour < to_hour) {
    }
        try {
            await deleteJob();
        } catch (err) {
        return err
        }
  }, run_time_seconds);
}

module.exports = {
  clearDataBase,
};
