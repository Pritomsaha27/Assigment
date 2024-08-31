$(document).ready(function() {
    function updateTimer() {
        var now = new Date();
        var day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        
        var nextOpen = new Date();

        // Determine the next open time
        if (day >= 1 && day <= 3) { // Monday to Saturday
            if (hours < 10) {
                nextOpen.setHours(10, 0, 0, 0); // Open at 10 AM today
                nextOpen.setDate(now.getDate()); // Ensure the date is today
            } else if (hours >= 20) {
                // If it's after 8 PM, set to next Monday
                nextOpen.setDate(now.getDate() + ((8 - day + 7) % 7)); // Next Monday
                nextOpen.setHours(10, 0, 0, 0); // Open at 10 AM
            } else {
                nextOpen.setHours(10, 0, 0, 0); // Open at 10 AM today
                if (hours >= 20) {
                    nextOpen.setDate(now.getDate() + 1); // Move to next day
                    if (nextOpen.getDay() === 0) {
                        nextOpen.setDate(nextOpen.getDate() + 1); // Skip Sunday
                    }
                }
            }
        } else { // Sunday
            nextOpen.setDate(now.getDate() + ((1 - day + 7) % 7)); // Next Monday
            nextOpen.setHours(10, 0, 0, 0); // Open at 10 AM
        }

        var timeDiff = nextOpen - now;

        if (timeDiff <= 0) {
            $('#countdown').hide(); // Hide the countdown
            $('#countdown-message').text("The batch is currently open!").show(); // Show the message
        } else {
            $('#countdown').show(); // Show the countdown
            $('#countdown-message').text("Batch starting on").show(); // Show the countdown message

            var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            $('#days').text(days);
            $('#hours').text(hours);
            $('#minutes').text(minutes);
            $('#seconds').text(seconds);
        }
    }

    // Update the timer every second
    setInterval(updateTimer, 1000);
});
