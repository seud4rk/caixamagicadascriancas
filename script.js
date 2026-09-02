const CHECKOUTS = {
  explorador: "https://pay.kiwify.com.br/DZn2ZUj",
  aventureiro: "https://pay.kiwify.com.br/n3lpvD2"
};

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Mantém UTMs e identificadores comuns de anúncio ao seguir para o checkout.
const TRACKING_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'src', 'sck', 'fbclid', 'gclid', 'ttclid'
];

function checkoutWithTracking(baseUrl) {
  const pageParams = new URLSearchParams(window.location.search);
  const url = new URL(baseUrl);

  TRACKING_KEYS.forEach((key) => {
    const value = pageParams.get(key);
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  });

  return url.toString();
}

document.querySelectorAll('.checkout-link').forEach((link) => {
  const plan = link.dataset.plan;
  const baseUrl = CHECKOUTS[plan];
  if (!baseUrl) return;

  link.href = checkoutWithTracking(baseUrl);
  link.addEventListener('click', () => {
    try {
      sessionStorage.setItem('arquivo_magico_last_plan', plan);
    } catch (_) {}
  });
});

// Rolagem suave apenas para âncoras internas.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
