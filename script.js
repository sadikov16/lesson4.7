let elUserList = document.querySelector("#list_user");
let elCommentList = document.querySelector("#list_comment");
let elPostList = document.querySelector("#list_post");

async function userRenderFunc(element) {
    let data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
    console.log(data);
    
    if (data) {
        data.forEach((user) => {
            let newLi = document.createElement("li");
            
            let p = document.createElement("p");
            
            p.textContent = user.name;
            p.setAttribute("style", "pointer-events: none;");
            newLi.setAttribute("style", "padding: 10px; border: 2px solid #000;");
            newLi.dataset.id = user.id;
            newLi.append(p);
            
            newLi.addEventListener("click", (evt) => {
                let id = evt.target.dataset.id;
                postRenderFunc(id, elPostList);
            });
            
            element.appendChild(newLi);
        });
    }
}
userRenderFunc(elUserList);

async function postRenderFunc(id, element) {
    let data = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
    
    let userPosts = data.filter((post) => post.userId == id);
    console.log(userPosts);
    if (userPosts) {
        userPosts.forEach((post) => {
            let newLi = document.createElement("li");
            let h2 = document.createElement("h2");
            let p = document.createElement("p");
            
            h2.textContent = post.title;
            p.textContent = post.body;
            newLi.setAttribute("style", "padding: 10px; border: 2px solid #000;");
            newLi.dataset.id = post.id;
            newLi.append(h2, p);
            
            newLi.addEventListener("click", (evt) => {
                let id = evt.target.dataset.id;
                commentRenderFunc(id, elCommentList);
            });
            
            element.appendChild(newLi);
        });
    }
}

async function commentRenderFunc(id, element) {
    let data = await fetch("https://jsonplaceholder.typicode.com/comments")
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
    
    let postComments = data.filter((comment) => comment.postId == id);
    
    if (postComments) {
        postComments.forEach((comment) => {
            let newLi = document.createElement("li");
            let h2 = document.createElement("h2");
            let p = document.createElement("p");
            
            h2.textContent = comment.name;
            p.textContent = comment.body;
            newLi.setAttribute("style", "padding: 10px; border: 2px solid #000;");
            newLi.dataset.id = comment.id;
            newLi.append(h2, p);
            
            
            element.appendChild(newLi);
        });
    }
}