import { Dashboard } from './components/layout/Dashboard'
import { Header } from './components/layout/Header'

function App() {
  return (
    <div className="custom-background relative flex min-h-svh flex-col">
      <Header />
      <Dashboard />
    </div>
  )
}

export default App
