function UserInfo({ data, click }) {
  return (
    <div
      className="p-4 border-b hover:bg-slate-200"
      onClick={click ? () => click(data.id) : null}
    >
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">User Email : {data?.email} </p>
          <p>User Name : {data?.name} </p>
          <p className="text-sm">User Id : {data?.id} </p>
        </div>
        <div>
          <p>role : {data?.role}</p>
          <p>total task : {data.taskCount}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
