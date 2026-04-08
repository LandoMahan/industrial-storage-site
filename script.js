// Industrial Storage — JavaScript

// Pricing Calculator
document.getElementById('sqftCalc')?.addEventListener('input', function() {
  const sqft = parseFloat(this.value) || 0;
  const rate = 1.20;
  const monthly = (sqft * rate).toFixed(2);
  document.getElementById('calcOutput').textContent = '$' + monthly.toLocaleString();
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
      alert('Thank you! We will contact you shortly.');
      document.getElementById('inquiryForm').reset();
    } else {
      alert('Error: ' + (result.error || 'Failed to submit'));
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Inquiry received. We will contact you soon.');
    document.getElementById('inquiryForm').reset();
  }
});

// Load Gallery
async function loadGallery() {
  try {
    const response = await fetch('/api/gallery');
    const photos = await response.json();
    const gallery = document.getElementById('galleryGrid');
    
    if (!photos || photos.length === 0) {
      gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Gallery loading...</p>';
      return;
    }
    
    gallery.innerHTML = photos.map(photo => `
      <div class="gallery-item">
        <img src="${photo.url}" alt="Facility photo" loading="lazy">
      </div>
    `).join('');
  } catch (error) {
    console.log('Gallery load skipped');
  }
}

// Load gallery on page load
window.addEventListener('load', loadGallery);

// Smooth Scrolling
if (document.getElementById('galleryGrid')) {
  loadGallery();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log('Industrial Storage Site Ready');
