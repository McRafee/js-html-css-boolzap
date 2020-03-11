$(document).ready(function() {
    // *** LOGIC ENGINE *** //
    $('#send-message').click(function(){ // send message via right button
        sendMessage();
    });

    $('#chat-input').keypress(function(event) { // send message via enter button (keyboard)
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
    $('#search').keyup(function(event){
        var searchFilter = $(this).val().toLowerCase();
        $('.chat-item .chat-item-text h5').each(function(){ // If the typed character is present in the contact list, display it
            if ($(this).text().toLowerCase().includes(searchFilter)) { // If the name of the list item has the characters typed inside, display it
                $(this).parentsUntil(".chat-list").show();
            } else { // Otherwise, don't display it
                $(this).parentsUntil(".chat-list").hide();
            }
        });
    });

    // chat view at user click
    $('.chat-item').click(function() {
        var userBox = $(this);
        var userName = $(this).children().find("h5").text();
        var avatar = $(this).children().find("img").attr("src");
        var userId = $(this).data('userId');
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

    // message menu
    $(".chat-session .message-in, .chat-session .message-out").click(function(){
        $(message).children(".message-menu").toggle(); // show and hide message menu
        $(".message-menu li:last-child").click(function(){
            $(message).remove(); //delete message function
        })
    });

    //control on jQuery generated elements//
    $(document).on("click", ".chat-session .message-in, .chat-session .message-out",  function(){
        var message = $(this);
        $(message).children(".message-menu").toggle();
        $(".message-menu li:last-child").click(function(){
            $(message).remove(); //delete message function
        })
    });

    // Array random sentences
    var randomSentences = ["Be careful with that butter knife.","Art doesn't have to be intentional.","Doris enjoyed tapping her nails on the table to annoy everyone.","He wondered if it could be called a beach if there was no sand.","Red is greener than purple, for sure.","She wore green lipstick like a fashion icon.","He wasn't bitter that she had moved on but from the radish.","There's a reason that roses have thorns.","Separation anxiety is what happens when you can't find your phone.","There are few things better in life than a slice of pie.","I hear that Nancy is very pretty.","He walked into the basement with the horror movie from the night before playing in his head.","A kangaroo is really just a rabbit on steroids.","He had decided to accept his fate of accepting his fate.","Toddlers feeding raccoons surprised even the seasoned park ranger.","No matter how beautiful the sunset, it saddened her knowing she was one day older.","I checked to make sure that he was still alive.","He put heat on the wound to see what would grow.","Going from child, to childish, to childlike is only a matter of time.","I was very proud of my nickname throughout high school but today- I couldn’t be any different to what my nickname was.","There was coal in his stocking and he was thrilled.","The stranger officiates the meal.","He decided that the time had come to be stronger than any of the excuses he'd used until then.","Please wait outside of the house.","The sky is clear; the stars are twinkling.","The book is in front of the table.","Charles ate the french fries knowing they would be his last meal.","I often see the time 11:11 or 12:34 on clocks.","They throw cabbage that turns your brain into emotional baggage.","Grape jelly was leaking out the hole in the roof.","Please tell me you don't work in a morgue.","She traveled because it cost the same as therapy and was a lot more enjoyable.","It was the scarcity that fueled his creativity.","She opened up her third bottle of wine of the night.","He was the type of guy who liked Christmas lights on his house in the middle of July.","There aren't enough towels in the world to stop the sewage flowing from his mouth.","Thigh-high in the water, the fisherman’s hope for dinner soon turned to despair.","He didn’t want to go to the dentist, yet he went anyway.","They called out her name time and again, but were met with nothing but silence.","We have young kids who often walk into our room at night for various reasons including clowns in the closet.","The paintbrush was angry at the color the artist chose to use.","All she wanted was the answer, but she had no idea how much she would hate it.","It turns out you don't need all that stuff you insisted you did.","He wondered why at 18 he was old enough to go to war, but not old enough to buy cigarettes.","I really want to go to work, but I am too sick to drive.","In that instant, everything changed.","We should play with legos at camp.","If I don’t like something, I’ll stay away from it.","The fox in the tophat whispered into the ear of the rabbit.","The pet shop stocks everything you need to keep your anaconda happy.",];

    // *** FUNCTIONS *** //
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
            var randomMessage = randomSentences[numRandomMinMax(0,49)];
            setTimeout(function(){ autoResponder(randomMessage); }, 1000);
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

    function numRandomMinMax(min, max) {
    var numRandom = Math.floor(Math.random() * (max - min + 1) ) + min;
    return numRandom;
    }

});
