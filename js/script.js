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

var c =  createBot(radnom(200,400),radnom(200,400), maxX, maxY).changeDirection(radnom(0,360));
var d =  createBot(radnom(200,400),radnom(200,400), maxX, maxY).changeDirection(radnom(0,360));
var e =  createBot(radnom(200,400),radnom(200,400), maxX, maxY).changeDirection(radnom(0,360));
var f =  createBot(radnom(200,400),radnom(200,400), maxX, maxY).changeDirection(radnom(0,360));
print(bots)
var aiSelf = a.behaviour.self.normal;
var aiOthers = a.behaviour.others.fear;
a.intstruct(aiSelf, aiOthers);
b.intstruct(aiSelf, aiOthers);
c.intstruct(aiSelf, aiOthers);
d.intstruct(aiSelf, aiOthers);
e.intstruct(aiSelf, aiOthers);
e.wait(1000);
f.intstruct(aiSelf, aiOthers);

refreshBots(10);