$(window).on("load",function(){
    "use strict";
    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');

    /*=========================================================================
        Custom Scrollbar
    =========================================================================*/
    $(".header-inner").mCustomScrollbar();

    /*=========================================================================
     Isotope
     =========================================================================*/
    $('.portfolio-filter').on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded( function() {
      $('.portfolio-wrapper').isotope({
          // options
          itemSelector: '[class*="col-"]',
          percentPosition: true,
          masonry: {
              // use element for option
              columnWidth: '[class*="col-"]'
          }
      });
    });

    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
        itemSelector: '.grid-item',
        nextSelector: '.portfolio-pagination li a',
        navSelector: '.portfolio-pagination',
        extraScrollPx: 0,
        bufferPx: 0,
        maxPage: 6,
        loading: {
            finishedMsg: "No more works",
            msgText: '',
            speed: 'slow',
            selector: '.load-more',
        },
    },
    // trigger Masonry as a callback
    function( newElements ) {

      var $newElems = $( newElements );
      $newElems.imagesLoaded(function(){  
        $newElems.animate({ opacity: 1 });
        $container.isotope( 'appended', $newElems );
      });

      // Check last page
      curPage++;
      if(curPage == pagesNum) {
        $( '.load-more' ).remove();
      }

    });

    $container.infinitescroll( 'unbind' );

    $( '.load-more .btn' ).on('click', function() {
      $container.infinitescroll( 'retrieve' );
      // display loading icon
      $( '.load-more .btn i' ).css('display', 'inline-block');
      $( '.load-more .btn i' ).addClass('fa-spin');

      $(document).ajaxStop(function () {
        setTimeout(function(){
               // hide loading icon
          $( '.load-more .btn i' ).hide();
        }, 1000);
      });
      return false;
    });

    /* ======= Mobile Filter ======= */

    // bind filter on select change
    $('.portfolio-filter-mobile').on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
});

/*=========================================================================
            Carousels
=========================================================================*/
$(document).on('ready', function() {
    "use strict";

    $('.testimonials-wrapper').slick({
      dots: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });

    $('.clients-wrapper').slick({
      dots: false,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
            arrows: false,
          }
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
          }
        }
      ]
    });

});

