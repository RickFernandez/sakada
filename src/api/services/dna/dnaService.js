const dnaService = {
  setDnaPage(pageData) {
    console.log('chamou')
    const wrapper = document.querySelector('.wrapper');
    pageData.topic.forEach(topic => {
      const containerClass = topic.title.toLowerCase().replace(/ /g, '-');
      const brandContainer = document.createElement('div');
      brandContainer.className = `brand-container ${containerClass}`;

      brandContainer.innerHTML = `
        <h3 class="subtitle-2">
          ${topic.title.split(' ').join('<br />')}
        </h3>
        <div class="contents">
          ${topic.simple_content.map(content => `
            <div class="content">
              <div class="content-img">
                <img src="${content.image.data.attributes.url}" alt="" />
              </div>
              <div class="texts">
                <h4 class="dna-subtitle">${content.title}</h4>
                <p class="text">${content.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      wrapper.appendChild(brandContainer);
    });
  }
};

export default dnaService;
