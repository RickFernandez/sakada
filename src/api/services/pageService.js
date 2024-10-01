import API_ROUTES from '../apiConfig.js';
import initializeProjectFilters from '../../../scripts/projects.js';

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
          if (url.includes('projects')) {
            this.updateProjectsPage(pageData);
          }
        }
      })
      .catch(error => console.error('Erro ao carregar os dados da página:', error))
      .finally(() => {
        this.hideLoader();
        if (url.includes('projects')) {
          initializeProjectFilters();
        }
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

    pageHeaderElement.style.backgroundImage = `url(${pageData.pageHeader.backgroundMedia.data?.attributes.url || ''})`;
    pageHeaderElement.style.backgroundRepeat = 'no-repeat';
    pageHeaderElement.style.backgroundPosition = 'center';
    pageHeaderElement.style.backgroundSize = 'cover';

    document.getElementById('page-content').style.display = 'block';
  },

  updateProjectsPage(pageData) {
    this.generateProjectFilters(pageData.project_filters);
    this.generateProjects(pageData.projects);
  },

  generateProjectFilters(filters) {
    const filterContainer = document.querySelector('.filter');
    const filterMobileContainer = document.querySelector('.filter-mobile .filter-options');

    filterContainer.innerHTML = '';
    filterMobileContainer.innerHTML = '<div class="filter-header"><span>Filter</span><img class="close-filter-btn" src="/assets/icons/close-menu-icon.svg" alt="" /></div>';

    this.createFilterButton(filterContainer, 'all', 'All');
    this.createFilterButton(filterMobileContainer, 'all', 'All');

    filters.data.forEach(filter => {
      const filterName = filter.attributes.name.toLowerCase().replace(/ /g, '-');
      this.createFilterButton(filterContainer, filterName, filter.attributes.name);
      this.createFilterButton(filterMobileContainer, filterName, filter.attributes.name);
    });
  },

  createFilterButton(container, filterName, displayName) {
    const button = document.createElement('button');
    button.className = container.classList.contains('filter-options') ? 'btn-mobile' : 'btn';
    button.setAttribute('data-filter', filterName);
    button.textContent = displayName;
    container.appendChild(button);
  },

  generateProjects(projects) {
    const projectsContainer = document.querySelector('.projects');

    projectsContainer.innerHTML = '';

    projects.data.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project';

      const filters = project.attributes.project_filters.data.map(filter =>
        filter.attributes.name.toLowerCase().replace(/ /g, '-')
      );
      projectElement.classList.add(...filters);

      const imgElement = document.createElement('img');
      imgElement.src = project.attributes.wallpaperMedia.data?.attributes.url || '';
      imgElement.alt = '';

      const viewProjectElement = document.createElement('div');
      viewProjectElement.className = 'view-project';

      const linkElement = document.createElement('a');
      linkElement.href = project.attributes.referenceUrl || '#';
      linkElement.textContent = 'Ver Projeto';

      const arrowImgElement = document.createElement('img');
      arrowImgElement.src = '../assets/icons/arrow-right-icon.svg';
      arrowImgElement.alt = '';

      viewProjectElement.appendChild(linkElement);
      viewProjectElement.appendChild(arrowImgElement);
      projectElement.appendChild(imgElement);
      projectElement.appendChild(viewProjectElement);

      projectsContainer.appendChild(projectElement);
    });
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
