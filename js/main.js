(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // International Tour carousel
$(".InternationalTour-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: false, // Disabled navigation arrows
    responsiveClass: true,
    responsive: {
        0:{
            items:1
        },
        768:{
            items:2
        },
        992:{
            items:2
        },
        1200:{
            items:3
        }
    }
});

// Packages carousel
$(".packages-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: false,
    dots: false,
    loop: true,
    margin: 25,
    nav: false, // Disabled navigation arrows
    responsiveClass: true,
    responsive: {
        0:{
            items:1
        },
        768:{
            items:2
        },
        992:{
            items:2
        },
        1200:{
            items:3
        }
    }
});



    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('Fast');
    } else {
        $('.back-to-top').fadeOut('Fast');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    }); 

})(jQuery);

// Initialize modals and tooltips with animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover',
            animation: true,
            delay: { show: 100, hide: 100 }
        });
    });

    // Initialize all modals
    var modals = document.querySelectorAll('.package-modal');
    modals.forEach(function(modal) {
        var myModal = new bootstrap.Modal(modal, {
            keyboard: true
        });
        
        // Add animation class when modal opens
        modal.addEventListener('show.bs.modal', function() {
            setTimeout(function() {
                modal.classList.add('show');
            }, 10);
        });

        // Remove animation class when modal closes
        modal.addEventListener('hide.bs.modal', function() {
            modal.classList.remove('show');
        });
    });

    // Add hover effect to info buttons
    var infoButtons = document.querySelectorAll('.info-btn');
    infoButtons.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

  // Function to open the modal
  function openModal(imageSrc, title, description) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");

    modalContent.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.style.display = "block";
  }


  // Function to filter destinations based on the selected tab
  function filterDestinations(tab) {
    const destinationBoxes = document.querySelectorAll(".destination-box");

    destinationBoxes.forEach((box) => {
      if (tab === "all" || box.getAttribute("data-tab") === tab) {
        box.style.display = "block"; // Show the box
      } else {
        box.style.display = "none"; // Hide the box
      }
    });
  }

  // Add event listeners to all tab buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the "active" class from all buttons
      document.querySelectorAll(".tab-button").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add the "active" class to the clicked button
      button.classList.add("active");

      // Filter destinations based on the selected tab
      const tab = button.getAttribute("data-tab");
      filterDestinations(tab);
    });
  });

  // Show all destinations by default when the page loads
  window.addEventListener("load", () => {
    filterDestinations("all");
  });

  // Function to open the modal (for "View More" button)
  function openModal(imageSrc, title, description) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");

    modalContent.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  // Add event listeners to all "View More" buttons
  document.querySelectorAll(".view-more").forEach((button) => {
    button.addEventListener("click", () => {
      const box = button.closest(".destination-box");
      const imageSrc = box.querySelector("img").src;
      const title = box.querySelector("h3").textContent;
      const description = box.querySelector("p").textContent;
      openModal(imageSrc, title, description);
    });
  });

  // Close modal when clicking outside the image
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  });

// Destinations Tab
    document.addEventListener("DOMContentLoaded", function () {
        const tabs = document.querySelectorAll(".tab-link");
        const destinations = document.querySelectorAll(".destination-box");

        tabs.forEach(tab => {
            tab.addEventListener("click", function () {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove("active"));
                this.classList.add("active");

                // Get the selected category
                const selectedTab = this.getAttribute("data-tab");

                // Show/Hide destinations based on the tab
                destinations.forEach(destination => {
                    if (selectedTab === "all" || destination.getAttribute("data-tab") === selectedTab) {
                        destination.style.display = "block"; // Show matching destinations
                    } else {
                        destination.style.display = "none"; // Hide others
                    }
                });
            });
        });
    });

    // Activity Pages
    // Add animations or interactivity here
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".activity-card");
  
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
      });
    });
  });


  //Rafting

  // Get modal and form elements
const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const distanceInput = document.getElementById('distance');
const closeBtn = document.querySelector('.close');

// Function to open booking form
function openBookingForm(raftingType) {
    modal.classList.add('show');
    distanceInput.value = raftingType;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

function closeBookingForm() {
    modal.classList.remove('show');
    bookingForm.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeBookingForm();
    }
}

// Form submission handler
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = document.querySelector('.submit-button');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch('https://formsubmit.co/sales.yatrago@gmail.com', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.ok ? response.text() : Promise.reject('Failed to send'))
    .then(() => {
        alert('Booking request sent successfully! We will contact you shortly.');
        closeBookingForm();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending booking request. Please try again.');
    })
    .finally(() => {
        submitButton.textContent = 'Confirm Booking';
        submitButton.disabled = false;
    });
});



// camping

document.addEventListener("DOMContentLoaded", function() {
    const bookingForm = document.querySelector("form");
    
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const people = document.getElementById("people").value;
        const date = document.getElementById("date").value;
        
        // Perform client-side validation
        if (!name || !email || !phone || !people || !date) {
            alert("Please fill out all required fields.");
            return;
        }
        
        // Create a FormData object and append form values
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("people", people);
        formData.append("date", date);
        
        // Send form data to the server using Fetch API
        fetch("https://formsubmit.co/sales.yatrago@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Booking request submitted successfully.");
                bookingForm.reset(); // Reset the form
            } else {
                alert("There was an error submitting your booking request. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again later.");
        });
    });
});








