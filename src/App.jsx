import Structure from "./bmo/structure";
import BmoProvider from "./bmo/state/bmo-provider";
import ExpressionPanel from "./dev/expression-panel";

export default function App() {
  return (
    <BmoProvider>
      <Structure />
      {import.meta.env.DEV && <ExpressionPanel />}
    </BmoProvider>
  )
}
