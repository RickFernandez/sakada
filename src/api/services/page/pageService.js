import API_ROUTES from '../../apiConfig.js';
import dnaService from '../dna/dnaService.js';
import homeService from '../home/homeService.js';
import initializeProjectFilters from '../../../scripts/filter-project/filter-projects.js';
import digitalSignageService from '../digital-signage/digitalSignageService.js';
import brandingAndDigitalProjectsService from '../branding-and-digital-projects/brandingAndDigitalProjectsService.js';

const pageService = {
  currentPageUrl: '',
  isHomePage: false,

  async loadPageData(url) {
    let apiUrl = this.getApiUrl(url);
    if (!apiUrl) return;

    try {
      this.toggleLoader(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      const pageData = data.data[0]?.attributes;

      if (pageData) {
        this.updatePageHeader(pageData);
        this.routePage(url, pageData);
      }
    } catch (error) {
      console.error('Erro ao carregar os dados da página:', error);
    } finally {
      this.toggleLoader(false);
      if (url.includes('projects')) {
        initializeProjectFilters();
      }
    }
  },

  getApiUrl(url) {
    if (this.isHomePage) {
      return `${API_ROUTES.pages}&filters[pageName]=Home`;
    } else {
      return `${API_ROUTES.pages}&filters[urlReference]=${url}`;
    }
  },

  routePage(url, pageData) {
    if (!url.includes('projects')) {
      switch(url) {
        case '/' || '/index.html':
          homeService.setHomePage(pageData);
          break;
  
        case 'digital-signage':
          digitalSignageService.setDigitalSignagePage(pageData);
          break;

        case 'dna':
          dnaService.setDnaPage(pageData);
          break;
      }
    }
    
    brandingAndDigitalProjectsService.setProjectsPage(pageData);
  },

  updatePageHeader(pageData) {
    if (!pageData.pageHeader) return;

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

    pageHeaderElement.style.backgroundImage = `url(${pageData.pageHeader.backgroundMedia.data?.attributes.url || ''})`;
    pageHeaderElement.style.backgroundRepeat = 'no-repeat';
    pageHeaderElement.style.backgroundPosition = 'center';
    pageHeaderElement.style.backgroundSize = 'cover';

    document.getElementById('page-content').style.display = 'block';
  },

  toggleLoader(show) {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) {
      loaderOverlay.style.display = show ? 'flex' : 'none';
    }
  },

  handleNavigation(url) {
    this.currentPageUrl = !this.isHomePage ? this.getPageNameFromUrl(url) : url;
    this.loadPageData(this.currentPageUrl);
  },

  getPageNameFromUrl(url) {
    this.isHomePage = (url === '/' || url === '/index.html');
    return url.replace('/pages/', '').replace('.html', '');
  },

  init() {
    const initialPath = window.location.pathname;
    this.handleNavigation(initialPath);
  }
};

pageService.init();

export default pageService;
