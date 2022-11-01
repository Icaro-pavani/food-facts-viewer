import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function FoodFactList() {
  const [products, setProducts] = useState([]);
  let { page } = useParams();

  page = parseInt(page);

  if (!page || page < 1) {
    page = 1;
  }

  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const URL = process.env.REACT_APP_API;
      const productsResult = await axios.get(`${URL}/products?page=${page}`);
      setProducts(productsResult.data);
    }

    getProducts();
  }, [page]);

  return (
    <Container>
      <ListContainer>
        {products.length > 0
          ? products.map((food) => (
              <li key={food._id}>
                <img src={food.image_url} alt={food.product_name} />
                <InfoContainer>
                  <h2>{food.product_name}</h2>
                  <h3>
                    <span>Marca:</span> {food.brands}
                  </h3>
                  <h3>
                    <span>Categorias:</span> {food.categories}
                  </h3>
                  <h3>
                    <span>Nota de Nutrição:</span> {food.nutriscore_grade}
                  </h3>
                </InfoContainer>
                <button>Abrir</button>
              </li>
            ))
          : ""}
      </ListContainer>
      <PagesContainer>
        {!page || page <= 1 ? (
          ""
        ) : (
          <button onClick={() => navigate(`/${page - 1}`)}>Anterior</button>
        )}
        <p>{page}</p>
        <button onClick={() => navigate(`/${page + 1}`)}>Próxima</button>
      </PagesContainer>
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

const ListContainer = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 550px;
    padding: 10px;
    background-color: #f2f2f2;
    border-radius: 10px;

    img {
      height: 140px;
      width: 140px;
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
  }
`;

const InfoContainer = styled.div`
  h2 {
    width: 200px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  h3 {
    width: 200px;
    margin-bottom: 3px;

    span {
      font-weight: bold;
    }
  }
`;

const PagesContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    font-weight: bold;
    margin: 0 5px;
  }

  button {
    width: 70px;
    height: 30px;
    color: #f2f2f2;
    background-color: #2273ec;
    border: none;
    border-radius: 5px;
    font-size: 14px;

    &:hover {
      background-color: #2233ec;
      cursor: pointer;
    }
  }
`;
