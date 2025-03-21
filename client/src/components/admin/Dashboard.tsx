import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Users, DollarSign, BarChart2 } from "lucide-react";
import {
  DashboardStats,
  useDashboardStatsQuery,
} from "@/hooks/admin/useDashboardStats";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { useUpcomingEventsQuery } from "@/hooks/event/useEvent";
import { getUpcomingEventsForAdmin } from "@/services/event/eventService";
import { PopulatedEvents } from "@/types/Event";
import moment from "moment";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [hostedEvents, setHostedEvents] = useState<PopulatedEvents[] | null>(
    null
  );
  const { data, isLoading } = useDashboardStatsQuery();
  

  const { data: upcomingEvents, isLoading: updcomingLoading } = useUpcomingEventsQuery(getUpcomingEventsForAdmin);

  useEffect(() => {
    if (upcomingEvents) {
      setHostedEvents(upcomingEvents.events)
    }
  }, [upcomingEvents])

  useEffect(() => {
    if (data) {
      setStats(data.stats);
    }
  }, [data]);

  if (isLoading || updcomingLoading) {
    return <Spinner />;
  }

  if (!stats || !hostedEvents) {
    return;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Event Management Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActiveEvents}</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActiveCategories}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActiveClients}</div>
            <p className="text-xs text-muted-foreground">
              +35% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActiveVendors}</div>
            <p className="text-xs text-muted-foreground">2 ending this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your next 3 events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {hostedEvents.slice(0, 6).map((event, index) => (
              <div key={index} className="flex items-center">
                <CalendarDays className="mr-4 h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {event.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{moment(event.date).format('LLL')}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {event.eventLocation}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
