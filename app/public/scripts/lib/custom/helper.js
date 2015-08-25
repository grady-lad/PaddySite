define(["jquery"], function($) {
	try{
		var url = location.href.split('/').pop();
		if(url === 'gallery' || 'blog' || 'contact' || 'about'){
			$('#' + url).addClass('active');
		}
	}catch(err){
		//Error will happen if hit the single Illustration page from some reason
	}
});