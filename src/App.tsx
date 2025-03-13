import { useState } from 'react'
import {RegistrationPatient} from './pages/cadastro_paciente';
import './App.css'
import { Header } from './components/header';
import { Footer } from './components/footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <RegistrationPatient />
      <Footer />
    </>
  )
}

export default App
