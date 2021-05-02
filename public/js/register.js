$(document).ready(function () {

    /*
        attach the event `keyup` to the html element where id = `idNum`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#username').keyup(function () {

        // get the value entered the user in the `<input>` element
        var username = $('#username').val();

        /*
            send an HTTP GET request using JQuery AJAX
            the first parameter is the path in our server
            which is defined in `../../routes/routes.js`
            the server will execute the function getCheckID()
            defined in `../../controllers/signupController.js`
            the second parameter passes the variable `idNum`
            as the value of the field `idNum`
            to the server
            the last parameter executes a callback function
            when the server sent a response
        */
        $.get('/getCheckID', {username: username}, function (result) {

            /*
                if the current value of `idNum` exists in the database
                change the background-color of the `<input>` element to red
                display an error message
                and disable the submit button
            */
            if(result.username == username) {
                $('#username').css('background-color', 'red');
                $('#usernameError').text('Username already registered');
                $('#submit').prop('disabled', true);
            }

            /*
                else
                change the background-color of the `<input>` element back
                remove the error message
                and enable the submit button
            */
            else {
                $('#username').css('background-color', '#6c757d');
                $('#usernameError').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });
});