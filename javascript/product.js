Product = function() {
	this.switcher = new Product.Switcher();
	
	init = function() {
		
	}();
	
};

Product.Switcher = function() {
	var me = this;
	
	this.links = new Array();
	
	
	this.setLinks = function() {
		var elements = document.querySelectorAll('a.product_link');
		Array.prototype.forEach.call(elements, function(el, i){
			me.links.push(new Product.Switcher.Link(el, me));
		});
	};
	
	this.selectFirstLink = function() {
		me.links[0].setSelected();
	};
	
	init = function() {
		me.setLinks();
		me.selectFirstLink();
	}();
};
Product.Switcher.prototype.setAllLinkUnselect = function() {
		Array.prototype.forEach.call(this.links, function(link, i){
			link.setUnselected();
		});
};


Product.Switcher.Link = function(element, switcher) {
	var me = this;
	
	this.element = element;
	this.content = null;
	this.selected = false;
	this.switcher = switcher;
	
	this.setContent = function() {
		me.content = new Product.Content(document.querySelector(me.element.getAttribute("href")));
	};
	
	this.setDefaultHandler = function() {
		$(me.element).click(me.setSelectedEvent);
	};
	
	this.setSelectedEvent = function() {
		me.switcher.setAllLinkUnselect();
		me.setSelected();
		return false;
	};
	
	init = function() {
		me.setContent();
		me.content.setHide();
		me.setDefaultHandler();
	}();
};
Product.Switcher.Link.prototype.setUnselected = function() {
	$(this.element).removeClass('selected');
	this.content.setHide();
};
Product.Switcher.Link.prototype.setSelected = function() {
	$(this.element).addClass('selected');
	this.content.setShow();
};


Product.Content = function(element) {
	var me = this;
	
	this.element = element;
	
	init = function() {
		
	}();
};
Product.Content.prototype.toggleVisible = function() {
	$(this.element).toggle();
};
Product.Content.prototype.setHide = function() {
	$(this.element).hide();
};
Product.Content.prototype.setShow = function() {
	$(this.element).show();
};



$().ready(function() {
	var product = new Product();
});