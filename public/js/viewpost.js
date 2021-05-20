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

			var schedid = $(".sched-img").attr("alt");
			console.log("schedid = " + schedid);
			// add an upvote to the counter
			// var upvotes = parseInt($("#upqty").text()) + 1;

			$.get("/upvoteInc", { schedid: schedid }, (result) => {
				if (result.schedid == schedid) {
					console.log("upvote on downvote off");
					console.log("upvotes = " + result.upqty);
					$("#upqty").text(result.upqty.toString());
				}
			});
		} else if (
			$("#upvote").hasClass("activated") &&
			!$("#downvote").hasClass("activated")
		) {
			// UPVOTE remove activated class and change back to black
			$("#upvote").removeClass("activated");
			$("#upvote").css("color", "#000");

			var schedid = $(".sched-img").attr("alt");
			console.log("schedid = " + schedid);
			// subtract an upvote from the counter
			// var upvotes = parseInt($("#upqty").text()) - 1;
			// $("#upqty").text(upvotes);

			$.get("/upvoteDec", { schedid: schedid }, (result) => {
				if (result.schedid == schedid) {
					console.log("upvote off downvote off");
					console.log("upvotes = " + result.upqty);
					$("#upqty").text(result.upqty.toString());
				}
			});
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

			var schedid = $(".sched-img").attr("alt");
			console.log("schedid = " + schedid);
			// decrease downvote counter
			// var downvotes = parseInt($("#downqty").text()) - 1;
			// $("#downqty").text(downvotes);
			// // increase upvote counter
			// var upvotes = parseInt($("#upqty").text()) + 1;
			// $("#upqty").text(upvotes);

			$.get("/downDecupInc", { schedid: schedid }, (result) => {
				if (result.schedid == schedid) {
					console.log("upvote on downvote off (2)");
					console.log("upvotes = " + result.upqty);
					console.log("downvotes = " + result.downqty);
					$("#downqty").text(result.downqty.toString());
					$("#upqty").text(result.upqty.toString());
				}
			});
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

			var schedid = $(".sched-img").attr("alt");
			console.log("schedid = " + schedid);
			// add downvote counter
			// var downvotes = parseInt($("#downqty").text()) + 1;
			// $("#downqty").text(downvotes);

			$.get("/downvoteInc", { schedid: schedid }, (result) => {
				if (result.schedid == schedid) {
					console.log("downvote on upvote off");
					console.log("downvotes = " + result.downqty);
					$("#downqty").text(result.downqty.toString());
				}
			});
		} else if (
			!$("#upvote").hasClass("activated") &&
			$("#downvote").hasClass("activated")
		) {
			// DOWNVOTE remove activated and change to black
			$("#downvote").removeClass("activated");
			$("#downvote").css("color", "#000");

			var schedid = $(".sched-img").attr("alt");
			console.log("schedid = " + schedid);
			// subtract downvote counter
			// var downvotes = parseInt($("#downqty").text()) - 1;
			// $("#downqty").text(downvotes);

			$.get("/downvoteDec", { schedid: schedid }, (result) => {
				if (result.schedid == schedid) {
					console.log("upvote off downvote off");
					console.log("downvotes = " + result.downqty);
					$("#downqty").text(result.downqty.toString());
				}
			});
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
			// TODO: get schedid to access in the db
			var schedid = $(".sched-img").attr("alt");
			console.log("schedid = " + schedid);
			// subtract from upvote counter
			// var upvotes = parseInt($("#upqty").text()) - 1;
			// $("#upqty").text(upvotes);
			// // add to downvote counter
			// var downvotes = parseInt($("#downqty").text()) + 1;
			// $("#downqty").text(downvotes);

			$.get("/upDecdownInc", { schedid: schedid }, (result) => {
				if (result.schedid == schedid) {
					console.log("upvote off downvote on (2)");
					console.log("upvotes = " + result.upqty);
					console.log("downvotes = " + result.downqty);
					$("#upqty").text(result.upqty.toString());
					$("#downqty").text(result.downqty.toString());
				}
			});
		}
	});

	$("#comment-btn").click(() => {
		// check if length of comment is greater than 0
		if ($("#comment-form").val().length > 0) {
			console.log("COMMENTING");

			// TODO: CHECK IF USER IS IN SESSION
			// get the author from the session and
			// check whether user is logged in before commenting
			var schedid = $(".sched-img").attr("alt");

			$.get(
				"/addComment",
				{
					schedid: schedid,
					cDesc: $("#comment-form").val(),
				},
				(result) => {
					var comment = {
						schedid: result.schedid,
						commentid: result._id,
						cAuthor: result.cAuthor,
						cDesc: result.cDesc,
					};
					console.log(comment.cDesc);
					var listItem = document.createElement("li");
					listItem.classList.add("list-group-item");
					listItem.id = "C-" + comment.commentid.toString();
					var commentContainer = document.createElement("div");
					commentContainer.classList.add("comment-content");
					var authorLink = document.createElement("a");
					authorLink.classList.add("link-unstyled");
					authorLink.classList.add("sauthor");
					var link = "/account?username=" + comment.cAuthor;
					authorLink.href = link;
					authorLink.innerHTML = comment.cAuthor + " ";
					var commentSpan = document.createElement("span");
					commentSpan.innerHTML = comment.cDesc;
					var delbtn = document.createElement("button");
					var delicon = document.createElement("i");
					delicon.classList.add("far");
					delicon.classList.add("fa-trash-alt");
					delbtn.type = "submit";
					delbtn.classList.add("delete-comment");
					delbtn.id = comment.commentid.toString();
					delbtn.appendChild(delicon);
					var commentDetails = document.createElement("div");
					var btndiv = document.createElement("div");
					btndiv.classList.add("del-div-btn");
					btndiv.appendChild(delbtn);
					commentDetails.classList.add("comment-details");
					commentDetails.appendChild(authorLink);
					commentDetails.appendChild(commentSpan);
					commentContainer.appendChild(commentDetails);
					commentContainer.appendChild(btndiv);
					listItem.appendChild(commentContainer);
					document
						.getElementById("comment-list")
						.appendChild(listItem);
					$("#comment-form").val("");
				}
			);
		}
	});

	// $(".delete-comment").click(() => {

	// 	console.log("DELETE BUTTON CLICKED");
	// 	var commentid = $(this).text();
	// 	console.log(commentid);
	// 	console.log("deleting comment");
	// });

	$("#comment-list").on("click", ".delete-comment", function () {
		var commentid = $(this).attr("id");
		console.log(commentid);
		$.get("/deletecomment", { commentid: commentid });
		$("#C-" + commentid).remove();
	});
});
