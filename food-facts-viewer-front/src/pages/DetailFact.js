import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import api from "../services/api";

export default function DetailFact() {
  const { code } = useParams();
  const [food, setFood] = useState({});

  useEffect(() => {
    async function getFoodFact() {
      const result = await api.getProductByCode(code);
      setFood(result.data);
    }

    getFoodFact();
  }, [code]);
  return (
    <Container>
      <Header />
      <FoodContainer>
        <img src={food.image_url} alt={food.product_name} />
        <InfoContainer>
          <h2>{food.product_name}</h2>
          <h3>
            <span>Código:</span> {food.code}
          </h3>
          <h3>
            <span>Marca:</span> {food.brands}
          </h3>
          <h3>
            <span>Quantidade:</span> {food.quantity}
          </h3>
          <h3>
            <span>Categorias:</span> {food.categories}
          </h3>
          <h3>
            <span>Observações:</span> {food.labels}
          </h3>
          <h3>
            <span>Cidades:</span> {food.cities}
          </h3>
          <h3>
            <span>Onde Comprar:</span> {food.purchase_places}
          </h3>
          <h3>
            <span>Lojas:</span> {food.stores}
          </h3>
          <h3>
            <span>Ingredientes:</span> {food.ingredients_text}
          </h3>
          <h3>
            <span>Traços:</span> {food.traces}
          </h3>
          <h3>
            <span>Porção:</span> {food.serving_size}
          </h3>
          <h3>
            <span>Porção:</span> {food.serving_size}
          </h3>
          <h3>
            <span>Valor de Nutrição:</span> {food.nutriscore_score}
          </h3>
          <h3>
            <span>Nota de Nutrição:</span> {food.nutriscore_grade}
          </h3>
        </InfoContainer>
        <button>Editar</button>
      </FoodContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  background-color: #fff;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 10px;
`;

const FoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 550px;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 10px;

  img {
    width: 340px;
    margin-bottom: 20px;
  }

  button {
    width: 90px;
    height: 40px;
    color: #f2f2f2;
    background-color: #2273ec;
    border: none;
    border-radius: 5px;
    font-size: 16px;

    &:hover {
      background-color: #2233ec;
      cursor: pointer;
    }
  }
`;

const InfoContainer = styled.div`
  h2 {
    width: 500px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  h3 {
    width: 500px;
    margin-bottom: 5px;

    span {
      font-weight: bold;
    }
  }
`;
