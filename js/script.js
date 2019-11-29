$(function() {
    function doubleDigit(input) {
        if(input.toString().length < 2) {
            return "0" + input.toString();
        } else {
            return input.toString();
        }
    }
    
    function nonMilHr(input) {
        if(parseInt(input) > 12) {
            return doubleDigit(parseInt(input) - 12);
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
        if( nextNum >= 60 ) {
            return doubleDigit(0);
        } else {
            
        }
        return doubleDigit(nextNum);
    }
    
    function nextDigitTwelve(input) {
        var nextNum = parseInt(input) + 1;
        if( nextNum > 12 ) {
            return doubleDigit(1);
        } else {
            
        }
        return doubleDigit(nextNum);
    }
    
    var date = new Date();
    
    var time = {
        hr: doubleDigit(date.getHours()),
        mn: doubleDigit(date.getMinutes()),
        sc: doubleDigit(date.getSeconds())
    };
    
    var oldTime = {
        hr: doubleDigit(date.getHours()),
        mn: doubleDigit(date.getMinutes()),
        sc: doubleDigit(date.getSeconds())
    };
    
    $("#h1 h1").text(nonMilHr(time.hr).substring(0, 1));
    $("#h2 h1").text(nonMilHr(time.hr).substring(1, 2));
    $("#m1 h1").text(time.mn.substring(0, 1));
    $("#m2 h1").text(time.mn.substring(1, 2));
    $("#s1 h1").text(time.sc.substring(0, 1));
    $("#s2 h1").text(time.sc.substring(1, 2));
    
    $(".navButton").click(function() {
        var offset = parseInt($(this).attr("data-screen")) * -960;
        $("#slider").css("left", offset);
    });
    
    setInterval( function() {
        date = new Date();
        time.hr = doubleDigit(date.getHours());
        time.mn = doubleDigit(date.getMinutes());
        time.sc = doubleDigit(date.getSeconds());
        
        //console.log(time.hr + ":" + time.mn + ":" + time.sc);
        
        $(".digit").removeClass("slideUp")
        
        
        $("#h1 h1").text(nonMilHr(time.hr).substring(0, 1));
        if(nonMilHr(time.hr).substring(1, 2) == "9" && time.mn == "59" && time.sc == "59" ||
          nonMilHr(time.hr).substring(0, 1) == "1" && nonMilHr(time.hr).substring(1, 2) == "2" && time.mn == "59" && time.sc == "59"
          ) {
            $("#h1 h2").text(nextDigitTwelve(time.hr).substring(0, 1));
            setTimeout(function() {$("#h1").addClass("slideUp")}, 59720);
        }
        
        
        $("#h2 h1").text(nonMilHr(time.hr).substring(1, 2));
        if(time.mn == "59" && time.sc == "59") {
            $("#h2 h2").text(nextDigit(time.hr).substring(1, 2));
            setTimeout(function() {$("#h2").addClass("slideUp")}, 720);
        }
        
        $("#m1 h1").text(time.mn.substring(0, 1));
        if(time.mn.substring(1, 2) == "9" && time.sc == "59") {
            $("#m1 h2").text(nextDigitSix(time.mn).substring(0, 1));
            setTimeout(function() {$("#m1").addClass("slideUp")}, 720);
        }
        
        $("#m2 h1").text(time.mn.substring(1, 2));
        if(time.sc == "59") {
            $("#m2 h2").text(nextDigit(time.mn).substring(1, 2));
            setTimeout(function() {$("#m2").addClass("slideUp")}, 720);
        }
        
        $("#s1 h1").text(time.sc.substring(0, 1));
        if(time.sc.substring(1, 2) == "9") {
            $("#s1 h2").text(nextDigitSix(time.sc).substring(0, 1));
            setTimeout(function() {$("#s1").addClass("slideUp")}, 720);
        }
        
        $("#s2 h1").text(time.sc.substring(1, 2));
        $("#s2 h2").text(nextDigit(time.sc).substring(1, 2));
        setTimeout(function() {$("#s2").addClass("slideUp")}, 720);
        
    }, 1000)
})