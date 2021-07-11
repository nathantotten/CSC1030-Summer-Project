
//set actual timer

var playButton = document.getElementById("play")
// var minutes = 0.5;
var time_limit;
var interval;
var timeOut;

function startTimer(minutes) {

    time_limit = ((minutes * 60 ) * 1000);
    // var minutes = $( '#set-time' ).val();
    clearInterval(interval)

    
    var target_date = new Date().getTime() + ((minutes * 60 ) * 1000); // set the countdown date
    

    clearTimeout(timeOut)
    timeOut = setTimeout(
        function() 
        {
          alert( 'done' );
        }, time_limit );
      
      var days, hours, minutes, seconds; // variables for time units
      
      var countdown = document.getElementById("tiles"); // get tag element
      
      getCountdown();
      
      interval = setInterval(function () { getCountdown(); }, 1000);
      
      function getCountdown(){
      
          // find the amount of "seconds" between now and target
          var current_date = new Date().getTime();
          var seconds_left = (target_date - current_date) / 1000;
        
      if ( seconds_left >= 0 ) {
        console.log(time_limit);
         if ( (seconds_left * 1000 ) < ( time_limit / 2 ) )  {
           $( '#tiles' ).removeClass('color-full');
           $( '#tiles' ).addClass('color-half');
      
              } 
          if ( (seconds_left * 1000 ) < ( time_limit / 4 ) )  {
              $( '#tiles' ).removeClass('color-half');
              $( '#tiles' ).addClass('color-empty');
          }
        
          days = pad( parseInt(seconds_left / 86400) );
          seconds_left = seconds_left % 86400;
               
          hours = pad( parseInt(seconds_left / 3600) );
          seconds_left = seconds_left % 3600;
                
          minutes = pad( parseInt(seconds_left / 60) );
          seconds = pad( parseInt( seconds_left % 60 ) );
      
          // format countdown string + set tag value
          countdown.innerHTML = "<span>" + hours + ":</span><span>" + minutes + ":</span><span>" + seconds + "</span>"; 
        
      
        
      }
         
        
        
      }
      
      function pad(n) {
          return (n < 10 ? '0' : '') + n;
      }
      
}