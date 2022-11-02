import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import api from "../services/api";

export default function EditFoodFact() {
  const [updateData, setUpdateData] = useState({
    status: "",
    categories: "",
    traces: "",
    ingredients_text: "",
    nutriscore_score: 0,
    nutriscore_grade: "",
  });
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getFoodFactDetail() {
      const result = await api.getProductByCode(code);
      const {
        status,
        categories,
        trace,
        ingredients_text,
        nutriscore_score,
        nutriscore_grade,
      } = result.data;
      setUpdateData((prevState) => ({
        ...prevState,
        status,
        categories,
        trace,
        ingredients_text,
        nutriscore_grade,
        nutriscore_score,
      }));
    }

    getFoodFactDetail();
  }, [code]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdateData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.updateFoodFact(code, updateData);
      navigate(-1);
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <EditContainer>
      <Header />
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <label htmlFor="status">Status: </label>
          <select
            id="status"
            name="status"
            type="text"
            onChange={handleChange}
            value={updateData.status}
          >
            <option value="published">published</option>
            <option value="draft">draft</option>
          </select>
        </InputContainer>
        <InputContainer>
          <label htmlFor="categories">Categorias: </label>
          <input
            id="categories"
            name="categories"
            type="text"
            value={updateData.categories}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="traces">Traços: </label>
          <input
            id="traces"
            name="traces"
            type="text"
            value={updateData.traces}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="ingredients_text">Ingredientes: </label>
          <textarea
            id="ingredients_text"
            name="ingredients_text"
            type="text"
            value={updateData.ingredients_text}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="nutriscore_score">Valor de Nutrição: </label>
          <input
            id="nutriscore_score"
            name="nutriscore_score"
            type="number"
            value={updateData.nutriscore_score}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="nutriscore_grade">Nota de Nutrição: </label>
          <input
            id="nutriscore_grade"
            name="nutriscore_grade"
            type="text"
            value={updateData.nutriscore_grade}
            onChange={handleChange}
          />
        </InputContainer>
        <button type="submit">Confirmar</button>
      </form>
    </EditContainer>
  );
}

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  background-color: #fff;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 10px;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 0 20%;

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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-weight: bold;
  }

  select,
  input {
    height: 30px;
    font-size: 16px;
    padding-left: 5px;
  }

  textarea {
    height: 80px;
    font-size: 16px;
    padding-left: 5px;
  }
`;
