-- Données d'exemple — Logement Étudiant
-- Utilisé par `supabase start` pour peupler la base locale

-- ─────────────────────────────────────────
-- Utilisateurs auth (nécessaire avant profiles)
-- ─────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'marie.dubois@example.fr',   '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('b0000000-0000-0000-0000-000000000002', 'pierre.martin@example.fr',  '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('b0000000-0000-0000-0000-000000000003', 'sophie.bernard@example.fr', '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('b0000000-0000-0000-0000-000000000004', 'j.moreau@example.fr',       '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('b0000000-0000-0000-0000-000000000005', 'i.laurent@example.fr',      '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000001', 'leandro@etu.example.fr',    '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000002', 'matti@etu.example.fr',      '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000003', 'emma@etu.example.fr',       '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000004', 'noah@etu.example.fr',       '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000005', 'chloe@etu.example.fr',      '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000006', 'hugo@etu.example.fr',       '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000007', 'ines@etu.example.fr',       '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000008', 'antoine@etu.example.fr',    '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000009', 'jade@etu.example.fr',       '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('e0000000-0000-0000-0000-000000000010', 'tom@etu.example.fr',        '$2a$10$PpDUoFhIrNaxNpZMWMvuQOQsBmSXCdkKRuEhZQkTzMJk8SOH1i2Sy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- Bailleurs fictifs (5)
-- ─────────────────────────────────────────
INSERT INTO profiles (id, role, prenom, nom, email, bio) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'bailleur', 'Marie',    'Dubois',   'marie.dubois@example.fr',   'Propriétaire de 3 studios à Paris depuis 10 ans.'),
  ('b0000000-0000-0000-0000-000000000002', 'bailleur', 'Pierre',   'Martin',   'pierre.martin@example.fr',  'Bailleur particulier à Lyon, loue depuis 2015.'),
  ('b0000000-0000-0000-0000-000000000003', 'bailleur', 'Sophie',   'Bernard',  'sophie.bernard@example.fr', 'Appartements T1 et T2 à Bordeaux.'),
  ('b0000000-0000-0000-0000-000000000004', 'bailleur', 'Jacques',  'Moreau',   'j.moreau@example.fr',       'Collocations meublées près des écoles à Toulouse.'),
  ('b0000000-0000-0000-0000-000000000005', 'bailleur', 'Isabelle', 'Laurent',  'i.laurent@example.fr',      'Studio et chambre chez l''habitant à Marseille.')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- Étudiants fictifs (10)
-- ─────────────────────────────────────────
INSERT INTO profiles (id, role, prenom, nom, email, bio) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'etudiant', 'Léandro',  'Silva',    'leandro@etu.example.fr',   'Master IA — Digital Campus Paris.'),
  ('e0000000-0000-0000-0000-000000000002', 'etudiant', 'Matti',    'Dupont',   'matti@etu.example.fr',     'Licence informatique — IUT Lyon.'),
  ('e0000000-0000-0000-0000-000000000003', 'etudiant', 'Emma',     'Petit',    'emma@etu.example.fr',      'BTS commerce — CCI Bordeaux.'),
  ('e0000000-0000-0000-0000-000000000004', 'etudiant', 'Noah',     'Girard',   'noah@etu.example.fr',      'Prépa HEC — Toulouse.'),
  ('e0000000-0000-0000-0000-000000000005', 'etudiant', 'Chloé',    'Roux',     'chloe@etu.example.fr',     'Médecine 2e année — Marseille.'),
  ('e0000000-0000-0000-0000-000000000006', 'etudiant', 'Hugo',     'Blanc',    'hugo@etu.example.fr',      'BUT informatique — Paris.'),
  ('e0000000-0000-0000-0000-000000000007', 'etudiant', 'Inès',     'Faure',    'ines@etu.example.fr',      'Licence droit — Bordeaux.'),
  ('e0000000-0000-0000-0000-000000000008', 'etudiant', 'Antoine',  'Leroy',    'antoine@etu.example.fr',   'Master finance — Lyon.'),
  ('e0000000-0000-0000-0000-000000000009', 'etudiant', 'Jade',     'Simon',    'jade@etu.example.fr',      'Licence psychologie — Toulouse.'),
  ('e0000000-0000-0000-0000-000000000010', 'etudiant', 'Tom',      'Michel',   'tom@etu.example.fr',       'DUT génie civil — Marseille.')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- Annonces (20)
