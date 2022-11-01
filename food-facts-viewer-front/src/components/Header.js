import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <h1 onClick={() => navigate("/")}>Food Facts Viewer</h1>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    267.08deg,
    #79acfa 0%,
    rgba(196, 16, 145, 0.5) 100%
  );
  padding: 15px;
  margin-bottom: 20px;

  h1 {
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    font-style: oblique;

    &:hover {
      cursor: pointer;
    }
  }
`;
