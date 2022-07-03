export let userIsInRole = (role) => {
    try {
        const rs = localStorage.getItem("roles").split(',');
        for(let i = 0; i < rs.length; i++){
            if(rs[i] === role){
                return true;
            }
        }
        return false;
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