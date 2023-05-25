// create initial array
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

//accumulate initial array to new array
function createEmployeeRecords(newEmpData) {
    return newEmpData.map(function (employeeData) {
        return createEmployeeRecord(employeeData);
    });
}

//add object+keys to time in event
function createTimeInEvent(employeeData, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let hourIn = parseInt(hour, 10);
    let timeInEvent = {
        type: "TimeIn",
        hour: hourIn,
        date: date,
    };
    employeeData.timeInEvents.push(timeInEvent);
    return employeeData;
}

//add object+keys to time out event
function createTimeOutEvent(employeeData, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let hourOut = parseInt(hour, 10);
    let timeOutEvent = {
        type: "TimeOut",
        hour: hourOut,
        date: date,
    };
    employeeData.timeOutEvents.push(timeOutEvent);
    return employeeData;
}


//find hours worked by date
function hoursWorkedOnDate(employeeData, dateWorked) {
    let timeInEvent = employeeData.timeInEvents.find(function(e) {
        return e.date === dateWorked
    })
    let timeOutEvent = employeeData.timeOutEvents.find(function(e) {
        return e.date === dateWorked
    })
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

//find wages earned by date
function wagesEarnedOnDate(employeeData, dateEarned) {
    let wage = hoursWorkedOnDate(employeeData, dateEarned) * employeeData.payPerHour;
    return parseFloat(wage.toString())
}


//calculates wages for an employee for multiple days
function allWagesFor(employeeData) {
    let datesWorked = employeeData.timeInEvents.map(e => e.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeData, date), 0);
}

//calculate all hours worked and then turn into overall wages
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}