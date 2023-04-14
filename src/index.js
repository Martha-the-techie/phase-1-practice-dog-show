document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(dogs => {
        const table = document.getElementById('dogs-table');
        dogs.forEach(dog => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button class="edit-dog" data-id="${dog.id}">Edit</button></td>
          `;
          table.appendChild(row);
        });
  
        const editButtons = document.querySelectorAll('.edit-dog');
        editButtons.forEach(button => {
          button.addEventListener('click', () => {
            const dogId = button.dataset.id;
            fetch(`http://localhost:3000/dogs/${dogId}`)
              .then(response => response.json())
              .then(dog => {
                const form = document.getElementById('edit-dog-form');
                form.elements['name'].value = dog.name;
                form.elements['breed'].value = dog.breed;
                form.elements['sex'].value = dog.sex;
                form.elements['id'].value = dog.id;
              });
          });
        });
  
        const submitButton = document.getElementById('edit-dog-submit');
        submitButton.addEventListener('click', (event) => {
          event.preventDefault();
          const form = document.getElementById('edit-dog-form');
          const formData = new FormData(form);
          const dogId = formData.get('id');
          fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH',
            body: formData
          })
            .then(response => response.json())
            .then(() => {
              fetch('http://localhost:3000/dogs')
                .then(response => response.json())
                .then(updatedDogs => {
                  const tableBody = document.getElementById('table-body');
                  tableBody.innerHTML = '';
                  updatedDogs.forEach(dog => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                      <td>${dog.name}</td>
                      <td>${dog.breed}</td>
                      <td>${dog.sex}</td>
                      <td><button class="edit-dog" data-id="${dog.id}">Edit</button></td>
                    `;
                    tableBody.appendChild(row);
                  });
                });
            });
        });
      });
  });