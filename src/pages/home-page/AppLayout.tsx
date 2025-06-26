import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-system px-16 py-16">
      <AppHeader />                  
      <main className="flex-1 pt-16"> 
        <Outlet />
      </main>
    </div>
  );
}
