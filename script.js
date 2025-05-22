let editingIndex = null;
let students = JSON.parse(localStorage.getItem('students')) || [];

const studentCount = document.getElementById('studentCount');
const subjectCount = document.getElementById('subjectCount');
const averageScore = document.getElementById('averageScore');
const filterInput = document.getElementById('filterInput');
const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const ctx = document.getElementById('studentScoreChart').getContext('2d');

const scoreChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      label: 'Total Scores by Student',
      data: [],
      backgroundColor: [],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true }
    }
  }
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const subject = document.getElementById('studentSubject').value.trim();
  const score = parseFloat(document.getElementById('studentScore').value);

  if (name && subject && !isNaN(score)) {
    if (editingIndex !== null) {
      students[editingIndex] = { name, subject, score };
      editingIndex = null;
      form.querySelector('button').textContent = "Add Student";
    } else {
      students.push({ name, subject, score });
    }

    saveToLocalStorage();
    form.reset();
    updateChart(filterInput.value);
  }
});

filterInput.addEventListener('input', () => {
  updateChart(filterInput.value);
});

function saveToLocalStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}

function updateChart(filterText = '') {
  const labels = [];
  const scores = [];
  const backgroundColors = [];
  const uniqueNames = new Set();
  const uniqueSubjects = new Set();
  let totalScore = 0;

  studentList.innerHTML = '';

  const studentScores = {};
  const subjectScores = {};

  students.forEach(({ name, subject, score }, index) => {
    uniqueNames.add(name);
    uniqueSubjects.add(`${name}-${subject}`);
    totalScore += score;

    if (!studentScores[name]) {
      studentScores[name] = { totalScore: 0 };
    }
    studentScores[name].totalScore += score;

    if (!subjectScores[subject]) {
      subjectScores[subject] = { totalScore: 0 };
    }
    subjectScores[subject].totalScore += score;

    const li = document.createElement('li');
    li.textContent = `${name} - ${subject}: ${score}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = "✏️";
    editBtn.title = "Edit";
    editBtn.addEventListener('click', () => {
      document.getElementById('studentName').value = name;
      document.getElementById('studentSubject').value = subject;
      document.getElementById('studentScore').value = score;
      editingIndex = index;
      form.querySelector('button').textContent = "Update Student";
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "🗑️";
    deleteBtn.title = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete ${name}'s ${subject} score?`)) {
        students.splice(index, 1);
        saveToLocalStorage();
        updateChart(filterInput.value);
      }
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    studentList.appendChild(li);
  });

  // Update student list based on filterText
  if (filterText) {
    studentList.innerHTML = '';
    students.forEach(({ name, subject, score }, index) => {
      if (name.toLowerCase().includes(filterText.toLowerCase())) {
        const li = document.createElement('li');
        li.textContent = `${name} - ${subject}: ${score}`;

        const editBtn = document.createElement('button');
        editBtn.textContent = "✏️";
        editBtn.title = "Edit";
        editBtn.addEventListener('click', () => {
          document.getElementById('studentName').value = name;
          document.getElementById('studentSubject').value = subject;
          document.getElementById('studentScore').value = score;
          editingIndex = index;
          form.querySelector('button').textContent = "Update Student";
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "🗑️";
        deleteBtn.title = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener('click', () => {
          if (confirm(`Are you sure you want to delete ${name}'s ${subject} score?`)) {
            students.splice(index, 1);
            saveToLocalStorage();
            updateChart(filterInput.value);
          }
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        studentList.appendChild(li);
      }
    });
  }

  // Update pie chart with subjects and their scores for the filtered student(s)
  if (filterText) {
    students.forEach(({ name, subject, score }) => {
      if (name.toLowerCase().includes(filterText.toLowerCase())) {
        if (!labels.includes(subject)) {
          labels.push(subject);
          scores.push(score);
          backgroundColors.push(getRandomColor());
        }
      }
    });
  } else {
    // Show total scores for all students
    for (const name in studentScores) {
      labels.push(name);
      scores.push(studentScores[name].totalScore);
      backgroundColors.push(getRandomColor());
    }
  }

  // Update pie chart
  scoreChart.data.labels = labels;
  scoreChart.data.datasets[0].data = scores;
  scoreChart.data.datasets[0].backgroundColor = backgroundColors;
  scoreChart.update();

  const numStudents = uniqueNames.size;
  const numSubjects = uniqueSubjects.size;
  const avg = numStudents > 0 ? (totalScore / numStudents).toFixed(2) : 0;

  studentCount.textContent = `Total Students: ${numStudents}`;
  subjectCount.textContent = `Total Subjects: ${numSubjects}`;
  averageScore.textContent = `Average Score per Student: ${avg}`;
}