import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import App from '../ui/App'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
