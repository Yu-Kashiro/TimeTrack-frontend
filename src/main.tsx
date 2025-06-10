import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Registration } from './pages/Registration.tsx'
import { SignUp } from './pages/SignUp.tsx'
import { SignIn } from './pages/SignIn.tsx'
import { WorkTimes } from './pages/WorkTimes.tsx'
import { Detail } from './pages/WorkTimeDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="signin" replace />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="work_times/registration" element={<Registration />} />
            <Route path="work_times/index" element={<WorkTimes />} />
            <Route path="work_times/detail" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
