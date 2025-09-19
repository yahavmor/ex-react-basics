import { CountDown } from './cmps/count-down.jsx'
import { MouseMonitor } from './cmps/mouse-monitor.jsx'
import { App } from './cmps/root-cmp.jsx'
import { SeasonClock } from './cmps/season-clock-cmp.jsx'
import { Table } from './cmps/table-cmp.jsx'
import { Watchers } from './cmps/watchers-cmp.jsx'




const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(
      <div>
        <MouseMonitor/>
      </div>
)
    
