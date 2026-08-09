import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Base Liquida Lumina',
    price: 18.99,
    image: new URL('../images/base-liquida.svg', import.meta.url).href,
    description: 'Cobertura ligera con acabado natural para un look fresco todo el dia.',
  },
  {
    id: 2,
    name: 'Labial Velvet Rose',
    price: 12.5,
    image: new URL('../images/labial-velvet.svg', import.meta.url).href,
    description: 'Color intenso y textura suave que se desliza con facilidad.',
  },
  {
    id: 3,
    name: 'Paleta Sunset Glow',
    price: 24.0,
    image: new URL('../images/paleta-sunset.svg', import.meta.url).href,
    description: 'Tonos versatiles para crear looks calidos de dia o noche.',
  },
  {
    id: 4,
    name: 'Mascara Pro Lift',
    price: 14.75,
    image: new URL('../images/mascara-pro.svg', import.meta.url).href,
    description: 'Define y eleva tus pestanas con volumen y efecto alargado.',
  },
  {
    id: 5,
    name: 'Rubor Peach Bloom',
    price: 10.99,
    image: new URL('../images/rubor-peach.svg', import.meta.url).href,
    description: 'Un toque de color suave para aportar vida y calidez al rostro.',
  },
  {
    id: 6,
    name: 'Delineador Precision',
    price: 9.5,
    image: new URL('../images/delineador.svg', import.meta.url).href,
    description: 'Trazo definido y preciso para delineados limpios y elegantes.',
  },
  {
    id: 7,
    name: 'Iluminador Crystal',
    price: 16.0,
    image: new URL('../images/iluminador.svg', import.meta.url).href,
    description: 'Luminosidad sutil para resaltar facciones con un brillo delicado.',
  },
  {
    id: 8,
    name: 'Set Brochas Artist',
    price: 29.99,
    image: new URL('../images/brochas.svg', import.meta.url).href,
    description: 'Brochas esenciales para aplicar, difuminar y perfeccionar tu maquillaje.',
  },
  {
    id: 9,
    name: 'Primer Radiance Veil',
    price: 19.9,
    image: new URL('../images/primer-radiance.svg', import.meta.url).href,
    description: 'Prepara la piel para un acabado uniforme y una duracion prolongada.',
  },
  {
    id: 10,
    name: 'Corrector Skin Match',
    price: 15.25,
    image: new URL('../images/corrector-skin.svg', import.meta.url).href,
    description: 'Corrige ojeras y pequeñas imperfecciones con acabado natural.',
  },
  {
    id: 11,
    name: 'Polvo Seda Matte',
    price: 17.5,
    image: new URL('../images/polvo-seda.svg', import.meta.url).href,
    description: 'Sella el maquillaje y controla el brillo sin dejar sensación pesada.',
  },
  {
    id: 12,
    name: 'Gloss Luxe Shine',
    price: 13.8,
    image: new URL('../images/gloss-luxe.svg', import.meta.url).href,
    description: 'Brillo jugoso y luminoso para labios con efecto pulido.',
  },
  {
    id: 13,
    name: 'Spray Fix Pro',
    price: 21.0,
    image: new URL('../images/spray-fix.svg', import.meta.url).href,
    description: 'Fija tu look y ayuda a mantenerlo impecable por mas tiempo.',
  },
  {
    id: 14,
    name: 'Sombras Nude Chic',
    price: 23.4,
    image: new URL('../images/sombras-nude.svg', import.meta.url).href,
    description: 'Paleta de neutros elegantes para looks suaves y sofisticados.',
  },
  {
    id: 15,
    name: 'Balsamo Hydra Lips',
    price: 11.95,
    image: new URL('../images/balsamo-hydra.svg', import.meta.url).href,
    description: 'Hidratacion reconfortante para labios suaves y cuidados todo el dia.',
  },
];

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function App() {
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalSection, setLegalSection] = useState('privacy');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const WHATSAPP_NUMBER = '50241818121';

  function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    setCart((current) => {
      const existing = current.find((item) => item.id === productId);
      if (existing) {
        return current.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((current) => {
      const existing = current.find((item) => item.id === productId);
      if (!existing) return current;

      if (existing.quantity > 1) {
        return current.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
      }
      return current.filter((item) => item.id !== productId);
    });
  }

  function clearCart() {
    setCart([]);
  }

  function openCheckout() {
    if (cart.length === 0) {
      alert('Tu bolsa DIOR esta vacia. Agrega productos antes de comprar.');
      return;
    }
    setCheckoutOpen(true);
  }

  function closeCheckout() {
    setCheckoutOpen(false);
  }

  function buildWhatsAppMessage(name, address) {
    const items = cart
      .map((item) => `- ${item.name} x${item.quantity} | ${formatCurrency(item.price * item.quantity)}`)
      .join('\n');

    return [
      'Hola DIOR, quiero confirmar mi compra.',
      '',
      `Cliente: ${name}`,
      `Direccion: ${address}`,
      '',
      'Productos:',
      items,
      '',
      `Total: ${formatCurrency(subtotal)}`,
    ].join('\n');
  }

  function confirmCheckout() {
    const name = customerName.trim();
    const address = customerAddress.trim();

    if (!name || !address) {
      alert('Completa nombre y direccion para continuar.');
      return;
    }

    const message = buildWhatsAppMessage(name, address);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setCustomerName('');
    setCustomerAddress('');
    setCheckoutOpen(false);
    setCart([]);
    window.location.href = whatsappUrl;
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-header__brand-group">
            <div className="site-header__icon-slot" aria-hidden="true">
              <img src={new URL('../images/Logotipo_VELVET.png', import.meta.url).href} alt="" />
            </div>
            <a href="#" className="site-header__brand">Velvet Makeup</a>
          </div>
          <nav className="site-header__nav" aria-label="Navegacion principal">
            <a href="#catalogo">Catalogo</a>
          </nav>
        </div>
      </header>

      <main className="page-content">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero__overlay"></div>
          <div className="hero__content">
            <img className="hero__logo" src={new URL('../images/Logotipo_VELVET.png', import.meta.url).href} alt="Logotipo Velvet Makeup" />
            <div className="hero__text">
              <p className="hero__eyebrow">Belleza Velvet Makeup</p>
              <h1 id="page-title">Velvet Makeup Boutique</h1>
              <p>Explora la coleccion de maquillaje Velvet Makeup y crea tu look ideal.</p>
            </div>
          </div>
        </section>

        <section id="catalogo" className="layout">
          <section className="products-section">
            <div className="section-title">
              <h2>Productos Velvet Makeup</h2>
              <span>{products.length} productos</span>
            </div>
            <div className="products-grid">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
                  <div className="product-card__info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span className="price">{formatCurrency(product.price)}</span>
                    <button className="btn btn--primary" type="button" onClick={() => addToCart(product.id)}>
                      Agregar al carrito
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="cart-panel">
            <h2>Bolsa Velvet Makeup</h2>
            <ul className="cart-items">
              {cart.length === 0 ? (
                <li className="empty-cart">Tu carrito esta vacio.</li>
              ) : (
                cart.map((item) => (
                  <li key={item.id}>
                    <div className="cart-item__info">
                      <strong>{item.name}</strong>
                      <span>{item.quantity} x {formatCurrency(item.price)}</span>
                    </div>
                    <button className="cart-item__remove" type="button" onClick={() => removeFromCart(item.id)}>
                      Quitar
                    </button>
                  </li>
                ))
              )}
            </ul>

            <div className="cart-summary">
              <p>Subtotal</p>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>

            <button className="btn btn--secondary" type="button" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button className="btn btn--primary" type="button" onClick={openCheckout}>
              Simular compra Velvet Makeup
            </button>
          </aside>
        </section>
      </main>

      {checkoutOpen && (
        <section className="modal" aria-hidden="false" onClick={(event) => event.target === event.currentTarget && closeCheckout()}>
          <div className="modal__card">
            <h3>Simular compra Velvet Makeup</h3>
            <p>Completa tus datos para finalizar tu compra en Velvet Makeup.</p>

            <label htmlFor="customer-name">Nombre</label>
            <input id="customer-name" type="text" placeholder="Tu nombre" value={customerName} onChange={(event) => setCustomerName(event.target.value)} />

            <label htmlFor="customer-address">Direccion</label>
            <input id="customer-address" type="text" placeholder="Tu direccion" value={customerAddress} onChange={(event) => setCustomerAddress(event.target.value)} />

            <div className="modal__actions">
              <button className="btn btn--secondary" type="button" onClick={closeCheckout}>
                Cancelar
              </button>
              <button className="btn btn--primary" type="button" onClick={confirmCheckout}>
                Confirmar compra
              </button>
            </div>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="site-footer__inner">
          <p>© 2026 Velvet Makeup. Todos los derechos reservados.</p>
          <nav aria-label="Enlaces legales">
            <a href="#" id="privacy-policy-link" onClick={(event) => { event.preventDefault(); setLegalSection('privacy'); setLegalOpen(true); }}>
              Politica de privacidad
            </a>
            <a href="#" id="cookies-policy-link" onClick={(event) => { event.preventDefault(); setLegalSection('cookies'); setLegalOpen(true); }}>
              Manejo de cookies
            </a>
          </nav>
        </div>
      </footer>

      {legalOpen && (
        <section className="modal" aria-hidden="false" onClick={(event) => event.target === event.currentTarget && setLegalOpen(false)}>
          <div className="modal__card modal__card--legal" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
            <div className="modal__header">
              <div>
                <p className="modal__eyebrow">Informacion legal</p>
                <h3 id="legal-modal-title">Politica de privacidad y cookies</h3>
              </div>
              <button className="modal__close" type="button" aria-label="Cerrar ventana legal" onClick={() => setLegalOpen(false)}>
                &times;
              </button>
            </div>

            <div className="legal-modal__sections">
              {legalSection === 'privacy' ? (
                <section className="legal-section">
                  <h4>Politica de privacidad</h4>
                  <p>Recopilamos solo la informacion necesaria para procesar tu compra simulada, responder a tu solicitud y enviarte el resumen por WhatsApp.</p>
                  <p>Los datos que ingresas en el formulario no se almacenan en una base de datos local. Se usan unicamente para generar el mensaje de compra y completar la accion simulada.</p>
                </section>
              ) : (
                <section className="legal-section">
                  <h4>Manejo de cookies</h4>
                  <p>Este sitio usa cookies tecnicas solo si el navegador o la plataforma lo requieren para funciones basicas como navegacion o rendimiento.</p>
                  <p>No usamos cookies de seguimiento, publicidad ni analitica personalizada en esta version del proyecto.</p>
                </section>
              )}
            </div>

            <div className="modal__actions modal__actions--legal">
              <button className="btn btn--secondary" type="button" onClick={() => setLegalSection('privacy')}>
                Ver privacidad
              </button>
              <button className="btn btn--secondary" type="button" onClick={() => setLegalSection('cookies')}>
                Ver cookies
              </button>
              <button className="btn btn--primary" type="button" onClick={() => setLegalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