$(function(){
    "use strict";

    $('.menu-icon').on( 'click', function() {
        $('header.left').toggleClass('open');
        $('.mobile-header, main.content').toggleClass('push');
    });

    $('main.content, header.left button.close').on( 'click', function() {
        $('header.left').removeClass('open');
        $('.mobile-header, main.content').removeClass('push');
    });

    /*=========================================================================
     Counterup JS for facts
     =========================================================================*/
    $('.count').counterUp({
      delay: 10,
      time: 2000
    });

    /*=========================================================================
     Progress bar animation with Waypoint JS
     =========================================================================*/
    if ($('.skill-item').length > 0) { 
      var waypoint = new Waypoint({
        element: document.getElementsByClassName('skill-item'),
        handler: function(direction) {
          
          $('.progress-bar').each(function() {
            var bar_value = $(this).attr('aria-valuenow') + '%';                
            $(this).animate({ width: bar_value }, { easing: 'linear' });
          });

          this.destroy()
        },
        offset: '50%'
      });
    }

    /*=========================================================================
     One Page Scroll with jQuery
     =========================================================================*/
    $('.vertical-menu li a[href^="#"]:not([href="#"])').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top-50
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });

    /*=========================================================================
     Add (nav-link) class to main menu.
     =========================================================================*/
    $('.vertical-menu li a').addClass('nav-link');

    /*=========================================================================
     Bootstrap Scrollspy
     =========================================================================*/
    $("body").scrollspy({ target: ".scrollspy", offset: 50});

    /*=========================================================================
     Background Image with Data Attribute
     =========================================================================*/
    var bg_img = document.getElementsByClassName('background');

    for (var i = 0; i < bg_img.length; i++) {
      var src = bg_img[i].getAttribute('data-image-src');
      bg_img[i].style.backgroundImage="url('" + src + "')";
    }

    /*=========================================================================
     Spacer with Data Attribute
     =========================================================================*/
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

    /*=========================================================================
            Scroll to Top
    =========================================================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 250) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').on('click', function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 400);
    });

});

document.addEventListener('DOMContentLoaded', function() {
    // Language selector element
    var languageSelect = document.getElementById('language-select');

    // Language translation data
    var translations = {
        en: {
            my_job:"Full Stack Developer",
            about_me:"Hi, I am currently a graduate with a Master's degree in Computer Systems Engineering from the Polydisciplinary Faculty at Sultan Moulay Slimane University of Beni Mellal. I am seeking an outstanding internship or freelance opportunity to enhance my skills and take on exciting new challenges.",
            home:"Home",
            me:"I'm EL MALLOUKY Hassan",
            title:"EL MALLOUKY Hassan's Portfolio",
            resume:"View My Portfolio",
            hireme:"Hire Me",
            //====================== navbar section ======================
            home_icon:"<i class=\"icon-home\"></i>Home",
            about_icon:"<i class=\"icon-user\"></i>About",
            skills_icon:"<i class=\"icon-bulb\"></i>My Skills",
            services_icon:"<i class=\"icon-settings\"></i>My Services",
            education_icon:"<i class=\"icon-graduation\"></i>Education",
            projects_icon:"<i class=\"icon-grid\"></i>Projects",
            contact_icon:"<i class=\"icon-phone\"></i>Contact",



            //====================== about section ========================
            about_section:"About Me",
            about_hello:"Hi",
            about_message:"I am Hassan and I am currently a graduate with a Master's degree in Computer Systems Engineering from the Polydisciplinary Faculty at Sultan Moulay Slimane University of Beni Mellal. I am seeking an outstanding internship or freelance opportunity to enhance my skills and take on exciting new challenges.",
            about_name:"Full Name : <span class=\"text-dark\">Hassan EL MALLOUKY</span>",
            about_birth:"Birthday : <span class=\"text-dark\">02/10/1999</span>",
            about_location:" Location : <span class=\"text-dark\">Khenifra, Morocco</span>",
            //====================== skills section ========================
            skills_section: "My Skills",
            skills_intro: "In this section , I will showcase a diverse set of technical proficiencies that empower me to bring innovative ideas to life. With a foundation rooted in a Master's degree in Computer Systems Engineering, I have honed my abilities across several key areas. My expertise encompasses:",
            skills_spring: "Spring is a powerful and widely used framework for building Java-based applications. Spring Boot simplifies the development of Spring applications by providing production-ready defaults and boilerplate code.",
            skills_angular: "Angular is a popular framework for building dynamic web applications. It provides a structured approach to web development, including features like two-way data binding and dependency injection.",
            skills_flutter: "Flutter is a UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. It enables fast and expressive UI design and development.",
            skills_postgre: "PostgreSQL is a powerful open-source relational database management system known for its extensibility and advanced features. It is widely used for data storage, retrieval, and management in various applications.",
            skills_mongodb: "MongoDB is a popular NoSQL database that provides a flexible and scalable way to store and manage data. It is widely used in modern applications for its document-based model and ease of scalability.",
            //====================== services section ========================
            services_section:"My Services",
            services_backend:"Back End Development",
            services_frontend:"Front End Development",
            services_mobile:"Mobile Development",
            services_design:"Design",
            //====================== education section ========================
            education_section:"Education",
            education_master:"Master's Degree In Computer Systems Engineering",
            education_loc1:"At The Polydisciplinary Faculty - Sultan Moulay Slimane University of Beni Mellal, Morocco.",
            education_license:"Bachelor's Degree In Computer Sciences And Mathematics.",
            education_loc2:"At The Polydisciplinary Faculty - Sultan Moulay Slimane University of Beni Mellal, Morocco.",
            education_bac:"High School's Degree In Physical Sciences.",
            education_loc3:"At The High School LAHSAN EL YOUSSI of Khenifra, Morocco.",
            //====================== projects section ======================
            projects_section:"My Projects",
            projects_project1_title:"E-commerce App",
            projects_project1_body:"An online e-commerce website for selling a variety of products using Spring Boot with MicroService Architecture.",
            projects_project2_title:"School Management App",
            projects_project2_body:"An application to manage various school-related tasks and information.",
            projects_project3_title:"HR Management App",
            projects_project3_body:"An application to manage Humain resource built using Spring for Back End and Angular for Front End .",
            projects_project4_title:"Khadma App",
            projects_project4_body:"An application to find jobs in Morocco built using Flutter framework.",
            projects_project5_title:"FP BM App",
            projects_project5_body:"A mobile application of our faculty using mobile native development using java & Android Studio.",
            //====================== contact section ======================
            contact_section:"Get in touch",
            contact_phone:"Phone",
            contact_email:"Email address",
            contact_location:"Location",



        },
        fr: {
            my_job: "Développeur Full Stack",
            about_me:"Bonjour ! Je suis actuellement diplômé d'un Master en Ingénierie des Systèmes Informatiques de la Faculté Polydisciplinaire de l'Université Sultan Moulay Slimane de Beni Mellal. Je suis à la recherche d'un stage exceptionnel ou d'une opportunité en freelance pour améliorer mes compétences et relever de nouveaux défis passionnants.",
            home:"Accueil",
            me:"Je Suis EL MALLOUKY Hassan",
            title:"Portfolio d'EL MALLOUKY Hassan",
            resume:"Voir Mon Portfolio",
            hireme:"Embauchez-moi",
            //====================== navbar section ======================
            home_icon:"<i class=\"icon-home\"></i>Accueil",
            about_icon:"<i class=\"icon-user\"></i>À Propos de Moi",
            skills_icon:"<i class=\"icon-bulb\"></i>Mes Compétences",
            services_icon:"<i class=\"icon-settings\"></i>Mes Services",
            education_icon:"<i class=\"icon-graduation\"></i>Éducation",
            projects_icon:"<i class=\"icon-grid\"></i>Mes Projets",
            contact_icon:"<i class=\"icon-phone\"></i>Contact",
            //====================== about section ========================
            about_section: "À Propos de Moi",
            about_hello: "Bonjour",
            about_message: "Je m'appelle Hassan et Je suis actuellement lauréat du Master en Ingénierie des systèmes Informatiques (ISI) de la Faculté Polydisciplinaire de l'Université Sultan Moulay Slimane de Beni Mellal et je suis à la recherche d’un stage pour approfondir mes compétences et relever de nouveaux défis passionnants.",
            about_name: "Nom Complet : <span class=\"text-dark\">Hassan EL MALLOUKY</span>",
            about_birth: "Date de Naissance : <span class=\"text-dark\">02/10/1999</span>",
            about_location: "Localisation : <span class=\"text-dark\">Khenifra, Maroc</span>",
            //====================== skills section ========================
            skills_section: "Mes Compétences",
            skills_intro: "Dans cette section, je vais vous présenter un ensemble diversifié de compétences techniques qui me permettent de concrétiser des idées innovantes. Avec une base solide en Ingénierie des Systèmes Informatiques, j'ai affiné mes compétences dans plusieurs domaines clés. Mon expertise englobe :",
            skills_spring: "Spring est un puissant framework largement utilisé pour construire des applications Java. Spring Boot simplifie le développement d'applications Spring en fournissant des valeurs par défaut prêtes pour la production et du code boilerplate.",
            skills_angular: "Angular est un framework populaire pour construire des applications web dynamiques. Il propose une approche structurée du développement web, incluant des fonctionnalités telles que la liaison de données bidirectionnelle et l'injection de dépendances.",
            skills_flutter: "Flutter est une trousse d'outils d'interface utilisateur pour construire des applications compilées nativement pour mobile, web et bureau à partir d'un code source unique. Il permet une conception et un développement rapides et expressifs de l'interface utilisateur.",
            skills_mongodb: "MongoDB est une base de données NoSQL populaire qui offre un moyen flexible et scalable de stocker et gérer des données. Il est largement utilisé dans les applications modernes pour son modèle basé sur les documents et sa facilité de mise à l'échelle.",
            skills_postgre: "PostgreSQL est un puissant système de gestion de base de données relationnelles open-source, reconnu pour sa capacité d'extension et ses fonctionnalités avancées. Il est largement utilisé pour le stockage, la récupération et la gestion de données dans diverses applications.",
            //====================== services section ========================
            services_section: "Mes Services",
            services_backend: "Développement Back End",
            services_frontend: "Développement Front End",
            services_mobile: "Développement Mobile",
            services_design: "Conception et Modélisation",
            //====================== education section ========================
            education_section: "Éducation",
            education_master: "Master en Ingénierie des Systèmes Informatiques",
            education_loc1: "À la Faculté Polydisciplinaire - Université Sultan Moulay Slimane de Beni Mellal, Maroc.",
            education_license: "Licence en Informatique et Mathématiques.",
            education_loc2: "À la Faculté Polydisciplinaire - Université Sultan Moulay Slimane de Beni Mellal, Maroc.",
            education_bac: "Baccalauréat en Sciences Physiques.",
            education_loc3: "Au Lycée LAHSAN EL YOUSSI de Khenifra, Maroc.",
            //====================== projects section ======================
            projects_section: "Mes Projets",
            projects_project1_title: "Application E-commerce",
            projects_project1_body: "Un site e-commerce en ligne pour la vente de divers produits en utilisant Spring Boot avec une architecture MicroService.",
            projects_project2_title: "Application de Gestion Scolaire",
            projects_project2_body: "Une application pour gérer diverses tâches et informations liées à l'école.",
            projects_project3_title: "Application de Gestion RH",
            projects_project3_body: "Une application pour gérer les ressources humaines construite en utilisant Spring pour le Back End et Angular pour le Front End.",
            projects_project4_title: "Application Khadma",
            projects_project4_body: "Une application pour trouver des emplois au Maroc construite avec le framework Flutter.",
            projects_project5_title: "Application FP BM",
            projects_project5_body: "Une application mobile de notre faculté développée en utilisant le développement natif pour mobile avec Java et Android Studio.",
            //====================== contact section ======================
            contact_section: "Prenez Contact",
            contact_phone: "Téléphone",
            contact_email: "Adresse Email",
            contact_location: "Localisation"
        }
    };

    // Function to update content with selected language
    function updateContent(selectedLang) {
        var translation = translations[selectedLang];
        /*
        my_job:"Full Stack Developer",
            about_me:"Hi, I am currently a graduate with a Master's degree in Computer Systems Engineering from the Polydisciplinary Faculty at Sultan Moulay Slimane University of Beni Mellal. I am seeking an outstanding internship or freelance opportunity to enhance my skills and take on exciting new challenges.",
            home:"Home",
            me:"I'm EL MALLOUKY Hassan",
            title:"EL MALLOUKY Hassan's Portfolio",
            resume:"View My resume",
            hireme:"Hire Me",
         */

        document.getElementById('my_job').textContent = translation.my_job;
        document.getElementById('about_me').textContent = translation.about_me;
        document.getElementById('me').textContent = translation.me;
        document.getElementById("title").textContent = translation.title;
        document.getElementById('resume').textContent = translation.resume;
        document.getElementById('hireme').textContent = translation.hireme;
        document.getElementById('home_icon').innerHTML = translation.home_icon;
        document.getElementById('about_icon').innerHTML = translation.about_icon;
        document.getElementById('skills_icon').innerHTML = translation.skills_icon;
        document.getElementById('education_icon').innerHTML = translation.education_icon;
        document.getElementById('services_icon').innerHTML = translation.services_icon;
        document.getElementById('projects_icon').innerHTML = translation.projects_icon;
        document.getElementById('contact_icon').innerHTML = translation.contact_icon;
        document.getElementById('about_section').textContent = translation.about_section;
        document.getElementById('about_hello').textContent = translation.about_hello;
        document.getElementById('about_message').textContent = translation.about_message;
        document.getElementById('about_name').innerHTML = translation.about_name;
        document.getElementById('about_birth').innerHTML = translation.about_birth;
        document.getElementById('about_location').innerHTML = translation.about_location;
        document.getElementById('skills_section').textContent = translation.skills_section;
        document.getElementById('skills_intro').textContent = translation.skills_intro;
        document.getElementById('skills_spring').textContent = translation.skills_spring;
        document.getElementById('skills_angular').textContent = translation.skills_angular;
        document.getElementById('skills_flutter').textContent = translation.skills_flutter;
        document.getElementById('skills_postgre').textContent = translation.skills_postgre;
        document.getElementById('skills_mongodb').textContent = translation.skills_mongodb;
        document.getElementById('services_section').textContent = translation.services_section;
        document.getElementById('services_backend').textContent = translation.services_backend;
        document.getElementById('services_frontend').textContent = translation.services_frontend;
        document.getElementById('services_mobile').textContent = translation.services_mobile;
        document.getElementById('services_design').textContent = translation.services_design;
        document.getElementById('education_section').textContent = translation.education_section;
        document.getElementById('education_master').textContent = translation.education_master;
        document.getElementById('education_loc1').textContent = translation.education_loc1;
        document.getElementById('education_license').textContent = translation.education_license;
        document.getElementById('education_loc2').textContent = translation.education_loc2;
        document.getElementById('education_bac').textContent = translation.education_bac;
        document.getElementById('education_loc3').textContent = translation.education_loc3;
        // Update "Projects" section
        document.getElementById('projects_section').textContent = translation.projects_section;
        document.getElementById('projects_project1_title').textContent = translation.projects_project1_title;
        document.getElementById('projects_project1_body').textContent = translation.projects_project1_body;
        document.getElementById('projects_project2_title').textContent = translation.projects_project2_title;
        document.getElementById('projects_project2_body').textContent = translation.projects_project2_body;
        document.getElementById('projects_project3_title').textContent = translation.projects_project3_title;
        document.getElementById('projects_project3_body').textContent = translation.projects_project3_body;
        document.getElementById('projects_project4_title').textContent = translation.projects_project4_title;
        document.getElementById('projects_project4_body').textContent = translation.projects_project4_body;
        document.getElementById('projects_project5_title').textContent = translation.projects_project5_title;
        document.getElementById('projects_project5_body').textContent = translation.projects_project5_body;

        // Update "Contact" section
        document.getElementById('contact_section').textContent = translation.contact_section;
        document.getElementById('contact_phone').textContent = translation.contact_phone;
        document.getElementById('contact_email').textContent = translation.contact_email;
        document.getElementById('contact_location').textContent = translation.contact_location;


    }

    // Initial content update based on default language
    updateContent(languageSelect.value);

    // Event listener for language select change
    languageSelect.addEventListener('change', function() {
        var selectedLang = this.value;
        updateContent(selectedLang);
    });
});
// contact function for sending email
function sendEmail() {
    var name = document.getElementById("InputName").value;
    var email = document.getElementById("InputEmail").value;
    var message = document.getElementById("InputMessage").value;


    // code fragment
    var data = {
        service_id: 'service_yme2rko',
        template_id: 'template_rf1hu5m',
        user_id: '1iVjjjb3nWYA8STB5',
        template_params: {
            'from_name': name,
            'message': message,
            'from_email':email

        }
    };

    const apiUrl = 'https://api.emailjs.com/api/v1.0/email/send';

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            //alert('Your mail is sent!');
            displaySuccessMessage("Your mail is sent!");
        })
        .catch(error => {
            //alert('Your mail is sent!');
            displaySuccessMessage("Your mail is sent!");
        });

}

