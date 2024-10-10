import API_ROUTES from '/src/api/apiConfig';

const headerService = {
  async setNavigation() {
    const navigationData = await this.fetchNavigationData();
    this.updateNavigation(navigationData);
  },

  async fetchNavigationData() {
    try {
      const response = await fetch(API_ROUTES.navigation);
      const data = await response.json();
      return data?.data?.attributes?.navigation_item || [];
    } catch (error) {
      console.error('Erro ao carregar dados de navegação:', error);
      return [];
    }
  },

  updateNavigation(navigationData) {
    const navigationContainer = document.querySelector('.menu-navigation');

    const ulElement = document.createElement('ul');
    ulElement.classList.add('navigation-list')

    navigationData.forEach(item => {

      const liElement = document.createElement('li');
      liElement.classList.add('navigation-item')

      const aElement = document.createElement('a');
      aElement.classList.add('navigation-item-link')

      const spanElement = document.createElement('span');
      spanElement.classList.add('navigation-item-description')

      if (item.title.toLowerCase() === 'hello' && !item.referenceUrlPage) {
        aElement.href = '/';
      } else {
        const referenceUrl = item.referenceUrlPage ? item.referenceUrlPage : '';
          aElement.href = `/src/pages/${referenceUrl}/${referenceUrl}.html`;
      }

      aElement.textContent = item.title;
      spanElement.textContent = item.description;

      ulElement.appendChild(liElement);
      liElement.appendChild(aElement);
      liElement.appendChild(spanElement);
      navigationContainer.appendChild(ulElement);
    });
  }
};

export default headerService;
