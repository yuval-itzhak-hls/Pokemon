
import axios from "axios";

export const getPokemons = async (params: any, token: string) => {
    const res = await axios.get('http://localhost:3000/pokemons', {
        params,
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return res;
}