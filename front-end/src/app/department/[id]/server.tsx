const getDepartmentById = async (departmentReferenceid: string) => {
    const response = await fetch(
        `http://127.0.0.1/api/department/show/${departmentReferenceid}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    return response.json();
};

const Department = async ({ params }: any) => {
    const { department } = await getDepartmentById(params.id);

    return (
        <div>
            <h1>Department Page</h1>
            <p>Department ID: {params.id}</p>
            <p>Department Name: {department.departmentName}</p>
        </div>
    );
};

export default Department;
