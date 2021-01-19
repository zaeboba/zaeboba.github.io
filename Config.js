var Config = {};

//base:
Config.debug = 0;
Config.framerate = 30;

//piece:
Config.bgColor = "#000000";

Config.update_interval_eruptions = 50;//msec, used in playing eruption animations
Config.update_interval_color_rotation = 20;//msec, used in rotating colors

Config.eruptions_max_simultaneous = 3;//max nr of sequences for normal, timed eruptions
Config.eruptions_max_simultaneous_user = 6;//max nr of sequences for user interaction (mouse up)

Config.freeze_eruptions_on_mouse_down = true;
Config.freeze_colors_on_mouse_down = false;
Config.erupt_on_mouse_up = true;
		
Config.duration_between_eruptions_min = 200;//msec
Config.duration_between_eruptions_max = 12000;//msec
		
Config.color_lists = [
	["#0066FF", "#FF00FF", "#00FFFF", "#FFFFFF", "#FF00FF", "#FFFFFF", "#00FFFF", "#0066FF"],
	["#00CC99", "#FFCC00", "#FF0000", "#CC0099", "#FF9900", "#99FF00", "#FF3333", "#FFCCFF"],
	["#9966FF", "#CC0000", "#990066", "#9900CC", "#9933FF", "#FF66FF", "#993399", "#FF0033"],
	["#99CCFF", "#CC99FF", "#660033", "#FF6600", "#FF0000", "#FFFF33", "#FF0033", "#FF0033"]
];