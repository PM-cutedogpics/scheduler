const db = require("../models/db");
const User = require("../models/UserModel.js");
const Post = require("../models/PostModel.js");

var postImgs = new Array();
postImgs[0] = new Image();
postImgs[0].src = "/img/example1.jpg";
postImgs[1] = new Image();
postImgs[1].src = "/img/example2.jpg";
postImgs[2] = new Image();
postImgs[2].src = "/img/example3.jpg";
postImgs[3] = new Image();
postImgs[3].src = "/img/example4.jpg";
postImgs[4] = new Image();
postImgs[4].src = "/img/example5.jpg";

$(document).ready(() => {
    var posts = [];
    for (var i = 0; i < 5; i++) {
        var post = {
            schedcard : "schedcard-" + (i + 1),
            postImg : postImgs[i].src,
        }
        posts.push(post);
    }
    
	// var outerDiv = document.createElement("div");
	// outerDiv.classList.add(
	// 	"row g-3 my-5 mx-5 row-cols-sm-1 row-cols-md-2 row-cols-lg-3"
	// );
	// var colDiv = document.createElement("div");
	// colDiv.classList.add("col");
	// var cardDiv = document.createElement("div");
	// cardDiv.classList.add("card");
	// cardDiv.id = "schedcard-" + (i + 1);
	// var schedBtn = document.createElement("button");
	// schedBtn.classList.add("btn p-0");
	// var postImg = document.createElement("img");
	// postImg.classList.add("sched-img");
	// postImg.classList.add("card-img-top");
	// postImg.src = postImgs[i].src;
	// postImg.alt = "sched" + (i + 1);
	// schedBtn.appendChild(postImg);

});
