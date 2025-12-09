import { useParams, Link } from "react-router-dom";
import { MAKERS } from "../makers";

export function ShopByMaker({ products, status }) {
  const { makerId } = useParams();

  const maker = MAKERS.find((m) => m.id === makerId);

  if (!maker) {
    return (
      <section className="mc-shop">
        <h2>We couldn&apos;t find that maker.</h2>
        <p className="mc-status">
          Try going back to the <Link to="/">About page</Link> to pick a maker.
        </p>
      </section>
    );
  }

  const makerProducts = products.filter(
    (p) => p.creatorName === maker.creatorName
  );

  return (
    <section className="mc-shop">
      <h2>Shop {maker.displayName}&apos;s Creations</h2>
      <p className="mc-status">{maker.blurb}</p>

      {status === "loading" && (
        <p className="mc-status">Loading magical items… ✨</p>
      )}
      {status === "error" && (
        <p className="mc-status mc-status-error">
          Oops! We couldn&apos;t load the products. Please make sure the
          backend is running.
        </p>
      )}

      {status === "success" && makerProducts.length === 0 && (
        <p className="mc-status">
          No items added for {maker.displayName} yet. Check back soon!
        </p>
      )}

      {status === "success" && makerProducts.length > 0 && (
        <div className="mc-product-grid">
          {makerProducts.map((p) => (
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

      <p className="mc-status">
        <Link to="/shop">← Back to Shop All</Link>
      </p>
    </section>
  );
}
