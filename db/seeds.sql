-- Insert departments
INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Marketing'),
    ('Finance'),
    ('Human Resources');

-- Insert roles
INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 95000, 1),
    ('Marketing Specialist', 60000, 2),
    ('Financial Analyst', 75000, 3),
    ('HR Manager', 80000, 4),
    ('Full-stack Developer', 110000, 1),
    ('Marketing Manager', 80000, 2),
    ('Senior Financial Analyst', 95000, 3),
    ('HR Coordinator', 60000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, NULL),
    ('Mike', 'Johnson', 3, 3),
    ('Emily', 'Williams', 5, 3),
    ('Robert', 'Brown', 3, 3),
    ('Sarah', 'Davis', 4, 3),
    ('Michael', 'Anderson', 1, 6),
    ('Jessica', 'Lee', 2, 6);
