$(document).ready(function() {
    // send message via right button
    $('#send-message').click(function(){
        sendMessage();
    });

    // send message via enter button (keyboard)
    $('#chat-input').keypress(function(event) {
         if (event.code == "Enter") {
            sendMessage();
         }
    });

    $("#chat-input").focus(function() { // change icon if input is active (focus)
        $("#send-message").attr("class","fas fa-paper-plane");
    });
    $("#chat-input").blur(function(){ // return to the initial state
        $("#send-message").attr("class","fas fa-microphone");
    });

    // filter friends in chat list
    $('#search').keyup(function(){
        var searchFilter = $(this).val().toLowerCase();
        $('.chat-item .chat-item-text h5').each(function(){ // If the typed character is present in the contact list, display it
            if ($(this).text().toLowerCase().includes(searchFilter)) { // If the name of the list item has the characters typed inside, display it
                $(this).parentsUntil(".chat-list").show();
            } else { // Otherwise, don't display it
                $(this).parentsUntil(".chat-list").hide();

            }
        });

        // $('.chat-item .chat-item-text p').each(function(){ // If the typed character is present in the contact list, display it
        //     if ($(this).text().toLowerCase().includes(searchFilter)) { // If the name of the list item has the characters typed inside, display it
        //         $(this).parent().parent().show();
        //     } else { // Otherwise, don't display it
        //         $(this).parent().parent().hide();
        //
        //     }
        // });


    });

    // chat view at user click
    $('.chat-item').click(function() {
        var userBox = $(this);
        var userName = $(this).children().find("h5").text();
        var avatar = $(this).children().find("img").attr("src");
        // console.log(userName); //debug
        console.log(userBox); //debug
        var userId = $(this).data('userId');
        // console.log(userId); //debug
        $('.chat-session').each(function(){
            if(userId == $(this).data('userId')) {
                $(".chat-item").removeClass("selected");
                $('.chat-session').removeClass("active");
                $(this).addClass("active");
                $(".avatar-text h5").text(userName);
                $(".profile .avatar img").attr("src",avatar);
                $(userBox).addClass("selected");
            }
        })
     });

     $(document).on('click', 'ul li' ,function() {
     alert('li CLICK e ON');
})





    function scroll(elementToScroll) {
              var pixelScroll = $(elementToScroll).height();
              $(elementToScroll).scrollTop(pixelScroll);
         }

    function autoResponder(messageInput) {
        var messageInput;
        var message = $('.chat-session-template .message-in').clone(); // Copy of the content of the message that is inside the template (display none in our CSS)
        message.children('.message-in p').text(messageInput); // Edit the message text in the message
        message.children('.message-in .time-chat').text(timeLocal());
        $('.chat-session.active').append(message); // Added the message to the bottom of the list
        scroll(".chat");
    }

    function sendMessage() {
        var messageInput = $('#chat-input').val();
        if (messageInput.trim().length > 0){
            $('#chat-input').val('');
            var message = $('.chat-session-template .message-out').clone(); // Copy of the content of the message that is inside the template (display none in our CSS)
            message.children('.message-out p').text(messageInput); // Edit the message text in the message
            message.children('.message-out .time-chat').text(timeLocal());
            $('.chat-session.active').append(message); // Added the message to the bottom of the list
            scroll(".chat");

            setTimeout(function(){ autoResponder("ok"); }, 1000);
        }
    }

    function timeLocal() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (minutes < 10){
            minutes = ("0" + minutes);
        }
        var time = hours + ":" + minutes;
        return time;
    }

    // function timeUTC() {
    //     var date = new Date();
    //     var variation = (date.getTimezoneOffset() / 60) * (-1);
    //     var hours = date.getUTCHours() + (variation);
    //     var minutes = date.getUTCMinutes();
    //     var time = hours + ":" + minutes + " " + date.getTimezoneOffset();
    //     return time;
    // }

});
