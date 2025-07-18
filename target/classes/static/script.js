const form = document.getElementById('employeeForm');
const tableBody = document.querySelector('#employeeTable tbody');

const apiUrl = '/api/employees';

const getEmployees = async () => {
    const response = await fetch(apiUrl);
    const employees = await response.json();
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>
                <button onclick="editEmployee(${employee.id}, '${employee.name}', '${employee.email}')">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

const saveEmployee = async (event) => {
    event.preventDefault();
    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    });

    form.reset();
    getEmployees();
};

const editEmployee = (id, name, email) => {
    document.getElementById('employeeId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
};

const deleteEmployee = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    getEmployees();
};

form.addEventListener('submit', saveEmployee);
getEmployees();
