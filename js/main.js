const elList = document.querySelector(".users-list");
const elTemplate =document.querySelector(".box").content;
const elTemplatePost =document.querySelector(".box-post").content;
const elTemplateCommit =document.querySelector(".box-commit").content;
const elItem = document.querySelector(".box__item");
const elListPost= document.querySelector(".posts-list");
const elListCommit= document.querySelector(".commits-list");
const elBtn = document.querySelector(".btn-changer");
const elHeader = document.querySelector(".header")
const elBody = document.querySelector ("body")
const elCommentsBox = document.querySelector(".box-commit__item")
const elCommentsTel = document.querySelector(".box__item__tel")
const elCommentsGmail = document.querySelector(".box__item__gmail")
const elCommentsLocatsion = document.querySelector(".box__item__locatsion")
const elCommentsSite = document.querySelector(".box__item__website")

elBtn.addEventListener("click" , function (){
    elBody.classList.toggle("bg-dark")
    elHeader.classList.toggle("bg-dark")
    elList.classList.toggle("bg-dark")
    elListPost.classList.toggle("bg-dark")
    elListCommit.classList.toggle("bg-dark")
    elBtn.classList.toggle("bg-dark")
    elItem.classList.toggle("bg-dark")
    elCommentsBox.classList.toggle("bg-dark")
    elCommentsSite.classList.toggle("bg-dark__site")
    elCommentsLocatsion.classList.toggle("bg-dark__locatsion")
    elCommentsGmail.classList.toggle("bg-dark__gmail")
    elCommentsTel.classList.toggle("bg-dark__tel")
})

const mailto = "mailto:"
const locatsia = "https://www.google.com/maps/place/"

function renderUsers(arr,element){
    element.innerHTML = ""

    const documentfragment = document.createDocumentFragment();
    arr.forEach(item => {
        
        const templateClone = elTemplate.cloneNode(true)
        templateClone.querySelector(".box__item").dataset.userId = item.id;
        templateClone.querySelector(".box__item__id").textContent = item.id;
        templateClone.querySelector(".box__item__name").textContent = item.name;
        templateClone.querySelector(".box__item__username").textContent = item.username;
        templateClone.querySelector(".box__item__gmail").href  = `${mailto} ` + item.email;
        templateClone.querySelector(".box__item__gmail").textContent  =  item.email;
        templateClone.querySelector(".box__item__address__street").textContent = item.address.street;
        templateClone.querySelector(".box__item__address__suite").textContent = item.address.suite;
        templateClone.querySelector(".box__item__address__city").textContent = item.address.city;
        templateClone.querySelector(".box__item__address__zipcode").textContent = item.address.zipcode;
        templateClone.querySelector(".box__item__locatsion").href = `${locatsia}`+ item.address.geo.lat + "," + item.address.geo.lng;
        templateClone.querySelector(".box__item__tel").href = item.phone;
        templateClone.querySelector(".box__item__tel").textContent = item.phone;
        
        templateClone.querySelector(".box__item__website").href = item.website;
        templateClone.querySelector(".box__item__company__name").textContent = item.company.name;
        templateClone.querySelector(".box__item__company__catch").textContent = item.company.catchPhrase;
        templateClone.querySelector(".box__item__company__bs").textContent = item.company.bs;
        documentfragment.appendChild(templateClone);
        
        
        
    })
    element.appendChild(documentfragment);
}

async function getUser(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    
    renderUsers(data , elList )
}
getUser();

function renderPosts(arr,element){
    const documentFragmentPost = document.createDocumentFragment();
    arr.forEach(item => {
        element.innerHTML = ""
        
        const templateClonedpost = elTemplatePost.cloneNode(true)
        templateClonedpost.querySelector(".box-post__item").dataset.postId = item.id;
        templateClonedpost.querySelector(".box-post__item__title").textContent = item.title;
        templateClonedpost.querySelector(".box-post__item__text").textContent = item.body;
        
        documentFragmentPost.appendChild(templateClonedpost);
        
        
        
    })
    element.appendChild(documentFragmentPost);
    
}

function renderCommit(arr,element){
        const documentFragmentCommit = document.createDocumentFragment();
        arr.forEach(itemCommit => {
            element.innerHTML = ""
            
            const templateClonedCommit = elTemplateCommit.cloneNode(true)
            templateClonedCommit.querySelector(".box-commit__item").dataset.commitId = itemCommit.postId;
            templateClonedCommit.querySelector(".box-commit__item__herro").textContent = itemCommit.name;
            templateClonedCommit.querySelector(".box-commit__item__poragraf").textContent = itemCommit.body;
            templateClonedCommit.querySelector(".box-commit__item__gmail").textContent =  itemCommit.email;
            templateClonedCommit.querySelector(".box-commit__item__gmail").href = mailto + itemCommit.email;
            
            documentFragmentCommit.appendChild(templateClonedCommit);
        })
        element.appendChild(documentFragmentCommit);
        
}

elList.addEventListener("click", evt => {
    if(evt.target.matches(".box__item")){
        const postId = evt.target.dataset.userId

        async function getPost(){
            const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${postId}`);
            const dataPost = await resPost.json()
    
            renderPosts(dataPost , elListPost)
            renderUsers(data , elList )
    }
    getPost()
    }
})

elListPost.addEventListener("click", evt => {
    if(evt.target.matches(".box-post__item")){
        const commentId = evt.target.dataset.postId

        async function getCommit(){
            const resCommit = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${commentId}`);
            const dataCommit = await resCommit.json()
    
            renderCommit(dataCommit , elListCommit )
            renderUsers(data , elList )
    }
    getCommit()
    }
})

