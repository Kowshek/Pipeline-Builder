// App.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#080812',
    }}>
      <PipelineToolbar />
      <div style={{ flex: 1, position: 'relative', paddingBottom: '60px' }}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;