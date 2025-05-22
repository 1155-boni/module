let students = JSON.parse(localStorage.getItem("students")) || [];
const filterInput = document.getElementById("filterInput");
const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const total = document.getElementById("total");
const average = document.getElementById("average");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const marks = parseFloat(document.getElementById("marks").value);

  if (!name || !subject || isNaN(marks) || marks < 0 || marks > 100) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const student = { id: Date.now(), name, subject, marks };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderStudents();
});

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}
function renderStudents(filter = "") {
  list.innerHTML = "";
  let totalMarks = 0;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredStudents.forEach(student => {
    totalMarks += student.marks;
    const li = document.createElement("li");
    li.className = student.marks >= 75 ? "high" : "";
    li.innerHTML = `
      ${student.name} - ${student.subject}: ${student.marks} 
      <span class="delete-btn" onclick="deleteStudent(${student.id})">🗑️</span>
    `;
    list.appendChild(li);
  });

  const uniqueNames = new Set(filteredStudents.map(s => s.name));
total.innerText = uniqueNames.size;

  average.innerText = filteredStudents.length > 0 ? (totalMarks / filteredStudents.length).toFixed(2) : 0;
}

filterInput.addEventListener("input", () => {
  const query = filterInput.value;
  renderStudents(query);
});

