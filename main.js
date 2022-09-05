const moreBtn = document.querySelector("#video_info #meta_info #titleAndButton .more");
const title = document.querySelector("#video_info #meta_info #titleAndButton .title");

moreBtn.addEventListener(
    "click", () => {
        moreBtn.classList.toggle('clicked');
        title.classList.toggle('clamp');
    }
);

const commentForm = document.getElementById("comment-form");
const input = commentForm.querySelector("input");
const commentList = document.getElementById("comment-list");
const count = document.querySelector(".count");

let commentArray = [];

function saveComment(){
	localStorage.setItem("comment", JSON.stringify(commentArray));
}

function deleteComment(event) {
    const li = event.target.parentElement;
    li.remove();
	commentArray = commentArray.filter((ment) => ment.id !== parseInt(li.id));
	saveComment();
}

function paintComment(newComment) {
    const li = document.createElement("li");
    li.id = newComment.id;
    const span = document.createElement("span");
    span.innerText = newComment.text;
    const btn = document.createElement("button");
    btn.innerText = "삭제";
    btn.addEventListener("click", deleteComment);
    li.appendChild(span);
    li.appendChild(btn);
    commentList.appendChild(li);
	const cmcount = commentList.childElementCount;
	console.log(cmcount);
	count.innerText = cmcount;
}

function handleCommentSubmit(event) {
    event.preventDefault();
    const newComment = input.value;
    input.value = "";
    const newCommentObj = {
        text: newComment,
		id: Date.now(),
    };
	commentArray.push(newCommentObj);
    paintComment(newCommentObj);
	saveComment();
}

commentForm.addEventListener("submit", handleCommentSubmit);

const savedComment = localStorage.getItem("comment");
if(savedComment !== null){
	const parsedComment = JSON.parse(savedComment);
	commentArray = parsedComment;
	parsedComment.forEach(paintComment);
}