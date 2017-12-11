	var members = 3;
	
	var goal = 200;
	var times = 20;
	var progress = 99;
	var progress_c = (times/goal)*100;
	
	var join_ornot = true;
	
	var like_ornot = false;
	
	document.getElementById("members").innerHTML=members+" members";
	
	document.getElementById("goal_times").innerHTML=goal;
	document.getElementById("done_times").innerHTML=times;
	var x = progress.toPrecision(3);
	document.getElementById("total_progress").innerHTML=x+"% Complete";
	var y = progress_c.toPrecision(3);
	document.getElementById("contribution_progress").innerHTML=y+"% Complete";
	$(document).ready(function(){
		$("#total_progress").css("width",x+"%");
		$("#total_progress").attr("aria-valuenow",progress);
		$("#contribution_progress").css("width",y+"%");
		$("#contribution_progress").attr("aria-valuenow",progress_c);
		if (join_ornot){
			document.getElementById("join_quit").innerHTML="Quit";
			$("#join_quit").addClass("btn-danger");
		}
		else{
			document.getElementById("join_quit").innerHTML="Join";
			$("#join_quit").addClass("btn-success");
		}
		if (like_ornot){
			$("#like").addClass("btn-info");
		}
		else{
			$("#like").addClass("btn-default");
		}
		$("#add_times").click(function(){
			times+=1;
			document.getElementById("done_times").innerHTML=times;
			progress = progress+(1/goal)*100;
			x = progress.toPrecision(3);
			document.getElementById("total_progress").innerHTML=x+"% Complete";
			$("#total_progress").css("width",x+"%");
			$("#total_progress").attr("aria-valuenow",progress);
			progress_c = (times/goal)*100;
			y = progress_c.toPrecision(3);
			document.getElementById("contribution_progress").innerHTML=y+"% Complete";
			$("#contribution_progress").css("width",y+"%");
			$("#contribution_progress").attr("aria-valuenow",progress_c);
			if (progress>=100){
				$("#add_times").attr("disabled",true);
			}
		});
		$("#join_quit").click(function(){
			if (join_ornot){
				join_ornot = false;
				document.getElementById("join_quit").innerHTML="Join";
				$("#join_quit").removeClass("btn-danger");
				$("#join_quit").addClass("btn-success");
			}else{
				join_ornot = true;
				document.getElementById("join_quit").innerHTML="Quit";
				$("#join_quit").removeClass("btn-success");
				$("#join_quit").addClass("btn-danger");
			}
		});
		$("#like").click(function(){
			if (like_ornot){
				like_ornot = false;
				$("#like").removeClass("btn-info");
				$("#like").addClass("btn-default");
			}else{
				like_ornot = true;
				$("#like").removeClass("btn-default");
				$("#like").addClass("btn-info");
			}
		});
	});
	function mouseleave(){
		if (document.getElementById("individual").selected){
			console.log("hi");
			document.getElementById("form_totalmembers").disabled=true;
		}
		else {
			document.getElementById("form_totalmembers").disabled=false;
		}
	}