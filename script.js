
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {

    const answer = question.nextElementSibling;

    answer.classList.toggle('open');
  });
});
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}
let slideIndex = 0;

showSlides();

function showSlides() {
  const slides = document.querySelectorAll(".slide");

  // Hide all slides
  slides.forEach(slide => {
    slide.style.display = "none";
  });

  // Next slide
  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Show current slide
  slides[slideIndex - 1].style.display = "block";

  // Auto change every 5 seconds
  setTimeout(showSlides, 5000);
}

// ==========================
// BOOKING SYSTEM
// ==========================

// SERVICES DATA
const services = [
  {
    name: "Classic Haircut",
    price: 25,
    duration: "30 mins",
  },
  {
    name: "Skin Fade",
    price: 35,
    duration: "45 mins",
  },
  {
    name: "Beard Grooming",
    price: 20,
    duration: "25 mins",
  },
  {
    name: "Home Service",
    price: 80,
    duration: "1 hr",
  },
];

// STORE SELECTED SERVICES
let selectedServices = [];

// ==========================
// CREATE BOOKING MODAL
// ==========================

function openBookingPage() {
  // Prevent duplicate modal
  if (document.querySelector(".booking-modal")) return;

  const modal = document.createElement("div");
  modal.classList.add("booking-modal");

modal.innerHTML = `
<div class="booking-container">
 <!-- LEFT SIDE -->
 <div class="booking-services-area">
 <div class="booking-header">
 <div>
 <h2>Book Your Session</h2>
 <p>Select one or multiple premium grooming services.</p>
 </div>
 <button class="close-booking" onclick="closeBookingPage()">
 ×
 </button>
 </div>
 <div class="booking-services">
${services.map((service, index) => `
 <div class="booking-service-card">

 <div class="service-info">
 <h3>${service.name}</h3>
 <p>${service.duration}</p>
 </div>
 <div class="service-meta">
 <span class="service-price">$${service.price}</span>
 <button
 class="add-service-btn"
 onclick="addService(${index})"
 >
 Add Service
 </button>
 </div>
 </div>
 `).join("")}
 </div>
 </div>

 <!-- RIGHT SIDE -->
 <div class="booking-summary">
 <h3 class="summary-title">Booking Summary</h3>
 <div id="selected-list" class="selected-services-list">
 <div class="empty-booking">
 No services selected yet.
 </div>

 </div>

 <div class="booking-total">
 <span>Total</span>
 <span id="total-price">$0</span>
 </div>

 <form id="bookingForm">
 <div class="form-group">
 <label>Full Name</label>
 <input type="text" id="customerName" required>
 </div>

  <div class="form-group">
 <label>Email Address</label>
 <input type="email" id="customerEmail" required>
 </div>

 <div class="form-group">
 <label>Phone Number</label>
 <input type="tel" id="customerPhone" required>
 </div>

 <div class="form-group">
  <label>Select Date</label>
  <input type="date" id="bookingDate" required>
</div>

<div class="form-group">
  <label>Select Time</label>
  <input type="time" id="bookingTime" required>
</div>


 <div class="form-group">
 <label>Extra Notes</label>
 <textarea id="bookingNote"></textarea>
 </div>
 <button type="submit" class="confirm-booking">
 Confirm Booking
 </button>
 </form>
 </div>
</div>
`;

  document.body.appendChild(modal);
}

// ==========================
// CLOSE BOOKING
// ==========================

function closeBookingPage() {
  document.querySelector(".booking-modal").remove();
}

// ==========================
// ADD SERVICE
// ==========================

function addService(index) {
  selectedServices.push(services[index]);

  renderSelectedServices();
}

// ==========================
// REMOVE SERVICE
// ==========================

function removeService(index) {
  selectedServices.splice(index, 1);

  renderSelectedServices();
}

// ==========================
// RENDER SELECTED SERVICES
// ==========================

function renderSelectedServices() {
const list = document.getElementById("selected-list");
const total = document.getElementById("total-price");
if (selectedServices.length === 0) {
list.innerHTML = `
 <div class="empty-booking">
 No services selected yet.
 </div>
 `;
total.innerText = "$0";
return;
}
let totalPrice = 0;
list.innerHTML = selectedServices
.map((service, index) => {
totalPrice += service.price;
return `
 <div class="selected-item">
 <div>
 <h4>${service.name}</h4>
 <p>$${service.price}</p>
 </div>
 <button
 class="remove-service-btn"
 onclick="removeService(${index})"
 >
 ×
 </button>
 </div>
 `;
})
.join("");
total.innerText = `$${totalPrice}`;
}

// ==========================
// BOOKING SUBMISSION
// ==========================

document.addEventListener("submit", function (e) {
  if (e.target.id === "bookingForm") {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const phone = document.getElementById("customerPhone").value;
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    const note = document.getElementById("bookingNote").value;

    const serviceList = selectedServices
      .map((service) => `• ${service.name} - $${service.price}`)
      .join("%0D%0A");

    const total = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    // ==========================
    // EMAIL MESSAGE
    // ==========================

    const emailMessage = `
Elite Cuts Booking

Name: ${name}

Email: ${email}

Phone: ${phone}

Date: ${date}

Time: ${time}

Services:
${serviceList}

Total: $${total}

Extra Notes:
${note}
`;

    // ==========================
    // SEND TO EMAIL
    // ==========================

    window.location.href = `mailto:youremail@example.com?subject=New Elite Cuts Booking&body=${emailMessage}`;

    // ==========================
    // WHATSAPP MESSAGE
    // ==========================

    const whatsappMessage = `
*Elite Cuts Booking*

Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}

Services:
${selectedServices
  .map((service) => `• ${service.name} - $${service.price}`)
  .join("\n")}

Total: $${total}

Notes:
${note}
`;

    window.open(
      `https://wa.me/2348000000000?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );

    alert("Booking request prepared successfully!");

    selectedServices = [];

    closeBookingPage();
  }
});

// ==========================
// CONNECT ALL BOOKING BUTTONS
// ==========================

document.querySelectorAll(".primary-btn").forEach((btn) => {
  if (btn.innerText.toLowerCase().includes("book")) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      openBookingPage();
    });
  }
});

// ==========================
// MOBILE MENU
// ==========================

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}