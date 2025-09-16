import { CountDown } from './count-down.jsx'
import { App } from './root-cmp.jsx'
import { SeasonClock } from './season-clock-cmp.jsx'
import { SelectedWatcher } from './selectedWatcher-cmp.jsx'
import { Table } from './table-cmp.jsx'
import { Watchers } from './watchers-cmp.jsx'



const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(
      <div>
        <App />
        <Watchers />
        <SelectedWatcher />
      </div>
)
    
