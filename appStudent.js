function getStudentsList() {
  const url = 'http://localhost:7777/student';

  const xhr = new XMLHttpRequest;
  xhr.open("GET", url, true);

  xhr.onload = function(){
    const response = JSON.parse(this.responseText);
    
    for (let i=0; i < response.length; i++) {
      const btnDetails = document.createElement('button');
      btnDetails.onclick = function () {showModal(response[i].id)} ;
      btnDetails.innerHTML = `<i class="fas fa-arrow-alt-circle-right"></i>`;
      btnDetails.className = 'btn btn-primary button-details';
      btnDetails.setAttribute("data-toggle", "modal");
      btnDetails.setAttribute('data-target' , '#modal');
      btnDetails.setAttribute('type','button');
      const td = document.createElement('td');
      td.appendChild(btnDetails);

      const row = document.createElement('tr');
      row.className = 'table-body-content'
      row.innerHTML = `
      <td>${response[i].id + ' '}</td>
      <td>${response[i].name + ' '}</td>
      <td>${response[i].surname + ' '}</td>      
      `
      row.appendChild(td)
      document.getElementById('students-list-table-body').appendChild(row);      
    }    
  };

  xhr.send();
}

function showModal(id) {  
  const url = `http://localhost:7777/student/${id}/withGrades`;

  const xhr = new XMLHttpRequest;
  xhr.open("GET", url, true);

  xhr.onload = function(){
    const response = JSON.parse(this.responseText);
    
    document.getElementById('student-name').innerHTML = `${response.name} ${response.surname}`;
    document.getElementById('single-student-table-body').innerHTML = '';

    for (let i=0; i<response.subjectGrades.length; i++) {      
      const arr = response.subjectGrades[i].grades;    
      const arrAvg = (arr.reduce((a,b) => a+b)/ arr.length).toFixed(1);
        
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${response.subjectGrades[i].subjectName}</td>
      <td>${response.subjectGrades[i].grades}</td>
      <td>${arrAvg}</td>
      `
      document.getElementById('single-student-table-body').appendChild(row);
    }
  }
  xhr.send();
}

//button_submit.addeventlistener addStudentToList
document.getElementById('btn-add-student').addEventListener('click', addStudentToList);

function addStudentToList() {
  const id = document.getElementById('new-student-id').value;
  const name = document.getElementById('new-student-name').value;
  const surname = document.getElementById('new-student-surname').value;
  console.log(id, name, surname);

  const url =`http://localhost:7777/student`;

  const xhr = new XMLHttpRequest;
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-type', 'application/json');

  xhr.onload = function(){
    location.reload();   
  }

  if(id === '' || name === '' || surname === '') {
    showAlert('Pleas complete all fields');
    return;
  } 
  const student = new Object;
  student["id"] = id;
  student['name'] = name;
  student['surname'] = surname; 

  xhr.send(JSON.stringify(student));
}

function showAlert(err) {
  const form = document.getElementById('form-create-student');
  const container = document.getElementById('modal-body-create-student');
  const alert = document.createElement('div');
  alert.className = 'alert alert-danger';
  alert.appendChild(document.createTextNode(err));

  container.insertBefore(alert, form);

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 5000);
}

getStudentsList();