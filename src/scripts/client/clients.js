export function setClients(clients) {
  const clientsBox = document.querySelector('.clients-box');

  clients.forEach(client => {
    const imgElement = document.createElement('img');
    imgElement.src = client.logo.data[0].attributes.url;
    imgElement.alt = client.name;
    clientsBox.appendChild(imgElement);
  });
}
