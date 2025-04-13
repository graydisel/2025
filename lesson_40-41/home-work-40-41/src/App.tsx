import { useState } from 'react'
import ControlledForm from './components/ControlledForm';
import UncontrolledForm from './components/UncontrolledForm';
import DataFetcher from './components/DataFetcher';
import './App.css'

function App() {
    const [userId, setUserId] = useState<number>(1);
  return (
    <>
        <div style={{ padding: '1rem' }}>
            <h1>React + TypeScript: Forms & Fetch</h1>

            <ControlledForm />
            <UncontrolledForm />

            <hr />
            <h2>Завантаження даних</h2>
            <button onClick={() => setUserId((prev) => prev + 1)}>
                Наступний користувач
            </button>
            <DataFetcher userId={userId} />
        </div>
    </>
  )
}

export default App
