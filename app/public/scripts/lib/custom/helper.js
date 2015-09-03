define(function() {
	try{
		var url = location.href.split('/').pop();
		if(url === 'gallery' || 'blog' || 'contact' || 'about'){
			document.getElementById(url).setAttribute("class" , "active");
		}
	}catch(err){
		//Error will happen if hit the single Illustration page from some reason
	}
});