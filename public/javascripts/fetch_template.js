const buttons = document.getElementsByClassName('upvote-button');
const article = document.querySelectorAll('article');
const points = document.querySelectorAll('.points');
const deleteLink = document.getElementsByClassName('delete');
const newPost = document.getElementById('posts');
const newPostDiv = document.getElementsByClassName('post-container')[0];


async _fetchProducts2(jsonItem) {
    const response = await fetch(`${API}/${jsonItem}`);
    const data = await response.json();
    this.goods = data.contents;
  }


for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const articleId = e.target.dataset.id;
        let response = await fetch('/posts/' + articleId + '/vote', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'id': articleId })
        });
        let text = await response.text();
        points.forEach((element) => {
            if (element.dataset.id === articleId) {
                element.innerText = text;
            }
        });
        e.target.style.color = 'red';


    })
}

for (let i = 0; i < deleteLink.length; i++) {
    deleteLink[i].addEventListener('click', async (e) => {
        e.preventDefault();
        const oldId = e.target.dataset.id
        let response = await fetch('/' + oldId, {
            method: 'delete'
        });
        article.forEach((element) => {
            if (element.id === oldId) {
                element.remove();
            }
        });
    })
}

newPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    let response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'title': e.target.title.value })
    });
    
    // if (response.status!=200){
    //     alert('error');
    //     return;
    // }
    let objPost = await response.json();
    console.log(objPost.title);
    let newArticle = document.createElement('article');
    newArticle.id = objPost._id;
    let startDate=Date.now();
    let oldDate=Date.parse(objPost.createdAt);
    let time = Math.floor(((startDate-oldDate)/60));
    newArticle.innerHTML = ' <form method="post" action=\'\' class="inline">' +
        '<button data-id="' + objPost._id + '" type="submit" name="submit_param" value="submit_value"' +
        'class="fa fa-sort-desc vote-button upvote-button"></button> </form>' +
        '<h2><a href=\' / posts /' + objPost._id + '\'>' + objPost.title + '</a></h2><p>' +
        '<span data-id="'+objPost._id+'" class=\'points\'>'+objPost.votes.length+'</span>' +
        '<span class=\'username\'>'+objPost.username+'</span>' +
        '<span class=\'timestamp\'> '+time+'</span>' +
        '<span class=\'comment-count\'>'+objPost.commentCount +'</span>' +
        '<a data-id="'+objPost._id+'" class="delete" href=\'/posts/'+objPost._id+'\'></a></p ></article > '
    newPostDiv.appendChild(newArticle);
})




