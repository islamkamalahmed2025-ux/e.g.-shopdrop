/* =============================================
   SHOPDROP — script.js
   ============================================= */

// ---- Cart counter ----
let cartCount = 0;

function addToCart(btn) {
  cartCount++;
  document.getElementById('cartCount').textContent = cartCount;
  showToast('✅ Added to cart!');

  const original = btn.textContent;
  btn.textContent = '✓ Added';
  btn.style.background = '#0aaa55';

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 1500);
}

// ---- Wishlist toggle ----
function toggleWish(btn) {
  const isWished = btn.textContent === '❤️';
  btn.textContent = isWished ? '🤍' : '❤️';
  showToast(isWished ? '💔 Removed from wishlist' : '❤️ Saved to wishlist!');
}

// ---- Toast notification ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---- Product search ----
function doSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = (!query || name.includes(query)) ? '' : 'none';
  });
}

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

// ---- Countdown timer ----
// EDIT: Change starting time here (seconds)
let totalSeconds = 6 * 3600 + 30 * 60;

function updateTimer() {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  document.getElementById('hours').textContent = String(h).padStart(2, '0');
  document.getElementById('mins').textContent  = String(m).padStart(2, '0');
  document.getElementById('secs').textContent  = String(s).padStart(2, '0');

  if (totalSeconds > 0) totalSeconds--;
}

updateTimer();
setInterval(updateTimer, 1000);

// ---- Category bar active state ----
document.querySelectorAll('.cat-bar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.cat-bar a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
