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

	$("#comment-btn").click(() => {
		if ($("#comment-form").val().length > 0) {
			console.log("COMMENTING");

			// TODO: get from DB
			// get the author from the session and
			// check whether user is logged in before commenting
			var comment = {
				cAuthor: "sendcutedogpics",
				cDesc: $("#comment-form").val(),
			};
			console.log(comment.cDesc);
			var listItem = document.createElement("div");
			listItem.classList.add("list-group-item");
			var commentContainer = document.createElement("div");
			commentContainer.classList.add("container");
			commentContainer.classList.add("p-0");
			var authorLink = document.createElement("a");
			authorLink.classList.add("link-unstyled");
			var link = "/account?username=" + comment.cAuthor;
			authorLink.href = link;
			authorLink.innerHTML = comment.cAuthor + " ";
			var commentSpan = document.createElement("span");
			commentSpan.innerHTML = comment.cDesc;
			var commentP = document.createElement("p");
			commentP.appendChild(authorLink);
			commentP.appendChild(commentSpan);
			commentContainer.appendChild(commentP);
			listItem.appendChild(commentContainer);
			document.getElementById("comment-list").appendChild(listItem);
			$("#comment-form").val("");
		}
	});
});
