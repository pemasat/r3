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
	this.cells = new Array();
	
	this.initCells = function() {
		var cellElements = me.element.querySelectorAll('.grid_columnIn');
		Array.prototype.forEach.call(cellElements, function(cellElement, i){
			me.cells.push(new Product.Content.Cell(cellElement, me));
		});
	};
	
	init = function() {
		me.initCells();
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
	setMinHeight('.product_item .grid_columnIn'); // global.js
};

Product.Content.Cell = function(element, content) {
	var me = this;
	
	this.element = element;
	this.content = content;
	this.infoboxElement = me.element.querySelector('.infoBox');
	
	this.setDefaultEvent = function() {
		if (me.infoboxElement !== null) {
			$(me.element).mouseenter(me.showInfobox);
			$(me.infoboxElement).mouseleave(me.hideInfobox);
		}
	};
	
	this.showInfobox = function() {
		$(me.infoboxElement).show();
	};
	this.hideInfobox = function() {
		me.setDefaultEvent();
		$(me.infoboxElement).hide();
	};
	
	init = function() {
		(me.infoboxElement !== null) ? me.hideInfobox() : {};
		
	}();
	
};


$().ready(function() {
	var product = new Product();
});