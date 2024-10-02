export function setTeam(employees) {
  console.log(employees);
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
}
