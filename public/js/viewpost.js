$(document).ready(function () {
	$("upvote-btn").click(() => {
		console.log("Hello world");
		if ($("upvote-btn").is(":hidden") && $("downvote-btn").is(":hidden")) {
			// increase upvote count
			console.log("upvote on downvote off");
			+$("upqty").val();
		} else if (
			$("upvote-btn").is(":visible") &&
			$("downvote-btn").is(":hidden")
		) {
			// decrease upvote]
			console.log("upvote off downvote off") - $("upqty").val();
		} else if (
			$("upvote-btn").is(":hidden") &&
			$("downvote-btn").is(":visible")
		) {
			console.log("upvote on downvote off (2)");
			// toggle downvote to hidden
			$("downvote-btn").toggle();
			// decrease downvote
			-$("downqty").val();
			// increase upvote
			+$("upqty").val();
		}
	});
});
