const homeService = {
  setHomePage(pageData) {
    if (pageData.projects) this.setProjects(pageData.projects);
    if (pageData.team?.employee) this.setTeam(pageData.team.employee);
    if (pageData.clients?.client) this.setClients(pageData.clients.client);
  },

  setProjects(projects) {
    const homeProjectsSection = document.querySelector('.home-projects');

    projects.data.forEach(project => {
      const projectElement = document.createElement('a');
      projectElement.className = 'project-presentation text';
      projectElement.href = project.attributes.referenceUrl || '#';
      projectElement.style.backgroundImage = `url(${project.attributes.wallpaperMedia.data?.attributes.url || ''})`;
      projectElement.style.backgroundRepeat = 'no-repeat';
      projectElement.style.backgroundPosition = 'center';
      projectElement.style.backgroundSize = 'cover';

      projectElement.addEventListener('click', (event) => {
        event.preventDefault();
        const referringPage = '/';

        window.location.href = `src/pages/project/project?projectName=${project.attributes.referenceUrl}&referrer=${referringPage}`;
      });

      homeProjectsSection.appendChild(projectElement);
    });
  },

  setTeam(employees) {
    const teamSection = document.querySelector('.team .employees');

    employees.forEach(employee => {
      const employeeDiv = document.createElement('div');
      employeeDiv.classList.add('employee');

      const employeeImg = document.createElement('img');
      employeeImg.src = employee.picture.data.attributes.url;
      employeeImg.alt = employee.name;

      const textsDiv = document.createElement('div');
      textsDiv.classList.add('texts');

      const employeeName = document.createElement('h6');
      employeeName.classList.add('employee-name');
      employeeName.textContent = employee.name;

      const employeeDescription = document.createElement('p');
      employeeDescription.classList.add('text');
      employeeDescription.textContent = employee.description;

      textsDiv.appendChild(employeeName);
      textsDiv.appendChild(employeeDescription);
      employeeDiv.appendChild(employeeImg);
      employeeDiv.appendChild(textsDiv);

      teamSection.appendChild(employeeDiv);
    });
  },

  setClients(clients) {
    const clientsBox = document.querySelector('.clients-box');

    clients.forEach(client => {
      const imgElement = document.createElement('img');
      imgElement.src = client.logo.data[0].attributes.url;
      imgElement.alt = client.name;
      clientsBox.appendChild(imgElement);
    });
  }
}

export default homeService;