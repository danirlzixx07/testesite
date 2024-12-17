// script.js

let currentUser = ""; // Para armazenar o nome do usuário logado
let profilePicURL = ""; // Para armazenar a foto de perfil do usuário
let likedPosts = {}; // Para armazenar quais posts foram curtidos por cada usuário

// Abrir e fechar o modal de login
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.querySelector(".close");

loginBtn.onclick = function() {
    loginModal.style.display = "block";
};

closeModal.onclick = function() {
    loginModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
};

// Navegar entre as abas
const noticiasLink = document.getElementById("noticiasLink");
const postagensLink = document.getElementById("postagensLink");
const fofocasLink = document.getElementById("fofocasLink");

const noticiasTab = document.getElementById("noticias");
const postagensTab = document.getElementById("postagens");
const fofocasTab = document.getElementById("fofocas");

noticiasLink.onclick = function() {
    noticiasTab.style.display = "block";
    postagensTab.style.display = "none";
    fofocasTab.style.display = "none";
};

postagensLink.onclick = function() {
    postagensTab.style.display = "block";
    noticiasTab.style.display = "none";
    fofocasTab.style.display = "none";
};

fofocasLink.onclick = function() {
    fofocasTab.style.display = "block";
    noticiasTab.style.display = "none";
    postagensTab.style.display = "none";
};

// Login
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const profilePicInput = document.getElementById("profilePic");

loginForm.onsubmit = function(event) {
    event.preventDefault();
    currentUser = usernameInput.value;
    profilePicURL = profilePicInput.files.length > 0 ? URL.createObjectURL(profilePicInput.files[0]) : "";
    alert("Bem-vindo, " + currentUser);
    loginModal.style.display = "none";
    updateLoginDisplay();
};

// Atualizar visualização do login
function updateLoginDisplay() {
    if (currentUser) {
        loginBtn.textContent = "Bem-vindo, " + currentUser;
        const profilePic = document.createElement("img");
        profilePic.src = profilePicURL || "default-profile.png";
        profilePic.classList.add("profile-pic");
        loginBtn.appendChild(profilePic);
    }
}

// Adicionar postagem
const postBtn = document.getElementById("postBtn");
const postContent = document.getElementById("postContent");
const fileInput = document.getElementById("fileInput");
const postList = document.getElementById("postList");

postBtn.onclick = function() {
    if (postContent.value.trim() !== "") {
        const newPost = document.createElement("li");

        // Exibe o nome do usuário e foto de perfil
        const userNameElement = document.createElement("div");
        userNameElement.classList.add("user-info");
        const userPic = document.createElement("img");
        userPic.src = profilePicURL || "default-profile.png";
        userPic.alt = "Foto de Perfil";
        userPic.classList.add("profile-pic");
        userNameElement.appendChild(userPic);
        const userName = document.createElement("p");
        userName.textContent = currentUser;
        userNameElement.appendChild(userName);
        newPost.appendChild(userNameElement);

        // Exibe o conteúdo da postagem
        const contentElement = document.createElement("div");
        contentElement.classList.add("post-content");
        contentElement.textContent = postContent.value;
        
        // Verificar se há foto ou vídeo
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileURL = URL.createObjectURL(file);
            if (file.type.startsWith("image")) {
                const imgElement = document.createElement("img");
                imgElement.src = fileURL;
                contentElement.appendChild(imgElement);
            } else if (file.type.startsWith("video")) {
                const videoElement = document.createElement("video");
                videoElement.src = fileURL;
                videoElement.controls = true;
                contentElement.appendChild(videoElement);
            }
        }

        newPost.appendChild(contentElement);

        // Adicionar botões de interação
        const actions = document.createElement("div");
        actions.classList.add("post-actions");
        actions.innerHTML = `
            <button class="icon like-btn" onclick="likePost(this)">
                <span class="heart">&#x2764;</span> Curtir <span class="like-count">0</span>
            </button>
            <button class="icon comment-btn" onclick="commentPost(this)">
                &#x1F4AC; Comentar <span class="comment-count">0</span>
            </button>
            <button class="icon share-btn" onclick="sharePost(this)">
                &#x1F4E4; Compartilhar
            </button>
        `;
        newPost.appendChild(actions);

        postList.appendChild(newPost);
        postContent.value = ""; // Limpar o campo de texto
        fileInput.value = "";   // Limpar o campo de upload
    }
};

// Funções de interação
function likePost(button) {
    const likeCount = button.querySelector(".like-count");
    const heart = button.querySelector(".heart");
    let count = parseInt(likeCount.textContent);
    if (heart.classList.contains("liked")) {
        count--;
        likeCount.textContent = count;
        heart.classList.remove("liked");
    } else {
        count++;
        likeCount.textContent = count;
        heart.classList.add("liked");
    }
}

function commentPost(button) {
    const commentText = prompt("Escreva seu comentário:");

    if (commentText) {
        const commentSection = button.closest("li").querySelector(".comment-section");
        if (!commentSection) {
            const newCommentSection = document.createElement("div");
            newCommentSection.classList.add("comment-section");
            button.closest("li").appendChild(newCommentSection);
        }
        
        // Criando o novo comentário com a foto e nome do usuário
        const newComment = document.createElement("div");
        newComment.classList.add("comment");

        const userCommentInfo = document.createElement("div");
        userCommentInfo.classList.add("user-comment-info");

        // Foto de perfil
        const userPic = document.createElement("img");
        userPic.src = profilePicURL || "default-profile.png";
        userPic.alt = "Foto de Perfil";
        userPic.classList.add("profile-pic");
        userCommentInfo.appendChild(userPic);

        // Nome do usuário
        const userName = document.createElement("p");
        userName.textContent = currentUser;
        userCommentInfo.appendChild(userName);

        // Comentário
        const commentContent = document.createElement("p");
        commentContent.textContent = commentText;
        
        newComment.appendChild(userCommentInfo);
        newComment.appendChild(commentContent);

        commentSection.appendChild(newComment);

        // Atualizar o contador de comentários
        const commentCount = button.querySelector(".comment-count");
        let count = parseInt(commentCount.textContent);
        count++;
        commentCount.textContent = count;
    }
}


function sharePost(button) {
    alert("Postagem compartilhada!");
}
