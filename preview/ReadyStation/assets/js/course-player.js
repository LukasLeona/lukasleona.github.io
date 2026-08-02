(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const lessonLinks = $$('.lesson-link[data-lesson]');
  const lessonPanels = $$('.lesson-panel[data-lesson-panel]');
  const sidebar = $('.player-sidebar');
  const menuButton = $('#courseMenuToggle');
  let currentIndex = 0;
  const completeLessons = new Set(JSON.parse(localStorage.getItem('readystation-hazmat-progress') || '[]'));

  const showToast = message => {
    const toast = $('.toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__courseToast);
    window.__courseToast = setTimeout(() => toast.classList.remove('show'), 3000);
  };

  const updateProgress = () => {
    lessonLinks.forEach(link => link.classList.toggle('done', completeLessons.has(link.dataset.lesson)));
    const percent = Math.round((completeLessons.size / lessonLinks.length) * 100);
    const value = $('#courseProgressValue');
    const bar = $('#courseProgressBar');
    if (value) value.textContent = `${percent}%`;
    if (bar) bar.style.width = `${percent}%`;
    localStorage.setItem('readystation-hazmat-progress', JSON.stringify([...completeLessons]));
  };

  const openLesson = (index, scrollTop = true) => {
    currentIndex = Math.max(0, Math.min(index, lessonPanels.length - 1));
    const id = lessonPanels[currentIndex].dataset.lessonPanel;
    lessonPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.lessonPanel === id));
    lessonLinks.forEach(link => link.classList.toggle('active', link.dataset.lesson === id));
    $('#prevLesson').disabled = currentIndex === 0;
    $('#nextLesson').textContent = currentIndex === lessonPanels.length - 1 ? 'Finish course demo' : 'Next lesson';
    if (scrollTop) $('.player-main').scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth <= 780) sidebar?.classList.remove('open');
  };

  lessonLinks.forEach((link, index) => link.addEventListener('click', () => openLesson(index)));
  $('#prevLesson')?.addEventListener('click', () => openLesson(currentIndex - 1));
  $('#nextLesson')?.addEventListener('click', () => {
    const currentId = lessonPanels[currentIndex].dataset.lessonPanel;
    completeLessons.add(currentId);
    updateProgress();
    if (currentIndex < lessonPanels.length - 1) {
      openLesson(currentIndex + 1);
      showToast('Lesson marked complete. Your progress has been saved on this device.');
    } else {
      showToast('Course demo completed. Great work—your progress is saved locally.');
    }
  });
  menuButton?.addEventListener('click', () => sidebar?.classList.toggle('open'));

  // Multiple-choice checkpoints
  $$('.quiz-option[data-correct]').forEach(option => {
    option.addEventListener('click', () => {
      const quiz = option.closest('[data-quiz]');
      const feedback = $('.quiz-feedback', quiz);
      $$('.quiz-option', quiz).forEach(button => button.classList.remove('correct', 'wrong'));
      const correct = option.dataset.correct === 'true';
      option.classList.add(correct ? 'correct' : 'wrong');
      feedback.textContent = correct ? quiz.dataset.correctMessage : quiz.dataset.wrongMessage;
      feedback.style.color = correct ? 'var(--green-600)' : 'var(--danger)';
      if (correct) completeLessons.add(lessonPanels[currentIndex].dataset.lessonPanel);
      updateProgress();
    });
  });

  // Drag and drop activities
  $$('.drag-chip[draggable="true"]').forEach(chip => {
    chip.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', chip.id);
      event.dataTransfer.effectAllowed = 'move';
    });
  });
  $$('.drop-zone[data-accept]').forEach(zone => {
    zone.addEventListener('dragover', event => {
      event.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', event => {
      event.preventDefault();
      zone.classList.remove('drag-over');
      const chip = document.getElementById(event.dataTransfer.getData('text/plain'));
      if (!chip) return;
      zone.appendChild(chip);
      const activity = zone.closest('[data-drag-activity]');
      const feedback = $('.drag-feedback', activity);
      const chips = $$('.drag-chip', activity);
      const allPlaced = chips.every(item => item.closest('.drop-zone'));
      if (allPlaced) {
        const allCorrect = chips.every(item => item.dataset.group === item.closest('.drop-zone')?.dataset.accept);
        feedback.textContent = allCorrect
          ? 'Correct. The clues have been placed in the appropriate observation groups.'
          : 'Some items are in the wrong group. Move them and check again.';
        feedback.style.color = allCorrect ? 'var(--green-600)' : 'var(--danger)';
        if (allCorrect) {
          completeLessons.add(lessonPanels[currentIndex].dataset.lessonPanel);
          updateProgress();
        }
      }
    });
  });

  // Click-to-match activity
  $$('[data-match-board]').forEach(board => {
    let selectedLeft = null;
    const check = () => {
      const unmatched = $$('.match-item:not(.matched)', board).length;
      if (unmatched === 0) {
        const feedback = $('.match-feedback', board.parentElement);
        feedback.textContent = 'All pairs matched. You can now distinguish the purpose of each resource.';
        feedback.style.color = 'var(--green-600)';
        completeLessons.add(lessonPanels[currentIndex].dataset.lessonPanel);
        updateProgress();
      }
    };
    $$('.match-item[data-side="left"]', board).forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;
        $$('.match-item.selected', board).forEach(selected => selected.classList.remove('selected'));
        selectedLeft = item;
        item.classList.add('selected');
      });
    });
    $$('.match-item[data-side="right"]', board).forEach(item => {
      item.addEventListener('click', () => {
        if (!selectedLeft || item.classList.contains('matched')) return;
        if (selectedLeft.dataset.match === item.dataset.match) {
          selectedLeft.classList.remove('selected');
          selectedLeft.classList.add('matched');
          item.classList.add('matched');
          selectedLeft = null;
          check();
        } else {
          item.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 280 });
        }
      });
    });
  });

  updateProgress();
  openLesson(0, false);
})();
