// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours

$("#currentDay").append(moment().format('MMMM Do YYYY'));

// populate planner (working hours: 9am - 5pm)
for (let i = 0; i < 9; i++) {
    // add row
    let setRow = $("<div class='row'></div>");
    $(".container").append(setRow);
    // add time
    let hourEl = moment().hour(i + 9).format('H A');
    let hourCol = $(`<div class="col-1 hour" data-index="${i}"></div>`);
    hourCol.append(hourEl);
    setRow.append(hourCol);
    // add editable text area (no click event)
    let editTask = $(`<div class='col-10 description data-index="${i}"'></div>`)
    setRow.append(editTask);
    // add save button
    let saveBtnEl = $(`<button class="col-1 saveBtn" data-index="${i}"><span class="oi oi-lock-unlocked"></span></button>`);
    setRow.append(saveBtnEl);
}