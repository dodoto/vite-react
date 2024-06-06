import './App.css'
import {ChakraProvider} from '@chakra-ui/react';
import {Theme} from './theme';
import {BrowserRouter} from './router/router';
import '@fontsource/work-sans/400.css';
import 'lxgw-wenkai-lite-webfont/style.css';

function App() {
  return (
    <ChakraProvider theme={Theme}>
      <div className="App">
        <BrowserRouter />
      </div>
    </ChakraProvider>
  )
}

export default App;

