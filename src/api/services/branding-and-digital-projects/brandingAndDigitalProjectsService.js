import projectService from '/src/api/services/project/projectService.js'

const brandingAndDigitalProjectsService = {
  setProjectsPage(pageData) {
    this.generateProjectFilters(pageData.project_filters)
    this.generateProjects(pageData.projects)
  },

  generateProjectFilters(filters) {
    const filterContainer = document.querySelector('.filter')
    const filterMobileContainer = document.querySelector(
      '.filter-mobile .filter-options'
    )

    filterContainer.innerHTML = ''
    filterMobileContainer.innerHTML =
      '<div class="filter-header"><span>Filter</span><img class="close-filter-btn" src="/assets/icons/close-menu-icon.svg" alt="" /></div>'

    this.createFilterButton(filterContainer, 'all', 'All')
    this.createFilterButton(filterMobileContainer, 'all', 'All')

    filters.data.forEach(filter => {
      const filterName = filter.attributes.name.toLowerCase().replace(/ /g, '-')
      this.createFilterButton(
        filterContainer,
        filterName,
        filter.attributes.name
      )
      this.createFilterButton(
        filterMobileContainer,
        filterName,
        filter.attributes.name
      )
    })
  },

  createFilterButton(container, filterName, displayName) {
    const button = document.createElement('button')
    button.className = container.classList.contains('filter-options')
      ? 'btn-mobile'
      : 'btn'
    button.setAttribute('data-filter', filterName)
    button.textContent = displayName
    container.appendChild(button)
  },

  generateProjects(projects) {
    const projectsContainer = document.querySelector('.projects')

    projectsContainer.innerHTML = ''

    projects.data.forEach(project => {
      const projectElement = document.createElement('div')
      projectElement.className = 'project'

      const filters = project.attributes.project_filters.data.map(filter =>
        filter.attributes.name.toLowerCase().replace(/ /g, '-')
      )
      projectElement.classList.add(...filters)

      const imgElement = document.createElement('img')
      imgElement.src =
        project.attributes.wallpaperMedia.data?.attributes.url || ''
      imgElement.alt = ''

      const viewProjectElement = document.createElement('a')
      viewProjectElement.className = 'view-project'

      viewProjectElement.addEventListener('click', event => {
        event.preventDefault()
        const referringPage = window.location.pathname.includes('digital-projects')
          ? 'digital-projects.html'
          : window.location.pathname.includes('branding-projects')
            ? 'branding-projects.html'
            : '/'

        window.location.href = `/src/pages/project/project?projectName=${project.attributes.referenceUrl}&referrer=${referringPage}`;
      })

      const textViewProjectElement = document.createElement('span')
      textViewProjectElement.textContent = 'Ver Projeto'

      const arrowImgElement = document.createElement('img')
      arrowImgElement.src = '/assets/icons/arrow-right-icon.svg'
      arrowImgElement.alt = ''

      viewProjectElement.appendChild(textViewProjectElement)
      viewProjectElement.appendChild(arrowImgElement)
      projectElement.appendChild(imgElement)
      projectElement.appendChild(viewProjectElement)

      projectsContainer.appendChild(projectElement)
    })
  }
}

export default brandingAndDigitalProjectsService
