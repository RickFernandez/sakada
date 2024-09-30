import API_ROUTES from '../apiConfig.js';

const pageService = {
  currentPageUrl: '',

  loadPageData(url) {
    this.showLoader();

    const apiUrl = `${API_ROUTES.pages}&filters[urlReference]=${url}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const pageData = data.data[0]?.attributes;
        if (pageData) {
          this.updatePageHeader(pageData);
        }
      })
      .catch(error => console.error('Erro ao carregar os dados da página:', error))
      .finally(() => {
        this.hideLoader();
      });
  },

  updatePageHeader(pageData) {
    const pageHeaderElement = document.querySelector('.page-header');
    const titleElement = pageHeaderElement.querySelector('.title');

    const title = pageData.pageHeader.title;

    if (title.toLowerCase().includes('projects')) {
      const parts = title.split(' ');
      const projectIndex = parts.findIndex(part => part.toLowerCase() === 'projects');

      titleElement.innerHTML = `
        <span>${parts.slice(0, projectIndex).join(' ')}</span>
        <br />
        ${parts.slice(projectIndex).join(' ')}
      `;
    } else {
      titleElement.textContent = title;
    }

    pageHeaderElement.style.backgroundImage = `url(${pageData.pageHeader.backgroundMedia.data?.attributes.url})`;
    pageHeaderElement.style.backgroundRepeat = 'no-repeat';
    pageHeaderElement.style.backgroundPosition = 'center';
    pageHeaderElement.style.backgroundSize = 'cover';

    document.getElementById('page-content').style.display = 'block';
  },

  showLoader() {
    const loaderOverlay = document.getElementById('loader-overlay');
    loaderOverlay.style.display = 'flex';
  },

  hideLoader() {
    const loaderOverlay = document.getElementById('loader-overlay');
    loaderOverlay.style.display = 'none';
  },

  getPageNameFromUrl(url) {
    return url.replace('/pages/', '').replace('.html', '');
  },

  handleNavigation(url) {
    if (url !== '/' && url !== '/index.html') {
      const pageName = this.getPageNameFromUrl(url);
      this.currentPageUrl = pageName;
      this.loadPageData(pageName);
    }
  },

  init() {
    const initialPath = window.location.pathname;
    this.handleNavigation(initialPath);
  }
};

pageService.init();

export default pageService;