function displaySuccessMessage(message) {
    const successMessageDiv = document.getElementById("success-message");
    successMessageDiv.textContent = message;
    successMessageDiv.style.display = "block"; // Show the success message
    setTimeout(() => {
        successMessageDiv.style.display = "none"; // Hide the success message after a delay
    }, 3000); // Display for 3 seconds, you can adjust the timing
}
// another soltion better not yet works

function contactSendEmail(){
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitButton = document.getElementById("submit-button");
    const successMessageDiv = document.getElementById("success-message");

    nameInput.addEventListener("input", validateFields);
    emailInput.addEventListener("input", validateFields);
    messageInput.addEventListener("input", validateFields);

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const nameValid = nameInput.validity.valid;
        const emailValid = emailInput.validity.valid;
        const messageValid = messageInput.validity.valid;

        if (!(nameValid && emailValid && messageValid)) {
            successMessageDiv.textContent = "Please fill in all fields correctly.";
            successMessageDiv.style.color = "red";
            return;
        }

        // Your email sending logic here
        var data = {
            service_id: 'service_yme2rko',
            template_id: 'template_rf1hu5m',
            user_id: '1iVjjjb3nWYA8STB5',
            template_params: {
                'from_name': nameInput,
                'message': messageInput,
                'from_email':emailInput

            }
        };

        const apiUrl = 'https://api.emailjs.com/api/v1.0/email/send';

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //alert('Your mail is sent!');
                successMessageDiv.textContent = "Your mail is sent!";
                successMessageDiv.style.color = "green";
            })
            .catch(error => {
                //alert('Your mail is sent!');
                successMessageDiv.textContent = "Your mail is sent!";
                successMessageDiv.style.color = "green";
            });
        // Show success message

        resetForm();
    });

    function validateFields() {
        const nameValid = nameInput.validity.valid;
        const emailValid = emailInput.validity.valid;
        const messageValid = messageInput.validity.valid;

        submitButton.disabled = !(nameValid && emailValid && messageValid);
    }

    function resetForm() {
        document.getElementById("contact-form").reset();
        successMessageDiv.textContent = "";
    }
}

