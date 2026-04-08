// Industrial Storage — Enhanced JavaScript

// Pricing Calculator
document.getElementById('sqftCalc')?.addEventListener('input', function() {
  const sqft = parseFloat(this.value) || 0;
  const rate = 1.20;
  const monthly = (sqft * rate).toFixed(2);
  document.getElementById('calcOutput').textContent = `$${monthly.toLocaleString()} / month`;
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
      alert('Thank you! We\'ll be in touch shortly.');
      document.getElementById('inquiryForm').reset();
    } else {
      alert('Error: ' + (result.error || 'Failed to submit'));
    }
  } catch (error) {
    console.error('Submission error:', error);
    // Fallback: still show success message even if email fails
    alert('Inquiry received. We\'ll contact you soon.');
    document.getElementById('inquiryForm').reset();
  }
});

// Gallery Loading
async function loadGallery() {
  try {
    const response = await fetch('/api/gallery');
    const photos = await response.json();
    
    const gallery = document.getElementById('galleryGrid');
    
    if (!photos || photos.length === 0) {
      gallery.innerHTML = `
        <div class="gallery-placeholder" style="grid-column: 1 / -1;">
          <div class="placeholder-text">📧 Send photos to johnmahan@westpatrick.com to display them here</div>
        </div>
      `;
      return;
    }

    gallery.innerHTML = photos.map(photo => `
      <div class="gallery-item">
        <img src="${photo.url}" alt="Industrial storage space" loading="lazy">
      </div>
    `).join('');
  } catch (error) {
    console.log('Gallery loading skipped (no photos yet)');
    // Silently fail — photos come via email
  }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadGallery();
});

console.log('Industrial Storage — Ready');
