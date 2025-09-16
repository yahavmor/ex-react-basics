import { CountDown } from './count-down.jsx'
import { App } from './root-cmp.jsx'
import { SeasonClock } from './season-clock-cmp.jsx'
import { Table } from './table-cmp.jsx'

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(
      <div>
        <App />
        <CountDown toTime={Date.now() + 1000*60} startFrom={10} onDone={()=>{ console.log('Done!') }} />
      </div>
)
    
