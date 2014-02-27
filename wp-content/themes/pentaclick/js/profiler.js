//Globals
var sixtySecondsQuery;


// --------------------------------------------------------------------------------------------------------------------


//Visual things

$('.chat-input').on('click', function() {
   $('#chat-input').focus();
});

$('#chat-input').on('keyup', function(e) {
    if (!e) {
        e = window.event;
	}

    /*if (e.keyCode == 13 && e.shiftKey) {
		return true;
    }
    else*/
    
    if (e.keyCode == 13) {
        var text = $(this).val();
        $(this).val('');
        var query = {
            type: 'POST',
            dataType: 'json',
            data: {
                control: 'chat',
                action: 'send',
                post: 'tId='+tId+'&code='+code+'&text='+text
            },
            success: function(answer) {
                $('.chat-content').html(answer.html);
                $('.chat-content').scrollTop($('.chat-content').height());
            }
        }
        ajax(query);
    }
});

$('#leave').on('click', function() {
    if (!confirm(_('sure_to_quit'))) {
        return false;
    }
    
    var query = {
        type: 'POST',
        dataType: 'json',
        data: {
            control: 'leave',
            post: 'tId='+tId+'&code='+code
        },
        success: function(answer) {
            if (answer.ok == 1) {
                alert(answer.message);
                window.location = site;
            }
            else {
                alert('Error');
                console.log(answer);
            }
        }
    }
    ajax(query);
});

// --------------------------------------------------------------------------------------------------------------------


//Main things
profiler = {
    fetchChat: function() {
        var query = {
            type: 'POST',
            dataType: 'json',
            data: {
                control: 'chat',
                action: 'fetch',
                post: 'tId='+tId+'&code='+code
            },
            success: function(answer) {
                if (answer.ok != 2) {
                    $('.chat-content').html(answer.html);
                    $('.chat-content').scrollTop($('.chat-content').height());
                }
            }
        }
        ajax(query);
    },
    statusCheck: function() {
        var query = {
            type: 'POST',
            dataType: 'json',
            data: {
                control: 'statusCheck',
                post: 'tId='+tId+'&code='+code
            },
            success: function(answer) {
                $('#opponentStatus').removeClass('online offline');
                $('#opponentName').removeClass('not-none');
                
                $('#opponentSec').html('30');
                
                $('#opponentName').addClass((answer.opponentName!='none'?'not-none':''));
                $('#opponentStatus').addClass((answer.opponentStatus==true?'online':'offline'));
                $('#opponentName').html(answer.opponentName);
                $('#opponentStatus').html((answer.opponentStatus==true?'online':'offline'));
            }
        }
        ajax(query);
    },
    statusCheckTimer: function() {
        var sec = parseInt($('#opponentSec').html()) - 1;
        if (sec != 0) {
            $('#opponentSec').html(sec);
        }
    }
};

//Start
profiler.fetchChat();
profiler.statusCheck();
setInterval(function () { profiler.statusCheckTimer(); }, 1000);
setInterval(function () { profiler.fetchChat(); }, 5000);
setInterval(function () { profiler.statusCheck(); }, 30000);