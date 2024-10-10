const utils = {
  toggleLoader(show) {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) {
      loaderOverlay.style.display = show ? 'flex' : 'none';
    }
  }
}

export default utils;