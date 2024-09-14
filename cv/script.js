function timePassed(startDate, endDate) {
    var delta = (endDate.getFullYear() - startDate.getFullYear()) * 12 
        + (endDate.getMonth() - startDate.getMonth())
    var yearsPassed = Math.floor(delta / 12)
    var monthsPassed = delta % 12
    var result = ""
    if(yearsPassed > 0) {
        result += yearsPassed
        result += ((yearsPassed > 1) ? " yrs " : " yr ")
    }
    if(monthsPassed > 0) {
        result += monthsPassed
        result += ((monthsPassed > 1) ? " mos" : " mo")
    }
    return result
}

window.onload = function() {
    Array.from(document.getElementsByClassName("dates"))
    .forEach((date) => {

        var dates = date.innerHTML.split("-")

        if(dates.length != 2) 
            return;

        if(!dates[1].includes("Present"))
            return;

        var startDate = new Date("1 " + dates[0].replace("'", "20"))
        var endDate = (dates[1].includes("Present")) ? 
            new Date() : new Date("1 " + dates[1])

        date.innerHTML += "<br>"
        date.innerHTML += timePassed(startDate, endDate) 
    })
}
