/* global $ */

$(document).ready(function(){
	
		$('#fweight, #fvolume').change(function(evt){
		var filter = $('#fweight, #fvolume').map(function(index, el) {
			return "." + el.value;
		}).toArray().join("");
		console.log(filter)
		$(".fquantity").hide().filter(filter).show();
	});
	
	$('#site, #oweight, #ovolume').on('change', function(event){
		var filter = $('#site, #oweight, #ovolume').map(function(index, el) {
			return "." + el.value;
		}).toArray().join("");
		console.log(filter)
		$(".category").hide().filter(filter).show();
	});
});