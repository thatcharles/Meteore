$(document).ready(function() {
  /*
   * Main variables
   */
  var content = [{
    title: "",
    desc: ""
  }, {
    title: "Meteore",
    desc: "About Us Charles JoJo Riensha Karmii"
  }, {
    title: "The Man Who Knows What's Going On",
    desc: "The Territory Recapturer The Longitudinal Waver Of Air"
  }, {
    title: "The Passionate Half-Hearted",
    desc: "Contact Charles Contact JoJo Contact Riensha Contact Karmii"
  }];
  var currentPage = 0;
  //generate content
  for (var i = 0; i < content.length; i++) {
    //split content letters to array
    for (var obj in content[i]) {
      //if string
      if (typeof content[i][obj] === "string") {
        content[i][obj] = content[i][obj].split("");
        continue;
      }
      //if array (grouped text)
      else if (typeof content[i][obj] === "object") {
        var toPush = [];
        for(var j = 0; j < content[i][obj].length; j++) {
          for(var k = 0; k < content[i][obj][j].length; k++) {
            toPush.push(content[i][obj][j][k]);
          }
        }
        content[i][obj] = toPush;
      }
    }
    //set text to 
    $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
    setText();
    //clone to data
    $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
    setText();
  }
  //initial arrangement
  //arrangeCurrentPage();
  scrambleOthers();
	//$("#email").append("<td><a href=\"mailto:charles5j21z@gmail.com\">Contact Charles</a></td><td><a href=\"mailto:a5560648@gmail.com\">Contact JoJo</a></td><td><a href=\"mailto:rienshaliu@gmail.com\">Contact Riensha</a></td><td><a href=\"mailto:ohmygodorz315@gmail.com\">Contact Karmii</a></td>");

  /*
   * Event handlers
   */
  $(window).resize(function() {
    scrambleOthers();
	
  });
  
  /*
   * Functions
   */

  function setText() {
    var j;
    for (j = 0; j < content[i].title.length; j++) {
      $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
    }
    for (j = 0; j < content[i].desc.length; j++) {
      $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
    }
  }

  function scrambleOthers() {
    for (var i = 0; i < content.length; i++) {
      //don't scramble currentPage
      if (currentPage === i)
        continue;
      var parts = [
        ["title", ".soup-title"],
        ["desc", ".soup-desc"]
      ];
      //apply to .title h1s and .desc ps
      for (var j = 0; j < parts.length; j++) {
        for (var k = 0; k < content[i][parts[j][0]].length; k++) {
          //define random position on screen
          var randLeft = Math.floor(Math.random() * $(window).width());
          var randTop = Math.floor(Math.random() * $(window).height());
          //defining boundaries
          var offset = $(".position-data").eq(currentPage).offset();
          var bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top
          };
          var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
          var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
          //finally, apply all the scrambles
          $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
            left: randLeft,
            top: randTop,
            color: "#DDD",
            zIndex: "-1"
          });
        }
      }
    }
	//document.getElementById("email").innerHTML = "";
	//$("#email").append("<td><a href=\"mailto:charles5j21z@gmail.com\">Contact Charles</a></td><td><a href=\"mailto:a5560648@gmail.com\">Contact JoJo</a></td><td><a href=\"mailto:rienshaliu@gmail.com\">Contact Riensha</a></td><td><a href=\"mailto:ohmygodorz315@gmail.com\">Contact Karmii</a></td>");

  }
  
});