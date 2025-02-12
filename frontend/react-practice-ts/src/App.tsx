
import './App.css'
import { ApprovalWriteHeader } from './components/approval/approvalWriteHeader'
import ApprovalLineModal from './components/approval/approvalLineModal'

function App() {
  return (
    <div id="container">
      <ApprovalWriteHeader/>
      <ApprovalLineModal/>
    </div>
  );
}

export default App;
