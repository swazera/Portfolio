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
      console.log($(window).scrollTop())
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

const username = "swazera";

function fetchRepos() {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((repo) => {
        console.log(repo.name);
      });
    })
    .catch((error) => console.error("Erro:", error));
}

fetchRepos();