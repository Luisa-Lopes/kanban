import RoutesApp from "./routes/RoutesApp";
import { AgentBarProvider } from "./contexts/agentBarProvider";
import AgentBar from "./Layout/AgentBar";

function App() {
  return (
    <AgentBarProvider>
      <section className="w-full min-h-screen flex">
        <RoutesApp></RoutesApp>
      </section>
      <AgentBar />
    </AgentBarProvider>
  );
}

export default App;
