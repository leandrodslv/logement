export default function CGUPage() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1
        className="text-3xl font-bold text-[var(--fg)] mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Conditions Générales d'Utilisation
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">En vigueur au 1er janvier 2025</p>

      <section className="mb-8" aria-labelledby="objet-heading">
        <h2 id="objet-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          1. Objet du service
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          LogementÉtudiant est une plateforme d'agrégation et de mise en relation entre étudiants à la
          recherche d'un logement et bailleurs proposant des biens à louer. LogementÉtudiant
          <strong> n'est pas une agence immobilière</strong> et n'intervient pas dans la conclusion des
          contrats de location entre les parties. La plateforme est développée dans le cadre d'un projet
          pédagogique à Digital Campus Paris.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="acces-heading">
        <h2 id="acces-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          2. Accès et inscription
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
          L'accès aux annonces est libre et gratuit. La création d'un compte est nécessaire pour contacter
          un bailleur (rôle étudiant) ou publier une annonce (rôle bailleur). Pour créer un compte, vous
          devez :
        </p>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-none ml-4">
          {[
            'Fournir une adresse email valide et un mot de passe sécurisé',
            'Être âgé de 18 ans minimum',
            'Accepter les présentes CGU et la politique de confidentialité',
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--accent)]" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8" aria-labelledby="roles-heading">
        <h2 id="roles-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          3. Rôles et obligations des utilisateurs
        </h2>

        <h3 className="text-base font-semibold text-[var(--fg)] mt-4 mb-2">3.1 Étudiants</h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-none ml-4 mb-4">
          {[
            'Peuvent rechercher des annonces et contacter les bailleurs',
            'Peuvent déposer des avis sur les bailleurs',
            'Ne peuvent pas créer d\'annonces de logement',
            'S\'engagent à fournir des documents d\'identité et de scolarité authentiques',
            'S\'engagent à ne pas utiliser la plateforme à des fins frauduleuses',
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--accent)]" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-[var(--fg)] mb-2">3.2 Bailleurs</h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-none ml-4">
          {[
            'Peuvent créer, modifier et supprimer leurs annonces de logement',
            'Peuvent répondre aux messages des étudiants',
            'Ne peuvent pas initier une conversation (c\'est l\'étudiant qui contacte en premier)',
            'S\'engagent à fournir des informations exactes et à jour sur leurs biens',
            'S\'engagent à respecter la législation en vigueur sur la location (loi Alur, loi Elan)',
            'Sont seuls responsables du contenu de leurs annonces',
          ].map(item => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--accent)]" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8" aria-labelledby="moderation-heading">
        <h2 id="moderation-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          4. Modération
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          LogementÉtudiant se réserve le droit de supprimer tout contenu (annonce, message, avis) ne
          respectant pas les présentes CGU, contenant des informations fausses ou trompeuses, portant
          atteinte aux droits de tiers, ou ayant un caractère illicite, offensant ou discriminatoire.
          Tout abus peut entraîner la suspension ou suppression du compte concerné.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="responsabilite-heading">
        <h2 id="responsabilite-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          5. Responsabilité de la plateforme
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          LogementÉtudiant agit en qualité d'hébergeur au sens de la loi pour la confiance dans
          l'économie numérique (LCEN). La plateforme ne saurait être tenue responsable du contenu publié
          par les utilisateurs, de la qualité des logements proposés, ni des relations contractuelles entre
          étudiants et bailleurs. LogementÉtudiant ne garantit pas la disponibilité permanente du service
          et peut l'interrompre pour des opérations de maintenance.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="pi-heading">
        <h2 id="pi-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          6. Propriété intellectuelle
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          L'ensemble des éléments constituant la plateforme (design, code source, logo, textes) est la
          propriété de l'équipe LogementÉtudiant. Les contenus publiés par les utilisateurs (photos,
          descriptions) restent leur propriété ; ils accordent à LogementÉtudiant une licence non exclusive
          d'affichage pour les besoins du service.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="droit-heading">
        <h2 id="droit-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          7. Droit applicable et juridiction
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Les présentes CGU sont régies par le droit français. En cas de litige, et à défaut de résolution
          amiable, les tribunaux compétents de Paris seront seuls compétents.
        </p>
      </section>

      <section aria-labelledby="modif-heading">
        <h2 id="modif-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          8. Modification des CGU
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          LogementÉtudiant se réserve le droit de modifier les présentes CGU à tout moment. Les
          utilisateurs seront informés des modifications significatives par email. L'utilisation continue
          de la plateforme après notification vaut acceptation des nouvelles CGU.
        </p>
      </section>
    </main>
  )
}
