
function requestWeatherData(latLong) {
    var latLong = latLong;
    var apiKey = "&appid=449c530ef0ac7a299ce6e9ca3d0da15c&units=metric";
    console.log(latLong); // for troubleshooting

    if (parseFloat(latLong) == NaN) {
        console.log("Error! Variable \'latLong\' is not a number: LatLong = " + latLong);
    } else {
        var url = "https://api.openweathermap.org/data/2.5/forecast?" + latLong + apiKey;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    populateWeatherTable(this.response); // Calling function to populate weather table with data.
                    loadCanvas(graphArray); // calling function create graph and lines
                }
            };
        try {
            request.open("GET", url);
            request.send();
            }
        catch (ex) {
            alert("Exception of type " + ex.name + " occured: " + ex.message + ".");
            }
        }
    }


var graphArray = []; // maximum scope required for this variable.

// Function to populate the table with the weather data
function populateWeatherTable(response) {
    // Deserialised response:
    var json = JSON.parse(response);
    console.log(json);

    // Using session storage:
    var sessionStorage = window.sessionStorage;
    if (sessionStorage.getItem("welcome") != null) {
        document.getElementById("welcome").innerText = "Welcome Back";
    }

    // Displaying the location
    var city = json.city.name;
    document.getElementById("city").innerText = "5 day weather forecast for " + city;

    // Get a particular day for the day column:
    function getDay(x, date) {
        var date = new Date(json.list[x].dt * 1000).toLocaleString("en-au", {hour12: false });
        const dateArray = date.split(","); // split date and time
        var day = dateArray[0];
        return day;
        }

    // Get each date for day column
    var day0 = getDay(1);
    var day1 = getDay(8);
    var day2 = getDay(16);
    var day3 = getDay(24);
    var day4 = getDay(32);

    document.getElementById("day0").innerText = "Day 1: " + day0;
    document.getElementById("day1").innerText = "Day 2: " + day1;
    document.getElementById("day2").innerText = "Day 3: " + day2;
    document.getElementById("day3").innerText = "Day 4: " + day3;
    document.getElementById("day4").innerText = "Day 5: " + day4;

    // getting the time
    function getTime(x) {
        var date = new Date(json.list[x].dt * 1000).toLocaleString("en-au", {hour12: false });
        const dateArray = date.split(","); // split date and time
        var time = dateArray[1];
        return time;
        }

    //adds weather elements to html table depending on time:
        // variables:
    let temperature;
    let description;
    let icon;
    let iconLink;
        // function:
    function addElements(x, y) { 
        temperature = json.list[y].main.temp; //
        description = json.list[y].weather[0].description;
        icon = json.list[y].weather[0].icon;
        iconLink = "http://openweathermap.org/img/wn/" + icon + ".png"

        document.getElementById("temp" + x).innerHTML = temperature + "&deg;C";
        document.getElementById("description" + x).innerText = description;
        document.getElementById("icon" + x).innerHTML = "<img src=\"" + iconLink + "\" alt=\"Weather Icon\">";
        
        graphArray[i] = temperature; // stores temperatures for the graph.
        i++
    }

    // Beginning of 'else' statements to fill the table correctly.
    var time = getTime(0)
    var [hours, minutes, seconds] = time.split(":") // Getting hours to line up the time and weather in the grid.
    var y = 4; // offset for the temperatures
    var i = 0; // to store temperatures in the graphArray
    var errorCount = 0; // if hours are not matched three times
    if (hours == 2) {
        console.log("hours should == 2. Hours = " + hours)
        for (var x = 0; x <= 32; x++) {
            addElements(x, y);
            y++;
        }
        } else if (hours == 5) {
        console.log("hours should == 5. Hours = " + hours)
        for (var x = 1; x <= 33; x++) {
            addElements(x, y);
            y++;
        }

        } else if (hours == 8) {
        console.log("hours should == 8. Hours = " + hours)
        for (var x = 2; x <= 34; x++) {
            addElements(x, y);
            y++;
        }

        } else if (hours == 11) {
        console.log("hours should == 11. Hours = " + hours)
        for (var x = 3; x <= 35; x++) {
            addElements(x, y);
            y++;
        }
        
        } else if (hours == 14) {
        console.log("hours should == 14. Hours = " + hours)
        for (var x = 4; x <= 36; x++) {
            addElements(x, y);
            y++;
        }

        } else if (hours == 17) {
        console.log("hours should == 17. Hours = " + hours)
            for (var x = 5; x <= 36; x++) {
            addElements(x, y);
            y++;
        }

        } else if (hours == 20) {
        console.log("Hours should == 20. Hours == " + hours)
            for (var x = 6; x <= 37; x++) {
            addElements(x, y);
            y++
        }

        } else if (hours == 23) {
        console.log("Hours should == 23. Hours == " + hours)
            for (var x = 7; x <= 38; x++) {
            addElements(x, y);
            y++
        }

        } else {
            errorCount += 1;
            if (errorCount < 3) {
                console.log("Error. Did not match any time. Will try again.");
                populateWeatherTable(response);
            } else if (errorCount >= 3) {
                console.log("Error at weather.js 164. Application will now stop. Please reload the page to try again");
                window.stop();
        }
    }
}

