import React, { useEffect, useMemo, useState } from 'react';
import logoImg from '../assets/logo.jpeg';
import { DishModel } from '../models/DishModel';
import Footer from '../components/Footer';

export default function DashboardView({ user, onLogout }) {
  const [themeMode, setThemeMode] = useState('dark');
  const [lang, setLang] = useState('en');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOfferModal, setActiveOfferModal] = useState(null);
  const [offerNotice, setOfferNotice] = useState(true);

  const categories = DishModel.getCategories();
  const dishes = DishModel.getDishes();
  const offers = DishModel.getOffers();

  const text = {
    en: {
      search: 'Search dishes, drinks & more...',
      offers: '✦ Offers',
      bag: 'Bag',
      menu: 'THE MENU',
      explore: 'Explore',
      lovely: 'something lovely.',
      sidebarDesc: 'Thoughtfully prepared, beautifully served.',
      browse: 'BROWSE BY CUISINE',
      allMenu: 'All Menu',
      guest: 'Valued Guest',
      guestExperience: 'Guest experience',
      signOut: 'Sign out',
      goodFood: 'GOOD FOOD. GOOD MOOD.',
      craving: 'Every craving',
      place: 'has a place.',
      heroDesc: 'A menu made for slow moments, shared tables and memorable meals.',
      exploreMenu: 'Explore the menu',
      fresh: 'FRESHLY PREPARED · ALWAYS',
      curated: 'CURATED FOR YOU',
      fullMenu: 'The full menu',
      options: 'delicious options to explore',
      viewOffers: 'View offers ↗',
      allItems: 'All items',
      noDishes: 'No dishes found. Try another search.',
      chefPick: "CHEF'S PICK",
      add: '＋ Add',
      treat: 'A TREAT FROM US',
      useCode: 'Use code:',
      dismiss: 'Sounds delicious',
      order: 'YOUR ORDER',
      yourBag: 'Your bag',
      empty: 'Your bag is waiting for something delicious.',
      subtotal: 'Subtotal',
      placeOrder: 'Place order →',
      thankYou: 'Thank you! Your demo order has been placed.',
      mins: 'mins',
    },
    hi: {
      search: 'व्यंजन, पेय और बहुत कुछ खोजें...',
      offers: '✦ ऑफ़र',
      bag: 'बैग',
      menu: 'मेन्यू',
      explore: 'खोजें',
      lovely: 'कुछ खास।',
      sidebarDesc: 'प्यार से तैयार, खूबसूरती से परोसा गया।',
      browse: 'व्यंजन के अनुसार देखें',
      allMenu: 'पूरा मेन्यू',
      guest: 'प्रिय अतिथि',
      guestExperience: 'अतिथि अनुभव',
      signOut: 'लॉग आउट',
      goodFood: 'स्वादिष्ट खाना। अच्छा मूड।',
      craving: 'हर स्वाद की',
      place: 'अपनी जगह है।',
      heroDesc: 'खास पलों और यादगार भोजन के लिए बनाया गया मेन्यू।',
      exploreMenu: 'मेन्यू देखें',
      fresh: 'ताज़ा तैयार · हमेशा',
      curated: 'आपके लिए चुना गया',
      fullMenu: 'पूरा मेन्यू',
      options: 'स्वादिष्ट विकल्प उपलब्ध हैं',
      viewOffers: 'ऑफ़र देखें ↗',
      allItems: 'सभी व्यंजन',
      noDishes: 'कोई व्यंजन नहीं मिला। दूसरी खोज करें।',
      chefPick: 'शेफ की पसंद',
      add: '＋ जोड़ें',
      treat: 'हमारी ओर से खास तोहफ़ा',
      useCode: 'कोड इस्तेमाल करें:',
      dismiss: 'बहुत बढ़िया',
      order: 'आपका ऑर्डर',
      yourBag: 'आपका बैग',
      empty: 'आपका बैग स्वादिष्ट चीज़ों का इंतज़ार कर रहा है।',
      subtotal: 'कुल राशि',
      placeOrder: 'ऑर्डर करें →',
      thankYou: 'धन्यवाद! आपका डेमो ऑर्डर दे दिया गया है।',
      mins: 'मिनट',
    },
  };

  const t = text[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (offerNotice) {
        setActiveOfferModal(offers[0]);
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const activeCategoryObj = categories.find(
    (c) => c.id === selectedCat
  );

  const filteredDishes = useMemo(() => {
    return dishes.filter((d) => {
      const name =
        typeof d.name === 'object'
          ? d.name[lang] || d.name.en
          : d.name;

      const description =
        d.description?.[lang] || d.description?.en || '';

      const matchesCategory =
        selectedCat === 'all' || d.category === selectedCat;

      const matchesSubCategory =
        selectedSubCat === 'all' ||
        d.subCategory === selectedSubCat;

      const matchesSearch =
        `${name} ${description}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesSearch
      );
    });
  }, [dishes, selectedCat, selectedSubCat, searchQuery, lang]);

  const getDishName = (dish) => {
    return typeof dish.name === 'object'
      ? dish.name[lang] || dish.name.en
      : dish.name;
  };

  const addToCart = (dish) => {
    setCartItems((prev) => {
      const found = prev.find((x) => x.id === dish.id);

      return found
        ? prev.map((x) =>
            x.id === dish.id
              ? { ...x, quantity: x.quantity + 1 }
              : x
          )
        : [...prev, { ...dish, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((x) =>
          x.id === id
            ? { ...x, quantity: x.quantity + delta }
            : x
        )
        .filter((x) => x.quantity > 0)
    );
  };

  const count = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getCategoryTitle = () => {
    if (!activeCategoryObj) {
      return t.fullMenu;
    }

    const title = activeCategoryObj.title;

    return typeof title === 'object'
      ? title[lang] || title.en
      : title;
  };

  const getOfferText = (offer, field) => {
    const value = offer?.[field];

    return typeof value === 'object'
      ? value[lang] || value.en
      : value;
  };

  return (
    <div className={`imperial-dashboard-app theme-${themeMode}`}>
      <header className="top-luxury-header">
        <div className="header-left">
          <div className="header-brand">
            <img
              src={logoImg}
              alt="Food Cartell"
              className="header-logo"
            />
            <span className="brand-title font-serif">
              FOOD CARTELL
            </span>
          </div>
        </div>

        <div className="header-center">
          <div className="search-bar-wrapper">
            <span>⌕</span>
            <input
              aria-label={t.search}
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right">
          <button
            className="promo-pill"
            onClick={() => setActiveOfferModal(offers[0])}
          >
            {t.offers}
          </button>

          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
          </select>

          <button
            className="theme-toggle-btn"
            onClick={() =>
              setThemeMode(
                themeMode === 'dark' ? 'light' : 'dark'
              )
            }
          >
            {themeMode === 'dark' ? '☼' : '☾'}
          </button>

          <button
            className="cart-trigger-btn"
            onClick={() => setIsCartOpen(true)}
          >
            {t.bag}{' '}
            <span className="cart-badge">{count}</span>
          </button>
        </div>
      </header>

      <div className="split-workspace-container">
        <aside className="persistent-sidebar">
          <div className="sidebar-welcome">
            <span className="eyebrow">{t.menu}</span>
            <h3>
              {t.explore}
              <br />
              {t.lovely}
            </h3>
            <p>{t.sidebarDesc}</p>
          </div>

          <div className="sidebar-section-title">
            {t.browse}
          </div>

          <div className="categories-menu-tree">
            <button
              className={`cat-main-link ${
                selectedCat === 'all' ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedCat('all');
                setSelectedSubCat('all');
              }}
            >
              <span className="cat-bullet">✦</span>
              {t.allMenu}
              <span className="side-count">
                {dishes.length}
              </span>
            </button>

            {categories.map((cat) => (
              <div
                key={cat.id}
                className="cuisine-category-block"
              >
                <button
                  className={`cat-main-link ${
                    selectedCat === cat.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setSelectedSubCat('all');
                  }}
                >
                  <span className="cat-bullet">✦</span>
                  {cat.label[lang]}
                  <span className="side-count">
                    {
                      dishes.filter(
                        (d) => d.category === cat.id
                      ).length
                    }
                  </span>
                </button>

                {selectedCat === cat.id && (
                  <div className="sub-tree-container">
                    <button
                      className={`sub-tree-item ${
                        selectedSubCat === 'all' ? 'active' : ''
                      }`}
                      onClick={() => setSelectedSubCat('all')}
                    >
                      {t.allItems} {cat.label[lang]}
                    </button>

                    {cat.subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        className={`sub-tree-item ${
                          selectedSubCat === sub.id
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedSubCat(sub.id)
                        }
                      >
                        {sub.label[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sidebar-user-footer">
            <div className="user-avatar">
              {user?.name?.[0] || 'G'}
            </div>

            <div className="user-info">
              <p className="u-name">
                {user?.name || t.guest}
              </p>
              <p className="u-status">
                {t.guestExperience}
              </p>
            </div>

            <button
              onClick={onLogout}
              className="logout-icon-btn"
              title={t.signOut}
            >
              ↗
            </button>
          </div>
        </aside>

        <main className="dashboard-main-content">
          <div className="hero-editorial">
            <div>
              <span className="eyebrow">{t.goodFood}</span>

              <h1>
                {t.craving}
                <br />
                <em>{t.place}</em>
              </h1>

              <p>{t.heroDesc}</p>

              <button
                className="hero-cta"
                onClick={() => {
                  setSelectedCat('all');
                  setSelectedSubCat('all');
                }}
              >
                {t.exploreMenu} <span>↗</span>
              </button>
            </div>

            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
                alt="Beautifully served meal"
              />
              <div className="image-caption">
                {t.fresh}
              </div>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <span className="eyebrow">{t.curated}</span>

              <h2>{getCategoryTitle()}</h2>

              <p>
                {filteredDishes.length} {t.options}
              </p>
            </div>

            <button
              className="text-link"
              onClick={() => setActiveOfferModal(offers[1])}
            >
              {t.viewOffers}
            </button>
          </div>

          {activeCategoryObj && (
            <div className="subcat-filter-ribbon">
              <button
                className={`sub-pill ${
                  selectedSubCat === 'all' ? 'active' : ''
                }`}
                onClick={() => setSelectedSubCat('all')}
              >
                {t.allItems}
              </button>

              {activeCategoryObj.subCategories.map((sub) => (
                <button
                  key={sub.id}
                  className={`sub-pill ${
                    selectedSubCat === sub.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedSubCat(sub.id)}
                >
                  {sub.label[lang]}
                </button>
              ))}
            </div>
          )}

          <div className="dishes-grid">
            {filteredDishes.length === 0 ? (
              <div className="no-dishes-msg">
                {t.noDishes}
              </div>
            ) : (
              filteredDishes.map((dish, i) => (
                <article
                  key={dish.id}
                  className="luxury-dish-card"
                >
                  <div className="card-image-box">
                    <img
                      src={dish.image}
                      alt={getDishName(dish)}
                      loading="lazy"
                    />

                    <span className="prep-time-tag">
                      ◷ {dish.prepTime}
                    </span>

                    {i === 0 && (
                      <span className="dish-featured">
                        {t.chefPick}
                      </span>
                    )}
                  </div>

                  <div className="card-details">
                    <div className="title-row">
                      <h4>{getDishName(dish)}</h4>

                      <span className="rating-badge">
                        ★ {dish.rating}
                      </span>
                    </div>

                    <p className="dish-desc">
                      {dish.description?.[lang] ||
                        dish.description?.en ||
                        ''}
                    </p>

                    <div className="card-action-row">
                      <span className="price-tag">
                        ₹{dish.price}
                      </span>

                      <button
                        className="add-basket-btn"
                        onClick={() => addToCart(dish)}
                      >
                        {t.add}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </main>
      </div>

      <Footer lang={lang} />

      {activeOfferModal && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveOfferModal(null)}
        >
          <div
            className="offer-popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-x"
              onClick={() => setActiveOfferModal(null)}
            >
              ✕
            </button>

            <img
              src={activeOfferModal.bannerImage}
              alt="Special offer"
              className="offer-img"
            />

            <div className="offer-content">
              <span className="eyebrow">{t.treat}</span>

              <span className="offer-badge">
                {activeOfferModal.discount}
              </span>

              <h3>
                {getOfferText(activeOfferModal, 'title')}
              </h3>

              <p>
                {getOfferText(
                  activeOfferModal,
                  'description'
                )}
              </p>

              <div className="code-box">
                {t.useCode}{' '}
                <strong>{activeOfferModal.code}</strong>
              </div>

              <button
                className="hero-cta offer-dismiss"
                onClick={() => {
                  setActiveOfferModal(null);
                  setOfferNotice(false);
                }}
              >
                {t.dismiss}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`cart-drawer ${
          isCartOpen ? 'open' : ''
        }`}
      >
        <div className="cart-drawer-header">
          <div>
            <span className="eyebrow">{t.order}</span>
            <h3>
              {t.yourBag} ({count})
            </h3>
          </div>

          <button onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        <div className="cart-drawer-body">
          {!cartItems.length ? (
            <p className="empty-msg">{t.empty}</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-row">
                <div>
                  <h5>{getDishName(item)}</h5>

                  <span>
                    ₹{item.price * item.quantity}
                  </span>

                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        changeQty(item.id, -1)
                      }
                    >
                      −
                    </button>

                    <b>{item.quantity}</b>

                    <button
                      onClick={() =>
                        changeQty(item.id, 1)
                      }
                    >
                      ＋
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!!cartItems.length && (
          <div className="cart-drawer-footer">
            <div className="total-row">
              <span>{t.subtotal}</span>
              <span>₹{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => alert(t.thankYou)}
            >
              {t.placeOrder}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}