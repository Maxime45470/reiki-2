
document.addEventListener('DOMContentLoaded', () => {
    const goToAddPageBtn = document.getElementById('goToAddPage');
    const goToMainPageBtn = document.getElementById('goToMainPage');
  
    goToAddPageBtn?.addEventListener('click', () => {
      window.location.href = 'ajout.html';
    });
  
    goToMainPageBtn?.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });





