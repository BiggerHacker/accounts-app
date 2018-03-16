import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Records from './components/Records'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Records />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
