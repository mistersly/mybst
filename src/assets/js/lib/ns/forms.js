
    NS.moduleCreate('form', function($el, param) {
        var $root = $el,
            $inputText = $el.find('input').not('[type=radio], [type=checkbox]'),
            $inputCheckboxList = $el.find('input[type=checkbox]'),
            $inputRadioList = $el.find('input[type=radio]'),
            $textArea = $el.find('textarea'),
            $select = $el.find('select'),
            isIE8 = NS.$htmlTag.hasClass('ie8');

        var checkSelects = function() {
            var test = true;
            $select.each(function(){
                var $this = $(this),
                    errormsg = $this.attr('data-errormsg') || 'error';
                if($this.prop('required') && ($this.val() === '0' || $this.val() === '')){
                    $this.setCustomValidity(errormsg);
                    test = false;
                } else {
                    $this.parent().removeClass('error');
                    $this.setCustomValidity('');
                }
            });
            return test;
        };

        /* Input text */
        $inputText.parent().find('label').on('click', function() {
            $(this).parent().find('input').focus();
        });

        if(param !== undefined && param.hideLabels){

            $inputText.on('focus', function() {
                $(this).parent().find('label').hide();
            });
            $inputText.on('blur', function() {
                var $this = $(this);
                if ($this.val() === '') {
                    $this.parent().find('label').show();
                }
            });

            /* Textarea */
            $textArea.parent().find('label').on('click', function() {
                $(this).parent().find('input').focus();
            });
            $textArea.on('focus', function() {
                $(this).parent().find('label').hide();
            });
            $textArea.on('blur', function() {
                var $this = $(this);
                if ($this.val() === '') {
                    $this.parent().find('label').show();
                }
            });

            /* Select */
            $select.change(function(){
                var $this = $(this);
                if($this.val() != ''){
                    $this.parents('.select').find('label').hide();
                }else{
                    $this.parents('.select').find('label').show();
                }
            });
        }

        /* Checkboxes  */
        /* Si checkboxe(s) checked */
        $inputCheckboxList.each(function() {
			if(isIE8){
				$(this).next().append('<span>&nbsp;</span>')
			}
            if(this.checked){
                $(this).next().addClass('checked');
            }
        });
        /* Click label */
		$inputCheckboxList.on('change', function() {
			var $this = $(this);
			if (this.checked) {
				$this.next().addClass('checked');
			} else {
				$this.next().removeClass('checked');
			}
		});
		

        /* Radio  */
        /* Si radio(s) checked */
        $inputRadioList.each(function() {
			if(isIE8){
				$(this).next().append('<span>&nbsp;</span>')
			}
            if(this.checked){
                $(this).next().addClass('checked');
            }
        });

        if(isIE8){
            $inputRadioList.next().click(function(){
                var $radio = $(this).prev();
                if(!$radio.is(':checked')){
                    $radio.prop('checked', true);
                }
                $radio.change();
            });
        }

        $inputRadioList.on('change', function() {
            var $this = $(this);
            if (this.checked) {
                $root.find('input[name="'+$this.attr('name')+'"]').next().removeClass('checked');
                $this.next().addClass('checked');
            }
        });
		

        if (navigator.userAgent.indexOf('MSIE') > -1 && $.fn.sb === undefined) {
            $select.css('visibility', 'hidden');
            $select.each(function(){
                $(this).selectBox();                
            });	
        } else {
            $select.wrap('<span class="custom-dropdown"/>');
            $select.on('invalid',function(){
                $(this).parent().addClass('error');
            });

            $select.on('change',function(e){
                if (e.target.validity.valid) {
                    $(this).parent().removeClass('error');
                } else {
                    $(this).parent().addClass('error');
                }
            });		
		}

        $.webshims.ready('form-validators', function(){
            $.webshims.addCustomValidityRule('allselect', function(elem, value){
                if(value && $(elem).is('select') && (value === '0' || value === '')){ 
                    return true; //means yes, it's not valid 
                } else { 
                    return false; //no, it is valid 
                } 
            });
        });
		
    });
