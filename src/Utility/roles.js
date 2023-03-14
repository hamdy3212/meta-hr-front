export let userIsInRole = (role) => {
    try {
        const rs = localStorage.getItem("roles").split(',');
        return rs.includes(role);
    } catch (error) {
        return false;
    }
}

export let roles = {
    admin: "Admin",
    departmentDirector: "DepartmentDirector",
    hrJunior: "HR_Junior",
    hrSenior: "HR_Senior",
    employee: "Employee"
}