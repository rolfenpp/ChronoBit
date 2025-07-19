import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Vault from './Pages/Vault'
import Claim from './Pages/Claim'
import Navigation from './Components/Navigation'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Profile from './Pages/Profile';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<Claim />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/claim" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </QueryClientProvider>
  )
}

export default App
