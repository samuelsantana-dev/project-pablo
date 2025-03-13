import { useState } from 'react'
import {RegistrationPatient} from './pages/cadastro_paciente';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegistrationPatient />
    </>
  )
}

export default App
