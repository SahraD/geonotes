;(function( $ ){

    $.extend($.fn, {

        taphold : function(option){

            var timeout,
                taphold;

            this.on('mousedown', function(){
                timeout = setTimeout(function() {
                    taphold = true;
                }, 1000);
            }).on('mouseup', function(){
                if(taphold){
                    if (typeof option == 'function') {
                        option.call(this);
                    }
                }
                taphold = false;
                clearTimeout(timeout);
            });
        }

    });
})(jQuery);