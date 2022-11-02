import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailFact from "./pages/DetailFact";
import EditFoodFact from "./pages/EditFoodFact";
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
          <Route path="/edit/:code" element={<EditFoodFact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
