const supabaseUrl = "https://ecjodjkhqryqldswsxym.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjam9kamtocXJ5cWxkc3dzeHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDM0MTYsImV4cCI6MjA5ODkxOTQxNn0.pc9_0Hm3lW8MTngDqvkmLyPgFCxxel2v0IgKyQm3xjE";

const supabaseClient = window.supabase.createClient(    supabaseUrl,
    supabaseKey
);
const ADMIN_EMAIL = "admin@fafnir.cult"; 
// PASSWORD POPUP
// ===========================

const popup = document.getElementById("passwordPopup");

document.getElementById("editButton").onclick = () => {
    popup.style.display = "flex";
};

document.getElementById("closePopup").onclick = () => {
    popup.style.display = "none";
};

document.getElementById("unlockButton").onclick = async () => {
    const passwordInput = document.getElementById("password").value;
    const errorDisplay = document.getElementById("wrongPassword");
    
    errorDisplay.innerHTML = "Verifying...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: passwordInput
    });

    if (error) {
        errorDisplay.innerHTML = "Incorrect Password";
    } else {
        errorDisplay.innerHTML = "";
        popup.style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
    }
};
// ===========================
// LOAD MEMBERS FROM SUPABASE
// ===========================

async function loadMembers(){

    const { data, error } = await supabaseClient
        .from("members")
        .select("*");

    if(error){

        console.error(error);
        return;

    }

    data.forEach(addMemberCard);

}

loadMembers();

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

document.getElementById("addButton").onclick = async function(){

    const member = {

        name: document.getElementById("name").value,

        gender: document.getElementById("gender").value,

        fetish: document.getElementById("fetish").value,

        status: document.getElementById("status").value,

        category: document.getElementById("category").value,

        avatar: document.getElementById("avatar").value

    };

    const { error } = await supabaseClient

        .from("members")

        .insert([member]);

    if(error){

        console.error(error);

        alert("Failed to add member.");

        return;

    }

    addMemberCard(member);

    alert("Member Added!");

};