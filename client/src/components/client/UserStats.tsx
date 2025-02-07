import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserStats() {
  const stats = [
    { title: "Events Attended", value: 27 },
    { title: "Events Organized", value: 12 },
    { title: "Connections", value: 156 },
    { title: "Reviews", value: 48 },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
