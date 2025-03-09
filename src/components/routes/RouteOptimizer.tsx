
import { useState } from "react";
import { Search, MapPin, Navigation, Calendar, Clock, Settings, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data
const savedRoutes = [
  {
    id: 1,
    name: "Stockholm to Gothenburg",
    start: "Stockholm",
    end: "Gothenburg",
    distance: "470 km",
    duration: "5h 30m",
    lastUsed: "2 days ago"
  },
  {
    id: 2,
    name: "Stockholm to Malmö",
    start: "Stockholm",
    end: "Malmö",
    distance: "615 km",
    duration: "6h 45m",
    lastUsed: "Last week"
  },
  {
    id: 3,
    name: "Gothenburg to Sundsvall",
    start: "Gothenburg",
    end: "Sundsvall",
    distance: "782 km",
    duration: "8h 15m",
    lastUsed: "2 weeks ago"
  }
];

const routeDetails = {
  from: "Stockholm",
  to: "Gothenburg",
  via: ["Södertälje", "Norrköping", "Linköping", "Jönköping"],
  distance: "470 km",
  duration: "5h 30m",
  eta: "Today at 15:30",
  restStops: [
    { location: "Nyköping", duration: "15m", distance: "100 km" },
    { location: "Linköping", duration: "45m", distance: "235 km" }
  ],
  alerts: [
    { type: "traffic", severity: "medium", message: "Moderate traffic expected around Norrköping", icon: "traffic" },
    { type: "roadwork", severity: "low", message: "Minor roadwork near Jönköping", icon: "construction" },
    { type: "weather", severity: "high", message: "Strong winds and rain forecasted for Jönköping to Gothenburg", icon: "weather" }
  ],
  optimizations: [
    { type: "fuel", value: "Saves approximately 28 liters of fuel", benefit: "345 SEK saved" },
    { type: "time", value: "Avoids 45 minutes of traffic", benefit: "8% faster route" },
    { type: "toll", value: "Avoids 2 toll sections", benefit: "170 SEK saved" }
  ]
};

export default function RouteOptimizer() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<null | typeof routeDetails>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleOptimizeRoute = () => {
    if (!startLocation || !endLocation) return;
    
    setIsOptimizing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsOptimizing(false);
      setSelectedRoute(routeDetails);
    }, 1500);
  };
  
  const handleSavedRouteClick = (id: number) => {
    setIsOptimizing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsOptimizing(false);
      setSelectedRoute(routeDetails);
    }, 1000);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route Optimizer</h1>
          <p className="text-muted-foreground">
            Plan optimal routes based on traffic, weather, and road conditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="truckwise-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Navigation className="h-4 w-4 mr-2 text-primary" />
                  Plan Your Route
                </CardTitle>
                <CardDescription>Enter your origin and destination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Starting Point</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter starting location" 
                      className="pl-9" 
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter destination" 
                      className="pl-9" 
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    className="w-full"
                    onClick={handleOptimizeRoute}
                    disabled={!startLocation || !endLocation || isOptimizing}
                  >
                    {isOptimizing ? (
                      <>Optimizing...</>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Optimize Route
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="truckwise-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  Saved Routes
                </CardTitle>
                <CardDescription>Your frequently used routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedRoutes.map((route) => (
                    <div 
                      key={route.id} 
                      className="p-3 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors"
                      onClick={() => handleSavedRouteClick(route.id)}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium">{route.name}</div>
                        <Badge variant="outline" className="text-xs">{route.distance}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Last used: {route.lastUsed}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {isOptimizing ? (
              <Card className="truckwise-card h-full flex flex-col justify-center items-center p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                  <h3 className="text-xl font-semibold">Optimizing Your Route</h3>
                  <p className="text-muted-foreground max-w-md">
                    Analyzing traffic patterns, weather conditions, and road status to find the most efficient route...
                  </p>
                </div>
              </Card>
            ) : selectedRoute ? (
              <Card className="truckwise-card animate-fade-in">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedRoute.from} to {selectedRoute.to}</CardTitle>
                      <CardDescription>
                        {selectedRoute.distance} • {selectedRoute.duration}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Options
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Estimated arrival: {selectedRoute.eta}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Based on current traffic and weather conditions
                      </p>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                      <TabsTrigger value="directions" className="flex-1">Directions</TabsTrigger>
                      <TabsTrigger value="alerts" className="flex-1">Alerts</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Route Overview</h3>
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center py-1">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <MapPin className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{selectedRoute.from}</div>
                                <div className="text-xs text-muted-foreground">Starting point</div>
                              </div>
                            </div>
                            
                            {selectedRoute.via.map((point, index) => (
                              <div key={index} className="flex items-center py-1">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
                                  <span className="text-xs font-medium">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{point}</div>
                                  <div className="text-xs text-muted-foreground">Via point</div>
                                </div>
                              </div>
                            ))}
                            
                            <div className="flex items-center py-1">
                              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                                <MapPin className="h-4 w-4 text-accent-foreground" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{selectedRoute.to}</div>
                                <div className="text-xs text-muted-foreground">Destination</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            Route Optimizations
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {selectedRoute.optimizations.map((opt, i) => (
                              <div key={i} className="border rounded-lg p-3">
                                <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  {opt.type === "fuel" ? "Fuel Efficiency" : 
                                   opt.type === "time" ? "Time Saving" : "Toll Avoidance"}
                                </div>
                                <div className="text-sm">{opt.value}</div>
                                <div className="text-xs text-muted-foreground">{opt.benefit}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            Required Rest Stops
                          </h3>
                          <div className="space-y-2">
                            {selectedRoute.restStops.map((stop, i) => (
                              <div key={i} className="flex items-center justify-between px-3 py-2 border rounded-lg">
                                <div>
                                  <div className="font-medium">{stop.location}</div>
                                  <div className="text-xs text-muted-foreground">
                                    After {stop.distance} from start
                                  </div>
                                </div>
                                <Badge variant="outline">{stop.duration} break</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="directions">
                      <div className="space-y-4">
                        <div className="text-center py-12">
                          <div className="mb-4 text-muted-foreground">
                            Turn-by-turn directions will be available in the next update
                          </div>
                          <Button disabled>See Directions</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="alerts">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium mb-2">Route Alerts</h3>
                        {selectedRoute.alerts.map((alert, i) => (
                          <div 
                            key={i} 
                            className={cn("p-3 rounded-lg border-l-4", {
                              "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20": alert.severity === "medium",
                              "border-l-red-500 bg-red-50 dark:bg-red-950/20": alert.severity === "high",
                              "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20": alert.severity === "low"
                            })}
                          >
                            <div className="flex items-start">
                              <AlertTriangle className={cn("h-5 w-5 mr-2 mt-0.5", {
                                "text-yellow-500": alert.severity === "medium",
                                "text-red-500": alert.severity === "high",
                                "text-blue-500": alert.severity === "low"
                              })} />
                              <div>
                                <div className="font-medium">
                                  {alert.type === "traffic" ? "Traffic Alert" : 
                                   alert.type === "roadwork" ? "Road Construction" : "Weather Warning"}
                                </div>
                                <div className="text-sm">{alert.message}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save Route</Button>
                  <Button>Start Navigation</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="truckwise-card h-full flex flex-col justify-center items-center p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary/80 rounded-full flex items-center justify-center mx-auto">
                    <Navigation className="h-8 w-8 text-secondary-foreground/70" />
                  </div>
                  <h3 className="text-xl font-semibold">Plan Your Journey</h3>
                  <p className="text-muted-foreground max-w-md">
                    Enter your starting point and destination to get optimized routes with real-time traffic, weather, and road information.
                  </p>
                  <div className="pt-2">
                    <Button variant="outline">View Tutorial</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
