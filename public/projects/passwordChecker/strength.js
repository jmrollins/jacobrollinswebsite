const passwordInput = document.getElementById('password');
const strengthOutput = document.getElementById('strength-output');
const tipsList = document.getElementById('tips-list');

function updateStrength() {
  const password = passwordInput.value;
  const result = zxcvbn(password);

  const scoreLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Excellent'];
  strengthOutput.textContent = `Strength: ${scoreLabels[result.score]}`;

  strengthOutput.className = '';
  strengthOutput.classList.add(`strength-${result.score}`);

  const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second;
  const crackTimeEl = document.createElement('div');
  crackTimeEl.textContent = `Estimated time to crack: ${crackTime}`;
  tipsList.innerHTML = '';
  tipsList.appendChild(crackTimeEl);

  if (result.feedback.suggestions.length > 0) {
    result.feedback.suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      tipsList.appendChild(li);
    });
  }
}

passwordInput.addEventListener('input', updateStrength);

updateStrength();


const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
  window.location.href = '/';  
});
