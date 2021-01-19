(function(window) {
	var Sequence = function(frames, colors)
	{
		this.initialize(frames, colors);
	}
	var p = Sequence.prototype = new Shape();
	//
	p.initialize = function(frames, colors)
	{
		Shape.prototype.initialize.apply(this);
		this.frames = frames;
		this.colors = colors;
		this.frameIndex = 0;
		this.colorIndex = 0;
		this.complete = false;
	}
	
	p.updateAnimation = function()
	{
		//move playhead and return if we're still running
		var complete = this.frameIndex>=this.frames.length-1;
		if (!complete) this.frameIndex ++;
		this.complete = complete;
		this.dirty = true;
	}
	
	p.updateColor = function()
	{
		this.colorIndex = (this.colorIndex + 1) % this.colors.length;
		this.dirty = true;
	}
	
	p.drawFrame = function(shape)
	{
		if (this.dirty)
		{
			var color = this.colors[this.colorIndex];
			var frame = this.frames[this.frameIndex];
			var instruction = frame[0];
			this.graphics.c().f(color).p(instruction);
			this.setTransform(frame[1],frame[2]);
			this.dirty = false;
		}
	}
	
	window.Sequence = Sequence;
}(window));

