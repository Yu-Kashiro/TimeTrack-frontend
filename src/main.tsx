import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TimeEntry } from './routes/TimeEntry.tsx'
import { SignUp } from './routes/SignUp.tsx'
import { SignIn } from './routes/SignIn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="signin" replace />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="time-entry" element={<TimeEntry />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
