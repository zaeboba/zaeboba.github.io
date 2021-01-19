(function(window) {
	var Piece = function(canvas, config)
	{
		this.initialize(canvas, config);
	}
	var p = Piece.prototype = new BasePiece();
	//
	p.initialize = function(canvas, config)
	{
		BasePiece.prototype.initialize.apply(this, [canvas, config]);
		document.body.style.backgroundColor = this.config.bgColor;
		this.container = new Container;
		this.stage.addChild(this.container);
		this.initInteraction();
		if (this.config.debug) this.addStats();
	}
	
	p.initInteraction = function()
	{
		var that = this;
		//this.stage.addEventListener("stagemousemove", function(e) { that.onMouseMove(e); });
		this.stage.addEventListener("stagemousedown", function(e) { that.onMouseDown(e); });
		this.stage.addEventListener("stagemouseup", function(e) { that.onMouseUp(e); });
	}
	p.onKeyUp = function(e)
	{
		BasePiece.prototype.onKeyUp.apply(this, [e]);
		if (!this.config.debug) return;
		var c = String.fromCharCode(e.which);
		if (c=="G") this.reset();
	}
	p.onMouseDown = function(e)
	{
	}
	p.onMouseUp = function(e)
	{
		if (this.config.erupt_on_mouse_up && this.sequences.length < this.config.eruptions_max_simultaneous_user)
		{
			this.addSequence();
		}
	}
	
	
	p.setSize = function(w,h,dpr)
	{
		this.dpr = dpr;
		this.width = Math.floor(w*dpr);
		this.height = Math.floor(h*dpr);
		log("setSize",w,this.width);
		this.diag = .5 * Math.sqrt(this.width*this.height);
		//
		this.container.x = this.width/2;
		this.container.y = this.height/2;
		//
		var sw = 400, sh = 800;
		var w = this.width, h = this.height;
		var s = h/sh;//w/h > sw/sh ? h/sh : w/sw;
		this.container.scaleX = this.container.scaleY = s;
		//
		if (this.tickLast) this.reset();
	}
	
	p.start = function()
	{
		BasePiece.prototype.start.apply(this);
		log("start",this.width);
		this.sequences = [];
		if (this.width) this.reset();
	}
	
	p.reset = function()
	{
		for (var i=this.sequences.length-1;i>=0;i--) this.removeSequence(this.sequences[i]);
		this.sequenceCount = 0;
		this.sequences.length = 0;
		this.nextAnimationsUpdate = 0;
		this.nextColorsUpdate = 0;
		this.nextEruption = 0;
	}
	
	p.addSequence = function()
	{
		this.sequenceCount ++;
		var frames = RandomUtil.pick(this.config.sequences);
		var colors = this.config.color_lists[this.sequenceCount%this.config.color_lists.length];
		var sequence = new Sequence(frames, colors);
		this.sequences.push(sequence);
		this.container.addChild(sequence);
		log("addSequence", this.sequences.length, this.container.getNumChildren());
	}
	p.removeSequence = function(sequence)
	{
		this.container.removeChild(sequence);
		var idx = this.sequences.indexOf(sequence);
		if (idx>-1) this.sequences.splice(idx,1);
		log("removeSequence", this.sequences.length, this.container.getNumChildren());
	}
	
	p.scheduleSequence = function()
	{
		this.nextEruption = this.tickLast + RandomUtil.between(this.config.duration_between_eruptions_min, this.config.duration_between_eruptions_max);
	}
	
	p.update = function()
	{
		for (var i=this.sequences.length-1;i>=0;i--)
		{
			var sequence = this.sequences[i];
			if (sequence.complete) this.removeSequence(sequence);
		}
		//
		var n = this.sequences.length;
		if (this.tickLast>this.nextAnimationsUpdate)
		{
			for (i=0;i<n;i++) this.sequences[i].updateAnimation();
			this.nextAnimationsUpdate = this.tickLast + this.config.update_interval_eruptions;
		}
		if (this.tickLast>this.nextColorsUpdate)
		{
			for (i=0;i<n;i++) this.sequences[i].updateColor();
			this.lastColorsUpdate = this.tickLast + this.config.update_interval_colors;
		}
		//check add seq
		if (this.tickLast >= this.nextEruption && n < this.config.eruptions_max_simultaneous)
		{
			this.addSequence();
			this.scheduleSequence();
		}
		//draw
		n = this.sequences.length;
		for (i=0;i<n;i++) this.sequences[i].drawFrame();
		//
		return true;
	}
	
	
	p.drawFrame = function(g)
	{
	}
	
	window.Piece = Piece;
}(window));

