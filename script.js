// Industrial Storage — JavaScript

// Pricing Calculator
document.getElementById('sqftCalc')?.addEventListener('input', function() {
  const sqft = parseFloat(this.value) || 0;
  const rate = 1.20;
  const monthly = (sqft * rate).toFixed(2);
  document.getElementById('calcOutput').textContent = '$' + monthly.toLocaleString() + ' / month';
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

// Photo Upload Handler
document.getElementById('photoUploadForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const fileInput = document.getElementById('photoInput');
  const file = fileInput.files[0];
  const statusEl = document.getElementById('uploadStatus');

  if (!file) {
    statusEl.textContent = 'Please select a photo';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    statusEl.textContent = 'File too large (max 5MB)';
    return;
  }

  statusEl.textContent = 'Uploading...';

  const reader = new FileReader();
  reader.onload = async function(event) {
    try {
      const response = await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoData: event.target.result })
      });

      const result = await response.json();
      if (result.success) {
        statusEl.textContent = '✓ Photo uploaded! Refreshing gallery...';
        fileInput.value = '';
        setTimeout(() => {
          loadGallery();
          statusEl.textContent = '';
        }, 1500);
      } else {
        statusEl.textContent = '✗ Upload failed: ' + (result.error || 'Unknown error');
      }
    } catch (error) {
      statusEl.textContent = '✗ Error uploading photo';
      console.error(error);
    }
  };
  reader.readAsDataURL(file);
});

// Gallery Loading
async function loadGallery() {
  try {
    const response = await fetch('/api/gallery');
    const photos = await response.json();
    
    const gallery = document.getElementById('galleryGrid');
    
    if (!photos || photos.length === 0) {
      gallery.innerHTML = '<div class="gallery-placeholder" style="grid-column: 1 / -1;"><div class="placeholder-text">No photos yet. Upload one using the form below!</div></div>';
      return;
    }

    gallery.innerHTML = photos.map(photo => 
      '<div class="gallery-item"><img src="' + photo.url + '" alt="Industrial storage" loading="lazy"></div>'
    ).join('');
  } catch (error) {
    console.log('Gallery loading skipped');
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

console.log('Industrial Storage Ready');
