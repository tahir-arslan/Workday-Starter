let storedTasks = JSON.parse(localStorage.getItem("taskList"));
let currentHour = moment().format("hA");
let past = true;
let present = false;

$("#currentDay").append(moment().format('MMMM Do YYYY'));
if (!storedTasks) {
    storedTasks = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: ""
    }
}

// populate planner (working hours: 9am - 5pm)
for (let i = 0; i < 9; i++) {
    let hourEl = moment().hour(i + 9).format('hA');

    // add row
    let setRow = $("<div class='row'></div>");
    $(".container").append(setRow);

    // add time
    let hourCol = $(`<div class="col-1 hour" data-index="${i}"></div>`);
    hourCol.append(hourEl);
    setRow.append(hourCol);

    // add editable text area
    let editTask = $(`<textarea class='col-10 description data-index="${i}"'></textarea>`)
    editTask.text(storedTasks[i]);
    setRow.append(editTask);

    // colorize block according to past, present, future
    if (hourEl === currentHour) {
        past = false;
        present = true;
    }
    if (past) {
        editTask.addClass("past");
    } else if (present) {
        editTask.addClass("present");
        present = false;
    } else {
        editTask.addClass("future");
    }

    // add save button
    let saveBtnEl = $(`<button class="col-1 btn saveBtn" data-index="${i}">`);
    if (storedTasks[i].length) {
        saveBtnEl.append(`<p class="fas fa-lock" data-index="${i}">`);
        editTask.prop('disabled', true);
    } else {
        saveBtnEl.append(`<p class="fas fa-unlock-alt" data-index="${i}">`);
    }
    setRow.append(saveBtnEl);
}

// click event
$(".saveBtn").click(function() {
    let index = $(this).attr("data-index");
    if (storedTasks[index]) {
        $(`textarea[data-index="${index}"]`).prop("disabled", false);
        storedTasks[index] = "";
        $(`p[data-index="${index}"]`).removeClass("fa-lock").addClass("fa-unlocked-alt");
        localStorage.setItem("taskList", JSON.stringify(storedTasks));
    } else {
        let txt = $(`textarea[data-index="${index}"]`)
        if (txt.val()) {
            storedTasks[index] = txt.val();
            txt.prop("disabled", true);
            $(`i[data-index="${index}"]`).removeClass("fa-unlocked-alt").addClass("fa-lock");
            localStorage.setItem("taskList", JSON.stringify(storedTasks));
        }
    }
})