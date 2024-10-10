import API_ROUTES from '/src/api/apiConfig';
import headerService from '/src/api/services/header/headerService';

const projectService = {
  async loadProjectData() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('projectName');
    const referringPage = urlParams.get('referrer') || 'index.html';

    if (!projectName) {
      console.error('Nome do projeto não especificado na URL.');
      return;
    }

    const apiUrl = `${API_ROUTES.projects}&filters[projectName]=${projectName}`;

    this.showLoader();

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const projectData = data.data[0]?.attributes;

      if (projectData) {
        this.updateProjectPage(projectData, referringPage);
        headerService.setNavigation();
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do projeto:', error);
    } finally {
      this.hideLoader();
    }
  },

  showLoader() {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) {
      loaderOverlay.style.display = 'flex';
    }
  },

  hideLoader() {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) {
      loaderOverlay.style.display = 'none';
    }
  },

  updateProjectPage(projectData, referringPage) {
    const container = document.querySelector('.container');
    container.style.backgroundImage = `url(${projectData.header.backgroundMedia.data?.attributes.url || ''})`;
    container.style.backgroundRepeat = 'no-repeat';
    container.style.backgroundPosition = 'center';
    container.style.backgroundSize = 'cover';

    const backBtn = document.querySelector('.container .back-btn');
    backBtn.href = referringPage;

    const titleElement = document.querySelector('.container .header .title');
    titleElement.textContent = projectData.header.title;
    titleElement.style.color = projectData.header.titleColorCode;

    const clientElement = document.querySelector('.container .header .project-infos .client');
    clientElement.textContent = projectData.header.client || '';

    const designAnimationElement = document.querySelector('.container .header .project-infos .design-animation');
    designAnimationElement.textContent = `Design e Animação // ${projectData.header.design_animation}`;

    const projectSection = document.querySelector('.project');
    projectSection.style.backgroundColor = projectData.backgroundColorCode;

    const presentationMedia = document.querySelector('.project .presentation-media');
    presentationMedia.src = projectData.presentationMedia.data?.attributes.url || '';

    const challengeText = document.querySelector('.challenge-container .description .challenge-text');
    challengeText.innerHTML = projectData.challenge.replace(/\n/g, '<br />');

    const challengeSlogan1 = document.querySelector('.challenge-container .challenge-slogan-1');
    if (projectData.challengeSlogan_1) {
      challengeSlogan1.innerHTML = projectData.challengeSlogan_1.replace(/\n/g, '<br />');
    }

    const challengeMediaContainer = document.querySelector('.challenge-container .challenge-medias');
    if (projectData.challengeMedias?.data) {
      challengeMediaContainer.innerHTML = '';
      projectData.challengeMedias.data.forEach(media => {
        const imgElement = document.createElement('img');
        imgElement.src = media.attributes.url;
        challengeMediaContainer.appendChild(imgElement);
      });
    }

    const challengeSlogan2 = document.querySelector('.challenge-container .challenge-slogan-2');
    if (projectData.challengeSlogan_2) {
      challengeSlogan2.innerHTML = projectData.challengeSlogan_2.replace(/\n/g, '<br />');
    }

    const solutionText1 = document.querySelector('.solution-container .solution-text-1');
    solutionText1.innerHTML = projectData.solution_1.replace(/\n/g, '<br />');

    const solutionText2 = document.querySelector('.solution-container .solution-text-2');
    solutionText2.innerHTML = projectData.solution_2.replace(/\n/g, '<br />');

    const solutionMedia = document.querySelector('.solution-container .solution-media');
    solutionMedia.src = projectData.solutionMedia.data?.attributes.url || '';

    const testimonyPicture = document.querySelector('.testimony .feedback .picture');
    if (projectData.testimony?.picture?.data) {
      testimonyPicture.src = projectData.testimony.picture.data.attributes.url;
    }

    const feedbackText = document.querySelector('.testimony .feedback .texts .feedback-text');
    feedbackText.textContent = projectData.testimony.feedback;

    const personName = document.querySelector('.testimony .feedback .texts .person-name');
    personName.textContent = projectData.testimony.name;

    const personRole = document.querySelector('.testimony .feedback .texts .person-role');
    personRole.textContent = projectData.testimony.role;

    const personCompany = document.querySelector('.testimony .feedback .texts .person-company');
    personCompany.textContent = projectData.testimony.company;

    const testimonyMediaContainer = document.querySelector('.testimony .testimony-medias');
    if (projectData.testimonyMedias?.data) {
      testimonyMediaContainer.innerHTML = '';
      projectData.testimonyMedias.data.forEach(media => {
        const imgElement = document.createElement('img');
        imgElement.src = media.attributes.url;
        testimonyMediaContainer.appendChild(imgElement);
      });
    } else {
      testimonyMediaContainer.style.display = 'none';
    }
  }
};

export default projectService;
