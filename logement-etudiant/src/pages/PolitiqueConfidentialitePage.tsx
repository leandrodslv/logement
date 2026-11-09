export default function PolitiqueConfidentialitePage() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1
        className="text-3xl font-bold text-[var(--fg)] mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Politique de confidentialité
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">Dernière mise à jour : 1er janvier 2025</p>

      <section className="mb-8" aria-labelledby="responsable-heading">
        <h2 id="responsable-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          1. Responsable du traitement
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          L'équipe LogementÉtudiant (Léandro Da Silva, Matti, Emmanuel — Digital Campus Paris) est responsable
          du traitement de vos données personnelles. Contact : {' '}
          <a href="mailto:contact@logement-etudiant.fr" className="text-[var(--accent)] hover:underline">
            contact@logement-etudiant.fr
          </a>
        </p>
      </section>

      <section className="mb-8" aria-labelledby="donnees-heading">
        <h2 id="donnees-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          2. Données collectées
        </h2>
        <p className="text-sm text-[var(--muted)] mb-3">Nous collectons les données suivantes :</p>
        <ul className="text-sm text-[var(--muted)] space-y-2 list-none">
          {[
            { label: 'Identité', detail: 'Prénom, nom de famille' },
            { label: 'Contact', detail: 'Adresse email' },
            { label: 'Profil', detail: 'Rôle (étudiant ou bailleur), photo de profil optionnelle, biographie optionnelle' },
            { label: 'Documents étudiants', detail: 'Pièce d\'identité, carte étudiant (uniquement pour vérification)' },
            { label: 'Messages', detail: 'Contenu des échanges entre étudiants et bailleurs' },
            { label: 'Navigation', detail: 'Cookies analytiques (avec votre consentement uniquement)' },
          ].map(({ label, detail }) => (
            <li key={label} className="flex gap-2">
              <span className="text-[var(--accent)] font-semibold flex-shrink-0">•</span>
              <span><strong>{label} :</strong> {detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8" aria-labelledby="finalites-heading">
        <h2 id="finalites-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          3. Finalités du traitement
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--surface2)] text-left">
                <th className="border border-[var(--border)] px-3 py-2 font-semibold text-[var(--fg)]">Finalité</th>
                <th className="border border-[var(--border)] px-3 py-2 font-semibold text-[var(--fg)]">Base légale</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {[
                ['Création et gestion de compte', 'Exécution du contrat (art. 6.1.b RGPD)'],
                ['Mise en relation étudiants/bailleurs', 'Exécution du contrat (art. 6.1.b RGPD)'],
                ['Vérification des profils étudiants', 'Intérêt légitime (art. 6.1.f RGPD)'],
                ['Envoi de notifications de messages', 'Exécution du contrat (art. 6.1.b RGPD)'],
                ['Mesure d\'audience (analytics)', 'Consentement (art. 6.1.a RGPD)'],
              ].map(([finalite, base]) => (
                <tr key={finalite}>
                  <td className="border border-[var(--border)] px-3 py-2">{finalite}</td>
                  <td className="border border-[var(--border)] px-3 py-2">{base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8" aria-labelledby="duree-heading">
        <h2 id="duree-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          4. Durée de conservation
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Vos données sont conservées pendant <strong>3 ans</strong> à compter de votre dernière connexion,
          puis supprimées automatiquement. Les documents justificatifs sont supprimés après vérification
          ou dans un délai de 30 jours. Les données de cookies analytiques sont conservées 13 mois maximum.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="droits-heading">
        <h2 id="droits-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          5. Vos droits
        </h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Conformément au RGPD, vous disposez des droits suivants sur vos données :
        </p>
        <ul className="text-sm text-[var(--muted)] space-y-2">
          {[
            ['Droit d\'accès', 'Obtenir une copie de vos données personnelles'],
            ['Droit de rectification', 'Corriger des données inexactes ou incomplètes'],
            ['Droit à l\'effacement', 'Demander la suppression de vos données'],
            ['Droit à la portabilité', 'Recevoir vos données dans un format structuré'],
            ['Droit d\'opposition', 'Vous opposer à certains traitements'],
            ['Droit de limitation', 'Limiter le traitement de vos données'],
          ].map(([droit, description]) => (
            <li key={droit} className="flex gap-2">
              <span className="text-[var(--accent)] font-semibold flex-shrink-0">•</span>
              <span><strong>{droit} :</strong> {description}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--muted)] mt-4">
          Pour exercer vos droits, contactez-nous à :{' '}
          <a href="mailto:contact@logement-etudiant.fr" className="text-[var(--accent)] hover:underline">
            contact@logement-etudiant.fr
          </a>. Vous pouvez également introduire une réclamation auprès de la{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
            CNIL
          </a>.
        </p>
      </section>

      <section className="mb-8" aria-labelledby="cookies-heading">
        <h2 id="cookies-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          6. Cookies
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
          Ce site utilise des cookies techniques nécessaires au fonctionnement (session, préférences) et,
          avec votre consentement, des cookies analytiques pour mesurer l'audience. Aucun cookie publicitaire
          n'est utilisé.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Vous pouvez modifier votre choix à tout moment en effaçant les données de navigation de votre
          navigateur.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-xl font-semibold text-[var(--fg)] mb-3">
          7. Contact DPO
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Pour toute question relative à la protection de vos données :{' '}
          <a href="mailto:contact@logement-etudiant.fr" className="text-[var(--accent)] hover:underline">
            contact@logement-etudiant.fr
          </a>
        </p>
      </section>
    </main>
  )
}
