export default function initializeProjectFilters() {
  const filter = document.querySelector('.filter');
  const mobileFilter = document.querySelector('.filter-mobile');
  const mobileFilterBtn = document.querySelector('.filter-btn');
  const closeFilterBtn = document.querySelector('.close-filter-btn');
  const projectsContainer = document.querySelector('.projects');
  const projects = document.querySelectorAll('.project');
  let wasFiltered = false;

  const noProjectsMessage = document.createElement('div');
  noProjectsMessage.className = 'no-projects-message';
  noProjectsMessage.textContent = 'Nenhum projeto encontrado.';
  noProjectsMessage.style.display = 'none';
  projectsContainer.parentNode.insertBefore(noProjectsMessage, projectsContainer);

  if (!mobileFilter || projects.length === 0) {
    console.error('Alguns elementos não foram encontrados no DOM.');
    return;
  }

  addFilterEventListeners(filter, mobileFilter);
  setDefaultFilter();

  mobileFilterBtn.addEventListener('click', () => onCloseMobileFilter());
  closeFilterBtn.addEventListener('click', () => onCloseMobileFilter());

  function addFilterEventListeners(filter, mobileFilter) {
    const btns = filter.querySelectorAll('.btn');
    const btnsMobile = mobileFilter.querySelectorAll('.btn-mobile');

    btns.forEach(btn => {
      btn.addEventListener('click', function () {
        const current = document.querySelector('.btn.active');

        if (current !== this) {
          if (current) current.classList.remove('active');
          this.classList.add('active');
          filterSelection(this.getAttribute('data-filter'));
        }
      });
    });

    btnsMobile.forEach(btnMobile => {
      btnMobile.addEventListener('click', function () {
        const current = document.querySelector('.btn-mobile.active');

        if (current !== this) {
          if (current) current.classList.remove('active');
          this.classList.add('active');
          filterSelection(this.getAttribute('data-filter'));
        }
      });
    });
  }

  function setDefaultFilter() {
    const defaultBtn = document.querySelector('.filter .btn[data-filter="all"]');
    const defaultMobileBtn = document.querySelector('.filter-mobile .btn-mobile[data-filter="all"]');

    if (defaultBtn) {
      defaultBtn.classList.add('active');
    }

    if (defaultMobileBtn) {
      defaultMobileBtn.classList.add('active');
    }

    filterSelection('all');
  }

  function filterSelection(selectedFilter) {
    const filterValue = selectedFilter === 'all' ? 'project' : selectedFilter;
    let visibleProjectsCount = 0;

    projects.forEach(project => {
      const isVisible = project.classList.contains(filterValue);
      toggleProjectVisibility(project, isVisible);
      if (isVisible) visibleProjectsCount++;
    });

    if (visibleProjectsCount === 0) {
      noProjectsMessage.style.display = 'flex';
    } else {
      noProjectsMessage.style.display = 'none';
    }

    wasFiltered = true;

    setTimeout(() => {
      onCloseMobileFilter(wasFiltered);
    }, 250);
  }

  function toggleProjectVisibility(project, isVisible) {
    if (isVisible) {
      project.classList.add('show');
    } else {
      project.classList.remove('show');
    }
  }

  function onCloseMobileFilter(filtered) {
    if (mobileFilter.classList.contains('active') || filtered) {
      mobileFilter.classList.remove('active');
      wasFiltered = false;
    } else {
      mobileFilter.classList.add('active');
    }
  }
}