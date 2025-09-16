import { App } from './root-cmp.jsx'
import { Table } from './table-cmp.jsx'

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(
      <div>
        <App />
        <Table />
      </div>
)
    
