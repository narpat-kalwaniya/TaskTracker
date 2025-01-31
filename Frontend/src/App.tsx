import './App.css'
import NavBar from './layout/AppBar'
import { CssBaseline, ThemeProvider } from '@mui/material'
import TaskTracker from './pages/TaskTracker'
import theme from './theme'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>
<TaskTracker/>
    </ThemeProvider>
    
  )
}

export default App
