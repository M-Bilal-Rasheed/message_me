import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from '@heroui/react';
import { ThemeProvider } from './context/ThemeContext';
import { WallpaperProvider } from './context/WallpaperContext';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';  
import {useAuth} from "@clerk/react"
import { useAuthStore } from './store/useAuthStore';
import { Navigate } from 'react-router-dom';
import PageLoader from './components/PageLoader';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
function App() {

 const { isSignedIn , isLoaded } = useAuth();

 const {checkAuth,clearAuth,isCheckingAuth} = useAuthStore();

 useEffect(() => {
  if(!isLoaded) return;
  if(isSignedIn) {
    checkAuth();
  } else {
    clearAuth();
  }
},[checkAuth,clearAuth,isSignedIn,isLoaded])

 if(!isLoaded || (isSignedIn && isCheckingAuth )) return <PageLoader/>
  return (
    <ThemeProvider>
      <WallpaperProvider>
       <Routes>
          <Route path="/" element={isSignedIn?<ChatPage />:<Navigate to={"/auth"} replace />} />

          <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to="/" replace />} />
          
        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  )
}
export default App
