
import RegisterForm from './components/RegisterForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInForm from './components/SignInForm'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path='signin' element={<SignInForm />} />
      </Routes>

    </Router>
  )
}
export default App
