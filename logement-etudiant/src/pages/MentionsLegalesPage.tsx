export default function MentionsLegalesPage() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1
        className="text-3xl font-bold text-[var(--fg)] mb-8"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Mentions légales
      </h1>

      <section className="mb-8" aria-labelledby="editeur-heading">
        <h2 id="editeur-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          Éditeur du site
        </h2>
        <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 text-sm text-[var(--fg)] space-y-1">
          <p><strong>Nom du projet :</strong> LogementÉtudiant</p>
          <p><strong>Responsables :</strong> Léandro Da Silva, Matti, Emmanuel</p>
          <p><strong>Établissement :</strong> Digital Campus Paris</p>
          <p><strong>Adresse :</strong> 15 rue du Louvre, 75001 Paris, France</p>
          <p><strong>Email :</strong>{' '}
            <a href="mailto:contact@logement-etudiant.fr" className="text-[var(--accent)] hover:underline">
              contact@logement-etudiant.fr
            </a>
          </p>
          <p><strong>Statut :</strong> Projet pédagogique — pas de forme juridique commerciale</p>
        </div>
      </section>

      <section className="mb-8" aria-labelledby="hebergeur-heading">
        <h2 id="hebergeur-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          Hébergeur
        </h2>
        <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 text-sm text-[var(--fg)] space-y-1">
          <p><strong>Société :</strong> Vercel Inc.</p>
          <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
          <p><strong>Site web :</strong>{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              vercel.com
            </a>
          </p>
        </div>
      </section>

      <section className="mb-8" aria-labelledby="propriete-heading">
        <h2 id="propriete-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          Propriété intellectuelle
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          L'ensemble du contenu de ce site (textes, images, logos, structure) est la propriété exclusive
          de l'équipe LogementÉtudiant dans le cadre du projet Digital Campus Paris. Toute reproduction,
          diffusion ou utilisation sans autorisation préalable est strictement interdite.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="responsabilite-heading">
        <h2 id="responsabilite-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          Limitation de responsabilité
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          LogementÉtudiant est une plateforme d'agrégation d'annonces à des fins pédagogiques. L'équipe
          s'efforce d'assurer l'exactitude des informations publiées, mais ne peut garantir l'absence
          d'erreurs. La plateforme ne peut être tenue responsable des dommages directs ou indirects liés
          à l'utilisation du site.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          Contact
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Pour toute question relative au site, contactez-nous à :{' '}
          <a href="mailto:contact@logement-etudiant.fr" className="text-[var(--accent)] hover:underline">
            contact@logement-etudiant.fr
          </a>
        </p>
      </section>
    </main>
  )
}
