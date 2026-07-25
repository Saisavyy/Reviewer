const answers = {
  q1: '7',
  q2: 'glucose',
  q3: 'proteins',
  q4: 'tertiary',
  q5: 'u',
  q6: 'keepstable',
  q7: 'fat',
  q8: 'dna',
  q9: 'nucleus',
  q10: 'barrier',
  q11: 'mitochondria',
  q12: 'ends',
  q13: 'helpenzymes',
  q14: 'thymine',
  q15: 'losesshape',
  q16: 'glycogen',
  q17: 'peptide',
  q18: 'nucleus',
  q19: 'substrate',
  q20: 'c',
  q21: 'cytosine',
  q22: 'secondary',
  q23: 'decrease',
  q24: 'lysosome',
  q25: 'glucose',
  q26: 'phospholipid',
  q27: 'oxidative',
  q28: 'hba1c',
  q29: 'helicase',
  q30: 'increaseKm',
  q31: 'ATP',
  q32: 'valine',
  q33: 'liver',
  q34: 'vitaminC',
  q35: 'hexokinase'
};

const checkBtn = document.getElementById('checkBtn');
const quizResult = document.getElementById('quizResult');

checkBtn.addEventListener('click', () => {
  const form = document.getElementById('quizForm');
  const formData = new FormData(form);
  let correct = 0;
  let total = Object.keys(answers).length;
  let missing = 0;

  for (const [key, value] of Object.entries(answers)) {
    const answer = formData.get(key);
    if (!answer) {
      missing += 1;
      continue;
    }
    if (answer === value) correct += 1;
  }

  let percentage = Math.round((correct / total) * 100);
  let message = `You got ${correct} out of ${total} correct (${percentage}%).`;
  if (missing > 0) {
    message += ` Please answer all ${missing} remaining question${missing > 1 ? 's' : ''}.`;
  }
  if (missing === 0 && correct === total) {
    message = `Perfect! You answered all ${total} questions correctly.`;
  } else if (missing === 0 && percentage >= 90) {
    message += ' Great work!';
  } else if (missing === 0 && percentage >= 70) {
    message += ' Good review, keep practicing.';
  }

  // Show per-question explanations and mark correct/incorrect
  for (const [key, value] of Object.entries(answers)) {
    const exp = document.getElementById(`exp-${key}`);
    const user = formData.get(key);
    if (!exp) continue;
    exp.style.display = 'block';
    exp.classList.remove('correct', 'incorrect');
    if (!user) {
      exp.classList.add('incorrect');
    } else if (user === value) {
      exp.classList.add('correct');
    } else {
      exp.classList.add('incorrect');
    }
    // Highlight labels: chosen, correct, incorrect
    const qElem = document.getElementById(key);
    if (qElem) {
      const labels = qElem.querySelectorAll('label');
      labels.forEach(lbl => {
        lbl.classList.remove('correct', 'incorrect', 'chosen');
        const input = lbl.querySelector('input');
        if (!input) return;
        const val = input.value;
        if (val === user) lbl.classList.add('chosen');
        if (val === value) lbl.classList.add('correct');
        if (user && val === user && user !== value) lbl.classList.add('incorrect');
      });
    }
  }

  quizResult.textContent = message;
  quizResult.style.color = correct === total ? '#b7f4c8' : percentage >= 70 ? '#d6f7ff' : '#ffd6d6';
});
