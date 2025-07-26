export function getDisabledBattlePokemonIds(): string[] {
  if (typeof window === "undefined") return [];
  if (!window.location.pathname.includes("fighting-arena-page")) return [];

  const battleData = localStorage.getItem("battle");
  if (battleData) {
    try {
      const battle = JSON.parse(battleData);
      if (battle?.user?.id) {
        return [battle.user.id];
      }
    } catch {}
  }
  return [];
}