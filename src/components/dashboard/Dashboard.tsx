
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  Cloud, 
  BarChart, 
  Truck, 
  AlertTriangle, 
  Droplet, 
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock data for the dashboard
const currentWeather = {
  location: "Stockholm",
  temperature: 12,
  condition: "Cloudy",
  forecast: [
    { day: "Today", high: 12, low: 5, condition: "Cloudy" },
    { day: "Tomorrow", high: 14, low: 7, condition: "Partly Cloudy" },
    { day: "Wednesday", high: 15, low: 8, condition: "Sunny" }
  ]
};

const drivingHours = {
  daily: { current: 7, max: 9 },
  weekly: { current: 42, max: 56 },
  biweekly: { current: 78, max: 90 }
};

const recentRoutes = [
  {
    id: 1,
    from: "Stockholm",
    to: "Gothenburg",
    distance: "470 km",
    duration: "5h 30m",
    date: "Today"
  },
  {
    id: 2,
    from: "Gothenburg",
    to: "Malmö",
    distance: "270 km",
    duration: "3h 15m",
    date: "Yesterday"
  },
  {
    id: 3,
    from: "Malmö",
    to: "Stockholm",
    distance: "615 km",
    duration: "6h 45m",
    date: "2 days ago"
  }
];

const alerts = [
  {
    id: 1,
    type: "roadwork",
    message: "Roadwork on E4 between Jönköping and Linköping",
    severity: "medium",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "weather",
    message: "Strong winds expected in Skåne region tomorrow",
    severity: "high",
    time: "4 hours ago"
  },
  {
    id: 3,
    type: "traffic",
    message: "Heavy traffic on E18 near Stockholm",
    severity: "low",
    time: "1 hour ago"
  }
];

const fuelStats = {
  average: 28.4, // L/100km
  lastTrip: 27.2,
  trend: "down", // up, down, stable
  savings: 152 // SEK
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="animate-fade-in">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your driving status.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Cloud className="mr-2 h-4 w-4" />
              Weather Alerts
            </Button>
            <Button variant="default" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              Plan New Route
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Driving Hours Card */}
              <Card className="truckwise-card animate-slide-up" style={{ animationDelay: "0ms" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Driving Hours
                  </CardTitle>
                  <CardDescription>Daily, weekly limits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Daily</span>
                        <span className="text-sm text-muted-foreground">
                          {drivingHours.daily.current}/{drivingHours.daily.max}h
                        </span>
                      </div>
                      <Progress 
                        value={(drivingHours.daily.current / drivingHours.daily.max) * 100} 
                        className={cn({
                          "bg-green-200": drivingHours.daily.current < drivingHours.daily.max * 0.7,
                          "bg-yellow-200": drivingHours.daily.current >= drivingHours.daily.max * 0.7 && drivingHours.daily.current < drivingHours.daily.max * 0.9,
                          "bg-red-200": drivingHours.daily.current >= drivingHours.daily.max * 0.9
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Weekly</span>
                        <span className="text-sm text-muted-foreground">
                          {drivingHours.weekly.current}/{drivingHours.weekly.max}h
                        </span>
                      </div>
                      <Progress 
                        value={(drivingHours.weekly.current / drivingHours.weekly.max) * 100} 
                        className="bg-blue-200"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/compliance" className="text-sm text-primary hover:text-primary/80 flex items-center">
                    View detailed compliance
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Weather Card */}
              <Card className="truckwise-card animate-slide-up" style={{ animationDelay: "50ms" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Cloud className="h-4 w-4 mr-2 text-primary" />
                    Weather
                  </CardTitle>
                  <CardDescription>{currentWeather.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold">
                      {currentWeather.temperature}°C
                    </div>
                    <div className="text-muted-foreground">
                      {currentWeather.condition}
                    </div>
                    <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center">
                      {currentWeather.forecast.map((day, index) => (
                        <div key={index} className="text-xs">
                          <div className="font-medium">{day.day}</div>
                          <div>
                            {day.high}° / {day.low}°
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/updates" className="text-sm text-primary hover:text-primary/80 flex items-center">
                    View forecast
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Fuel Efficiency Card */}
              <Card className="truckwise-card animate-slide-up" style={{ animationDelay: "100ms" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Droplet className="h-4 w-4 mr-2 text-primary" />
                    Fuel Efficiency
                  </CardTitle>
                  <CardDescription>Current statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average</span>
                      <span className="font-medium">{fuelStats.average} L/100km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Trip</span>
                      <div className="flex items-center">
                        <span className="font-medium">{fuelStats.lastTrip} L/100km</span>
                        {fuelStats.trend === "down" && (
                          <TrendingUp className="ml-1 h-4 w-4 text-green-500 rotate-180" />
                        )}
                        {fuelStats.trend === "up" && (
                          <TrendingUp className="ml-1 h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings</span>
                      <span className="font-medium text-green-500">{fuelStats.savings} SEK</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/profile" className="text-sm text-primary hover:text-primary/80 flex items-center">
                    View detailed stats
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Active Alerts Card */}
              <Card className="truckwise-card animate-slide-up" style={{ animationDelay: "150ms" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                    Active Alerts
                  </CardTitle>
                  <CardDescription>{alerts.length} new alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.slice(0, 2).map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-2">
                        <div className={cn("rounded-full w-2 h-2 mt-1.5", {
                          "bg-yellow-500": alert.severity === "medium",
                          "bg-red-500": alert.severity === "high",
                          "bg-blue-500": alert.severity === "low"
                        })} />
                        <div className="text-sm flex-1 truncate">
                          {alert.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/updates" className="text-sm text-primary hover:text-primary/80 flex items-center">
                    View all alerts
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            {/* Recent Routes */}
            <Card className="truckwise-card animate-slide-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-primary" />
                  Recent Routes
                </CardTitle>
                <CardDescription>Your last trips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRoutes.map((route) => (
                    <div key={route.id} className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-2 border-b last:border-0">
                      <div className="flex items-center space-x-4">
                        <div className="hidden md:flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {route.from} to {route.to}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {route.distance} • {route.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground">
                          {route.date}
                        </span>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/routes" className="text-sm text-primary hover:text-primary/80 flex items-center">
                  View all routes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="routes">
            <Card className="truckwise-card">
              <CardHeader>
                <CardTitle>Route Planning</CardTitle>
                <CardDescription>
                  Plan and optimize your routes efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Link to="/routes">
                    <Button size="lg" className="gap-2">
                      <MapPin className="h-4 w-4" />
                      Go to Route Planner
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance">
            <Card className="truckwise-card">
              <CardHeader>
                <CardTitle>Compliance Tracking</CardTitle>
                <CardDescription>
                  Monitor your driving hours and rest periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Link to="/compliance">
                    <Button size="lg" className="gap-2">
                      <Clock className="h-4 w-4" />
                      View Compliance Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="updates">
            <Card className="truckwise-card">
              <CardHeader>
                <CardTitle>Weather & Road Updates</CardTitle>
                <CardDescription>
                  Stay informed with the latest conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Link to="/updates">
                    <Button size="lg" className="gap-2">
                      <Cloud className="h-4 w-4" />
                      Check Updates
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