-- ─────────────────────────────────────────
INSERT INTO annonces (id, bailleur_id, titre, description, type_logement, ville, adresse, code_postal, prix_mensuel, charges_incluses, charges_mensuelles, surface_m2, meuble, disponible_le, disponible) VALUES
  -- Paris (6)
  ('a0000001-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Studio lumineux Marais', 'Studio refait à neuf, parquet, cuisine équipée, proche métro Saint-Paul.', 'studio', 'Paris', '12 rue de Bretagne', '75003', 850, false, 60, 22, true,  '2027-07-01', true),
  ('a0000001-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'T1 calme République', 'T1 au 3e étage, double vitrage, digicode, interphone.', 'T1', 'Paris', '8 avenue Parmentier', '75011', 950, true,  null, 28, true,  '2027-09-01', true),
  ('a0000001-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Chambre chez habitant Nation', 'Chambre privée 12m² chez couple retraité, accès cuisine partagée.', 'chambre', 'Paris', '5 rue du Faubourg Saint-Antoine', '75012', 480, true,  null, 12, true,  '2027-08-15', true),
  ('a0000001-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Colocation 4 chambres Montparnasse', 'Grande coloc meublée, salon commun, fibre optique.', 'colocation', 'Paris', '14 rue d''Alésia', '75014', 620, false, 80, 15, true,  '2027-07-15', true),
  ('a0000001-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'T2 Belleville vue dégagée', 'T2 lumineux, cave, possible sous-location d''une chambre.', 'T2', 'Paris', '25 rue de Belleville', '75020', 1100, false, 120, 42, false, '2027-10-01', false),
  ('a0000001-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'Studio Pigalle rénové', 'Studio 20m² refait, baignoire, parquet chêne, 5 min Montmartre.', 'studio', 'Paris', '3 rue Victor Massé', '75009', 790, false, 55, 20, true,  '2027-09-15', true),

  -- Lyon (4)
  ('a0000001-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 'T1 Part-Dieu proche fac', 'T1 neuf dans résidence sécurisée, digicode, ascenseur.', 'T1', 'Lyon', '48 rue de la Villette', '69003', 650, true,  null, 26, true,  '2027-07-01', true),
  ('a0000001-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000002', 'Colocation Guillotière', 'Coloc 3 personnes, grand salon, terrasse, proche tram T2.', 'colocation', 'Lyon', '12 rue Montesquieu', '69007', 500, false, 60, 14, false, '2027-08-01', true),
  ('a0000001-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000002', 'Studio meublé Villeurbanne', 'Studio 18m², tout équipé, wifi inclus, calme.', 'studio', 'Lyon', '32 cours Emile Zola', '69100', 560, true,  null, 18, true,  '2027-09-01', true),
  ('a0000001-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000002', 'T2 Croix-Rousse avec terrasse', 'T2 50m², terrasse 8m², vue dégagée, calme absolu.', 'T2', 'Lyon', '7 grande rue de la Croix-Rousse', '69004', 820, false, 90, 50, false, '2027-10-01', true),

  -- Bordeaux (4)
  ('a0000001-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000003', 'T1 centre Bordeaux', 'T1 dans immeuble pierre, lumineux, cave.', 'T1', 'Bordeaux', '15 rue Sainte-Catherine', '33000', 600, false, 70, 30, false, '2027-07-01', true),
  ('a0000001-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000003', 'Studio étudiant Victoire', 'Studio bien agencé, proche place de la Victoire et facs.', 'studio', 'Bordeaux', '28 cours de la Marne', '33800', 490, false, 50, 20, true,  '2027-08-15', true),
  ('a0000001-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000003', 'T2 Chartrons vue Garonne', 'T2 avec vue sur la Garonne, parquet, cuisine ouverte.', 'T2', 'Bordeaux', '45 quai des Chartrons', '33300', 850, false, 100, 48, false, '2027-09-01', true),
  ('a0000001-0000-0000-0000-000000000014', 'b0000000-0000-0000-0000-000000000003', 'Chambre colocation Mériadeck', 'Chambre 11m² dans coloc 4 pers., proche tram C et D.', 'chambre', 'Bordeaux', '6 rue du Château d''Eau', '33000', 420, true,  null, 11, true,  '2027-07-15', true),

  -- Toulouse (3)
  ('a0000001-0000-0000-0000-000000000015', 'b0000000-0000-0000-0000-000000000004', 'T1 Capitole calme', 'T1 au calme, digicode, cave, proche toutes commodités.', 'T1', 'Toulouse', '9 rue des Lois', '31000', 580, false, 65, 27, true,  '2027-07-01', true),
  ('a0000001-0000-0000-0000-000000000016', 'b0000000-0000-0000-0000-000000000004', 'Coloc étudiante Rangueil', 'Coloc 5 chambres, proche IUT et Paul Sabatier, jardin.', 'colocation', 'Toulouse', '22 avenue de Rangueil', '31400', 410, false, 50, 12, false, '2027-09-01', true),
  ('a0000001-0000-0000-0000-000000000017', 'b0000000-0000-0000-0000-000000000004', 'Studio proche Jean Jaurès', 'Studio 19m², idéal 1ère année, boulangerie en bas.', 'studio', 'Toulouse', '14 rue Gabriel Péri', '31000', 530, true,  null, 19, true,  '2027-08-01', true),

  -- Marseille (3)
  ('a0000001-0000-0000-0000-000000000018', 'b0000000-0000-0000-0000-000000000005', 'T1 Castellane vue mer', 'T1 avec vue partielle sur la mer, 3e étage, ascenseur.', 'T1', 'Marseille', '5 bd de la Madeleine', '13001', 620, false, 75, 29, true,  '2027-07-01', true),
  ('a0000001-0000-0000-0000-000000000019', 'b0000000-0000-0000-0000-000000000005', 'Chambre chez habitant Vieux-Port', 'Chambre 10m² chez habitante retraitée, calme, proche fac med.', 'chambre', 'Marseille', '18 rue Paradis', '13006', 400, true,  null, 10, true,  '2027-08-15', true),
  ('a0000001-0000-0000-0000-000000000020', 'b0000000-0000-0000-0000-000000000005', 'Studio Noailles rénové', 'Studio rénové 21m², climatisé, proche métro Noailles.', 'studio', 'Marseille', '3 rue d''Aubagne', '13001', 540, false, 55, 21, true,  '2027-09-01', true)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- Messages (15 exemples)
-- ─────────────────────────────────────────
INSERT INTO messages (annonce_id, expediteur_id, destinataire_id, contenu, lu) VALUES
  -- Étudiants écrivent en premier (règle métier)
  ('a0000001-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Bonjour, le studio est-il encore disponible pour septembre ? Suis étudiant en master.', true),
  ('a0000001-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Bonjour Léandro, oui toujours disponible ! Vous pouvez le visiter samedi matin ?', false),
  ('a0000001-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Parfait, samedi 10h ça me convient. Faut-il apporter des justificatifs ?', false),

  ('a0000001-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'Bonjour, est-ce que le T1 est libre à partir du 1er juillet ?', true),
  ('a0000001-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'Oui, disponible le 1er juillet. Quelle est votre situation (étudiant, garant) ?', false),

  ('a0000001-0000-0000-0000-000000000011', 'e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'Bonjour, je suis en BTS à Bordeaux et cherche un T1 pour juillet. Est-il encore libre ?', true),
  ('a0000001-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 'Oui encore disponible. Pouvez-vous me transmettre vos justificatifs ?', false),
  ('a0000001-0000-0000-0000-000000000011', 'e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'Bien sûr, je vous envoie tout ça ce soir. Peut-on visiter cette semaine ?', false),

  ('a0000001-0000-0000-0000-000000000015', 'e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000004', 'Bonjour ! Je suis en prépa à Toulouse, cherche logement calme. Votre T1 m''intéresse.', true),
  ('a0000001-0000-0000-0000-000000000016', 'e0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000004', 'Bonjour, les chambres en colocation sont-elles toutes indépendantes avec serrure ?', false),

  ('a0000001-0000-0000-0000-000000000018', 'e0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000005', 'Bonjour, le T1 est-il proche de la faculté de médecine de Marseille ?', true),
  ('a0000001-0000-0000-0000-000000000018', 'b0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000005', 'Oui, à 15 minutes à pied ! Très demandé par les étudiants en santé.', false),

  ('a0000001-0000-0000-0000-000000000009', 'e0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000002', 'Bonjour, le wifi est bien inclus dans le loyer ? Et quelle est la vitesse ?', false),
  ('a0000001-0000-0000-0000-000000000012', 'e0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000003', 'Bonjour, ce studio me plairait beaucoup. Je suis en L2 droit à Bordeaux.', false),
  ('a0000001-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 'Bonjour, la chambre chez habitant est encore disponible pour septembre ?', false)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────
-- Avis (10 exemples)
-- ─────────────────────────────────────────
INSERT INTO avis (auteur_id, cible_id, note, commentaire) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 5, 'Marie est une propriétaire très réactive et attentionnée. Appartement impeccable à l''entrée.'),
  ('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 4, 'Bailleur sérieux, réponse rapide. Logement conforme aux photos.'),
  ('e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 5, 'Sophie est très disponible et agréable. Je recommande vivement.'),
  ('e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000004', 3, 'Logement correct, mais quelques réparations à prévoir. Jacques a quand même géré.'),
  ('e0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000005', 4, 'Isabelle est une hôte très sympathique. Chambre propre et bien équipée.'),
  ('b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 5, 'Léandro est un locataire modèle : ponctuel, soigneux, respectueux.'),
  ('b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 4, 'Matti a rendu l''appartement en parfait état. Bonne communication.'),
  ('b0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 5, 'Emma très sérieuse, dossier complet dès le début. Je re-louerais sans hésiter.'),
  ('b0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000004', 4, 'Noah respectueux des règles de la coloc, je recommande.'),
  ('b0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000005', 5, 'Chloé est une locataire parfaite, studieuse et discrète.')
ON CONFLICT (auteur_id, cible_id) DO NOTHING;
