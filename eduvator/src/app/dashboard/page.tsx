import Sidebar from "@/components/ui/Sidebar"
import Navbar from "@/components/ui/Navbar"
import StatCard from "@/components/ui/StateCard"
import Chart from "@/components/ui/Chart"
import DataTable from "@/components/ui/DataTable"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Revenue" value="$45,200" change="+12%" />
            <StatCard title="Users" value="8,932" change="+5%" />
            <StatCard title="Sales" value="1,231" change="-2%" />
            <StatCard title="Growth" value="18%" change="+3%" />
          </div>

          {/* Chart + Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Chart />
            </div>
            <div>
              <DataTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
