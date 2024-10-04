const digitalSignageService = {
  setDigitalSignagePage(pageData) {
    const contentSection = document.querySelector('.content');
    pageData.simple_contents.forEach(content => {
      const box = document.createElement('div');
      box.className = 'box';

      box.innerHTML = `
        <div class="box-content">
          <h4 class="subtitle-1">${content.title}</h4>
          <p class="text">${content.description}</p>
        </div>
        <img src="${content.image.data.attributes.url}" alt="" />
      `;

      contentSection.appendChild(box);
    });
  }
};

export default digitalSignageService;
