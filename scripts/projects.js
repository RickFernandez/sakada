document.addEventListener('DOMContentLoaded', function () {
  const filter = document.querySelector('.filter');
  const mobileFilter = document.querySelector('.filter-mobile');
  const mobileFilterBtn = document.querySelector('.filter-btn');
  const closeFilterBtn = document.querySelector('.close-filter-btn');
  const btns = filter ? filter.querySelectorAll('.btn') : [];
  const btnsMobile = mobileFilter ? mobileFilter.querySelectorAll('.btn-mobile') : [];
  const projects = document.querySelectorAll('.project');
  let wasFiltered = false;

  if (!filter || !mobileFilter || btns.length === 0 || btnsMobile.length === 0 || projects.length === 0) {
    console.error('Alguns elementos não foram encontrados no DOM.');
    return;
  }

  filterSelection('all');
  
  function filterSelection(selectedFilter) {
    const filterValue = selectedFilter === 'all' ? 'project' : selectedFilter;

    projects.forEach(project => {
      toggleProjectVisibility(project, project.classList.contains(filterValue));
    });
    
    wasFiltered = true;

    setTimeout(() => {
      onCloseMobileFilter(wasFiltered);
    }, 250)
  }

  function toggleProjectVisibility(project, isVisible) {
    if (isVisible) {
      project.classList.add('show');
    } else {
      project.classList.remove('show');
    }
  }

  function onCloseMobileFilter() {

  }

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      const current = document.querySelector('.btn.active');

      if (current !== this) {
        current.classList.remove('active');
        this.classList.add('active');
        filterSelection(this.getAttribute('data-filter'));
      }
    });
  });

  btnsMobile.forEach(btnMobile => {
    btnMobile.addEventListener('click', function () {
      const current = document.querySelector('.btn-mobile.active');

      if (current !== this) {
        current.classList.remove('active');
        this.classList.add('active');
        filterSelection(this.getAttribute('data-filter'));
      }
    });
  });

  mobileFilterBtn.addEventListener('click', () => onCloseMobileFilter())
  closeFilterBtn.addEventListener('click', () => onCloseMobileFilter())

  function onCloseMobileFilter(filtered) {
    if (mobileFilter.classList.contains('active') || filtered) {
      mobileFilter.classList.remove('active');
      wasFiltered = false;
    } else {
      mobileFilter.classList.add('active');
    }
    
  }
});
