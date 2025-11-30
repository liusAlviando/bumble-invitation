import { BrowserRouter } from 'react-router-dom';
import RouterIndex from './route';
import { AudioProvider } from './contexts/AudioProvider';

function App() {
return (
  <AudioProvider>
    <BrowserRouter>
        <RouterIndex />
    </BrowserRouter>
  </AudioProvider>
)
}

export default App
