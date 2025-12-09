export function ShopAll({ products, status }) {
  return (
    <section className="mc-shop">
      <h2>Shop All Creations</h2>

      {status === "loading" && (
        <p className="mc-status">Loading magical items… ✨</p>
      )}
      {status === "error" && (
        <p className="mc-status mc-status-error">
          Oops! We couldn&apos;t load the products. Please make sure the
          backend is running.
        </p>
      )}
      {status === "success" && products.length === 0 && (
        <p className="mc-status">
          No products yet. Time for the girls to add their first creations!
        </p>
      )}

      {status === "success" && products.length > 0 && (
        <div className="mc-product-grid">
          {products.map((p) => (
            <article key={p.id} className="mc-product-card">
              <div className="mc-product-image">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} />
                ) : (
                  <div className="mc-placeholder">
                    ✨ {p.category || "Craft"} ✨
                  </div>
                )}
              </div>
              <div className="mc-product-body">
                <h3>{p.name}</h3>
                {p.creatorName && (
                  <p className="mc-product-creator">
                    Made by <span>{p.creatorName}</span>
                  </p>
                )}
                {p.description && (
                  <p className="mc-product-description">
                    {p.description}
                  </p>
                )}
                <div className="mc-product-footer">
                  <span className="mc-price">
                    ${Number(p.price).toFixed(2)}
                  </span>
                  <span className="mc-pill">
                    {p.category || "Handmade"}
                  </span>
                </div>
                {p.quantityAvailable !== null &&
                  p.quantityAvailable !== undefined && (
                    <p className="mc-qty">
                      {p.quantityAvailable > 0
                        ? `${p.quantityAvailable} in stock`
                        : "Sold out"}
                    </p>
                  )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
