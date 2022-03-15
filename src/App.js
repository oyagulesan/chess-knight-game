import './App.css';
import Canvas from './components/Canvas';
import { AppProvider } from './context/appContext';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Canvas />
      </AppProvider>
    </div>
  );
}

export default App;
