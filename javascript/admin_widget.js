function wac_disable_lang(select_clone, chosen_value)
{
	var valid_options = {
			'US' : ['en_US', 'es_MX', 'pt_BR'],
			'EU' : ['en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'pt_PT'],
			'KR' : ['ko_KR'],
			'TW' : ['zh_TW']
	};
	
	//reset the second select on each change
	jQuery('select.wa-lang').html(select_clone.html())
	
	var valid = valid_options[chosen_value];
	jQuery("select.wa-lang option").each(function() {
		if (jQuery.inArray(jQuery(this).val(), valid) == -1)
		{
			jQuery(this).remove();
		}
	});
}

;(function($) {
	$(document).ready(function() {
		// copy the lang select, so we can easily reset it
		var select_clone = $('select.wa-lang').clone();
		
		// setup the initial options
		var start_val = $('select.wa-region').val();
		wac_disable_lang(select_clone, start_val);
		
		// and onchange events to keep things pucka.
		// since the widget is updated using javascript we need to delegate so that
		// the events are reattached to the new DOM elemnents
		$('div.widget-liquid-right').delegate('select.wa-region', 'change', function() {
			var val = $(this).val();
			wac_disable_lang(select_clone, val);
		});
		
		// find all the sub-options lists and make them show/hide based on their parent
		// form elements status.
		$('span.sub_options').each(function() {
			var parent = $(this).attr('rel');
			
			// more delegation
			$('div.widget-liquid-right').delegate('#' + parent, 'change', function() {
				if ($(this).is(':checked'))
				{
					$('span.sub_options[rel="' + this.id + '"]').slideDown('fast');
				}
				else
				{
					$('span.sub_options[rel="' + this.id + '"]').slideUp('fast', function() {
						$('input[type="checkbox"]', this).attr('checked', false);
					})
				}
			});
		});
	});
}(jQuery));