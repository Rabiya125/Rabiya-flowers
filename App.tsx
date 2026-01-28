import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import ChatAssistant from './components/ChatAssistant';
import ContactSticky from './components/ContactSticky';
import Footer from './components/Footer';
import AddFlowerModal from './components/AddFlowerModal';
import LoginModal from './components/LoginModal';
import AdminSettingsModal from './components/AdminSettingsModal';
import { FLOWERS } from './constants';
import { Flower } from './types';

const App: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminSettingsOpen, setIsAdminSettingsOpen] = useState(false);
  
  const [flowerToEdit, setFlowerToEdit] = useState<Flower | null>(null);
  const [initialCategory, setInitialCategory] = useState<string>('Roses');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin Credentials & Business Info state
  const [adminConfig, setAdminConfig] = useState({
    email: 'jalkhjean@gmail.com',
    password: 'jalkhjean@?!123',
    address: 'Rabieh, Lebanon'
  });

  // Load data from local storage on mount
  useEffect(() => {
    // 1. Load Flowers
    const savedFlowers = localStorage.getItem('rabiehFlowers_v2'); 
    if (savedFlowers) {
      try {
        setFlowers(JSON.parse(savedFlowers));
      } catch (e) {
        setFlowers(FLOWERS);
      }
    } else {
      setFlowers(FLOWERS);
    }

    // 2. Load Admin Credentials (if changed previously)
    const savedAdminConfig = localStorage.getItem('rabiehAdminConfig');
    if (savedAdminConfig) {
      try {
        setAdminConfig(JSON.parse(savedAdminConfig));
      } catch(e) {
        console.error("Error parsing admin config");
      }
    }
    
    // 3. Check Login Session
    const sessionAdmin = sessionStorage.getItem('rabiehAdmin');
    if (sessionAdmin === 'true') {
      setIsAdmin(true);
    }

    setIsLoaded(true);
  }, []);

  // Save to local storage whenever flowers change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('rabiehFlowers_v2', JSON.stringify(flowers));
    }
  }, [flowers, isLoaded]);

  // Login Logic: Check Credentials
  const handleLoginSubmit = (email: string, pass: string) => {
    if (email === adminConfig.email && pass === adminConfig.password) {
      setIsAdmin(true);
      sessionStorage.setItem('rabiehAdmin', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
        setIsAdmin(false);
        sessionStorage.removeItem('rabiehAdmin');
    }
  };

  // Update Settings Logic
  const handleUpdateSettings = (newConfig: typeof adminConfig) => {
    setAdminConfig(newConfig);
    localStorage.setItem('rabiehAdminConfig', JSON.stringify(newConfig));
  };

  const handleSaveFlower = (flower: Flower) => {
    setFlowers(prev => {
      const exists = prev.some(f => f.id === flower.id);
      if (exists) {
        return prev.map(f => f.id === flower.id ? flower : f);
      }
      return [...prev, flower];
    });
    setIsUploadModalOpen(false);
    setFlowerToEdit(null);
  };

  const handleDeleteFlower = (id: string) => {
    if (window.confirm("Are you sure you want to delete this flower? This cannot be undone.")) {
      setFlowers(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleEditFlower = (flower: Flower) => {
    setFlowerToEdit(flower);
    setIsUploadModalOpen(true);
  };

  const handleOpenAdd = (category?: string) => {
    setFlowerToEdit(null);
    setInitialCategory(category || 'Roses');
    setIsUploadModalOpen(true);
  };

  const availableCategories = Array.from(new Set([
    'Roses', 
    'Plants', 
    'Indoor',
    'Outdoor',
    'Arrangement', 
    'Bouquet', 
    ...flowers.map(f => f.category)
  ])).sort();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onOpenUpload={() => handleOpenAdd()} 
        isAdmin={isAdmin}
        onLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenSettings={() => setIsAdminSettingsOpen(true)}
      />
      <main>
        <Hero />
        <Gallery 
          flowers={flowers} 
          onDelete={handleDeleteFlower} 
          onEdit={handleEditFlower} 
          isAdmin={isAdmin}
        />
        <Stats 
          onAddItem={handleOpenAdd} 
          isAdmin={isAdmin}
          address={adminConfig.address}
        />
      </main>
      <Footer 
        isAdmin={isAdmin} 
        onLogin={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout} 
      />
      <ContactSticky />
      <ChatAssistant />
      
      {/* Modals */}
      <AddFlowerModal 
        isOpen={isUploadModalOpen} 
        onClose={() => {
          setIsUploadModalOpen(false);
          setFlowerToEdit(null);
        }} 
        onSave={handleSaveFlower}
        flowerToEdit={flowerToEdit}
        existingCategories={availableCategories}
        initialCategory={initialCategory}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSubmit}
      />

      <AdminSettingsModal 
        isOpen={isAdminSettingsOpen}
        onClose={() => setIsAdminSettingsOpen(false)}
        currentConfig={adminConfig}
        onUpdate={handleUpdateSettings}
      />
      
      {/* Admin Banner */}
      {isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white text-xs py-1 px-4 text-center z-[100] md:hidden">
            Owner Mode Active
        </div>
      )}
    </div>
  );
};

export default App;