$(document).ready(() => {
	$("#upvote").click(() => {
		console.log("upvote was clicked");
		if (
			!$("#upvote").hasClass("activated") &&
			!$("#downvote").hasClass("activated")
		) {
			// UPVOTE add activated class and change color to red
			$("#upvote").addClass("activated");
			$("#upvote").css("color", "red");

			// TODO: add to the db
			var postid = $(".sched-img").attr("alt");
			console.log("postid = " + postid);
			// add an upvote to the counter
			var upvotes = parseInt($("#upqty").text()) + 1;
			$("#upqty").text(upvotes);

			console.log("upvote on downvote off");
			console.log("upvotes = " + upvotes);
		} else if (
			$("#upvote").hasClass("activated") &&
			!$("#downvote").hasClass("activated")
		) {
			// UPVOTE remove activated class and change back to black
			$("#upvote").removeClass("activated");
			$("#upvote").css("color", "#000");

			// TODO: subtract from the db
			var postid = $(".sched-img").attr("alt");
			console.log("postid = " + postid);
			// subtract an upvote from the counter
			var upvotes = parseInt($("#upqty").text()) - 1;
			$("#upqty").text(upvotes);

			console.log("upvote off downvote off");
			console.log("upvotes = " + upvotes);
		} else if (
			!$("#upvote").hasClass("activated") &&
			$("#downvote").hasClass("activated")
		) {
			// toggle downvote
			//remove activated class and change to black
			$("#downvote").removeClass("activated");
			$("#downvote").css("color", "#000");
			// toggle upvote
			// activated and red
			$("#upvote").addClass("activated");
			$("#upvote").css("color", "red");
			// TODO: get postid to access in the db
			var postid = $(".sched-img").attr("alt");
			console.log("postid = " + postid);
			// decrease downvote counter
			var downvotes = parseInt($("#downqty").text()) - 1;
			$("#downqty").text(downvotes);
			// increase upvote counter
			var upvotes = parseInt($("#upqty").text()) + 1;
			$("#upqty").text(upvotes);

			console.log("upvote on downvote off (2)");
			console.log("upvotes = " + upvotes);
			console.log("downvotes = " + downvotes);
		}
	});

	$("#downvote").click(() => {
		console.log("downvote was clicked");
		if (
			!$("#upvote").hasClass("activated") &&
			!$("#downvote").hasClass("activated")
		) {
			// DOWNVOTE activated and blue
			$("#downvote").addClass("activated");
			$("#downvote").css("color", "blue");
			// TODO: get postid to access in the db
			var postid = $(".sched-img").attr("alt");
			console.log("postid = " + postid);
			// add downvote counter
			var downvotes = parseInt($("#downqty").text()) + 1;
			$("#downqty").text(downvotes);

			console.log("downvote on upvote off");
			console.log("downvotes = " + downvotes);
		} else if (
			!$("#upvote").hasClass("activated") &&
			$("#downvote").hasClass("activated")
		) {
			// DOWNVOTE remove activated and change to black
			$("#downvote").removeClass("activated");
			$("#downvote").css("color", "#000");
			// TODO: get postid to access in the db
			var postid = $(".sched-img").attr("alt");
			console.log("postid = " + postid);
			// subtract downvote counter
			var downvotes = parseInt($("#downqty").text()) - 1;
			$("#downqty").text(downvotes);

			console.log("upvote off downvote off");
			console.log("downvotes = " + downvotes);
		} else if (
			$("#upvote").hasClass("activated") &&
			!$("#downvote").hasClass("activated")
		) {
			// toggle upvote to remove activated and change to black
			$("#upvote").removeClass("activated");
			$("#upvote").css("color", "#000");
			// toggle downvote to activated and change to blue
			$("#downvote").addClass("activated");
			$("#downvote").css("color", "blue");
			// TODO: get postid to access in the db
			var postid = $(".sched-img").attr("alt");
			console.log("postid = " + postid);
			// subtract from upvote counter
			var upvotes = parseInt($("#upqty").text()) - 1;
			$("#upqty").text(upvotes);
			// add to downvote counter
			var downvotes = parseInt($("#downqty").text()) + 1;
			$("#downqty").text(downvotes);

			console.log("upvote off downvote on (2)");
			console.log("upvotes = " + upvotes);
			console.log("downvotes = " + downvotes);
		}
	});
});
