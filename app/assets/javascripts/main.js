// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
/*
 * Starts Game
 */
var game = new Game();

function init()
{
	game.init();
}

/*
 * Holds all our images for the game so images
 * are only ever created once.
 */
var imageRepository = new function()
{
	// Define images
	this.background = new Image();
  this.spaceship = new Image();
	this.bullet = new Image();
  this.enemy = new Image();
	this.enemyBullet = new Image();
	this.elite = new Image();
	this.eliteBullet = new Image();
	this.titan = new Image();
	this.titanBullet = new Image();
	this.titanBigBullet = new Image();
	this.goliath = new Image();
	this.goliathBullet = new Image();
	this.goliathSecondaryBullet = new Image();
	this.goliathBigBullet = new Image();

  // Ensure all images have loaded before starting the game

	var numImages = 14;
	var numLoaded = 0;
  //used to determine when all game assets (in this case images) have successfully loaded.
  //use this function to help produce a loading screen with a loading bar.
  //progress the loading bar by the percent of
  //numLoaded/numImages
	function imageLoaded()
  {
		numLoaded++;
		if (numLoaded === numImages)
    {
			window.init();
		}
	}
	this.background.onload = function()
  {
		imageLoaded();
	}
	this.spaceship.onload = function()
  {
		imageLoaded();
	}
	this.bullet.onload = function()
  {
		imageLoaded();
	}
  this.enemy.onload = function()
  {
		imageLoaded();
	}
	this.enemyBullet.onload = function()
  {
		imageLoaded();
	}
	this.elite.onload = function()
  {
		imageLoaded();
	}
	this.eliteBullet.onload = function()
  {
		imageLoaded();
	}
	this.titan.onload = function()
  {
		imageLoaded();
	}
	this.titanBullet.onload = function()
  {
		imageLoaded();
	}
	this.titanBigBullet.onload = function()
  {
		imageLoaded();
	}
	this.goliath.onload = function()
  {
		imageLoaded();
	}
	this.goliathBullet.onload = function()
  {
		imageLoaded();
	}
	this.goliathSecondaryBullet.onload = function()
  {
		imageLoaded();
	}
	this.goliathBigBullet.onload = function()
  {
		imageLoaded();
	}
	// Set images src
	this.background.src = "/assets/background.png";
  this.spaceship.src = "/assets/ship.png";
	this.bullet.src = "/assets/bullet.png";
  this.enemy.src = "/assets/enemy.png";
	this.enemyBullet.src = "/assets/bullet_enemy.png";
	this.elite.src = "/assets/elite.png";
	this.eliteBullet.src = "/assets/bullet_elite.png";
	this.titan.src = "/assets/titan.png";
	this.titanBullet.src = "/assets/bullet_titan.png";
	this.titanBigBullet.src = "/assets/bullet_titanBig.png";
	this.goliath.src = "/assets/goliath.png";
	this.goliathBullet.src = "/assets/bullet_goliath.png";
	this.goliathSecondaryBullet.src = "/assets/bullet_goliathSecondary.png";
	this.goliathBigBullet.src = "/assets/bullet_goliathBig.png";
}

/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game.
 */
