import "./App.css";
import Board from "./components/Board";
import Colors from "./Colors";

function App() {
  return (
    <div className="App">
      <h1>
        <span style={{ color: Colors.Noughts }}>Noughts</span> &{" "}
        <span style={{ color: Colors.Crosses }}>Crosses</span>
      </h1>
      <Board size={9} />
    </div>
  );
}

export default App;
