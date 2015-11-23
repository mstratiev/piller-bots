'use strict'



var $content = $('#content');
var $botBall = $('<div />').addClass('bot');

var botsB = [];

var CENTER_X = 500, CENTER_Y = 500;
var createBot = function(x,y){

	var B = new Bot(x,y);
	var b = $botBall.clone().attr({
		'data-id': B
	}).css({
		'top': x+CENTER_X,
		'left': y+CENTER_Y
	});

	botsB.push(b);
	b.appendTo($content);
};

var displace = function(bot,x,y){
	bot.css({
		'top': x + CENTER_X,
		'left': y + CENTER_Y
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

// createBot(0,0);
// print(bots[0])
// bots[0].move(2);
// bots[0].changeDirection(270);
// refreshBots(10);