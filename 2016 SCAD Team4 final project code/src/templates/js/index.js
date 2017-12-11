var MouseHandler = (function() {
  var x = 0;
  var y = 0;
  var px = 0;
  var py = 0;
  var mouseIn = false;
  var mouseDown = false;
  var mouseClick = false;
  var modalOpen = false;
  var zoomMode = 0;
  var init = function(eventSrc) {
    eventSrc.addEventListener('mousemove', onMouseMove);
    eventSrc.addEventListener('mouseout', onMouseOut);
    eventSrc.addEventListener('mouseover', onMouseOver);
    eventSrc.addEventListener('mousedown', onMouseDown);
    eventSrc.addEventListener('mouseup', onMouseUp);
    eventSrc.addEventListener('mousewheel', onWheel);
    eventSrc.addEventListener('click', onMouseClick);
  };
  //triggering function
  var onMouseMove = function(e) {
    x = e.clientX;
    y = e.clientY;
  };  
  var onMouseOut = function() {
    mouseIn = false;
  };  
  var onMouseOver = function() {
    mouseIn = true;
  };  
  var onMouseDown = function() {
    mouseDown = true;
  }; 
  var onMouseUp = function() {
    mouseDown = false;
  };  
  var onWheel = function(event) {
    if (event.wheelDelta > 0) {
      zoomMode = 1;
    } else {
      zoomMode = -1;
    }

  };
  var onMouseClick = function() {
    mouseClick = true;
  };  
  //boolean function 
  var isZoom = function() {
    return zoomMode;
  }  
  var isMouseIn = function() {
    return mouseIn;
  };  
  var isMouseDown = function() {
    return mouseDown;
  }; 
  var isMouseClick = function() {
    return mouseClick;
  };  
  var isModalOpen = function() {
    return modalOpen;
  };
  //about position function
  var setPrePos = function(pos) {
    px = pos.x;
    py = pos.y;
  }
  var getPos = function() {
    return {
      x: x,
      y: y
    };
  };    
  var getPrePos = function() {
    return {
      x: px,
      y: py
    }
  } 
  //other handling function
  var endZoom = function() {
    zoomMode = 0;
  }
  var endMouseClick = function() {
    mouseClick = false;
  }

  var setModalState = function(flag) {
    modalOpen = flag;
  };

  var getScale = function() {
    return scale;
  }
  return {
    init: init,
    getPos: getPos,
    isMouseIn: isMouseIn,
    isMouseDown: isMouseDown,
    setPrePos: setPrePos,
    getPrePos: getPrePos,
    isZoom: isZoom,
    endZoom: endZoom,
    endMouseClick: endMouseClick,
    isMouseClick: isMouseClick,
    setModalState: setModalState,
    isModalOpen: isModalOpen
  };
})();
function subCircle(attr){
  var attr = attr || {};
  var x = 0;
  var y = 0;
  var mass = attr.mass || 500;
  var centerX = attr.centerX || 0;
  var centerY = attr.centerY || 0;
  var vel = attr.vel || 0;
  var R = attr.R || 0;
  //var angle = 0;//angle fron 0 ~ 2PI
  var radius = Math.sqrt(mass / Math.PI); //1 unit of area === 1 uni of mass
  var angle = 0;
  var speed = 10 * vel /( R * mass );
  //var angel = attr.angel || 0;
  //var R = attr.R || 0;

  var getAttr = function() {
    return {
      x: x,
      y: y,
      mass: mass,
      radius: radius,
	  vel: vel,
	  R: R
    };
  };

  var setAttr = function(attr) {
    x = (attr.x !== undefined) ? attr.x : x;
    y = (attr.y !== undefined) ? attr.y : y;
    mass = (attr.mass !== undefined) ? attr.mass : mass;
    radius = (attr.radius !== undefined) ? attr.radius : radius;
  };

  var draw = function(ctx, cam) {
    var camSize = cam.getSize();
    var rInfo = cam.getRelInfo(getAttr());

    //if outside Cam view
    if ((rInfo.x + rInfo.radius) < 0 || (rInfo.y + rInfo.radius) < 0 || (rInfo.x - rInfo.radius) > camSize.width || (rInfo.y - rInfo.radius) > camSize.height) {
      return;
    }
	ctx.fillStyle = 'White';
	//draw the head of the meteor
    var circle = new Path2D();
    circle.arc(rInfo.x, rInfo.y, rInfo.radius, 0, 2 * Math.PI, false);
    ctx.fill(circle);
  };

  var update = function(dTime) {
    
	/*
    var vx = velX + acceX * dTime;
    var vy = velY + acceY * dTime;
    x += velX * dTime + 0.5 * acceX * dTime * dTime;
    y += velY * dTime + 0.5 * acceY * dTime * dTime;*/
    //calculate tail position: the position one second before
    //px = x - velX * 1 + 0.5 * acceX * 1 * 1;
    //py = y - velY * 1 + 0.5 * acceY * 1 * 1;
	x = centerX + Math.cos(angle) * R;
	y = centerY + Math.sin(angle) * R;
	updateAcce();
  };

  var updateAcce = function() {
	if(angle < Math.PI * 2){
		angle += speed;
	}else{
	    angle = 0;
	}
  };
  
  //if the meteor is clicked, we have to show the madal
  /*
  var clicked = function(cam) {
    var clickedPos = MouseHandler.getPos();
    var meteorPos = Camera.getRelInfo(getAttr());
    if (clickedPos.x < meteorPos.x + 30 && clickedPos.x > meteorPos.x - 30 && clickedPos.y < meteorPos.y + 30 && clickedPos.y > meteorPos.y - 30) {
      if (!MouseHandler.isModalOpen()) {
        $('#myModal').modal('show');
        MouseHandler.setModalState(true);
      }
      return true;
    } else {
      MouseHandler.setModalState(false);
      return false;
    }
  }*/
  return {
    getAttr: getAttr,
    setAttr: setAttr,
    draw: draw,
    update: update,
    updateAcce: updateAcce,
  };
}
function Circle(attr) {
  var x = attr.x || 0;
  var y = attr.y || 0;
  var mass = attr.mass || 500;
  var color = attr.color || 'white';
  var radius = Math.sqrt(mass / Math.PI); //1 unit of area === 1 uni of mass
  var subList = [];
  var dTime = 1/60;
  var image = ImageLoader.getImage(attr.id) || null;

  var getAttr = function() {
    return {
      x: x,
      y: y,
      mass: mass,
      radius: radius,
      color: color,
    };
  };

  var setAttr = function(attr) {
    x = (attr.x !== undefined) ? attr.x : x;
    y = (attr.y !== undefined) ? attr.y : y;
    mass = (attr.mass !== undefined) ? attr.mass : mass;
    color = (attr.color !== undefined) ? attr.color : color;
    radius = (attr.radius !== undefined) ? attr.radius : radius;
  };

  var draw = function(ctx, cam) {
    var camSize = cam.getSize();
    var rInfo = cam.getRelInfo(getAttr());


    //if outside Cam view
    if ((rInfo.x + rInfo.radius) < 0 || (rInfo.y + rInfo.radius) < 0 || (rInfo.x - rInfo.radius) > camSize.width || (rInfo.y - rInfo.radius) > camSize.height) {
      return;
    }
    /*
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 5;
    ctx.fillStyle = 'White';
    var circle = new Path2D();
    circle.arc(rInfo.x, rInfo.y, rInfo.radius, 0, 2 * Math.PI, false);
    ctx.fill(circle);
	*/
	//if(ImageLoader.isLoaded()){
	ctx.drawImage(image, rInfo.x - rInfo.radius, rInfo.y - rInfo.radius , rInfo.radius * 2, rInfo.radius * 2);
	//}
	
	
	//draw the planets surrounding the star
	var len = subList.length;
	for(var i=0; i<len; i++){
	  ent = subList[i];
	  ent.update(dTime);
      if (ent.draw) {
        ent.draw(ctx, cam);
      }
	}
  };
  var addSubcircle = function (subcircle){
    subList.push(subcircle);
  }

  return {
    getAttr: getAttr,
    setAttr: setAttr,
    draw: draw,
	addSubcircle: addSubcircle
  };
}
function bgStar(attr) {
  var x = attr.x || 0;
  var y = attr.y || 0;
  var f = attr.f || 0; // f is the start state of the shining star
  var mass = attr.mass || 0;
  var t = attr.t || 0.1; // t is about the shining frequency of the star
  var color = attr.color || 'white';
  var setAttr = function(attr) {
    x = (attr.x !== undefined) ? attr.x : x;
    y = (attr.y !== undefined) ? attr.y : y;
    f = (attr.f !== undefined) ? attr.f : f;
    mass = (attr.mass !== undefined) ? attr.mass : mass;
    t = (attr.t !== underfined) ? attr.t : t;
  };
  var getAttr = function() {
    return {
      x: x,
      y: y,
      f: f,
      mass: mass,
      t: t
    }
  };
  var shine = function(ctx, cam) {
    if (f < Math.PI * 2) {
      f = f + t;
    } else {
      f = 0;
    }
    var camSize = cam.getSize();
    var rInfo = cam.getRelInfo(getAttr());
    //if outside Cam view
    if ((rInfo.x) < 0 || (rInfo.y) < 0 || (rInfo.x) > camSize.width || (rInfo.y) > camSize.height) {
      return;
    }
    ctx.fillStyle = color;
    var circle = new Path2D();
    var light = Math.sin(f) * mass;
    light = (light < 0) ? 0 : light;
    circle.arc(rInfo.x, rInfo.y, light, 0, 2 * Math.PI, false);
    ctx.fill(circle);
  };
  return {
    getAttr: getAttr,
    setAttr: setAttr,
    shine: shine
  }
}
function meteor(attr) {
  attr = attr || {};

  var x = attr.x || 0;
  var y = attr.y || 0;
  var px = 0;
  var py = 0;
  var mass = attr.mass || 500;
  var velX = attr.velX || 0;
  var velY = attr.velY || 0;
  var acceX = 1;
  var acceY = 1;

  var maxVel = 80 * (80 / Math.sqrt(mass));
  var radius = Math.sqrt(mass / Math.PI); //1 unit of area === 1 uni of mass
  var tick = 0;

  var getAttr = function() {
    return {
      x: x,
      y: y,
      px: px,
      py: py,
      mass: mass,
      radius: radius,
      velX: velX,
      velY: velY,
      maxVel: maxVel
    };
  };

  var setAttr = function(attr) {
    x = (attr.x !== undefined) ? attr.x : x;
    y = (attr.y !== undefined) ? attr.y : y;
    mass = (attr.mass !== undefined) ? attr.mass : mass;
    velX = (attr.velX !== undefined) ? attr.velX : velX;
    velY = (attr.velY !== undefined) ? attr.velY : velY;
    radius = (attr.radius !== undefined) ? attr.radius : radius;
  };

  var draw = function(ctx, cam) {
    var camSize = cam.getSize();
    var rInfo = cam.getRelInfo(getAttr());

    //if outside Cam view
    if ((rInfo.x + rInfo.radius) < 0 || (rInfo.y + rInfo.radius) < 0 || (rInfo.x - rInfo.radius) > camSize.width || (rInfo.y - rInfo.radius) > camSize.height) {
      return;
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = ctx.strokeStyle = '#fff';
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.lineWidth = rInfo.radius * 2;
	//setting gradient of the meteor to gain the draging tail
    var grd = ctx.createRadialGradient(rInfo.x, rInfo.y, rInfo.radius, rInfo.px, rInfo.py, rInfo.radius * 5);
    grd.addColorStop(0, 'white');
    grd.addColorStop(1, 'black');
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = grd;
	//draw the tail of the meteor
    var tail = new Path2D();
    tail.moveTo(rInfo.x, rInfo.y);
    tail.lineTo(rInfo.px, rInfo.py);
    ctx.stroke(tail);
	//draw the head of the meteor
    var circle = new Path2D();
    circle.arc(rInfo.x, rInfo.y, rInfo.radius, 0, 2 * Math.PI, false);
    ctx.fill(circle);
    ctx.stroke(circle);
  };

  var update = function(dTime) {
    //x=v1t+(1/2)at2
    //v2=v1+at
    var vx = velX + acceX * dTime;
    var vy = velY + acceY * dTime;
    x += velX * dTime + 0.5 * acceX * dTime * dTime;
    y += velY * dTime + 0.5 * acceY * dTime * dTime;
    //calculate tail position: the position one second before
    px = x - velX * 1 + 0.5 * acceX * 1 * 1;
    py = y - velY * 1 + 0.5 * acceY * 1 * 1;
    velX = vx;
    velY = vy;
    if (velX > 100 || velY > 100) updateAcce(true);
    if (velX < -100 || velY < -100) updateAcce(false);
  };

  var updateAcce = function(changDir) {
    //if the speed of the meteor exceed some limit, it need to gain new acceleration
    if (changDir) {
      acceX = Math.random() * -10;
      acceY = Math.random() * -10;
    } else {
      acceX = Math.random() * 10;
      acceY = Math.random() * 10;
    }

  };
  //if the meteor is clicked, we have to show the madal
  var clicked = function(cam) {
    var clickedPos = MouseHandler.getPos();
    var meteorPos = Camera.getRelInfo(getAttr());
    if (clickedPos.x < meteorPos.x + 30 && clickedPos.x > meteorPos.x - 30 && clickedPos.y < meteorPos.y + 30 && clickedPos.y > meteorPos.y - 30) {
      if (!MouseHandler.isModalOpen()) {
        $('#myModal').modal('show');
        MouseHandler.setModalState(true);
      }
      return true;
    } else {
      MouseHandler.setModalState(false);
      return false;
    }
  }
  return {
    getAttr: getAttr,
    setAttr: setAttr,
    draw: draw,
    update: update,
    updateAcce: updateAcce,
    clicked: clicked
  };
}
var Camera = (function() {
  var x = 0;
  var y = 0;
  var width = 0;
  var height = 0;
  var ctx = null;
  var px = 0;
  var py = 0;
  var scaleConstant = 1;
  
  var moving = false;
  var tx = 0;
  var ty = 0;
  
  var init = function(_ctx) {
    ctx = _ctx;
    width = _ctx.canvas.width;
    height = _ctx.canvas.height;
  }
  var resize = function(_ctx){
	width = _ctx.canvas.width;
    height = _ctx.canvas.height;
  }
  var update = function(_x, _y) {
    x = _x;
    y = _y;

  };
  var focus = function(attr) {
    x = attr.x * scaleConstant - width / 2;
    y = attr.y * scaleConstant - height / 2;
  };
  var setScale = function(scale) {
    scaleConstant = scale;
  }
  var getScale = function() {
    return scaleConstant;
  }
  var setPrePos = function(pos) {
    px = pos.x;
    py = pos.y;
  }
  var getPrePos = function() {
    return {
      x: px,
      y: py
    };
  }
  var getRelInfo = function(entAttr) {

    var relX = (entAttr.x * scaleConstant - x) || 0;
    var relY = (entAttr.y * scaleConstant - y) || 0;
    var relR = (entAttr.radius) * scaleConstant || 0;
    var relPX = (entAttr.px * scaleConstant - x) || 0;
    var relPY = (entAttr.py * scaleConstant - y) || 0;

    return {
      x: relX,
      y: relY,
      radius: relR,
      px: relPX,
      py: relPY
    };
  };

  var getPos = function() {
    return {
      x: x,
      y: y
    };
  };
  var getSize = function() {
    return {
      width: width,
      height: height
    };
  };
  var startMove = function(target, zoom){
	var pos = target.getAttr();
	  if(zoom == true){
		var centerX = (x + width / 2)  /  scaleConstant;
		var centerY = (y + height / 2)  /  scaleConstant;
		scaleConstant = 1;
		focus({
			x: centerX,
			y: centerY
		});
	  }
	tx = pos.x * scaleConstant - width / 2;;
	ty = pos.y * scaleConstant - height / 2;;
	velX = (tx - x) / 100;
	velY = (ty - y) / 100;
	moving = true;
  }
  var move = function() {
	 if(moving){
	   x += velX;
	   y += velY;
	   if(velX < 0 && x <= tx ) moving = false;
	   else if(velX >= 0 && x >= tx) moving = false;
	   else if(velY < 0 && y <= ty) moving = false;
	   else if(velY >= 0 && y >= ty) moving = false;
	   else ;
	 }
  }

  return {
    init: init,
    update: update,
    getRelInfo: getRelInfo,
    getPos: getPos,
    getSize: getSize,
    getPrePos: getPrePos,
    setPrePos: setPrePos,
    focus: focus,
    setScale: setScale,
    getScale: getScale,
	move: move,
	startMove: startMove,
	resize: resize
  };
})();
var Manager = (function() {
  //set meta date
  var dTime = 1 / 60;
  var starList = [];
  var shineList = [];
  var meteorList = [];
  var neighborList = [];
  //declare context and canvas
  var Ncontext = null;
  var Ncanvas = null;
  //using variables
  var InDrag;
  var globalWidth;
  var globalHeight;
  var reachBound;
  var updating;

  var player = null;
  var upperBound, lowerBound, leftBound, rightBound;
  var PersonalMode;
  
  var img;
  var isBackgroundLoaded = false;
	
	
  var init = function() {
    Ncanvas = document.getElementById("maincanvas");
	fitToContainer(Ncanvas);
    Ncontext = Ncanvas.getContext("2d");
	
	
	//var img = document.getElementById("test");
	//Ncontext.drawImage(img, 100,100);
	
    globalWidth = Ncontext.canvas.width * 10; // 僅限於第一象限
    globalHeight = Ncontext.canvas.height * 10;

    InDrag = false;
    reachBound = false;
    updating = true;
    PersonalMode = false;
    setBound();

    
	
	loadBackground();
	
    Camera.init(Ncontext);

    MouseHandler.init(document);
    ButtonHandler.init();
    randomCreateStars();
    Camera.focus(player.getAttr());
    gameloop();
  };
  var loadBackground = function(){
    img = new Image();   // Create new img element
	img.addEventListener("load", function() {
		Ncontext.drawImage(img, 0, 0);
		isBackgroundLoaded = true;
		// execute drawImage statements here
	}, false);
	img.src = 'universe.png'; // Set source path
  };
  var changePerspective = function() {
    parseNearbyPlanet();
    PersonalMode = true;
  };
  var parseNearbyPlanet = function() {
    var len = starList.length;
    var playerAttr = player.getAttr();
    var leftbound = playerAttr.x - Ncontext.canvas.width * 5;
    var rightbound = playerAttr.x + Ncontext.canvas.width * 5;
    var upperbound = playerAttr.y - Ncontext.canvas.height * 5;
    var lowerbound = playerAttr.y + Ncontext.canvas.height * 5;
    for (var i = 0; i < len; i++) {
      ent = starList[i];
      var entPos = ent.getAttr();
      if (entPos.x < rightbound && entPos.x > leftbound && entPos.y < lowerbound && entPos.y > upperbound) {
        var _x = (Math.random() * 2 - 1) * Ncontext.canvas.width / 10;
        var _y = (Math.random() * 2 - 1) * Ncontext.canvas.height / 10;
        var _t = Math.random() * 0.1;
        var _f = Math.random() * Math.PI * 2;
        neighborList.push(new bgStar({
          x: _x,
          y: _y,
          mass: 10,
          f: 0.1 + _f,
          t: _t
        }));
      }
    }
    Camera.setScale(4.8);
    Camera.focus(player.getAttr());
  };
  var fitToContainer = function(canvas) {
    canvas.style.width = $("#viewport").width();
    canvas.style.height = $("#viewport").height();
    canvas.width = $("#viewport").width();
    canvas.height = $("#viewport").height();
  };
  var randomCreateStars = function() {
    for (var i = 0; i < 50; i++) {
      var _x = (Math.random() * 2 - 1) * globalWidth;
      var _y = (Math.random() * 2 - 1) * globalHeight;
      starList.push(new Circle({
        x: _x,
        y: _y,
        mass: 1000,
		id: 0
      }));
    }
    for (var i = 0; i < 10000; i++) {
      var _x = (Math.random() * 2 - 1) * globalWidth;
      var _y = (Math.random() * 2 - 1) * globalHeight;
      var _t = Math.random() * 0.1;
      var _f = Math.random() * Math.PI * 2;
      shineList.push(new bgStar({
        x: _x,
        y: _y,
        mass: 1,
        f: 0.1 + _f,
        t: _t
      }));
    }
    for (var i = 0; i < 2500; i++) {
      var _x = (Math.random() * 2 - 1) * globalWidth;
      var _y = (Math.random() * 2 - 1) * globalHeight;
      var _t = Math.random() * 0.1;
      var _f = Math.random() * Math.PI * 2;
      shineList.push(new bgStar({
        x: _x,
        y: _y,
        mass: 1,
        f: 0.1 + _f,
        t: _t,
        color: 'yellow'
      }));
    }

    for (var i = 0; i < 1; i++) {
      //var _x = Math.random() * Ncontext.canvas.width;
      //var _y = Math.random() * Ncontext.canvas.height;
      meteorList.push(new meteor({
        x: 0,
        y: 0,
        mass: 10,
        velX: 89,
        velY: 5
      }));
    }
    player = new Circle({
      x: 100,
      y: 100,
      mass: 10000,
	  id: 0
    });
	player.addSubcircle(new subCircle({
        mass: 100,
		centerX: 100,
		centerY: 100,
		vel: 30,
		R: 100
      }));
	  player.addSubcircle(new subCircle({
        mass: 200,
		centerX: 100,
		centerY: 100,
		vel: 20,
		R: 200
      }));
  };
  var setBound = function() {
    upperBound = globalHeight * (-1) - 500;
    lowerBound = globalHeight + 500;
    rightBound = globalWidth + 500;
    leftBound = globalWidth * (-1) - 500;
  };
  var checkBound = function() {
    var test1 = Camera.getRelInfo({
      x: leftBound,
      y: upperBound
    });
    var test2 = Camera.getRelInfo({
      x: rightBound,
      y: lowerBound
    });
    var screenSize = Camera.getSize();
    if (test1.x > 0 || test1.y > 0 || test2.x < screenSize.width || test2.y < screenSize.height) reachBound = true;
    else reachBound = false;
  }
  var handleInput = function() {
    if (MouseHandler.isMouseDown() === true) {
      var ppos = MouseHandler.getPrePos();
      var pos = MouseHandler.getPos();
      var cpos = Camera.getPos();
      var offset_x = pos.x - ppos.x;
      var offset_y = pos.y - ppos.y;

      if (!InDrag) {
        offset_x = 0;
        offset_y = 0;
        InDrag = true;
      }
      Camera.update(cpos.x - offset_x, cpos.y - offset_y);
      checkBound();
      if (reachBound) {
        Camera.update(cpos.x, cpos.y);
      };
      MouseHandler.setPrePos(pos);
    } else {
      InDrag = false;
    }
    var zoom = MouseHandler.isZoom();

    if (zoom == 1) {
	  var oldScale = Camera.getScale();
      if (oldScale < 0.08) return;
      var cpos = Camera.getPos();
	  
      var newScale = oldScale * 0.9;
      
	  var centerX = (cpos.x + Ncontext.canvas.width / 2)  /  oldScale;
	  var centerY = (cpos.y + Ncontext.canvas.height / 2)  /  oldScale;

	  Camera.setScale(newScale);
	  Camera.focus({
		x: centerX,
		y: centerY
	  });
      //Camera.update(attr.x * nscale - (Ncontext.canvas.width / 2), attr.y * nscale - (Ncontext.canvas.height / 2));
      MouseHandler.endZoom();
    } else if (zoom == -1) {
	  var oldScale = Camera.getScale();
      if (oldScale > 5) return;
      var cpos = Camera.getPos();
      var newScale = oldScale * 1.1;
      
	  var centerX = (cpos.x + Ncontext.canvas.width / 2)  /  oldScale;
	  var centerY = (cpos.y + Ncontext.canvas.height / 2)  /  oldScale;
	  
	  Camera.setScale(newScale);
	  Camera.focus({
		x: centerX,
		y: centerY
	  });
      //var attr = player.getAttr();
      //Camera.update(attr.x * nscale - (Ncanvas.width / 2), attr.y * nscale - (Ncanvas.height / 2));
      MouseHandler.endZoom();
    } else;
    //每當camera的座標有變化，就要check
    if (MouseHandler.isMouseClick() == true) {
      var len = meteorList.length;
      for (var i = 0; i < len; i++) {
        ent = meteorList[i];
        if (ent.clicked() == true) {
        }
      }
      MouseHandler.endMouseClick();
    }
    checkBound();
  };
  var gameloop = function() {
    var len = starList.length;
    var shineLen = shineList.length;
    var meteorLen = meteorList.length;
    var neighborLen = neighborList.length;
    Ncontext.clearRect(0, 0, Ncanvas.width, Ncanvas.height);
	if(isBackgroundLoaded){
		Ncontext.drawImage(img, 0, 0);
	}
    if (!PersonalMode) {
      for (var i = 0; i < len; i++) {
        ent = starList[i];
        if (ent.draw) {
          ent.draw(Ncontext, Camera);
        }
        cpos = Camera.getPos();
      }
      for (var i = 0; i < meteorLen; i++) {
        ent = meteorList[i];
        //get acceleration
        ent.update(dTime);
        if (ent.draw) {
          ent.draw(Ncontext, Camera);
        }
      }
    } else {
      for (var i = 0; i < neighborLen; i++) {
        ent = neighborList[i];
        //get acceleration
        //ent.update(dTime);
        if (ent.shine) {
          ent.shine(Ncontext, Camera);
        }
      }
    }


    if (Camera.getScale() <= 1) {
      shineLen = Math.floor(Camera.getScale() * shineLen);
    }
    for (var i = 0; i < shineLen; i++) {
      ent = shineList[i];
      if (ent.shine) {
        ent.shine(Ncontext, Camera);
      }
    }
    player.draw(Ncontext, Camera);
    Camera.move();//if camera is moving
    handleInput();
    if (updating) {
      setTimeout(gameloop, dTime * 1000);
    } else {
      Ncontext.clearRect(0, 0, Ncanvas.width, Ncanvas.height);
    }
  };
  $(window).resize(function() {
    var width = $(window).width();
    var height = $(window).height();
    Ncanvas.style.width = width;
    Ncanvas.style.height = height;
    Ncontext.canvas.width = width;
    Ncontext.canvas.height = height;
	Camera.resize(Ncontext);

  });
  var end = function() {
    updating = false;
  };
  var searchPlanet = function(text){
	return meteorList[0];
  }
  var getPlayer = function(){
	return player;
  }
  return {
    init: init,
    end: end,
    changePerspective: changePerspective,
	searchPlanet: searchPlanet,
	getPlayer: getPlayer
  };
})();
var ButtonHandler = (function() {
  var init = function() {
    document.getElementById("PeresonalView").addEventListener("click", function() {
      changeScale(1);
	  Camera.focus(Manager.getPlayer().getAttr());
    });
    document.getElementById("LView").addEventListener("click", function() {
      changeScale(1);
    });
    document.getElementById("SView").addEventListener("click", function() {
      changeScale(0.02);
    });
    document.getElementById("myPlanet").addEventListener("click", function() {
      //Manager.end();
      Manager.changePerspective();
    });
	$("#search-normal").click(function(){
		var content = $("#searchContent").val();
		Camera.startMove(		Manager.searchPlanet(), false);
	});
	$("#search-proper").click(function(){
		var content = $("#searchContent").val();
		Camera.startMove(		Manager.searchPlanet() ,true);
	});
    $("#toolbar").hover(function() {
      $("#btn2").animate({
        top: "100px",
        opacity: "1"
      }, 200);
      $("#btn3").animate({
        top: "200px",
        opacity: "1"
      }, 200);
    }, function() {
      $("#btn2").animate({
        top: "0px",
        opacity: "0"
      }, 200);
      $("#btn3").animate({
        top: "0px",
        opacity: "0"
      }, 200);
    });
  }
  var changeScale = function(c) {
    Camera.setScale(c);
  };
  return {
    init: init
  }
})();

var ImageLoader = (function(){
	var rawList = [];
	var imageList = [];
	var loadedAmount = 0;
	var loadedMax = 1;
	
	var start = function(){
	    rawList.push('planet.png');
	    loadAllImages(rawList);
	};
	
	var loadAllImages = function(){
		var total = rawList.length;
		
		for(var i=0; i<total; i++){
			var img = new Image();
			img.onload = function(){
				imageList.push(img);
				loadedAmount++
				isLoaded();
			};
			img.src = rawList[i];
		}
	};
	var isLoaded = function(){
		console.log(loadedAmount);
		if(loadedAmount >= loadedMax){
			Manager.init();
			return true;
		}
		return false;
	};
	var getImage = function(id){
		return imageList[id]
	}
	return{
		start: start,
		isLoaded: isLoaded,
		getImage:getImage
	}
})();
ImageLoader.start();

/*
window.onload = function() {
}*/
