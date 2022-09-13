let image=document.querySelector('.profilePic');
let username=document.querySelector('.username');
let userId=document.querySelector('.userId');

let followerUl=document.querySelector('.follower');
let followingUL=document.querySelector('.following');

let input=document.querySelector('.input');

input.addEventListener('keydown',handleSearch);


function  handleSearch(event){
    if(event.keyCode===13 && input.value){
        fetch(`https://api.github.com/users/${input.value}`,displayInfo);
}
}

function fetch(url,successHandler){
    let user=input.value;
    let xhr=new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload=()=>{successHandler(JSON.parse(xhr.response));}
    xhr.onerror=()=>{console.log('Something went wrong!!');}
    xhr.send();
}

function displayInfo(userData){
    image.src=userData.avatar_url;
    username.innerText=userData.name;
    userId.innerText=`@${userData.login}`;
    fetch(`https://api.github.com/users/${input.value}/followers`,(userDet)=>{displayExtraInfo(userDet,followerUl)});
    fetch(`https://api.github.com/users/${input.value}/following`,(userDet)=>{displayExtraInfo(userDet,followingUL)});
}

function displayExtraInfo(userData,rootElement){
    rootElement.innerHTML="";
    let topFive=userData.slice(0,5);
    topFive.forEach(user => {
        let li=document.createElement('li');
        let img=document.createElement('img');
        img.src=user.avatar_url;
        img.alt=user.avatar_url;
        li.append(img);
        rootElement.append(li);
    });
    
}

