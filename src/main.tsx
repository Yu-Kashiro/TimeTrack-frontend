import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TimeEntry } from './routes/TimeEntry.tsx'
import { SignUp } from './routes/SignUp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="time-entry" element={<TimeEntry />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
