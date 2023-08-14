const contestListElement = document.getElementById('contestList');

chrome.runtime.sendMessage({ action: 'fetchContests' }, response => {
  if (response && response.data) {
    response.data.forEach(contest => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${contest.code}</strong>: ${contest.name} (Start: ${contest.start}, End: ${contest.end})`;
      contestListElement.appendChild(listItem);
    });
  } else if (response && response.error) {
    console.error('An error occurred:', response.error);
  }
});
