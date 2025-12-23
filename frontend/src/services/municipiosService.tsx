import axios from "axios";

// Pega a URL da API do IBGE do .env
const IBGE_API_URL = import.meta.env.VITE_IBGE_API_URL;

// Função para buscar todos os municípios
export async function getAllMunicipios() {
  try {
    const response = await axios.get(IBGE_API_URL);

    if (Array.isArray(response.data)) {
      return response.data.map((municipio: any) => {
        const nome = municipio.nome || "N/A";
        const estado = municipio.microrregiao?.mesorregiao?.UF?.sigla || "N/A";

        return {
          id: municipio.id,
          nome,
          estado,
          label: `${nome} - ${estado}`,
        };
      });
    } else {
      console.error("A resposta não é um array", response.data);
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar municípios:", error);
    return [];
  }
}
