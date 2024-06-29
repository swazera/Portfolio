$(document).ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.box-1').css('height', windowHeight);    
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
  windowHeight = $(window).innerHeight();
  $(window).scroll(function () {
    if ($(window).scrollTop() > windowHeight) {
      $('.navbar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < windowHeight) {
      $('.navbar').removeClass('navbar-fixed');
    }
  });
});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }
  });
});

const username = 'swazera';

function fetchRepos() {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("projects", JSON.stringify(data));
      renderRepos();
    })
    .catch((error) => console.error("Erro:", error));
}

function renderRepos() {
  let projects = localStorage.getItem('projects');
  projects = JSON.parse(projects);

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'card col-lg-3 col-md-4 col-sm-6 col-xs-12';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.textContent = project.name;
    cardBody.appendChild(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.className = 'card-description';
    cardDescription.textContent = project.description || 'No description available';
    cardBody.appendChild(cardDescription);

    const cardLink = document.createElement('a');
    cardLink.href = project.html_url;
    cardLink.target = '_blank';
    cardLink.textContent = 'View Project';
    cardBody.appendChild(cardLink);

    card.appendChild(cardBody);

    cardContainer.appendChild(card);
  });

  const cepCard = document.querySelector('.cep-card');
  if (cepCard) {
    cardContainer.appendChild(cepCard);
  }
}

if (!localStorage.getItem('projects')) {
  fetchRepos();
} else {
  renderRepos();
}