function Drawable() {
	this.init = function(x, y, width, height)
  {
		// Default variables
		this.x = x;
		this.y = y;
    //Since we are adding images that no longer fill the entire canvas,
    //we need to set the height and width of each object to it’s associated image.
    this.width = width;
		this.height = height;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
  this.collidableWith = "";
	this.isColliding = false;
	this.type = "";

	// Define abstract function to be implemented in child objects
	this.draw = function()
  {

	};
  this.move = function()
  {

	};
	this.health = function()
  {

	};
  this.isCollidableWith = function(object)
  {
		return (this.collidableWith === object.type);
	};
}



/**
 * The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background()
{
	this.speed = 1; // Redefine speed of the background for panning
	// Implement abstract function
	this.draw = function()
  {
		// Pan background
		this.y += this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);
		// Draw another image at the top edge of the first image
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
		// If the image scrolled off the screen, reset
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();

/*
 * Creates the Bullet object which the ship fires.
 */
function Bullet(object)
{
	this.alive = false; // Is true if the bullet is currently in use
  var self = object;
	/*
	 * Sets the bullet values
	 */
	this.spawn = function(x, y, speed)
  {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};
	/*
	 * Returns true if the bullet moved off the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
	this.draw = function()
  {
    this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
		this.y -= this.speed;
		if (this.isColliding)
    {
			return true;
		}
		else if (self === "bullet" && this.y <= 0 - this.height)
    {
			return true;
		}
		else if (self === "enemyBullet" && this.y >= this.canvasHeight)
    {
			return true;
		}
		else if (self === "eliteBullet" && this.y >= this.canvasHeight)
    {
			return true;
		}
		else if (self === "titanBullet" && this.y >= this.canvasHeight)
    {
			return true;
		}
		else if (self === "titanBigBullet" && this.y >= this.canvasHeight)
    {
			return true;
		}
		else if (self === "goliathBullet" && this.y >= this.canvasHeight)
    {
			return true;
		}
		else if (self === "goliathSecondaryBullet" && this.y >= this.canvasHeight)
    {
			return true;
		}
		else if (self === "goliathBigBullet" && this.y >= this.canvasHeight)
    {
			return true;
		}
		else {
			if (self === "bullet")
      {
				this.context.drawImage(imageRepository.bullet, this.x, this.y);
			}
			else if (self === "enemyBullet")
      {
				this.context.drawImage(imageRepository.enemyBullet, this.x, this.y);
			}
			else if (self === "eliteBullet")
      {
				this.context.drawImage(imageRepository.eliteBullet, this.x, this.y);
			}
			if (self === "titanBullet")
      {
				this.context.drawImage(imageRepository.titanBullet, this.x, this.y);
			}
			else if (self === "titanBigBullet")
      {
				this.context.drawImage(imageRepository.titanBigBullet, this.x, this.y);
			}
			else if (self === "goliathBullet")
      {
				this.context.drawImage(imageRepository.goliathBullet, this.x, this.y);
			}
			if (self === "goliathSecondaryBullet")
      {
				this.context.drawImage(imageRepository.goliathSecondaryBullet, this.x, this.y);
			}
			else if (self === "goliathBigBullet")
      {
				this.context.drawImage(imageRepository.goliathBigBullet, this.x, this.y);
			}
			return false;
		}
	};
	/*
	 * Resets the bullet values
	 */
	this.clear = function()
  {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
    this.isColliding = false;
	};
}
Bullet.prototype = new Drawable();

/**
 * QuadTree object.
 *
 * The quadrant indexes are numbered as below:
 *     |
 *  1  |  0
 * —-+—-
 *  2  |  3
 *     |
 */
function QuadTree(boundBox, lvl)
{
	var maxObjects = 20;
	this.bounds = boundBox ||
  {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var objects = [];
	this.nodes = [];
	var level = lvl || 0;
	var maxLevels = 10;
	/*
	 * Clears the quadTree and all nodes of objects
	 */
	this.clear = function()
  {
		objects = [];
		for (var i = 0; i < this.nodes.length; i++)
    {
			this.nodes[i].clear();
		}
		this.nodes = [];
	};
	/*
	 * Get all objects in the quadTree
	 */
	this.getAllObjects = function(returnedObjects)
  {
		for (var i = 0; i < this.nodes.length; i++)
    {
			this.nodes[i].getAllObjects(returnedObjects);
		}
		for (var i = 0, len = objects.length; i < len; i++)
    {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
	/*
	 * Return all objects that the object could collide with
	 */
	this.findObjects = function(returnedObjects, obj)
  {
		if (typeof obj === "undefined")
    {
			console.log("UNDEFINED OBJECT");
			return;
		}
		var index = this.getIndex(obj);
		if (index != -1 && this.nodes.length)
    {
			this.nodes[index].findObjects(returnedObjects, obj);
		}
		for (var i = 0, len = objects.length; i < len; i++)
    {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
	/*
	 * Insert the object into the quadTree. If the tree
	 * excedes the capacity, it will split and add all
	 * objects to their corresponding nodes.
	 */
	this.insert = function(obj)
  {
		if (typeof obj === "undefined")
    {
			return;
		}
		if (obj instanceof Array) {
			for (var i = 0, len = obj.length; i < len; i++)
      {
				this.insert(obj[i]);
			}
			return;
		}
		if (this.nodes.length)
    {
			var index = this.getIndex(obj);
			// Only add the object to a subnode if it can fit completely
			// within one
			if (index != -1)
      {
				this.nodes[index].insert(obj);
				return;
			}
		}
		objects.push(obj);
		// Prevent infinite splitting
		if (objects.length > maxObjects && level < maxLevels)
    {
			if (this.nodes[0] == null)
      {
				this.split();
			}
			var i = 0;
			while (i < objects.length)
      {
				var index = this.getIndex(objects[i]);
				if (index != -1)
        {
					this.nodes[index].insert((objects.splice(i,1))[0]);
				}
				else
        {
					i++;
				}
			}
		}
	};
	/*
	 * Determine which node the object belongs to. -1 means
	 * object cannot completely fit within a node and is part
	 * of the current node
	 */
	this.getIndex = function(obj)
  {
		var index = -1;
		var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
		var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
		// Object can fit completely within the top quadrant
		var topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
		// Object can fit completely within the bottom quandrant
		var bottomQuadrant = (obj.y > horizontalMidpoint);
		// Object can fit completely within the left quadrants
		if (obj.x < verticalMidpoint &&
				obj.x + obj.width < verticalMidpoint)
        {
			if (topQuadrant)
      {
				index = 1;
			}
			else if (bottomQuadrant)
      {
				index = 2;
			}
		}
		// Object can fix completely within the right quandrants
		else if (obj.x > verticalMidpoint)
    {
			if (topQuadrant)
      {
				index = 0;
			}
			else if (bottomQuadrant)
      {
				index = 3;
			}
		}
		return index;
	};
	/*
	 * Splits the node into 4 subnodes
	 */
	this.split = function()
  {
		// Bitwise or [html5rocks]
		var subWidth = (this.bounds.width / 2) | 0;
		var subHeight = (this.bounds.height / 2) | 0;
		this.nodes[0] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[1] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[2] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[3] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
	};
}

/**
 * Holds Bullet objects to be managed to prevent garbage collection.
 */
function Pool(maxSize)
{
  var size = maxSize; // Max bullets allowed in the pool
	var pool = [];

  this.getPool = function()
  {
		var obj = [];
		for (var i = 0; i < size; i++)
    {
			if (pool[i].alive)
      {
				obj.push(pool[i]);
			}
		}
		return obj;
	}
  /*
	 * Populates the pool array with the given object
	 */
   // receives a string which indicates what type of pool this should be: a
   // “bullet” pool, an “enemy” pool, or an “enemyBullet” pool and then populates
   // the array with the designated object.
	this.init = function(object)
  {
		if (object == "bullet")
    {
			for (var i = 0; i < size; i++)
      {
				// Initalize the object
				var bullet = new Bullet("bullet");
				bullet.init(0,0, imageRepository.bullet.width, imageRepository.bullet.height);
        bullet.collidableWith = "enemy";
        bullet.collidableWith = "enemyBullet";
				bullet.collidableWith = "elite";
				bullet.collidableWith = "eliteBullet";
				bullet.collidableWith = "titan";
				bullet.collidableWith = "titanBullet";
				bullet.collidableWith = "titanBigBullet";
				bullet.collidableWith = "goliath";
				bullet.collidableWith = "goliathBullet";
				bullet.collidableWith = "goliathSecondaryBullet";
				bullet.collidableWith = "goliathBigBullet";
				bullet.type = "bullet";

				pool[i] = bullet;
			}
		}
		else if (object == "enemy")
    {
			for (var i = 0; i < size; i++)
      {
				var enemy = new Enemy();
				enemy.init(0,0, imageRepository.enemy.width, imageRepository.enemy.height);
				pool[i] = enemy;
			}
		}
		else if (object == "elite")
    {
			for (var i = 0; i < size; i++)
      {
				var elite = new Elite();
				elite.init(0,0, imageRepository.elite.width, imageRepository.elite.height);
				pool[i] = elite;
			}
		}
		else if (object == "titan")
    {
			for (var i = 0; i < size; i++)
      {
				var titan = new Titan();
				titan.init(0,0, imageRepository.titan.width, imageRepository.titan.height);
				pool[i] = titan;
			}
		}
		else if (object == "goliath")
    {
			for (var i = 0; i < size; i++)
      {
				var goliath = new Goliath();
				goliath.init(0,0, imageRepository.goliath.width, imageRepository.goliath.height);
				pool[i] = goliath;
			}
		}
		else if (object == "enemyBullet")
    {
			for (var i = 0; i < size; i++)
      {
				var bullet = new Bullet("enemyBullet");
				bullet.init(0,0, imageRepository.enemyBullet.width, imageRepository.enemyBullet.height);
				bullet.collidableWith = "bullet";
				bullet.collidableWith = "ship";
				bullet.type = "enemyBullet";
        // want enemy bullets to be able to collide with Bullets

        pool[i] = bullet;
			}
		}
		else if (object == "eliteBullet")
    {
			for (var i = 0; i < size; i++)
      {
				var bullet = new Bullet("eliteBullet");
				bullet.init(0,0, imageRepository.eliteBullet.width, imageRepository.eliteBullet.height);
				bullet.collidableWith = "bullet";
				bullet.collidableWith = "ship";
				bullet.type = "eliteBullet";

        pool[i] = bullet;
			}
		}
		else if (object == "titanBullet")
    {
			for (var i = 0; i < size; i++)
      {
				var bullet = new Bullet("titanBullet");
				bullet.init(0,0, imageRepository.titanBullet.width, imageRepository.titanBullet.height);
				bullet.collidableWith = "bullet";
				bullet.collidableWith = "ship";
				bullet.type = "titanBullet";

        pool[i] = bullet;
			}
		}
		else if (object == "titanBigBullet")
    {
			for (var i = 0; i < size; i++)
      {
				var bullet = new Bullet("titanBigBullet");
				bullet.init(0,0, imageRepository.titanBigBullet.width, imageRepository.titanBigBullet.height);
        bullet.collidableWith = "bullet";
				bullet.collidableWith = "ship";
				bullet.type = "titanBigBullet";
    		//Eventually change what this collides with
        pool[i] = bullet;
			}
		}
		else if (object == "goliathBullet")
    {
			for (var i = 0; i < size; i++)
      {
				var bullet = new Bullet("goliathBullet");
				bullet.init(0,0, imageRepository.goliathBullet.width, imageRepository.goliathBullet.height);
				bullet.collidableWith = "bullet";
				bullet.collidableWith = "ship";
				bullet.type = "goliathBullet";
        // want enemy bullets to be able to collide with Bullets

        pool[i] = bullet;
			}
		}
		else if (object == "goliathSecondaryBullet")
    {
			for (var i = 0; i < size; i++)
      {
				var bullet = new Bullet("goliathSecondaryBullet");
				bullet.init(0,0, imageRepository.goliathSecondaryBullet.width, imageRepository.goliathSecondaryBullet.height);
				bullet.collidableWith = "bullet";
				bullet.collidableWith = "ship";

				bullet.type = "goliathSecondaryBullet";

        pool[i] = bullet;
			}
		}
		else if (object == "goliathBigBullet")
    {
			for (var i = 0; i < size; i++)
      {
				var bullet = new Bullet("goliathBigBullet");
				bullet.init(0,0, imageRepository.goliathBigBullet.width, imageRepository.goliathBigBullet.height);
				bullet.collidableWith = "bullet";
				bullet.collidableWith = "ship";
				bullet.type = "goliathBigBullet";

        pool[i] = bullet;
			}
		}
};
	/*
	 * Grabs the last item in the list and initializes it and
	 * pushes it to the front of the array.
	 */
	this.get = function(x, y, speed)
  {
		if(!pool[size - 1].alive)
    {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};
	/*
	 * Used for the ship to be able to get two bullets at once. If
	 * only the get() function is used twice, the ship is able to
	 * fire and only have 1 bullet spawn instead of 2.
	 */
	this.getTwo = function(x1, y1, speed1, x2, y2, speed2)
  {
		if(!pool[size - 1].alive &&
		   !pool[size - 2].alive)
       {
				this.get(x1, y1, speed1);
				this.get(x2, y2, speed2);
			 }
	};
	/*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	this.animate = function()
  {
		for (var i = 0; i < size; i++)
    {
			// Only draw until we find a bullet that is not alive
			if (pool[i].alive)
      {
				if (pool[i].draw())
        {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}

/**
 * Create the Ship object that the player controls.
 */
function Ship()
{
	this.speed = 3;
	this.bulletPool = new Pool(30);
	var fireRate = 15;
	var counter = 0;
	//Try an if statement
  this.collidableWith = "enemyBullet";
	this.collidableWith = "eliteBullet";
	this.collidableWith = "titanBullet";
	this.collidableWith = "titanBigBullet";
	this.collidableWith = "goliathBullet";
	this.collidableWith = "goliathSecondaryBullet";
	this.collidableWith = "goliathBigBullet";



	this.type = "ship";

  this.init = function(x, y, width, height)
  {
		// Defualt variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.alive = true;
		this.isColliding = false;
		this.bulletPool.init("bullet");
    this.lives = 7;
	}

	this.draw = function()
  {
		this.context.drawImage(imageRepository.spaceship, this.x, this.y);
	};
	this.move = function()
  {
		counter++;
		// Determine if the action is move action
		if (KEY_STATUS.left || KEY_STATUS.right ||
			KEY_STATUS.down || KEY_STATUS.up)
      {
			// The ship moved, so erase it's current image so it can
			// be redrawn in it's new location
			this.context.clearRect(this.x, this.y, this.width, this.height);
			// Update x and y according to the direction to move and
			// redraw the ship.
			if (KEY_STATUS.left)
      {
				this.x -= this.speed
				if (this.x <= 0) // Keep player within the screen
					this.x = 0;
			} if (KEY_STATUS.right)
      {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			} if (KEY_STATUS.up)
      {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*3)
					this.y = this.canvasHeight/4*3;
			} if (KEY_STATUS.down)
      {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
    }
      // Finish by redrawing the ship
      if (!this.isColliding && this.lives > 0)
      {
				this.draw();
				this.health();
			}
      else if(this.isColliding && this.lives > 0)
      {
				this.lives--;
				game.healthDown.get();
				this.draw();
				this.isColliding = false;
				if(this.lives == 6)
  			{
    			document.getElementById("remaining").style.width = "200px";
  			} else if(this.lives == 5)
  			{
    			document.getElementById("remaining").style.width = "178px";
  			} else if(this.lives == 4)
  			{
    			document.getElementById("remaining").style.width = "125px";
  			}else if(this.lives == 3)
  			{
    			document.getElementById("remaining").style.width = "100px";
    			document.getElementById("remaining").style.backgroundColor = "yellow";
  			}else if(this.lives == 2)
  			{
    			document.getElementById("remaining").style.width = "67px";
  			}else if(this.lives == 1)
  			{
    			document.getElementById("remaining").style.width = "21px";
    			document.getElementById("remaining").style.backgroundColor = "red";
  			}else if(this.lives == 0)
  			{
					document.getElementById("remaining").style.width = "0px";
					this.isColliding = true;
					this.alive = false;
					game.gameOver();
  			}
			}

		if (KEY_STATUS.space && counter >= fireRate && !this.isColliding)
    {
			this.fire();
			counter = 0;
		}
	};
	var checkpoint = 1000;

	this.health = function()
	{
		if (game.playerScore == checkpoint)
		{
			game.healthUp.get();
			checkpoint = checkpoint * 2.5;

	  	if(this.lives == 7)
	  	{
	    	document.getElementById("remaining").style.width = "210px";
	    	document.getElementById("remaining").style.backgroundColor = "green";
	  	}
	  	else if(this.lives == 6)
	  	{
				this.lives = 7;
	    	document.getElementById("remaining").style.width = "210px";
	    	document.getElementById("remaining").style.backgroundColor = "green";
	  	}
	  	else if(this.lives == 5)
	  	{
				this.lives = 7;
	    	document.getElementById("remaining").style.width = "210px";
	    	document.getElementById("remaining").style.backgroundColor = "green";
	  	}
	  	else if(this.lives == 4)
	  	{
				this.lives = 6;
	    	document.getElementById("remaining").style.width = "200px";
	    	document.getElementById("remaining").style.backgroundColor = "green";
	  	}
	  	else if(this.lives == 3)
	  	{
				this.lives = 5;
	    	document.getElementById("remaining").style.width = "178px";
	    	document.getElementById("remaining").style.backgroundColor = "green";
	  	}
	  	else if(this.lives == 2)
	  	{
				this.lives = 4;
	    	document.getElementById("remaining").style.width = "125px";
	    	document.getElementById("remaining").style.backgroundColor = "green";
	  	}
	  	else if(this.lives == 1)
	  	{
				this.lives = 3;
	    	document.getElementById("remaining").style.width = "100px";
	    	document.getElementById("remaining").style.backgroundColor = "yellow";
	  	}
		}
	};
	/*
	 * Fires two bullets
	 */
	this.fire = function()
  {
		this.bulletPool.getTwo(this.x+9.5, this.y, 4,
		                       this.x+19.5, this.y, 4);
		game.laser.get();
	};
}
Ship.prototype = new Drawable();

/**
 * Create the Enemy ship object.
 */
function Enemy()
{
	var percentFire = .01; //controls how many bullets are fired
	var chance = 0;
	this.alive = false;
  this.collidableWith = "bullet";
	this.type = "enemy";
	/*
	 * Sets the Enemy values
	 */
	this.spawn = function(x, y, speed)
  {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.lives = 2;
		this.leftEdge = this.x - 100;
		this.rightEdge = this.x;
		this.bottomEdge = this.y + 140;
	};
	/*
	 * Move the enemy
	 */
	this.draw = function()
  {
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge)
    {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width)
    {
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge)
    {
			this.speed = 4;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}
    if (!this.isColliding)
    {
			this.context.drawImage(imageRepository.enemy, this.x, this.y);

			// Enemy has a chance to shoot every movement
			chance = Math.floor(Math.random()*101);
			if (chance/100 < percentFire)
      {
				this.fire();
			}

			return false;
		}
		else if(this.isColliding && this.lives > 0)
    {
			this.lives--;
			this.isColliding = false;
		}
		else if(this.isColliding && this.lives == 0)
    {
      game.playerScore += 20;
      game.explosion.get();
			return true;
		}
	};
	/*
	 * Fires a bullet
	 */
	this.fire = function() {
		game.enemyLaser.get();
		game.enemyBulletPool.get(this.x+this.width/2, this.y+this.height, -2.5);
	}
	/*
	 * Resets the enemy values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
    this.isColliding = false;
	};
}
Enemy.prototype = new Drawable();

function Elite() {
	var percentFire = .01;
	var chance = 0;
	this.alive = false;
  this.collidableWith = "bullet";
	this.type = "elite";
	/*
	 * Sets the Enemy values
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.lives = 5;
		this.isColliding = false;
		this.leftEdge = this.x - 95;
		this.rightEdge = this.x - 15;
		this.bottomEdge = this.y + 140;
	};
	/*
	 * Move the enemy
	 */
	this.draw = function() {
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge) {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width) {
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge) {
			this.speed = 3;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}

		if (!this.isColliding)
    {
			this.context.drawImage(imageRepository.elite, this.x, this.y);

			// Enemy has a chance to shoot every movement
			chance = Math.floor(Math.random()*101);
			if (chance/100 < percentFire)
      {
				this.fire();
			}

			return false;
		}
		else if(this.isColliding && this.lives > 0)
    {
			this.lives--;
			this.isColliding = false;
		}
		else if(this.isColliding && this.lives == 0)
    {
      game.playerScore += 50;
      game.explosion.get();
			return true;
		}
	};
	/*
	 * Fires a bullet
	 */
	this.fire = function() {
		game.eliteLaser.get();
		game.eliteBulletPool.get(this.x+this.width/2-6, this.y+this.height-6, -2);
		game.eliteBulletPool.get(this.x+this.width/2+6, this.y+this.height-6, -2);
	}
	/*
	 * Resets the enemy values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
	};
}
Elite.prototype = new Drawable();

function Titan()
{
	var percentFire = .1; //controls how many bullets are fired
	var chance = 0;
	this.alive = false;
  this.collidableWith = "bullet";
	this.type = "titan";
	/*
	 * Sets the Enemy values
	 */
	this.spawn = function(x, y, speed)
  {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.lives = 18;
		this.special = 0;
		this.leftEdge = this.x - 95;
		this.rightEdge = this.x - 125;
		this.bottomEdge = this.y + 140;
	};
	/*
	 * Move the enemy
	 */
	this.draw = function()
  {
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge)
    {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width)
    {
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge)
    {
			this.speed = 2;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}
    if (!this.isColliding)
    {
			this.context.drawImage(imageRepository.titan, this.x, this.y);

			// Enemy has a chance to shoot every movement
			chance = Math.floor(Math.random()*101);
			if (chance/100 < percentFire)
      {
				this.fire();
			}

			return false;
		}
		else if(this.isColliding && this.lives > 0)
    {
			this.lives--;
			this.isColliding = false;
		}
		else if(this.isColliding && this.lives == 0)
    {
      game.playerScore += 125;
      game.explosion.get();
			return true;
		}
	};
	/*
	 * Fires a bullet
	 */
	this.fire = function() {
		this.special++;
		if(this.special == 5)
  			{
					game.titanLaser.get();
    			game.titanBigBulletPool.get(this.x+this.width/2, this.y+this.height-13, -5);
					this.special = 0;
  			} else
  			{
					game.enemyLaser.get();
					game.titanBulletPool.get(this.x+this.width/2-19.5, this.y+this.height-13, -2);
					game.titanBulletPool.get(this.x+this.width/2+19.5, this.y+this.height-13, -2);
  			}
	}
	/*
	 * Resets the enemy values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
    this.isColliding = false;
	};
}
Titan.prototype = new Drawable();

function Goliath()
{
	var percentFire = .15; //controls how many bullets are fired
	var chance = 0;
	this.alive = false;
  this.collidableWith = "bullet";
	this.type = "goliath";
	/*
	 * Sets the Enemy values
	 */
	this.spawn = function(x, y, speed)
  {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.special = 0;
		this.lives = 36;
		this.leftEdge = this.x - 100;
		this.rightEdge = this.x;
		this.bottomEdge = this.y + 140;
	};
	/*
	 * Move the enemy
	 */
	this.draw = function()
  {
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge)
    {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width)
    {
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge)
    {
			this.speed = 1;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}
    if (!this.isColliding)
    {
			this.context.drawImage(imageRepository.goliath, this.x, this.y);

			// Enemy has a chance to shoot every movement
			chance = Math.floor(Math.random()*101);
			if (chance/100 < percentFire)
      {
				this.fire();
			}

			return false;
		}
		else if(this.isColliding && this.lives > 0)
    {
			this.lives--;
			this.isColliding = false;
		}
		else if(this.isColliding && this.lives == 0)
    {
      game.playerScore += 300;
      game.explosion.get();
			return true;
		}
	};
	/*
	 * Fires a bullet
	 */
	this.fire = function() {
		this.special++;
		if(this.special == 20)
  			{
					game.goliathFire.get();
    			game.goliathBigBulletPool.get(this.x+this.width/2, this.y+this.height-80, -2);
					this.special = 0;
  			}if(this.special == 6 ||this.special == 12 ||this.special == 18)
		  			{
							game.goliathRockets.get();
		    			game.goliathSecondaryBulletPool.get(this.x+this.width/2-10.5, this.y+this.height-125, -8);
							game.goliathSecondaryBulletPool.get(this.x+this.width/2+10.5, this.y+this.height-125, -8);
		  			}
						 else
  			{
					game.enemyLaser.get();
					game.goliathBulletPool.get(this.x+this.width/2-34, this.y+this.height-50, -4);
					game.goliathBulletPool.get(this.x+this.width/2+34, this.y+this.height-50, -4);
  			}
	}
	/*
	 * Resets the enemy values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
    this.isColliding = false;
	};
}
Goliath.prototype = new Drawable();

/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game()
{
	/*
	 * Gets canvas information and context and sets up all game
	 * objects.
	 *
	 */
	this.init = function()
  {
		// Get the canvas element
		this.bgCanvas = document.getElementById('background');
    this.shipCanvas = document.getElementById('ship');
		this.mainCanvas = document.getElementById('main');

		// Test to see if canvas is supported
		if (this.bgCanvas.getContext)
    {
			this.bgContext = this.bgCanvas.getContext('2d');
      this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');
			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

      Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.shipCanvas.width;
			Ship.prototype.canvasHeight = this.shipCanvas.height;

			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;

      Enemy.prototype.context = this.mainContext;
			Enemy.prototype.canvasWidth = this.mainCanvas.width;
			Enemy.prototype.canvasHeight = this.mainCanvas.height;

			Elite.prototype.context = this.mainContext;
			Elite.prototype.canvasWidth = this.mainCanvas.width;
			Elite.prototype.canvasHeight = this.mainCanvas.height;

			Titan.prototype.context = this.mainContext;
			Titan.prototype.canvasWidth = this.mainCanvas.width;
			Titan.prototype.canvasHeight = this.mainCanvas.height;

			Goliath.prototype.context = this.mainContext;
			Goliath.prototype.canvasWidth = this.mainCanvas.width;
			Goliath.prototype.canvasHeight = this.mainCanvas.height;

			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0

      // Initialize the ship object
      this.ship = new Ship();
			// Set the ship to start near the bottom middle of the canvas
			this.shipStartX = this.shipCanvas.width/2 - imageRepository.spaceship.width;
			this.shipStartY = this.shipCanvas.height/4*3 + imageRepository.spaceship.height*2;
			this.ship.init(this.shipStartX, this.shipStartY, imageRepository.spaceship.width, imageRepository.spaceship.height);

      // Initialize the enemy pool object
			this.enemyPool = new Pool(30);
			this.enemyPool.init("enemy");
      this.spawnWave();
      this.enemyBulletPool = new Pool(50);
			this.enemyBulletPool.init("enemyBullet");

			this.elitePool = new Pool(30);
			this.elitePool.init("elite");
      this.eliteBulletPool = new Pool(50);
			this.eliteBulletPool.init("eliteBullet");

			this.titanPool = new Pool(30);
      this.titanPool.init("titan");
			this.titanBulletPool = new Pool(100);
      this.titanBulletPool.init("titanBullet");
			this.titanBigBulletPool = new Pool(50);
      this.titanBigBulletPool.init("titanBigBullet");

			this.goliathPool = new Pool(30);
			this.goliathPool.init("goliath");
			this.goliathBulletPool = new Pool(100);
      this.goliathBulletPool.init("goliathBullet");
			this.goliathSecondaryBulletPool = new Pool(50);
      this.goliathSecondaryBulletPool.init("goliathSecondaryBullet");
			this.goliathBigBulletPool = new Pool(25);
      this.goliathBigBulletPool.init("goliathBigBullet");

      // Start QuadTree
      this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});

      this.playerScore = 0;

      // Audio files
			this.laser = new SoundPool(10);
			this.laser.init("laser");

			this.explosion = new SoundPool(20);
			this.explosion.init("explosion");

			this.enemyLaser = new SoundPool(20);
			this.enemyLaser.init("enemyLaser");

			this.eliteLaser = new SoundPool(20);
			this.eliteLaser.init("enemyLaser");

			this.titanLaser = new SoundPool(20);
			this.titanLaser.init("titanLaser");

			this.goliathFire = new SoundPool(20);
			this.goliathFire.init("goliathFire");

			this.goliathRockets = new SoundPool(20);
			this.goliathRockets.init("goliathRockets");

			this.healthUp = new SoundPool(20);
			this.healthUp.init("healthUp");

			this.healthDown = new SoundPool(20);
			this.healthDown.init("healthDown");


			this.backgroundAudio = new Audio("/assets/kick_shock.wav");
			this.backgroundAudio.loop = true;
			this.backgroundAudio.volume = .25;
			this.backgroundAudio.load();

			this.gameOverAudio = new Audio("/assets/game_over.wav");
			this.gameOverAudio.loop = false;
			this.gameOverAudio.volume = .25;
			this.gameOverAudio.load();


			this.checkAudio = window.setInterval(function(){checkReadyState()},1000);

			//return true;
		}
    // else
    //{
		//	return false;
		//}
	};

  // Spawn a new wave of enemies
	this.spawnWave = function() {
		var height = imageRepository.enemy.height;
		var width = imageRepository.enemy.width;
		var x = 100;
		var y = -height;
		var spacer = y * 1.5;
		for (var i = 1; i <= 30; i++) {
			this.enemyPool.get(x,y,2);
			x += width + 25;
			if (i % 10 == 0) {
				x = 100;
				y += spacer
			}
		}
	}

	this.spawnWaveA = function() {
		var height = imageRepository.elite.height;
		var width = imageRepository.elite.width;
		var x = 100;
		var y = -height;
		var spacer = y * 1.5;
		for (var i = 1; i <= 10; i++) {
			this.elitePool.get(x,y,2);
			x += width + 75;
			if (i % 5 == 0) {
				x = 100;
				y += spacer
			}
		}
	}

	this.spawnWaveB = function() {
		var height = imageRepository.titan.height;
		var width = imageRepository.titan.width;
		var x = 100;
		var y = -height;
		var spacer = y * 1.5;
		for (var i = 1; i <= 2; i++) {
			this.titanPool.get(x,y,2);
			x += width + 75;
			if (i % 2 == 0) {
				x = 100;
				y += spacer
			}
		}
	}

	this.spawnWaveC = function() {
		var height = imageRepository.goliath.height;
		var width = imageRepository.goliath.width;
		var x = 100;
		var y = -height + 50;
		var spacer = y * .5;
		for (var i = 1; i <= 1; i++) {
			this.goliathPool.get(x,y,2);
			x += width + 75;
			if (i % 1 == 0) {
				x = 100;
				y += spacer
			}
		}
	}

	// Start the animation loop
	this.start = function()
  {
    document.getElementById("remaining").style.width = "210px";
		document.getElementById("remaining").style.backgroundColor = "green";
    this.ship.draw();
    this.backgroundAudio.play();
		animate();
	};

  // Restart the game
	this.restart = function()
  {
		this.gameOverAudio.pause();

		document.getElementById('game-over').style.display = "none";
		this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
		this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

		this.quadTree.clear();

		this.background.init(0,0);
		this.ship.init(this.shipStartX, this.shipStartY, imageRepository.spaceship.width, imageRepository.spaceship.height);

		this.enemyPool.init("enemy");
		this.spawnWave();
		this.enemyBulletPool.init("enemyBullet");

		this.playerScore = 0;

		this.backgroundAudio.currentTime = 0;
		this.backgroundAudio.play();

		document.getElementById('score_form').style.visibility = "hidden";

		this.start();
	};

  // Game over
	this.gameOver = function()
  {
		document.getElementById('score_form').style.visibility = "visible";
		document.getElementById('hidden-score').value =game.playerScore;
		this.backgroundAudio.pause();
		this.gameOverAudio.currentTime = 0;
		this.gameOverAudio.play();
		document.getElementById('game-over').style.display = "block";
	};
}
  /**
 * Ensure the game sound has loaded before starting the game
 */
function checkReadyState()
{
	if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4)
  {
		window.clearInterval(game.checkAudio);
		game.start();
	}
}


/**
 * A sound pool to use for the sound effects
 */
function SoundPool(maxSize)
{
	var size = maxSize; // Max sounds allowed in the pool
	var pool = [];
	this.pool = pool;
	var currSound = 0;
	/*
	 * Populates the pool array with the given sound
	 */
	this.init = function(object)
  {
		if (object == "laser") {
			for (var i = 0; i < size; i++)
      {
				// Initalize the sound
				laser = new Audio("/assets/laser.wav");
				laser.volume = .2;
				laser.load();
				pool[i] = laser;
			}
		}
		else if (object == "explosion")
    {
			for (var i = 0; i < size; i++)
      {
				var explosion = new Audio("/assets/explosion.wav");
				explosion.volume = .4;
				explosion.load();
				pool[i] = explosion;
			}
		}
		else if (object == "enemyLaser")
    {
			for (var i = 0; i < size; i++)
      {
				var enemyLaser = new Audio("/assets/enemyLaser.wav");
				enemyLaser.volume = .1;
				enemyLaser.load();
				pool[i] = enemyLaser;
			}
		}
		else if (object == "eliteLaser")
    {
			for (var i = 0; i < size; i++)
      {
				var enemyLaser = new Audio("/assets/eliteLaser.wav");
				eliteLaser.volume = .15;
				eliteLaser.load();
				pool[i] = eliteLaser;
			}
		}
		else if (object == "titanLaser")
    {
			for (var i = 0; i < size; i++)
      {
				var titanLaser = new Audio("/assets/titanLaser.wav");
				titanLaser.volume = .3;
				titanLaser.load();
				pool[i] = titanLaser;
			}
		}
		else if (object == "goliathRockets")
    {
			for (var i = 0; i < size; i++)
      {
				var goliathRockets = new Audio("/assets/goliathRockets.wav");
				goliathRockets.volume = .4;
				goliathRockets.load();
				pool[i] = goliathRockets;
			}
		}
		else if (object == "goliathFire")
    {
			for (var i = 0; i < size; i++)
      {
				var goliathFire = new Audio("/assets/goliathFire.wav");
				goliathFire.volume = .65;
				goliathFire.load();
				pool[i] = goliathFire;
			}
		}
		else if (object == "healthUp")
    {
			for (var i = 0; i < size; i++)
      {
				var healthUp = new Audio("/assets/healthUp.wav");
				healthUp.volume = .75;
				healthUp.load();
				pool[i] = healthUp;
			}
		}
		else if (object == "healthDown")
    {
			for (var i = 0; i < size; i++)
      {
				var healthDown = new Audio("/assets/healthDown.wav");
				healthDown.volume = .75;
				healthDown.load();
				pool[i] = healthDown;
			}
		}
	};
	/*
	 * Plays a sound
	 */
	this.get = function()
  {
		if(pool[currSound].currentTime == 0 || pool[currSound].ended)
    {
			pool[currSound].play();
		}
		currSound = (currSound + 1) % size;
	};
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
 var i = 0;
 function animate()
 {
   document.getElementById('score').innerHTML = game.playerScore;

   // Insert objects into quadtree
	 game.quadTree.clear();
   game.quadTree.insert(game.ship);
	 game.quadTree.insert(game.ship.bulletPool.getPool());
	 game.quadTree.insert(game.enemyPool.getPool());
	 game.quadTree.insert(game.enemyBulletPool.getPool());
	 game.quadTree.insert(game.elitePool.getPool());
	 game.quadTree.insert(game.eliteBulletPool.getPool());
	 game.quadTree.insert(game.titanPool.getPool());
	 game.quadTree.insert(game.titanBulletPool.getPool());
	 game.quadTree.insert(game.titanBigBulletPool.getPool());
	 game.quadTree.insert(game.goliathPool.getPool());
	 game.quadTree.insert(game.goliathBulletPool.getPool());
	 game.quadTree.insert(game.goliathSecondaryBulletPool.getPool());
	 game.quadTree.insert(game.goliathBigBulletPool.getPool());

	 detectCollision();

   // No more enemies

	if (game.enemyPool.getPool().length === 0 && game.elitePool.getPool().length === 0 && game.titanPool.getPool().length === 0 && game.goliathPool.getPool().length === 0 && i <= 4)
	{
 		game.spawnWave();
		i++;
 	}
	else if (game.enemyPool.getPool().length === 0 && game.elitePool.getPool().length === 0 && game.titanPool.getPool().length === 0 && game.goliathPool.getPool().length === 0 && i > 4 && i < 8)
	{
		game.spawnWaveA();
		i++;
	}
	else if (game.enemyPool.getPool().length === 0 && game.elitePool.getPool().length === 0 && game.titanPool.getPool().length === 0 && game.goliathPool.getPool().length === 0 && i > 7 && i < 10)
	{
		game.spawnWaveB();
		i++;
	}
	else if (game.enemyPool.getPool().length === 0 && game.elitePool.getPool().length === 0 && game.titanPool.getPool().length === 0 && game.goliathPool.getPool().length === 0 && i == 10)
	{
		game.spawnWaveC();
		i = 0;
	}



  // Animate game objects
if (game.ship.alive)
{
  requestAnimFrame( animate );

  game.background.draw();
  game.ship.move();
  game.ship.bulletPool.animate();
  game.enemyPool.animate();
  game.enemyBulletPool.animate();
	game.elitePool.animate();
  game.eliteBulletPool.animate();
	game.titanPool.animate();
  game.titanBulletPool.animate();
	game.titanBigBulletPool.animate();
	game.goliathPool.animate();
  game.goliathBulletPool.animate();
	game.goliathSecondaryBulletPool.animate();
  game.goliathBigBulletPool.animate();
}
 }

 function detectCollision()
 {
	var objects = [];
	game.quadTree.getAllObjects(objects);
	for (var x = 0, len = objects.length; x < len; x++)
  {
		game.quadTree.findObjects(obj = [], objects[x]);

		for (y = 0, length = obj.length; y < length; y++)
    {

			// DETECT COLLISION ALGORITHM
			if (objects[x].collidableWith === obj[y].type &&
				(objects[x].x < obj[y].x + obj[y].width &&
			     objects[x].x + objects[x].width > obj[y].x &&
				 objects[x].y < obj[y].y + obj[y].height &&
				 objects[x].y + objects[x].height > obj[y].y))
         {
				objects[x].isColliding = true;
				obj[y].isColliding = true;
			}
		}
	}
};

 // The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES =
{
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}
// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press
KEY_STATUS = {};
for (code in KEY_CODES)
{
  KEY_STATUS[ KEY_CODES[ code ]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down).
 */
document.onkeydown = function(e)
{
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
}
/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets the appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function(e)
{
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode])
   {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
}

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();
