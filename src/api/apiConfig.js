// Lê a variável de ambiente para definir a URL base
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Define as rotas das APIs
const API_ROUTES = {
  team: `${API_URL}/team?populate[employees][populate][picture][fields][0]=url`,
  categories: `${API_URL}/categories?populate[projects][fields][0]=referenceUrl&populate[projects][fields][1]=projectName&populate[projectFilters][fields][0]=name`,
  pages: `${API_URL}/pages?populate[pageHeader][populate][backgroundMedia][fields][0]=url`,
  projects: `${API_URL}/projects?populate[presentationMedia][fields][0]=url&populate[challengeMedias][fields][0]=url&populate[solutionMedia][fields][0]=url&populate[testimonyMedias][fields][0]=url&populate[header][populate][backgroundMedia][fields][0]=url`,
  projectFilters: `${API_URL}/project-filters?populate[projects][fields][0]=referenceUrl&populate[projects][fields][1]=projectName&populate[categories][fields][0]=name`
}

export default API_ROUTES;
