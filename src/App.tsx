import { Dashboard } from './components/layout/Dashboard'
import { Header } from './components/layout/Header'

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50">
      <Header />
      <Dashboard />
    </div>
  )
}

export default App
