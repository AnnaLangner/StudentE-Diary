function getSubjectsList() {
  const url = `http://localhost:7777/subject`;

  const xhr = new XMLHttpRequest;

  xhr.open("GET", url, true);

  xhr.onload = function(){
    const response = JSON.parse(this.responseText);

    for (let i = 0; i< response.length; i++) {
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

function showModal(id) {
  const url = `http://localhost:7777/subject/${id}/grades`;

  const xhr = new XMLHttpRequest;

  xhr.open("GET", url, true);

  xhr.onload = function() {
    const response = JSON.parse(this.responseText); 
    document.getElementById('single-subject-table-body').innerHTML = '';  

    for(let j = 0; j<response.length; j++) {
      document.getElementById('subject-name').innerHTML = `${response[j].subject}`;
      

      const arr = response[j].grades;    
      const arrAvg = (arr.reduce((a,b) => a+b)/ arr.length).toFixed(1);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${response[j].name} ${response[j].surname}</td>
        <td>${response[j].grades}</td>
        <td>${arrAvg}</td>
      `
      document.getElementById('single-subject-table-body').appendChild(row);
    }
  }
  xhr.send();
}

getSubjectsList();