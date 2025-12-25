import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/navbar';

//pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CreateParty from './pages/CreateParty';
import PartyRoom from './pages/PartyRoom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="min-h-screen bg-background-dark text-white font-display pt-24 px-4">

        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Landing />} />       {/* / */}
          <Route path="/auth" element={<Auth />} />      {/*/auth */}

          {/* Private/User Pages */}
          <Route path="/home" element={<Dashboard />} /> {/* /home */}

          {/* Party Pages */}
          <Route path="/party/create" element={<CreateParty />} /> {/* /party/create */}

          {/* Dynamic Route: The ":id" lets you have infinite party rooms like /party/MZ-8821 */}
          <Route path="/party/:id" element={<PartyRoom />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;