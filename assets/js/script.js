// getting elements
form_element = document.getElementById('u_form');
user_element = document.getElementById('username');
result_element = document.getElementById('result');
result_element.style.display = 'none';
searchbutton_element = document.querySelector('#profile_btn')
msg_element = document.getElementById('msg');
msg_element.style.display = 'none'

// class for profile
class UserProfile{
    constructor(username){
        this.username = username;
    }
    fetch_data(){
        fetch(`https://api.github.com/users/${this.username}`)
        .then(function(res){
            return res.json();
        })
        .then(function (data){
            let ui = new ResultUi();
            if (data.login){
                ui.show_result(data);
                ui.box_clear();
            }
            else{
                msg_element.innerText = data.message;
                msg_element.style.display = 'block';
                ui.box_clear();
                result_element.style.display = 'none';
                setTimeout(() => {
                    msg_element.style.display = 'none';
                }, 2000);
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }
}

// Class for result
class ResultUi{
    constructor(){}
    show_result(data){
        console.log(data)
        let img = document.querySelector('img');
        let p_url = document.getElementById('profile_url');
        let btn = document.querySelectorAll('.btn')
        let info = document.querySelectorAll('.info')

        btn[0].innerText = `Public Repos: ${data.public_repos}`;
        btn[1].innerText = `Public Gits: ${data.public_gists}`
        btn[2].innerText = `Followers: ${data.followers}`
        btn[3].innerText = `Following: ${data.following}`

        info[0].innerText = `Compay: ${data.company}`
        info[1].innerHTML = `<a href="${data.blog}">Website/Bloog: ${data.blog}</a>`
        info[2].innerText = `Location: ${data.location}`
        info[3].innerText = `Member Since: ${data.created_at}`

        img.src = `${data.avatar_url}`;
        p_url.href = `https://github.com/${data.login}`

        result_element.style.display = 'block';
    }
    box_clear(){
        user_element.value = '';
    }

}

// event listener for get the profile
form_element.addEventListener('submit', get_data);
function get_data(e){
    if (user_element.value.length < 1){
        user_element.style.borderColor = 'red';
    }
    else{
        user_element.style.removeProperty('border');
        get_profile = new UserProfile(user_element.value)
        get_profile.fetch_data();
    }
    e.preventDefault();
}