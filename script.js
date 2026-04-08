// Industrial Storage Website — JavaScript

// Pricing Calculator
document.getElementById('sqftInput')?.addEventListener('input', function() {
  const sqft = parseFloat(this.value) || 0;
  if (sqft > 0) {
    const monthlyRate = 1.20;
    const estimated = (sqft * monthlyRate).toFixed(2);
    document.getElementById('estimatedCost').textContent = '$' + estimated + ' per month';
  } else {
    document.getElementById('estimatedCost').textContent = 'Enter square footage';
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
    details: document.getElementById('details').value
  };

  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.success) {
      alert('Thank you for your inquiry! We will contact you shortly.');
      document.getElementById('inquiryForm').reset();
      document.getElementById('estimatedCost').textContent = 'Enter square footage';
    } else {
      alert('Error: ' + (result.error || 'Failed to submit inquiry'));
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Error submitting inquiry. Please try again.');
  }
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
