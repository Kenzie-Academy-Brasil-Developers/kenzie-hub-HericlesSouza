import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../services/api";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [registerError, setRegisterError] = useState(false);
  const userLogged = JSON.parse(localStorage.getItem("@userLogged"));
  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const userRegister = async (infoUser) => {
    const id = toast.loading("Por favor espere...");
    try {
      await api.post("/users", infoUser);

      toast.update(id, {
        render: "Conta criada com sucesso!",
        type: "success",
        isLoading: false,
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate("/");
      }, 1800);
      
    } catch (error) {
      if (error.response.data.message === "Email already exists") {
        setRegisterError(true);
        toast.update(id, {
          render: "Endereço de e-mail já existe!",
          type: "error",
          isLoading: false,
          theme: "dark",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: CloseButton
        });
      }
    }
  };

  const userLogin = async (infoUser) => {
    const id = toast.loading("Por favor espere...");
    try {
      const request = await api.post("/sessions", infoUser);

      toast.update(id, {
        render: "Login efetuado com sucesso!",
        type: "success",
        isLoading: false,
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const userLogged = {
        token: request.data.token,
        id: request.data.user.id,
      };
      localStorage.setItem("@userLogged", JSON.stringify(userLogged));
      
        navigate("/dashboard");
      
    } catch (error) {
      setRegisterError(true);
      toast.update(id, {
        render: "Ops! Algo deu errado!",
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        clearLocalStorage,
        registerError,
        setRegisterError,
        navigate,
        userRegister,
        userLogin,
        userLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
