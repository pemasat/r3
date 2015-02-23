function setMinHeight(elem) {
    var finalHeight=0;
    $(elem).css('height', 'auto');
    $(elem).each(function() {
        var $this = $(this);

        if (finalHeight < $this.height()) {
                finalHeight = $this.height();

        }	
    });
    $(elem).css('height', finalHeight);	
}


$(window).load(function() { 

	//  do onloadu kvuli chrome
  setMinHeight('.promo .grid_column');



  
});

$(window).resize(function() {

  setMinHeight('.promo .grid_column');
	
});


$(document).ready(function() {
    

});