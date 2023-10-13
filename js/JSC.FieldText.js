!function(global) {
  'use strict';

  function FieldText( elem, params ){
    this.$element = jQuery(elem);
    this.params = params || {};

    this.classActive = this.params.classActive || 'JS-FieldText-active';
    this.classReady = this.params.classReady || 'JS-FieldText-ready';
    this.onInit = this.params.onInit || null;
    this.onReady = this.params.onReady || null;

    this.__construct();
  };

  FieldText.prototype.__construct = function(){
    this.$input = this.$element.find('.JS-FieldText-Input');
    this.$label = this.$element.find('.JS-FieldText-Label');

    this._init();

    this.$element.data('JS-FieldText', this);
  };

  FieldText.prototype._init = function(){
      var _this = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, [this]);
    }

    if (this.$input.val() != '' && !this.$element.hasClass(this.classActive)) {
        this.$element.addClass(this.classActive);
    }

    this.$input.on('focus.JS-FieldText', function(e){
      _this._focus.apply(_this, [this]);
    });

  this.$input.on('blur.JS-FieldText', function(e){
      _this._blur.apply(_this, []);
  });

    this._ready();
  };

  FieldText.prototype._ready = function() {
    this.$element.addClass('JS-FieldText-ready').addClass(this.classReady);

    if ( jQuery.isFunction(this.onReady) ) {
      this.onReady.apply(window, [this]);
    }
  };

  FieldText.prototype._focus = function _focus() {
      if (!this.$element.hasClass(this.classActive)) {
          this.$element.addClass(this.classActive);
      }
  };

    FieldText.prototype._blur = function _blur() {
        if (this.$input.val() == '' && this.$element.hasClass(this.classActive)) {
            this.$element.removeClass(this.classActive);
        }
    };
  /*--/FieldText--*/

  global.FieldText = FieldText;
}(this);