// Canvas Javascript
function loadCanvas() {
    // split up the graph array for each day
    function splitGraphArray(graphArray, y) { // y = offset, e.g. day 1 = 0; day 2 = 7;
        var dayGraph = [];
        var x;
        var y = y; // offset JSON object

        for (x = 0; x < 8; x++) {
            dayGraph[x] = graphArray[y];
            y++
        }
        return dayGraph;
    }

    var canvas = document.getElementById("graphCanvas")
    var ctx = canvas.getContext("2d");

    // creating the grid lines
    var y = 50;
    ctx.strokeStyle = "antiquewhite";
    ctx.beginPath(); 
    for (x = 0; x < 7; x++) {
        ctx.moveTo(80, y);
        ctx.lineTo(730, y);
        y = y + 50;
    }
    ctx.stroke();

    // labelling x and y axis
        // for the text
    ctx.font = "16pt Verdana";
    ctx.fillStyle = "antiquewhite";
    ctx.fillText("Hours", 363, 22);
        // to rotate the 'temperature' text
    ctx.save();
    ctx.translate(30, 180);
    ctx.rotate(90 * (Math.PI / 180));
    ctx.textAlign = "center";
    ctx.fillText("Temperature (C)", 25, 0);
    ctx.restore();

        // Temperatures reference
    ctx.font = "bold 12px Verdana";
    y = 80;
    ctx.fillText("30", y, 98);
    ctx.fillText("20", y, 198);
    ctx.fillText("10", y, 298);

        // hours
    var x = 48;
    ctx.fillText("3am", 140, x);
    ctx.fillText("Midday", 370, x);
    ctx.fillText("9pm", 630, x);

        // key
    y = 378;
    ctx.fillText("Key = ", 150, y);
    ctx.fillStyle = "blue";
    ctx.fillText("Day 1", 200, y);
    ctx.fillStyle = "red";
    ctx.fillText("Day 2", 250, y);
    ctx.fillStyle = "green";
    ctx.fillText("Day 3", 300, y);
    ctx.fillStyle = "yellow";
    ctx.fillText("Day 4", 350, y);
    ctx.fillStyle = "blueviolet";
    ctx.fillText("Day 5", 400, y);

    // calling the functions to draw each graph line.
    var day = [];    
    day = splitGraphArray(graphArray, 0); 
    drawLine(day, "blue");

    day = splitGraphArray(graphArray, 7); 
    drawLine(day, "red");

    day = splitGraphArray(graphArray, 15);
    drawLine(day, "green");

    day = splitGraphArray(graphArray, 23);
    drawLine(day, "yellow");

    day = splitGraphArray(graphArray, 31);
    drawLine(day, "blueviolet");

    // function to draw the line with each point.
    function drawLine(day, color) {
        // function variables:
        const arrayLength = 8;
        // graph size:
        const gTop = 82;
        const gLeft = 110;
        const gRight = 690;
        const gHeight = 320;

        const high = 30; //highest tempeature on the graph

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        // creating the first data point:
        ctx.moveTo(gLeft, (gHeight - day[0] / high * gHeight) + gTop);
        // loop over data and add additional data points based on graph dimensions:
        for (var a = 1; a < arrayLength; a++) {
            ctx.lineTo(gRight / arrayLength * a + gLeft, (gHeight - day[a] / high * gHeight) + gTop);
            ctx.stroke();
        }
    }
}

