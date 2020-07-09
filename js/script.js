$(function() {
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

    function updateTime() {
        date = new Date();
        time.hr = doubleDigit(date.getHours());
        time.mn = doubleDigit(date.getMinutes());
        time.sc = doubleDigit(date.getSeconds());
    }

    function updateNumBackground(element, number, prefix) {
        var bgname = "url(res/" + prefix + number + ".gif)";
        element.css("background-image", bgname);
    }

    $("#debug_refresh").click(function() {
        location.reload(true);
    })

    // UPDATE LOOP ONCE PER SECOND
    setInterval(function () {
        updateTime()
        updateNumBackground( $("#hour_a"), nonMilHr(time.hr).substring(0,1), "big_" ) ;
        updateNumBackground( $("#hour_b"), nonMilHr(time.hr).substring(1,2), "big_" ) ;
        updateNumBackground( $("#min_a"), time.mn.substring(0,1), "big_" ) ;
        updateNumBackground( $("#min_b"), time.mn.substring(1,2), "big_" ) ;
        $("#sec_a").css("mask-image", "url(res/big_" + time.mn.substring(0,1) + ".gif)");
        $("#sec_b").css("mask-image", "url(res/big_" + time.mn.substring(1,2) + ".gif)");
        $(".sec").css("background-position", "0px " + (56 * 4 - (time.sc / 60 * 56 * 4)) + "px" )
        if(time.sc == 59) {
            $(".sec").fadeOut(1000).fadeIn(0);
        }
        
        // for( i = 0; i < 12; i++) {
        //     if( time.sc >= 5 * i) {
        //         $(".coin:nth-child(" + (i + 1) + ")").addClass("active");
        //     } else {
        //         $(".coin:nth-child(" + (i + 1) + ")").removeClass("active");
        //     }
        // } 
        
        console.log(nonMilHr(time.hr) + " " + time.mn + " " + time.sc);
    }, 1000)
})   
   