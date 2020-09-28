/* global $ */

$(document).ready(function(){
	
	$('input[type="checkbox"]').on('change', function() {
   	$(this).siblings('input[type="checkbox"]').prop('checked', false);
	});
	
	$(':input').change(function(evt){
		var filter = $(':input:checked,select').map(function(index, el) {
			return "." + el.value;
		}).toArray().join("");
		console.log(filter)
		$(".category").hide().filter(filter).show();
	});
});