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

// 複檢有沒有填錯
const map = new Map();
document.querySelectorAll('.filled-table tr').forEach(tr => {
  const title = tr.querySelector('td:first-child').textContent;
  const time = tr.querySelector('td:nth-child(6) span')?.textContent;

  const key = title + ' ' + time;
  map.set(key, (map.get(key) || 0) + 1);
});
console.log(map);
