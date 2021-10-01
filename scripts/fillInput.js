document.querySelectorAll('tr').forEach(tr => {
  const input = tr.querySelector('.input-group input:first-child');
  input.value = tr.textContent.includes('作業') ? 6 : 12;
});

document.querySelectorAll('tr').forEach(tr => {
  const expected = tr.textContent.includes('作業')
    ? tr.textContent.includes('6 分鐘')
    : tr.textContent.includes('12 分鐘');

  if (expected) return;

  console.log(tr);
});
