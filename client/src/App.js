
import RegisterForm from './components/RegisterForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInForm from './components/SignInForm'
import Home from './pages/Home'
import Welcome from './components/Welcome'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public */}
          <Route index element={<Home />} />
          <Route path='register' element={<RegisterForm />} />
          <Route path='signin' element={<SignInForm />} />
          {/* user only */}
          <Route element={<RequireAuth />}>
            <Route path='welcome' element={<Welcome />} />
          </Route>

        </Route>
      </Routes>

    </Router >
  )
}
export default App
