import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailFact from "./pages/DetailFact";
import FoodFactList from "./pages/FoodFactList";
import GlobalStyle from "./theme/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FoodFactList />} />
          <Route path="/:page" element={<FoodFactList />} />
          <Route path="/product/:code" element={<DetailFact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;