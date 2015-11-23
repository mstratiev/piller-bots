'use strict'

var L = {
        n: null,
        r: 'red',
        g: 'green',
        b: 'blue',
        w: 'white',
        0: null,
        1: 'red',
        2: 'green',
        3: 'blue',
        4: 'white'
    },
    botId = 0;

var print = function(msg) {
        console.log(msg)
    },
    sin = function(a) {
        return Math.sin(a)
    },
    cos = function(a) {
        return Math.cos(a)
    },
    angToRad = function(int) {
        return int * (Math.PI / 180)
    },
    distance = function(point, point2) {
        return Math.sqrt((point.x - point2.x) * (point.x - point2.x) + (point.y - point2.y) * (point.y - point2.y))
    };

var bots = [];
var MOVE_INTERVAL = 100;

var Bot = (function() {
    function Bot(x,y,name, i) {
        this.id = botId++;
        this.name = name || null;
        this.x = x ||0;
        this.y = y||0;
        this.dx = 0;
        this.dy = 0;
        this._radius = 1;
        this._color = null;
        this._light = null;
        this._speed = 1;
        //light is white, green, blue, red
        this._direction = 10;
        //dir is an angle from 0 to 360
        this.instructions = i || {};
        bots.push(this);
    };

    Bot.prototype.goMove = function() {
        this.dx = sin(angToRad(this._direction)) * this._speed;
        this.dy = cos(angToRad(this._direction)) * this._speed;
        var self = this;

        if (!this._speed) {
            return
        }

        var iterate = function() {
            self.x += self.dx;
            self.y += self.dy;
            print(Math.floor(self.x) + ' ' + Math.floor(self.y));
            setTimeout(iterate, MOVE_INTERVAL)
        };

        iterate(this);

    };

    Bot.prototype.move = function(arg) {
        switch (true) {
            case Number.isInteger(arg):
                this._speed = arg;
                this.goMove();
                break;
            case (arg === "yes" || arg === true):
                this._speed = 1;
                this.goMove();
                break;
            case (arg === 'no' || arg === false || arg == 'undefined'):
                this._speed = 0;
                this.goMove();
                break;
        };

    };

    Bot.prototype.light = function(arg) {
        //accepts a light form the array
        //accepts 'off' to turn off
        //accepts empty - prints
        if (!arg) {
            return this._light;
        } else if (arg === 'off') {
            this._light = null;
            return this._light;

        } else {
            this._light = arg
            return this._light;
        }
    };

    Bot.prototype.changeDirection = function(angle) {
        this._direction = angle;
        this.dx = sin(angToRad(this._direction)) * this._speed;
        this.dy = cos(angToRad(this._direction)) * this._speed;
    };

    Bot.prototype.detectLight = function(instruction) {
        //instruction is on, off, yes, no, 1, 0
        var bool = 0;
        switch (instruction) {
            case 'yes':
            case 'on':
            case 1:
            case true:
                bool = true;
                break;
            case 'no':
            case 'off':
            case 0:
            case false:
                bool = false;
                break;
        }
    };
    Bot.prototype.inRadius = function(rad) {
        var bot, i, len;
        for (i = 0, len = bots.length; i < len; i += 1) {
        	if(i===this.id){
        		continue;
        	}
            bot = bots[i]
            if (distance(bot, this) <= bot._radius + rad) {
                return [bot.x, bot.y]
            }
        } return false
    };

    Bot.prototype.detectOthers = function(radius) {
        //if 0 -> "bumps"
        radius = radius || 0;
        radius += this._radius;
        var other = this.inRadius(radius);
        return other
    };

    Bot.prototype.checkForOthers = function(fun) {
        fun = (typeof fun === 'function') ? fun : function() {};
        var self= this;
        var iterate = function() {
            var bool = self.detectOthers();
            if (bool) {
                fun(bool)
            }
            setTimeout(iterate, MOVE_INTERVAL);
        };
        iterate();
    };

    Bot.prototype.intstruct = function(i) {
        this.instructions = i;
        this.behave();
    };

    Bot.prototype.behave = function() {
        var ai = this.instructions;
        if (!ai) {
            return
        }

    };



    return Bot;
})();

//var b = new Bot();
//var b2 = new Bot(10,60);
//b.checkForOthers(()=>{b.changeDirection(190); print('found other')});
//b.move(10);
