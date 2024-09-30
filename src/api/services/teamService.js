import API_ROUTES from '../apiConfig.js';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = API_ROUTES.team;

  const updateTeamSection = (employees) => {
    const teamSection = document.querySelector('.team .employees');
    teamSection.innerHTML = '';

    employees.forEach((employee) => {
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
  };

  const fetchTeamData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const employees = data.data.attributes.employees;
      updateTeamSection(employees);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  fetchTeamData();
});
