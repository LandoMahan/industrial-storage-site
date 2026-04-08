// Industrial Storage Website — JavaScript

// Pricing Calculator
document.getElementById('sqftInput')?.addEventListener('input', function() {
  const sqft = parseFloat(this.value) || 0;
  if (sqft > 0) {
    // TODO: Replace with actual pricing logic
    const monthlyRate = 1.50; // Example: $1.50 per sqft per month
    const estimated = (sqft * monthlyRate).toFixed(2);
    document.getElementById('estimatedCost').textContent = `$${estimated} / month`;
  } else {
    document.getElementById('estimatedCost').textContent = 'Contact us for pricing';
  }
});

// Form Submission
document.getElementById('inquiryForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    company: document.getElementById('company').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    sqft: document.getElementById('sqft').value,
    duration: document.getElementById('duration').value,
    details: document.getElementById('details').value,
    timestamp: new Date().toISOString()
  };

  console.log('Inquiry submitted:', formData);
  
  // TODO: Send to backend or email service
  alert('Thank you for your inquiry! We will contact you shortly.');
  this.reset();
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log('Industrial Storage website loaded.');
