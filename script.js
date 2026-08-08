const products = [
  {
    id: 1,
    name: "Base Liquida Lumina",
    price: 18.99,
    image: "images/base-liquida.svg",
    description: "Cobertura ligera con acabado natural para un look fresco todo el dia.",
  },
  {
    id: 2,
    name: "Labial Velvet Rose",
    price: 12.5,
    image: "images/labial-velvet.svg",
    description: "Color intenso y textura suave que se desliza con facilidad.",
  },
  {
    id: 3,
    name: "Paleta Sunset Glow",
    price: 24.0,
    image: "images/paleta-sunset.svg",
    description: "Tonos versatiles para crear looks calidos de dia o noche.",
  },
  {
    id: 4,
    name: "Mascara Pro Lift",
    price: 14.75,
    image: "images/mascara-pro.svg",
    description: "Define y eleva tus pestanas con volumen y efecto alargado.",
  },
  {
    id: 5,
    name: "Rubor Peach Bloom",
    price: 10.99,
    image: "images/rubor-peach.svg",
    description: "Un toque de color suave para aportar vida y calidez al rostro.",
  },
  {
    id: 6,
    name: "Delineador Precision",
    price: 9.5,
    image: "images/delineador.svg",
    description: "Trazo definido y preciso para delineados limpios y elegantes.",
  },
  {
    id: 7,
    name: "Iluminador Crystal",
    price: 16.0,
    image: "images/iluminador.svg",
    description: "Luminosidad sutil para resaltar facciones con un brillo delicado.",
  },
  {
    id: 8,
    name: "Set Brochas Artist",
    price: 29.99,
    image: "images/brochas.svg",
    description: "Brochas esenciales para aplicar, difuminar y perfeccionar tu maquillaje.",
  },
  {
    id: 9,
    name: "Primer Radiance Veil",
    price: 19.9,
    image: "images/primer-radiance.svg",
    description: "Prepara la piel para un acabado uniforme y una duracion prolongada.",
  },
  {
    id: 10,
    name: "Corrector Skin Match",
    price: 15.25,
    image: "images/corrector-skin.svg",
    description: "Corrige ojeras y pequeñas imperfecciones con acabado natural.",
  },
  {
    id: 11,
    name: "Polvo Seda Matte",
    price: 17.5,
    image: "images/polvo-seda.svg",
    description: "Sella el maquillaje y controla el brillo sin dejar sensación pesada.",
  },
  {
    id: 12,
    name: "Gloss Luxe Shine",
    price: 13.8,
    image: "images/gloss-luxe.svg",
    description: "Brillo jugoso y luminoso para labios con efecto pulido.",
  },
  {
    id: 13,
    name: "Spray Fix Pro",
    price: 21.0,
    image: "images/spray-fix.svg",
    description: "Fija tu look y ayuda a mantenerlo impecable por mas tiempo.",
  },
  {
    id: 14,
    name: "Sombras Nude Chic",
    price: 23.4,
    image: "images/sombras-nude.svg",
    description: "Paleta de neutros elegantes para looks suaves y sofisticados.",
  },
  {
    id: 15,
    name: "Balsamo Hydra Lips",
    price: 11.95,
    image: "images/balsamo-hydra.svg",
    description: "Hidratacion reconfortante para labios suaves y cuidados todo el dia.",
  },
];

const cart = [];
const WHATSAPP_NUMBER = "50241818121";

