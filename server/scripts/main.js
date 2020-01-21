const { deleteJob } = require("./jobs.js");
const run_time_hours = 1000 * 60 * 10;
const run_time_minutes = 1000 * 60;
const run_time_seconds = 1000;
const hour = new Date().getHours();
const from_hour = 9;
const to_hour = 18;

async function clearDataBase() {
//  const x = setInterval(async function() {
//     //   if (hour >= from_hour && hour < to_hour) {
//     //      deleteJob()
//     //   }
//     try {
//       const res = await deleteJob();
//       console.log(res)
//     } catch (err) {
//         console.log(err)
//         return clearInterval(x)
//     }
//   }, run_time_seconds);
}

module.exports = {
  clearDataBase,
};
