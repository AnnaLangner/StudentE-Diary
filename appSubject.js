function getSubjectsList() {
  const url = `http://localhost:7777/subject`;

  const xhr = new XMLHttpRequest;

  xhr.open("GET", url, true);

  xhr.onload = function(){
    const response = JSON.parse(this.responseText);

    for (let i = 0; i< response.length; i++) {
      const btnDetails = document.createElement('button');
      btnDetails.onclick = function () {showModal(response[i].id)};
      btnDetails.innerHTML = `<i class="fas fa-arrow-alt-circle-right"></i>`;
      btnDetails.className = 'btn btn-primary button-details';
      btnDetails.setAttribute("data-toggle", "modal");
      btnDetails.setAttribute('data-target' , '#modal');
      btnDetails.setAttribute('type','button');
      const td = document.createElement('td');
      td.appendChild(btnDetails);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${response[i].id}</td>
        <td>${response[i].name}</td>
      `
      row.appendChild(td);
      document.getElementById('subject-list-table-body').appendChild(row);
    }
  }
  xhr.send();
}

function compareStudent (a, b) {
  return a.id - b.id
}

function showModal(id) {
  const url = `http://localhost:7777/subject/${id}/grades`;

  const xhr = new XMLHttpRequest;

  xhr.open("GET", url, true);

  xhr.onload = function() {
    const response = JSON.parse(this.responseText); 
    document.getElementById('single-subject-table-body').innerHTML = ''; 

    response.sort(compareStudent);

    for(let j = 0; j<response.length; j++) {
      document.getElementById('subject-name').innerHTML = `${response[j].subject}`; 
      const arr = response[j].grades;    
      const arrAvg = (arr.reduce((a,b) => a+b)/ arr.length).toFixed(1);

      const addGradesDiv = document.createElement('div');
      addGradesDiv.className = 'input-group';
      const addGradesInput = document.createElement('input');
      addGradesInput.className = "form-control input-adding-grades";
      addGradesInput.setAttribute("id", "input-" + response[j].id);
      addGradesInput.setAttribute('type','number');
      addGradesInput.setAttribute("maxlength", "1");
      addGradesInput.setAttribute("max", "6");
      addGradesInput.setAttribute("min", "1");
      addGradesInput.setAttribute("step", "1");
      addGradesInput.setAttribute("placeholder", "Adding grades");
      addGradesInput.setAttribute("aria-label", "Adding grades");
      addGradesInput.setAttribute("aria-describedby", "button-addon");
     
      const addGradesDivBtn = document.createElement('div');
      addGradesDivBtn.className = "input-group-append";
      const addGradesBtn = document.createElement('button');
      addGradesBtn.onclick = function () {addGradesToStudent(response[j].id, id)} 
      addGradesBtn.className = "btn btn-outline-secondary btn-adding-grades";
      addGradesBtn.setAttribute("type", "button");        
      addGradesDivBtn.appendChild(addGradesBtn);

      addGradesDiv.appendChild(addGradesDivBtn);
      addGradesDiv.appendChild(addGradesInput);
      const td = document.createElement('td');
      td.appendChild(addGradesDiv);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${response[j].name} ${response[j].surname}</td>
        <td>${response[j].grades}</td>
        <td>${arrAvg}</td>
      `
      row.appendChild(td);
      document.getElementById('single-subject-table-body').appendChild(row);              
    }    
  }
  xhr.send();
}

document.getElementById('btn-add-subject').addEventListener('click', addSubjectToList);

function addSubjectToList() {
  const id = document.getElementById('new-subject-id').value;
  const name = document.getElementById('new-subject-name').value;
  const url = `http://localhost:7777/subject`;
  const xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-type', 'application/json');

  xhr.onload = function() {
    location.reload();
  }

  if(id === '' || name === '' ) {
    showAlert('Pleas complete all fields');
    return;
  } 

  const subject = new Object;
  subject['id'] = id;
  subject['name'] = name;

  xhr.send(JSON.stringify(subject))
}

function addGradesToStudent(studentId, subjectId) {
  const inputGrade = document.getElementById('input-' + studentId).value;
  console.log(inputGrade)
  const xhr = new XMLHttpRequest();  
  const url = `http://localhost:7777/student/${studentId}/subject/${subjectId}/grades`

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onload = function() {
    //location.reload();
    showModal(subjectId)
  }

 

  if(inputGrade === '') {
    showAlert('Pleas complete field');
    return;
  } 

  const newGrade = new Object;
  newGrade['grades'] = [inputGrade];

  xhr.send(JSON.stringify(newGrade));
}

function showAlert(err) {
  const form = document.getElementById('form-create-subject');
  const container = document.getElementById('modal-body-create-subject');
  const alert = document.createElement('div');
  alert.className = 'alert alert-danger';
  alert.appendChild(document.createTextNode(err));

  container.insertBefore(alert, form);

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 5000);
}

getSubjectsList();