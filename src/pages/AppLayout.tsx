import { useState, useEffect } from "react";
import { Outlet, useLocation, matchPath, useNavigate } from "react-router-dom"; 
import { AppHeader } from "./AppHeader";

export const AppLayout = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const isFightArena = !!matchPath("/fighting-arena-page", location.pathname);

  //render the selection of the tab according to the path
  const [activeTab, setActiveTab] = useState(() => {
    if (matchPath("/all-pokemons", location.pathname)) {
      return "all pokemons";
    }
    if (matchPath("/my-pokemons", location.pathname)) {
      return "my pokemons";
    }
    return "";
  });
  

  useEffect(() => {
      if (isFightArena) {
        setActiveTab(""); 
      } else {
        if (matchPath("/all-pokemons", location.pathname)) {
          setActiveTab("all pokemons");
        } else if (matchPath("/my-pokemons", location.pathname)) {
          setActiveTab("my pokemons");
        }
        else if (!activeTab) { 
          setActiveTab("all pokemons"); 
          navigate("/all-pokemons", { replace: true }); 
        }
      }
    }, [location.pathname, isFightArena, activeTab, navigate]); 



  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName); 
    if (tabName === "all pokemons") {
      navigate("/all-pokemons");
    } else if (tabName === "my pokemons") {
      navigate("/my-pokemons");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-system px-4 py-12">
      <AppHeader
        activeTab={activeTab}
        onTabChange={handleTabChange} 
      />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  );
}