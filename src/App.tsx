import { GameProvider } from './game/GameContext';
import DesktopTerminal from './components/DesktopTerminal';

function App() {
  return (
    <GameProvider>
      <DesktopTerminal />
    </GameProvider>
  );
}

export default App;
