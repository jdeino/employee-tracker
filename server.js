const inquirer = require('inquirer');

const connection = require('mysql2').createConnection({
  host: 'localhost',
  user: 'root',
  password: 'novalina17',
  database: 'employee_db',
});

async function executeQuery(sql, params) {
  try {
    const [rows] = await connection.promise().query(sql, params);
    return rows;
  } catch (error) {
    throw new Error(`Error executing query: ${error.message}`);
  }
}

async function displayDepartments() {
  const sql = 'SELECT * FROM department';
  const departments = await executeQuery(sql);
  console.log('Departments:');
  console.table(departments);
}

async function displayRoles() {
  const sql = 'SELECT * FROM role';
  const roles = await executeQuery(sql);
  console.log('Roles:');
  console.table(roles);
}

async function displayEmployees() {
  const sql = 'SELECT * FROM employee';
  const employees = await executeQuery(sql);
  console.log('Employees:');
  console.table(employees);
}

async function addDepartment(name) {
  const sql = 'INSERT INTO department (name) VALUES (?)';
  try {
    await executeQuery(sql, [name]);
    console.log('Department added successfully!');
  } catch (error) {
    throw new Error(`Error creating new department: ${error.message}`);
  }
}

async function addRole(title, salary, department_id) {
  const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  try {
    await executeQuery(sql, [title, salary, department_id]);
    console.log('Role added successfully!');
  } catch (error) {
    throw new Error(`Error creating new role: ${error.message}`);
  }
}

async function addEmployee(first_name, last_name, role_id, manager_id) {
  const sql =
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  try {
    await executeQuery(sql, [first_name, last_name, role_id, manager_id]);
    console.log('Employee added successfully!');
  } catch (error) {
    throw new Error(`Error creating new employee: ${error.message}`);
  }
}

async function updateEmployeeRole(employee_id, role_id) {
  const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
  try {
    await executeQuery(sql, [role_id, employee_id]);
    console.log('Employee role updated successfully!');
  } catch (error) {
    throw new Error(`Error updating employee role: ${error.message}`);
  }
}

// Handles user options
async function handleOptions() {
  const options = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
  ];

  const { command } = await inquirer.prompt([
    {
      message: 'What would you like to do?',
      name: 'command',
      type: 'list',
      choices: options,
    },
  ]);

  switch (command) {
    case 'View All Departments':
      await displayDepartments();
      break;
    case 'View All Roles':
      await displayRoles();
      break;
    case 'View All Employees':
      await displayEmployees();
      break;
    case 'Add a Department':
      await promptAddDepartment();
      break;
    case 'Add a Role':
      await promptAddRole();
      break;
    case 'Add an Employee':
      await promptAddEmployee();
      break;
    case 'Update an Employee Role':
      await promptUpdateEmployeeRole();
      break;
    default:
      console.log('Invalid command.');
  }

  // Handle options recursively
  await handleOptions();
}

// Prompt for adding a department
async function promptAddDepartment() {
  const { department } = await inquirer.prompt([
    {
      message: 'What would you like to name this department?',
      name: 'department',
      type: 'input',
    },
  ]);

  try {
    await addDepartment(department);
  } catch (error) {
    console.log(error.message);
  }
}

// Prompt for adding a role
async function promptAddRole() {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      message: 'What would you like to name this role?',
      name: 'title',
      type: 'input',
    },
    {
      message: 'How much does this role make?',
      name: 'salary',
      type: 'input',
    },
    {
      message: 'What department does this role belong to?',
      name: 'department_id',
      type: 'input',
    },
  ]);

  try {
    await addRole(title, salary, department_id);
  } catch (error) {
    console.log(error.message);
  }
}

// Prompt for adding an employee
async function promptAddEmployee() {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      message: "What is the employee's first name?",
      name: 'first_name',
      type: 'input',
    },
    {
      message: "What is the employee's last name?",
      name: 'last_name',
      type: 'input',
    },
    {
      message: "What is the employee's role ID?",
      name: 'role_id',
      type: 'input',
    },
    {
      message: "What is the employee's manager ID?",
      name: 'manager_id',
      type: 'input',
    },
  ]);

  try {
    await addEmployee(first_name, last_name, role_id, manager_id);
  } catch (error) {
    console.log(error.message);
  }
}

// Prompt for updating an employee role
async function promptUpdateEmployeeRole() {
  const { employee_id, role_id } = await inquirer.prompt([
    {
      message: 'Enter employee ID:',
      name: 'employee_id',
      type: 'input',
    },
    {
      message: 'Enter new role ID:',
      name: 'role_id',
      type: 'input',
    },
  ]);

  try {
    await updateEmployeeRole(employee_id, role_id);
  } catch (error) {
    console.log(error.message);
  }
}

// Start the application
async function startApp() {
  try {
    await handleOptions();
  } catch (error) {
    console.error('An unexpected error occurred:', error.message);
  } finally {
    connection.end();
  }
}

startApp();
