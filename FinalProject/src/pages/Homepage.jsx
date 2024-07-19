const HomePage = () => {
  return (
    <div className="homesection">
      <header className="groceryheader">
        <h1 className="welcomeHeader">Welcome to ShopShip!</h1>
      </header>
      <main>
        <section className="promosection">
          <h2 className="currentPromoHeader">Promotions and Deals!</h2>
          <div className="promotionlist">
            <div className="promoitem">
              <h3 className="promoItemHeader">Promo 1</h3>
              <p>Promo Details</p>
            </div>
            <div className="promoitem">
              <h3 className="promoItemHeader">Promo 2</h3>
              <p>Promo Details</p>
            </div>
            <div className="promoitem">
              <h3 className="promoItemHeader">Promo 3</h3>
              <p>Promo Details</p>
            </div>
            <div className="promoitem">
              <h3 className="promoItemHeader">Promo 4</h3>
              <p>Promo Details</p>
            </div>
            <div className="promoitem">
              <h3 className="promoItemHeader">Promo 5</h3>
              <p>Promo Details</p>
            </div>
            <div className="promoitem">
              <h3 className="promoItemHeader">Promo 6</h3>
              <p>Promo Details</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
