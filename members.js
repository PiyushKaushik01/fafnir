// ===========================
// PASSWORD
// ===========================

const PASSWORD = "hailfafnir";

// ===========================
// PASSWORD POPUP
// ===========================

const popup = document.getElementById("passwordPopup");

document.getElementById("editButton").onclick = () => {
    popup.style.display = "flex";
};

document.getElementById("closePopup").onclick = () => {
    popup.style.display = "none";
};

document.getElementById("unlockButton").onclick = () => {

    if(document.getElementById("password").value === PASSWORD){

        popup.style.display = "none";

        document.getElementById("adminPanel").style.display = "block";

    }else{

        document.getElementById("wrongPassword").innerHTML = "Incorrect Password";

    }

};

// ===========================
// LOAD MEMBERS.JSON
// ===========================

fetch("members.json")

.then(response => response.json())

.then(data => {

    data.forEach(addMemberCard);

})

.catch(error=>{

    console.error("Couldn't load members.json",error);

});

// ===========================
// CREATE MEMBER CARD
// ===========================

function addMemberCard(member){

    const card=document.createElement("div");

    card.className="member";

    let avatarHTML="";

    if(member.avatar && member.avatar.trim()!=""){

        avatarHTML=`<img src="${member.avatar}" alt="${member.name}">`;

    }

    card.innerHTML=`

        ${avatarHTML}

        <h3>${member.name}</h3>

        <p><b>Gender:</b> ${member.gender}</p>

        <p><b>Fetish:</b> ${member.fetish}</p>

        <p><b>Status:</b> ${member.status}</p>

    `;

    const container=document.getElementById(member.category);

    if(container){

        container.appendChild(card);

    }

}

// ===========================
// ADD MEMBER BUTTON
// ===========================

document.getElementById("addButton").onclick=function(){

    const member={

        name:document.getElementById("name").value,

        gender:document.getElementById("gender").value,

        fetish:document.getElementById("fetish").value,

        status:document.getElementById("status").value,

        category:document.getElementById("category").value,

        avatar:document.getElementById("avatar").value

    };

    addMemberCard(member);

    alert(
`Copy this into members.json:

{
    "name":"${member.name}",
    "gender":"${member.gender}",
    "fetish":"${member.fetish}",
    "status":"${member.status}",
    "category":"${member.category}",
    "avatar":"${member.avatar}"
},`
    );

};