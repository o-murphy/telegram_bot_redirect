(function () {
	// make sure that if an error occurs, it doesn't break other scripts on the page
	try	{
		//create array with icons (path, redirectURl)
		var icons = [
			{
				src:'http://dinacheley.com/wialon/lessons/images/twitter-clr.svg',
				href:'https://twitter.com/WialonGPS'
			},
			{
				src:'http://dinacheley.com/wialon/lessons/images/facebook-clr.svg',
				href:'https://web.facebook.com/Gurtam.en'
			},
			{
				src:'http://dinacheley.com/wialon/lessons/images/insta-clr.svg',
				href:'https://www.instagram.com/gurtam_team/'
			},
			{
				src:'http://dinacheley.com/wialon/lessons/images/apple-clr.svg',
				href:'https://apps.apple.com/ru/app/id960699792'
			}

		];

		var div = document.createElement('div');
		icons.forEach(function(icon){
			div.innerHTML += "<a href='"+ icon.href +"' target='_blank'><img src='"+ icon.src +"'></a>";
		})
		div.style = "position: absolute;" +
			"top: 100%;" +
			"width: 100%;" +
			"padding: 2em 0;" +
			"text-align: center";

		document
			.getElementsByClassName('login-bg')[0]
			.insertAdjacentElement('beforeend', div);
	}
	catch (err) {
		// do nothing
	
	}

})()
