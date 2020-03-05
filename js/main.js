$(document).ready(function() {
    // send message via right button
    $('#send-message').click(function(){
        sendMessage();
        setTimeout(function(){ autoResponder("ok"); }, 1000);
    });

    // send message via enter button (keyboard)
    $('#chat-input').keypress(function() {
         if (event.code == "Enter") {
            sendMessage();
            setTimeout(function(){ autoResponder("Oggi ho mal di testa!"); }, 1000);
         }
    });

    // change icon if input is active (focus)
    $("#chat-input").focus(function() {
        $("#send-message").attr("class","fas fa-paper-plane");
    });
    // return to the initial state
    $("#chat-input").blur(function(){
        $("#send-message").attr("class","fas fa-microphone");
    });



    // filter friends in chat list
    $('#cerca-contatti').keyup(function(event){
        var carattereFiltro = $(this).val().toLowerCase();
        // console.log(carattereFiltro);
        $('#lista-contatti li').each(function(){ // Se nella lista contatti è presente il carattere digitato visualizzarlo
            // console.log($(this).text());
            if ($(this).text().toLowerCase().includes(carattereFiltro)) { // Se il nome del list item ha al suo interno i caratteri digitati visualizzalo
                $(this).show();
            } else { // Altrimenti non visualizzarlo
                $(this).hide();
            }
        });
    });




    function autoResponder(messageInput) {
        var messageInput;
        var message = $('.chat-session-template .message-in').clone(); // Copy of the content of the message that is inside the template (display none in our CSS)
        message.children('.message-in p').text(messageInput); // Edit the message text in the message
        message.children('.message-in .time-chat').text(timeLocal());
        $('.chat-session').append(message); // Added the message to the bottom of the list
    }

    function sendMessage() {
        var messageInput = $('#chat-input').val();
        $('#chat-input').val('');
        var message = $('.chat-session-template .message-out').clone(); // Copy of the content of the message that is inside the template (display none in our CSS)
        message.children('.message-out p').text(messageInput); // Edit the message text in the message
        message.children('.message-out .time-chat').text(timeLocal());
        $('.chat-session').append(message); // Added the message to the bottom of the list
    }

    function timeLocal() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
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
