import { PersonButton, StyledDiv, Trash } from "./style";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Kenzie_Hub.svg";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import "animate.css";
import { Button } from "../../components/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

export const Dashboard = () => {
  const [infoUser, setInfoUser] = useState({});
  const [checkUserLogged, setCheckUserLogged] = useState(true);
  const navigate = useNavigate();
  const userLogged = JSON.parse(localStorage.getItem("@userLogged"));

  useEffect(() => {
    if (!userLogged) {
      setCheckUserLogged(false);
    }
    if (!checkUserLogged) {
      navigate("/");
    }
  }, [checkUserLogged]);

  useEffect(() => {
    if (userLogged) {
      const checkUser = async () => {
        try {
          const request = await api.get(`/users/${userLogged.id}`);
          setInfoUser(request.data);
        } catch (error) {
          console.log(error);
        }
      };
      checkUser();
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <StyledDiv className="animate__animated animate__fadeInLeftBig">
      <header>
        <div className="container">
          <img src={Logo} alt="Logo Kenzie Hub" />
          <Link to={"/"} onClick={() => clearLocalStorage()}>
            Desconectar
          </Link>
        </div>
      </header>
      <section>
        <div className="container">
          <h1>Olá, {infoUser.name}</h1>
          <p>{infoUser.course_module}</p>
        </div>
      </section>
      <section className="container">
        <div>
          <h2>Tecnologias</h2>
          <Button type="button" color="btnGreyDark" size="small" width="32">
            <AiOutlinePlusCircle size={"30px"} />
          </Button>
        </div>
        <div className="div-list-technologies">
          <ul>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
            <li>
              <h2>React JS</h2>
              <div>
                <span>Intermediário</span>
                <button>
                  <Trash />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </StyledDiv>
  );
};
