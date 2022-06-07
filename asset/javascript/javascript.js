// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar

let date = (moment().format('MMMM Do YYYY'));
$("#currentDay").append(date);