import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DeepfakeDetection from './Deepfakedetection';

export const Dashboard = ()=>{
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <DeepfakeDetection />
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}