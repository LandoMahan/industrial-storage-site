// FORM SUBMISSION - Using Formspree for email
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(inquiryForm);
    
    try {
      // Send to Formspree endpoint for johnmahan@westpatrick.com
      const response = await fetch('https://formspree.io/f/mpwagdkp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you! We will contact you within 24 business hours.');
        inquiryForm.reset();
      } else {
        alert('An error occurred. Please try again or call (610) 297-0112.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
}

// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ADD SCROLL EFFECTS
window.addEventListener('scroll', function() {
  // Scroll animations can be added here
});
