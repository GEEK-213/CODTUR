import { Card, CardContent } from "@/components/ui/card"

export default function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <p className="text-sm text-zinc-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
        <p className={`text-sm ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{change}</p>
      </CardContent>
    </Card>
  )
}
