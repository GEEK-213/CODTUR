const users = [
  { id: 1, name: "Alice", email: "alice@example.com", status: "Active" },
  { id: 2, name: "Bob", email: "bob@example.com", status: "Pending" },
  { id: 3, name: "Charlie", email: "charlie@example.com", status: "Inactive" },
]

export default function DataTable() {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Name</th>
            <th className="pb-2">Email</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b last:border-0">
              <td className="py-2">{u.name}</td>
              <td className="py-2 text-zinc-500">{u.email}</td>
              <td className="py-2">{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
