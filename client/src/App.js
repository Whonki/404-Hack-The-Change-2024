import TestDataGenerator from "./Test_generator";
import * as firebaseOperations from './firebase-operations';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TestDataGenerator firebaseAdmin={firebaseOperations} />
      </header>
    </div>
  );
}

export default App;
