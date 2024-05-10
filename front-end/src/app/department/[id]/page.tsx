const OneDepartmentPage = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <h1>Department Page</h1>
            <p>Department ID: {params.id}</p>
        </div>
    );
};

export default OneDepartmentPage;
