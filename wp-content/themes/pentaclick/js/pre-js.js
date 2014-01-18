$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(document).ready( function(){
	if (viewport.top > 24 && $('#header').hasClass('force-move')) {
        $('.socicons').css({marginTop: -20});
        $('#navbar').css({marginTop: 0});
        $('#navbar .logo').css({marginTop: 0});
        $('#header').addClass('move');
    }
});