import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'

const HomePage = lazy(() => import('./pages/HomePage'))
const AnnoncesPage = lazy(() => import('./pages/AnnoncesPage'))
const AnnoncePage = lazy(() => import('./pages/AnnoncePage'))
const InscriptionPage = lazy(() => import('./pages/InscriptionPage'))
const ConnexionPage = lazy(() => import('./pages/ConnexionPage'))
const ProfilEtudiantPage = lazy(() => import('./pages/ProfilEtudiantPage'))
const ProfilBailleurPage = lazy(() => import('./pages/ProfilBailleurPage'))
const MessageriePage = lazy(() => import('./pages/MessageriePage'))
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'))
const PolitiqueConfidentialitePage = lazy(() => import('./pages/PolitiqueConfidentialitePage'))
const CGUPage = lazy(() => import('./pages/CGUPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="spinner" aria-label="Chargement..." />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[var(--bg)]">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/annonces" element={<AnnoncesPage />} />
            <Route path="/annonces/:id" element={<AnnoncePage />} />
            <Route path="/inscription" element={<InscriptionPage />} />
            <Route path="/connexion" element={<ConnexionPage />} />
            <Route path="/profil/etudiant" element={<ProtectedRoute><ProfilEtudiantPage /></ProtectedRoute>} />
            <Route path="/profil/bailleur" element={<ProtectedRoute><ProfilBailleurPage /></ProtectedRoute>} />
            <Route path="/messagerie" element={<ProtectedRoute><MessageriePage /></ProtectedRoute>} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="/cgu" element={<CGUPage />} />
            <Route path="/profil" element={<Navigate to="/profil/etudiant" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  )
}
