var userId="";
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
	  
	function statusChangeCallback(response) {
		console.log('statusChangeCallback');
		if (response.status === 'connected') {
			accessToken = response.authResponse.accessToken;
			userId = response.authResponse.userID;
			console.log(userId);
			showName();
			showPic();
		} else if (response.status === 'not_authorized') {
		  window.location = "../login"; //modified
			
		} else {
		  window.location = "../login"; //modified
			
		}
	}
	function showName(){
		  FB.api("/"+userId, function(response){
			if (response && !response.error) {
				userName = response.name;
				console.log(userId, userName);
				document.getElementById("userName").innerHTML = userName;
			}
			else{
				console.log(response);
			}
		});
	}

	function showPic(){
		FB.api( "/"+userId+"/picture", function (response) {
		  if (response && !response.error) {
			console.log(response.data.url);
			document.getElementById("userImg").src = response.data.url;
		  }
		}
	);}
	


  

	function mouseleave(){
		if (document.getElementById("individual").selected){
			console.log("hi");
			document.getElementById("form_totalmembers").min = 1;
			document.getElementById("form_totalmembers").max = 1;
			document.getElementById("form_totalmembers").value = 1;
			console.log(document.getElementById("form_totalmembers").value);
		}
		else {
			document.getElementById("form_totalmembers").min = 2;
			document.getElementById("form_totalmembers").max = 1000000;
		}
	}

		var members = 0;
	//Riensha
	var title = "";
	var founder = "";
	var content = "";
	var kind = "";
	var privacy = "";
	var total_members = 2;
	var id = 0;
	//Riensha
	var goal = 200;
	var times = 0;
	var progress = 99;
	var progress_c = (times/goal)*100;
	
	var join_ornot = true;
	
	var like_ornot = false;
	$(document).ready(function(){
		$("#form_add").mouseenter(function(){
			var text = $("#form_title").val();
			var form_member = $("#form_totalmembers").val();
			var form_goal = $("#form_goal").val();
			var form_text = $("#form_detail").val();
			if (text==""){
				alert("The title of mission is necessary!");
				document.getElementById("form_add").disabled=true;
			}
			else if (form_member<2&&document.getElementById("public").selected){
				alert("Total members must be greater than 1!");
				document.getElementById("form_add").disabled=true;
			}
			else if (form_member>1&&document.getElementById("individual").selected){
				alert("Total members must be 1!");
				document.getElementById("form_add").disabled=true;
			}
			else if (form_goal<1){
				alert("Goal must be greater than 0!");
				document.getElementById("form_add").disabled=true;
			}
			else if (form_text==""){
				alert("The detail of your mission is necessary!");
				document.getElementById("form_add").disabled=true;
			}
			else {
				
			}
		});
		$("#form_add").click(function(){
			$("#empty_sheet").modal("hide");
		});
		$("#form_title").mouseenter(function(){
			document.getElementById("form_add").disabled=false;
		});
		$("#form_kind").mouseenter(function(){
			document.getElementById("form_add").disabled=false;
		});
		$("#form_private").mouseenter(function(){
			document.getElementById("form_add").disabled=false;
		});
		$("#form_totalmembers").mouseenter(function(){
			document.getElementById("form_add").disabled=false;
		});
		$("#form_goal").mouseenter(function(){
			document.getElementById("form_add").disabled=false;
		});
		$("#form_detail").mouseenter(function(){
			document.getElementById("form_add").disabled=false;
		});
	});
	function showmodal(id){
		document.getElementById("join_quit").style.display = "";
		document.getElementById("like").style.display = "";
		document.getElementById("add_times").style.display = "";

		var txt = "/profiles/add_attended/"+testList[id].id;
		//var txt_esc = escape(txt);
		//console.log(txt);
		document.getElementById("join_a").setAttribute("href",txt);
		var txt_like = "/profiles/mission_like/"+testList[id].id;
		document.getElementById("like_a").setAttribute("href",txt_like);
		var txt_addtime = "/profiles/mission_progress/"+testList[id].id;
		document.getElementById("add_a").setAttribute("href",txt_addtime);
		
		founder = testList[id].founder;
		title = testList[id].title;
		content = unescape(testList[id].content);
		kind = testList[id].kind;
		privacy = testList[id].private;
		total_members = testList[id].totalmembers;
		goal = testList[id].goal;
		contribution = getMissionDegree(testList[id].id);
		if(contribution){
			progress_c = (contribution/goal)*100;
		}else{
			progress_c = 0;
		}
		document.getElementById("title").innerHTML=title;
		document.getElementById("kind").innerHTML=kind;
		document.getElementById("private").innerHTML=privacy;
		document.getElementById("founder").innerHTML=founder;
		document.getElementById("total_members").innerHTML=total_members;
		document.getElementById("goal_times").innerHTML=goal;
		document.getElementById("detail").innerHTML=content;
		
		document.getElementById("members").innerHTML=testList[id].member.length+" members";
		document.getElementById("member_menu").innerHTML = "";
		for (i=0;i<testList[id].member.length;i++){
			document.getElementById("member_menu").innerHTML+='<li><a href="#">'+testList[id].member[i]+'</a></li>';
		}
		
		document.getElementById("goal_times").innerHTML=goal;
		document.getElementById("done_times").innerHTML=contribution;
		progress = (testList[id].progress/goal)*100;
		var x = progress.toPrecision(3);
		document.getElementById("total_progress").innerHTML=x+"% Complete";
		var y = progress_c.toPrecision(3);
		document.getElementById("contribution_progress").innerHTML=y+"% Complete";
		
		$("#total_progress").css("width",x+"%");
		$("#total_progress").attr("aria-valuenow",progress);
		$("#contribution_progress").css("width",y+"%");
		$("#contribution_progress").attr("aria-valuenow",progress_c);
		if (now_user_nickname==founder){
			$("#join_quit").css("display","none");
		}
		else {
			$("#join_quit").css("display","");
		}
		join_ornot = false;
		for (i=0;i<usermissionList.length;i++){
			if (usermissionList[i]==testList[id].id){
				join_ornot = true;
			}
		}
		if (join_ornot){
			document.getElementById("add_times").disabled = false;
			document.getElementById("join_quit").src=image[3];
		}
		else{
			document.getElementById("add_times").disabled = true;
			if (now_user_nickname==founder){
				document.getElementById("add_times").disabled = false;
			}
			document.getElementById("join_quit").src=image[2];
		}
		if (like_ornot){
			document.getElementById("like").src=image[1];
		}
		else{
			document.getElementById("like").src=image[0];
		}
		if (testList[id].isActive==false){
			console.log("hi");
			document.getElementById("join_quit").style.display = "none";
			document.getElementById("like").style.display = "none";
			document.getElementById("add_times").style.display = "none";
		}
	}