const productsGrid = document.getElementById("products-grid");
const productCount = document.getElementById("product-count");
const cartItems = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout");
const modal = document.getElementById("checkout-modal");
const legalModal = document.getElementById("legal-modal");
const cancelCheckoutButton = document.getElementById("cancel-checkout");
const confirmCheckoutButton = document.getElementById("confirm-checkout");
const customerNameInput = document.getElementById("customer-name");
const customerAddressInput = document.getElementById("customer-address");
const privacyPolicyLink = document.getElementById("privacy-policy-link");
const cookiesPolicyLink = document.getElementById("cookies-policy-link");
const closeLegalModalButton = document.getElementById("close-legal-modal");
const confirmCloseLegalButton = document.getElementById("confirm-close-legal");
const backToPrivacyButton = document.getElementById("back-to-privacy");
const backToCookiesButton = document.getElementById("back-to-cookies");
const legalSections = {
  privacy: document.getElementById("privacy-policy-section"),
  cookies: document.getElementById("cookies-policy-section"),
};

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function renderProducts() {
  productCount.textContent = `${products.length} productos`;

  const cards = products
    .map(
      (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
        <div class="product-card__info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <span class="price">${formatCurrency(product.price)}</span>
          <button class="btn btn--primary" type="button" data-id="${product.id}">Agregar al carrito</button>
        </div>
      </article>
    `
    )
    .join("");

  productsGrid.innerHTML = cards;
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function buildWhatsAppMessage(name, address) {
  const items = cart
    .map(
      (item) => `- ${item.name} x${item.quantity} | ${formatCurrency(item.price * item.quantity)}`
    )
    .join("\n");

  return [
    "Hola DIOR, quiero confirmar mi compra.",
    "",
    `Cliente: ${name}`,
    `Direccion: ${address}`,
    "",
    "Productos:",
    items,
    "",
    `Total: ${formatCurrency(getSubtotal())}`,
  ].join("\n");
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<li class="empty-cart">Tu carrito esta vacio.</li>';
    subtotalElement.textContent = formatCurrency(0);
    return;
  }

  const cartContent = cart
    .map(
      (item) => `
      <li>
        <div class="cart-item__info">
          <strong>${item.name}</strong>
          <span>${item.quantity} x ${formatCurrency(item.price)}</span>
        </div>
        <button class="cart-item__remove" type="button" data-remove-id="${item.id}">Quitar</button>
      </li>
    `
    )
    .join("");

  cartItems.innerHTML = cartContent;
  subtotalElement.textContent = formatCurrency(getSubtotal());
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return;
  }

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) {
    return;
  }

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  renderCart();
}

function clearCart() {
  cart.length = 0;
  renderCart();
}

function openModal() {
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (modal.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function openLegalModal(section = "privacy") {
  const showPrivacy = section === "privacy";

  legalSections.privacy.hidden = !showPrivacy;
  legalSections.cookies.hidden = showPrivacy;
  legalModal.classList.remove("hidden");
  legalModal.setAttribute("aria-hidden", "false");
}

function closeLegalModal() {
  if (legalModal.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  legalModal.classList.add("hidden");
  legalModal.setAttribute("aria-hidden", "true");
}

productsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }

  addToCart(Number(button.dataset.id));
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-remove-id]");
  if (!button) {
    return;
  }

  removeFromCart(Number(button.dataset.removeId));
});

clearCartButton.addEventListener("click", clearCart);

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu bolsa DIOR esta vacia. Agrega productos antes de comprar.");
    return;
  }

  openModal();
});

cancelCheckoutButton.addEventListener("click", closeModal);

confirmCheckoutButton.addEventListener("click", () => {
  const name = customerNameInput.value.trim();
  const address = customerAddressInput.value.trim();

  if (!name || !address) {
    alert("Completa nombre y direccion para continuar.");
    return;
  }

  const message = buildWhatsAppMessage(name, address);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  customerNameInput.value = "";
  customerAddressInput.value = "";
  closeModal();
  clearCart();
  window.location.href = whatsappUrl;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

privacyPolicyLink.addEventListener("click", (event) => {
  event.preventDefault();
  openLegalModal("privacy");
});

cookiesPolicyLink.addEventListener("click", (event) => {
  event.preventDefault();
  openLegalModal("cookies");
});

closeLegalModalButton.addEventListener("click", closeLegalModal);
confirmCloseLegalButton.addEventListener("click", closeLegalModal);
backToPrivacyButton.addEventListener("click", () => openLegalModal("privacy"));
backToCookiesButton.addEventListener("click", () => openLegalModal("cookies"));

legalModal.addEventListener("click", (event) => {
  if (event.target === legalModal) {
    closeLegalModal();
  }
});

renderProducts();
renderCart();
