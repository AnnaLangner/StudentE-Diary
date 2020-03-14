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
    console.log(response.name);
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

getStudentsList();