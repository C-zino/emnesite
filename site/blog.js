// BACK TO TOP //

window.onscroll = function() {  //Aktivere funktionen når der scrolles på siden
    const button = document.getElementById("backToTop");
   
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) { 
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}; 

//tjekker om der er scrollet mere end 200px, hvis ja synliggøres knappen
//Herefter er der en click funktion der køre til toppen, hvis knappen trykkes

document.getElementById("backToTop").onclick = function() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
};

// BACK TO TOP //


// COMMENT SECTION //

const commentForms = document.querySelectorAll('.comment-form'); 
const commentLists = document.querySelectorAll('[id^=comments-list]'); 

function loadComments(listId) {
    const savedComments = localStorage.getItem(`comments-${listId}`);
    return savedComments ? JSON.parse(savedComments) : [];
}

function saveComments(listId, comments) {
    localStorage.setItem(`comments-${listId}`, JSON.stringify(comments));
}

function renderComments(listId, commentList, comments) {
    commentList.innerHTML = '';
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p>${comment}</p>
            <button class="delete-btn" data-index="${index}">Slet</button>
        `;
        commentList.appendChild(commentElement);
    });
}

commentForms.forEach((commentForm, formIndex) => {
    const commentList = commentLists[formIndex];
    const listId = commentList.id;

    let comments = loadComments(listId);

   
    renderComments(listId, commentList, comments);

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const commentInput = commentForm.querySelector('textarea');
        const newComment = commentInput.value.trim();
        if (newComment) {
            comments.push(newComment);
            saveComments(listId, comments);
            commentInput.value = '';
            renderComments(listId, commentList, comments);
        }
    });

    commentList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            comments.splice(index, 1);
            saveComments(listId, comments);
            renderComments(listId, commentList, comments);
        }
    });
});

// COMMENT SECTION //


// IMAGES //

document.addEventListener('DOMContentLoaded', function() {
    const imageRow = document.querySelector('.image-row');
    const images = document.querySelectorAll('.image-row img');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const imageWidth = images[0].offsetWidth + 20; // Billedets bredde inkl. margin
    let currentIndex = 0;
    let isTransitioning = false;

    // Funktion til at klone de første billeder i rækken for en uendelig effekt
    function cloneImages() {
        for (let i = 0; i < images.length; i++) {
            const clone = images[i].cloneNode(true);
            imageRow.appendChild(clone); // Klon og tilføj i slutningen af rækken
        }
    }

    // Kør funktionen for at tilføje klonede billeder
    cloneImages();

    // Opdater bredden af imageRow for at rumme klonede billeder
    const totalImages = imageRow.children.length;
    imageRow.style.width = `${totalImages * imageWidth}px`;

    // Opdaterer karusellens position
    function updateCarousel() {
        imageRow.style.transition = 'transform 0.4s ease-in-out';
        imageRow.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    }

    // Bevæger karusellen i retning af næste eller forrige billede
    function moveCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex += direction;

        updateCarousel();

        imageRow.addEventListener('transitionend', () => {
            isTransitioning = false;

            // Hvis vi går forbi det sidste billede, springer vi tilbage til starten uden en synlig overgang
            if (currentIndex === images.length) {
                currentIndex = 0;
                imageRow.style.transition = 'none'; // Deaktiver overgang
                imageRow.style.transform = `translateX(0px)`;
            } else if (currentIndex < 0) {
                currentIndex = images.length - 1;
                imageRow.style.transition = 'none';
                imageRow.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
            }
        });
    }

    prevButton.addEventListener('click', () => moveCarousel(-1));
    nextButton.addEventListener('click', () => moveCarousel(1));

    updateCarousel(); // Initialiser karusellen
});

// IMAGES //