import storage from '@/assets/storage.json';

if (storage.disable_DevTools) {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
    },
    false,
  );
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || (e.keyCode >= 112 && e.keyCode <= 123)) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
}
