import { Link } from "react-router-dom";
import { MAKERS } from "../makers";

export function Home() {
  return (
    <>
      <section className="mc-hero">
        <div>
          <h1>Sprinkle a little magic into your day ✨</h1>
          <p>
            Magic Crafts is a small business run by three creative girls — Zari,
            Kelly, and Zara — who love making bracelets, keychains, and more.
            Every item is handmade with care (and lots of glittery joy!).
          </p>
        </div>
      </section>

      <section className="mc-makers">
        <h2>Meet the Makers</h2>
        <div className="mc-maker-grid">
          {MAKERS.map((m, index) => (
            <div key={m.id} className={`mc-maker-card maker-${index + 1}`}>
              <div className="mc-maker-header">
                {m.avatar && (
                  <img
                    src={m.avatar}
                    alt={m.displayName}
                    className="mc-maker-avatar"
                  />
                )}
                <h3>{m.displayName}</h3>
              </div>

              <p>{m.blurb}</p>

              <Link className="mc-link" to={`/shop/${m.id}`}>
                Shop {m.displayName}&apos;s items →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
