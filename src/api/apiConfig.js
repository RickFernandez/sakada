const API_URL = import.meta.env.VITE_API_BASE_URL;

const API_ROUTES = {
  team: `${API_URL}/team?populate[employees][populate][picture][fields][0]=url`,
  categories: `${API_URL}/categories?populate[projects][fields][0]=referenceUrl&populate[projects][fields][1]=projectName&populate[projectFilters][fields][0]=name`,
  pages: `${API_URL}/pages?populate[pageHeader][populate][backgroundMedia][fields][0]=ur&populate[projects][fields][0]=referenceUrl&populate[projects][populate][wallpaperMedia][fields][0]=url&populate[projects][populate][project_filters][fields][0]=name&populate[project_filters][fields][0]=name&populate[team][populate][employee][fields][0]=name&populate[team][populate][employee][fields][1]=description&populate[team][populate][employee][populate][picture][fields][0]=url&populate[clients][populate][client][populate][logo][fields][0]=url&populate[topic][populate][simple_content][populate][image][fields][0]=url&populate[simple_contents][populate][image][fields][0]=url`,
  projects: `${API_URL}/projects?populate[presentationMedia][fields][0]=url&populate[wallpaperMedia][fields][0]=url&populate[challengeMedias][fields][0]=url&populate[solutionMedia][fields][0]=url&populate[testimonyMedias][fields][0]=url&populate[header][populate][backgroundMedia][fields][0]=url&populate[testimony][populate][picture][fields][0]=url`,
  projectFilters: `${API_URL}/project-filters?populate[projects][fields][0]=referenceUrl&populate[projects][fields][1]=projectName&populate[categories][fields][0]=name`,
  client: `${API_URL}/client?populate[client][populate][logo][fields][0]=url`
}

export default API_ROUTES;