'use strict'



var $content = $('#content');
var $botBall = $('<div />').addClass('bot');

var botsB = [];

var maxX = $content.height();
var maxY = $content.width();
var createBot = function(x,y,maxX,maxY){

	var B = new Bot(x,y,maxX,maxY);
	var b = $botBall.clone().attr({
		'data-id': B
	}).css({
		'top': x,
		'left': y
	});

	botsB.push(b);
	b.appendTo($content);
	return B;
};

var displace = function(bot,x,y){
	bot.css({
		'top': x,
		'left': y
	})

};

var refreshBots = function(interval){
	var iterate = function(){
		var i, len;
		for(i=0, len= botsB.length; i< len; i+=1){
			displace(botsB[i], bots[i].x, bots[i].y)
		}

		//setTimeout(iterate, interval)
		requestAnimationFrame(iterate)
	};
	iterate();
};

var a =  createBot(50,50, maxX, maxY);
var b =  createBot(30,30, maxX, maxY).changeDirection(200);

var c =  createBot(radnom(200,400),radnom(200,400), maxX, maxY);
var d =  createBot(radnom(200,400),radnom(200,400), maxX, maxY);
var e =  createBot(radnom(200,400),radnom(200,400), maxX, maxY);
var f =  createBot(radnom(200,400),radnom(200,400), maxX, maxY);
print(bots)

a.intstruct(a.fear);
b.intstruct(b.fear);
c.intstruct(b.fear);
d.intstruct(b.fear);
e.intstruct(b.fear);
f.intstruct(b.fear);

refreshBots(10);