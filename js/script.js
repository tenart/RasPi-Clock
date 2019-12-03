$(function () {
    
    var date = new Date();
    
    var currentTemp;

    var time = {
        hr: doubleDigit(date.getHours()),
        mn: doubleDigit(date.getMinutes()),
        sc: doubleDigit(date.getSeconds())
    };
    
    function doubleDigit(input) {
        if (input.toString().length < 2) {
            return "0" + input.toString();
        } else {
            return input.toString();
        }
    }

    function nonMilHr(input) {
        if (parseInt(input) > 12) {
            return doubleDigit(parseInt(input) - 12);
        } else if (parseInt(input) == 0) {
            return "01";
        } else {
            return doubleDigit(input);
        }
    }

    function nextDigit(input) {
        var nextNum = parseInt(input) + 1;
        return doubleDigit(nextNum);
    }

    function nextDigitSix(input) {
        var nextNum = parseInt(input) + 1;
        if (nextNum >= 60) {
            return doubleDigit(0);
        } else {

        }
        return doubleDigit(nextNum);
    }

    function nextDigitTwelve(input) {
        var nextNum = parseInt(input) + 1;
        if (nextNum > 12) {
            return doubleDigit(1);
        } else {

        }
        return doubleDigit(nextNum);
    }

    function getWeather() {
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?zip=28278,us&units=imperial&appid=2e6bb27c5e37162babaa1296a7e15938", function (data) {
            //data is the JSON string
            var wData = data;
            console.log(wData);
            currentTemp = wData.main.temp;
            $("#weatherTemp").html(Math.round(parseFloat(wData.main.temp)) + "<sup> &deg;F</sup>");
            $("#weatherDesc").text(wData.weather[0].description);
            $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + wData.weather[0].icon + "@2x.png");
        });
    }

    function getForecast() {
        $.getJSON("https://api.openweathermap.org/data/2.5/forecast?zip=28278,us&units=imperial&appid=2e6bb27c5e37162babaa1296a7e15938", function (data) {
            var wData = data;
            console.log("got forecast data.");
            console.log(wData);
            var temps = [Math.round(wData.list[0].main.temp),
                        Math.round(wData.list[1].main.temp),
                        Math.round(wData.list[2].main.temp),
                        Math.round(wData.list[3].main.temp),
                        Math.round(wData.list[4].main.temp)]
            $("#fcast1 .fcastIcon").attr("src", "http://openweathermap.org/img/wn/" + wData.list[1].weather[0].icon + "@2x.png");
            $("#fcast1 .fcastTemp").html(temps[1]);
            $("#fcast1").css("transform", "translateY(" + ((currentTemp - temps[1]) * 3) + "px)");

            $("#fcast2 .fcastIcon").attr("src", "http://openweathermap.org/img/wn/" + wData.list[2].weather[0].icon + "@2x.png");
            $("#fcast2 .fcastTemp").html(temps[2]);
            $("#fcast2").css("transform", "translateY(" + ((currentTemp - temps[2]) * 3) + "px)");

            $("#fcast3 .fcastIcon").attr("src", "http://openweathermap.org/img/wn/" + wData.list[3].weather[0].icon + "@2x.png");
            $("#fcast3 .fcastTemp").html(temps[3]);
            $("#fcast3").css("transform", "translateY(" + ((currentTemp - temps[3]) * 3) + "px)");

            $("#fcast4 .fcastIcon").attr("src", "http://openweathermap.org/img/wn/" + wData.list[4].weather[0].icon + "@2x.png");
            $("#fcast4 .fcastTemp").html(temps[4]);
            $("#fcast4").css("transform", "translateY(" + ((currentTemp - temps[4]) * 3) + "px)");

            var ctx = document.getElementById("weatherGraph").getContext("2d");
            ctx.beginPath();

            function drawGraph(yD, amp, color) {
                ctx.clearRect(0, 0, 960, 640);
                ctx.moveTo(0, yD);
                ctx.lineWidth = 4;
                ctx.strokeStyle = color;
                ctx.bezierCurveTo(50, yD, 400, yD + (temps[0] - temps[1]) * amp, 450, yD + (temps[0] - temps[1]) * amp);
                ctx.bezierCurveTo(500, yD + (temps[0] - temps[1]) * amp, 540, yD + (temps[0] - temps[2]) * amp, 590, yD + (temps[0] - temps[2]) * amp);
                ctx.bezierCurveTo(640, yD + (temps[0] - temps[2]) * amp, 680, yD + (temps[0] - temps[3]) * amp, 730, yD + (temps[0] - temps[3]) * amp);
                ctx.bezierCurveTo(780, yD + (temps[0] - temps[3]) * amp, 910, yD + (temps[0] - temps[4]) * amp, 960, yD + (temps[0] - temps[4]) * amp);
                ctx.stroke();
            }
            drawGraph(480, 3, "#fff");
            
        });
    }
    
    $(".navButton").mouseenter(function () {
        var offset = parseInt($(this).attr("data-screen")) * -960;
        $("#slider").css("left", offset);
        if ($(this).attr("data-screen") == "1") {
            getWeather();
            getForecast();
        }
    });
    
    getWeather();
    getForecast();
    
    $("#h1 h1").text(nonMilHr(time.hr).substring(0, 1));
    $("#h2 h1").text(nonMilHr(time.hr).substring(1, 2));
    $("#m1 h1").text(time.mn.substring(0, 1));
    $("#m2 h1").text(time.mn.substring(1, 2));
    $("#s1 h1").text(time.sc.substring(0, 1));
    $("#s2 h1").text(time.sc.substring(1, 2));

    /* ONCE PER SEC UPDATE LOOP */
    setInterval(function () {
        date = new Date();
        time.hr = doubleDigit(date.getHours());
        time.mn = doubleDigit(date.getMinutes());
        time.sc = doubleDigit(date.getSeconds());

        $(".auxHr").text(nonMilHr(time.hr));
        $(".auxMn").text(time.mn);
        $(".auxSc").css("opacity", 0);
        
        setTimeout(function () {
            $("#wSec").css("opacity", 1)
        }, 500)

        $(".digit").removeClass("slideUp")

        $("#h1 h1").text(nonMilHr(time.hr).substring(0, 1));
        if (nonMilHr(time.hr).substring(1, 2) == "9" && time.mn == "59" && time.sc == "59" ||
            nonMilHr(time.hr).substring(0, 1) == "1" && nonMilHr(time.hr).substring(1, 2) == "2" && time.mn == "59" && time.sc == "59"
        ) {
            $("#h1 h2").text(nextDigitTwelve(time.hr).substring(0, 1));
            setTimeout(function () {
                $("#h1").addClass("slideUp")
            }, 59720);
        }

        $("#h2 h1").text(nonMilHr(time.hr).substring(1, 2));
        if (time.mn == "59" && time.sc == "59") {
            $("#h2 h2").text(nextDigit(time.hr).substring(1, 2));
            setTimeout(function () {
                $("#h2").addClass("slideUp")
            }, 720);
        }

        $("#m1 h1").text(time.mn.substring(0, 1));
        if (time.mn.substring(1, 2) == "9" && time.sc == "59") {
            $("#m1 h2").text(nextDigitSix(time.mn).substring(0, 1));
            setTimeout(function () {
                $("#m1").addClass("slideUp")
            }, 720);
        }

        $("#m2 h1").text(time.mn.substring(1, 2));
        if (time.sc == "59") {
            $("#m2 h2").text(nextDigit(time.mn).substring(1, 2));
            setTimeout(function () {
                $("#m2").addClass("slideUp")
            }, 720);
        }

        $("#s1 h1").text(time.sc.substring(0, 1));
        if (time.sc.substring(1, 2) == "9") {
            $("#s1 h2").text(nextDigitSix(time.sc).substring(0, 1));
            setTimeout(function () {
                $("#s1").addClass("slideUp")
            }, 720);
        }

        $("#s2 h1").text(time.sc.substring(1, 2));
        $("#s2 h2").text(nextDigit(time.sc).substring(1, 2));
        setTimeout(function () {
            $("#s2").addClass("slideUp")
        }, 720);

    }, 1000)

})