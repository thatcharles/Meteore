var accessToken;
/*   wys 1231 1100   */
var userId ="";
var userName; 
/*                  */
function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		  break;
		}
	  }
	}
	
	function move(){
		ImgTop = document.getElementById("bkTop");
		ImgBtm = document.getElementById("bkButtom");
		ImgTop.style.display="none";
		ImgBtm.style.display="none";
		lgBtn = document.getElementById("logBtn");
		lgBtn.style.display="none";
	}
	$(function(){
    $('.carousel').carousel({
      interval: 3000
    });
});

			  function statusChangeCallback(response) {
				console.log('statusChangeCallback');
				console.log(response);
				if (response.status === 'connected') {
					accessToken = response.authResponse.accessToken;
					userId = response.authResponse.userID;
					console.log(userId);
					//LoginSuccess();
					getUserName(); // wys 1231 1138
				} else if (response.status === 'not_authorized') {
				  document.getElementById('status').innerHTML = 'Please log ' +
					'into this app.';
					
				} else {
				  document.getElementById('status').innerHTML = 'Please log ' +
					'into Facebook.';
				}
			  }

			  function checkLoginState() {
				FB.getLoginStatus(function(response) {
				  statusChangeCallback(response);
				});
			  }
			  /* wys 1231 1138  */
			  function getUserName(){
				  FB.api("/"+userId, function(response){ 
					  if (response && !response.error) {
						userName = response.name;
						console.log(userId, userName);
						LoginSuccess();
					  }
					  else{
						  console.log(response);
					  }
				  });
			  }
			  /******************/

			  window.fbAsyncInit = function() {
			  FB.init({
				appId      : '1139826939465381',
				cookie     : true,  // enable cookies to allow the server to access 
									// the session
				xfbml      : true,  // parse social plugins on this page
				version    : 'v2.8' // use graph api version 2.5
			  });

			  FB.getLoginStatus(function(response) {
				statusChangeCallback(response);
			  });
			  };
			  

			  (function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "https://connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			  }(document, 'script', 'facebook-jssdk'));

			  function testAPI() {
				//document.getElementById("logBtn").style.display='none';
				console.log('change location');
				window.location.href="success";
				console.log("Afer");
				
			  }


			  function LoginSuccess(){
				document.cookie = "AccessToken=" + accessToken;
				document.cookie = "userId="+userId;
				document.cookie = "userName="+userName;
				console.log(document.cookie);

				method = "post"; // Set method to post by default if not specified.

    			// The rest of this code assumes you are not using a library.
    			// It can be made less wordy if you use one.
    			var form = document.getElementById("tokenform");

            	var hiddenField = document.createElement("input");
            	hiddenField.setAttribute("type", "hidden");
            	hiddenField.setAttribute("name", "login_token");
            	hiddenField.setAttribute("value", accessToken);

            	var hiddenField2 = document.createElement("input");
            	hiddenField2.setAttribute("type", "hidden");
            	hiddenField2.setAttribute("name", "login_userId");
            	hiddenField2.setAttribute("value", userId);
				
				/* wys 1231 1100   */
				var hiddenField3 = document.createElement("input");
            	hiddenField3.setAttribute("type", "hidden");
            	hiddenField3.setAttribute("name", "user_name");
            	hiddenField3.setAttribute("value", userName);
            	//print(userName)
				/*                 */
				
            	form.appendChild(hiddenField);
            	form.appendChild(hiddenField2);
				form.appendChild(hiddenField3); // wys 1231 1100
         		
    			document.body.appendChild(form);
    			form.submit();
				//sleep(8000);
				move();
			  }