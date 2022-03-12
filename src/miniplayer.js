(function ($) {

    $.fn.miniPlayer = function(opt) {

		// Store it.
		var _MP = this;

		// Get the parameters.
		var name = opt.name;
		var author = opt.author;
		var audio = opt.audio;

		// Add the class names.
        _MP.addClass("miniPlayer");

		// Add the text and author.
		var html =	"<div class='mp_wrapper'>" +
						"<div class='info'>" +
							"<h2>" + name + "</h2>" +
							"<h3>" + author + "</h3>" +
						"</div>" +
						"<div class='progress'><b style='width: 100%;'></b><i></i></div>" +
						"<svg class='play_pause' width='100%' height='100%' viewbox='0 0 100 100'>" +
							"<polygon points='0,0 50,25 50,75 0,100' style='fill: #003e8d; fill-rule: evenodd;'>" +
								"<animate class='animation-to-pause' begin='indefinite' attributeName='points' dur='100ms' fill='freeze' to='0,0 40,0 40,100 0,100' />" +
								"<animate class='animation-to-play' begin='indefinite' attributeName='points' dur='100ms' fill='freeze' to='0,0 50,25 50,75 0,100' />" +
							"</polygon>" +
							"<polygon points='50,25 100,50 100,50 50,75' style='fill: #003e8d; fill-rule: evenodd;'>" +
								"<animate class='animation-to-pause' begin='indefinite' attributeName='points' dur='100ms' fill='freeze' to='60,0 100,0 100,100 60,100' />" +
								"<animate class='animation-to-play' begin='indefinite' attributeName='points' dur='100ms' fill='freeze' to='50,25 100,50 100,50 50,75' />" +
							"</polygon>" +
						"</svg>" +
						"<audio>";

		for (var i = 0; i < audio.length; i++) {
			html += 		"<source src='" + audio[i].src + "' type='" + audio[i].type + "'>"
		}

		html +=			"</audio>" +
					"</div>";

		_MP.append(html);

		_MP.find(".play_pause").on("click", function(e) {

			var aud = $(this).siblings('audio')[0];

			// Check whether its paused or not.
			if (aud.paused) {

				// Play the video.
				aud.play();

			} else {

				// Play the video.
				aud.pause();

			}

		});

		_MP.find("audio").on("play", function(e) {

			// Show the progress bar.
			_MP.addClass("showing_bar");

			// Get the animations to pause.
			var animationToPause = $(this).siblings('.play_pause').find(".animation-to-pause");

			// run this on a click or whenever you want
			animationToPause[0].beginElement();
			animationToPause[1].beginElement();

		});

		_MP.find("audio").on("pause", function(e) {

			// Get the animations to pause.
			var animationToPlay = $(this).siblings('.play_pause').find(".animation-to-play");

			// run this on a click or whenever you want
			animationToPlay[0].beginElement();
			animationToPlay[1].beginElement();

		});

		_MP.find("audio").on("timeupdate", function(e) {

			// Get the animations to pause.
			var progress_bar = $(this).siblings('.progress');

			// Get the audio.
			var aud = $(this)[0];

			// Get the progress.
			var prog = aud.currentTime / aud.duration;

			// Tranform it to the inverse and percentage.
			prog = ((1 - prog) * 100).toString() + "%"

			// Set the css.
			progress_bar.children('b').css('width', prog);

		});

		_MP.find(".progress").on("mousemove", function(e) {

			// Get the i element.
			var i = $(this).children('i');

			// Get the position of the mouse within the element.
			var prog = (e.pageX - $(this).offset().left) / $(this).width();

			// Tranform it to the inverse and percentage.
			prog = ((1 - prog) * 100).toString() + "%"

			// Set the css.
			i.css('width', prog);

		});

		_MP.find(".progress").on("click", function(e) {

			// Get the i element.
			var b = $(this).children('b');

			// Get the audio.
			var aud = $(this).siblings('audio')[0];

			// Get the position of the mouse within the element.
			var prog = (e.pageX - $(this).offset().left) / $(this).width();

			// Set the progress.
			aud.currentTime = aud.duration * prog;

			// Tranform it to the inverse and percentage.
			prog = ((1 - prog) * 100).toString() + "%"

			// Set the css.
			b.css('width', prog);

		});

		return _MP;

    };

}(jQuery));
