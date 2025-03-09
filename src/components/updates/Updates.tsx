
import { useState } from "react";
import { 
  Cloud, 
  AlertTriangle, 
  Truck, 
  Calendar,
  MapPin,
  Info,
  Filter
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for updates
const weatherUpdates = [
  {
    id: 1,
    title: "Strong winds in Stockholm area",
    description: "Wind speeds of up to 15m/s expected. Exercise caution when driving high-sided vehicles.",
    severity: "medium",
    location: "Stockholm",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "Heavy snow expected in northern regions",
    description: "Up to 30cm of snow expected in the next 24 hours in Norrland. Chain requirements may apply.",
    severity: "high",
    location: "Norrland",
    timestamp: "3 hours ago"
  },
  {
    id: 3,
    title: "Fog advisory in Gothenburg",
    description: "Visibility reduced to 100m in some areas. Use fog lights and reduce speed.",
    severity: "medium",
    location: "Gothenburg",
    timestamp: "5 hours ago"
  }
];

const trafficUpdates = [
  {
    id: 1,
    title: "Accident on E4 highway",
    description: "Two-vehicle collision near Uppsala. Right lane closed. Expect delays of 30-45 minutes.",
    severity: "high",
    location: "E4, Uppsala",
    timestamp: "1 hour ago"
  },
  {
    id: 2,
    title: "Roadwork on Route 40",
    description: "Lane closures between Borås and Gothenburg. Expected to continue for 2 weeks.",
    severity: "medium",
    location: "Route 40",
    timestamp: "1 day ago"
  },
  {
    id: 3,
    title: "Bridge weight restriction",
    description: "Temporary weight restriction on Öresund Bridge due to maintenance. Max 30 tons.",
    severity: "medium",
    location: "Öresund Bridge",
    timestamp: "2 days ago"
  }
];

const regulatoryUpdates = [
  {
    id: 1,
    title: "New rest requirements",
    description: "Updated EU regulations for mandatory rest periods take effect next month.",
    severity: "info",
    timestamp: "1 week ago"
  },
  {
    id: 2,
    title: "Stockholm city center restrictions",
    description: "New environmental zone regulations for trucks entering Stockholm city center.",
    severity: "info",
    location: "Stockholm",
    timestamp: "2 weeks ago"
  }
];

export default function Updates() {
  const [activeTab, setActiveTab] = useState("all");
  
  const allUpdates = [
    ...weatherUpdates.map(update => ({ ...update, type: 'weather' })),
    ...trafficUpdates.map(update => ({ ...update, type: 'traffic' })),
    ...regulatoryUpdates.map(update => ({ ...update, type: 'regulatory' }))
  ].sort((a, b) => {
    // Sort by timestamp (most recent first)
    const aTime = a.timestamp.includes('hour') ? 
      parseInt(a.timestamp) : 
      a.timestamp.includes('day') ? 
        parseInt(a.timestamp) * 24 : 
        parseInt(a.timestamp) * 24 * 7;
    
    const bTime = b.timestamp.includes('hour') ? 
      parseInt(b.timestamp) : 
      b.timestamp.includes('day') ? 
        parseInt(b.timestamp) * 24 : 
        parseInt(b.timestamp) * 24 * 7;
    
    return aTime - bTime;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-muted-foreground">
            Stay informed with the latest weather, traffic, and regulatory updates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            My Routes Only
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {allUpdates.map((update) => (
              <UpdateCard key={`${update.type}-${update.id}`} update={update} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="weather" className="mt-6">
          <div className="space-y-4">
            {weatherUpdates.map((update) => (
              <UpdateCard key={update.id} update={{...update, type: 'weather'}} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="traffic" className="mt-6">
          <div className="space-y-4">
            {trafficUpdates.map((update) => (
              <UpdateCard key={update.id} update={{...update, type: 'traffic'}} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="regulatory" className="mt-6">
          <div className="space-y-4">
            {regulatoryUpdates.map((update) => (
              <UpdateCard key={update.id} update={{...update, type: 'regulatory'}} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface UpdateProps {
  update: {
    id: number;
    title: string;
    description: string;
    severity: string;
    location?: string;
    timestamp: string;
    type: string;
  }
}

function UpdateCard({ update }: UpdateProps) {
  return (
    <Card className="truckwise-card overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TypeIcon type={update.type} />
            <CardTitle className="text-lg">{update.title}</CardTitle>
          </div>
          {update.location && (
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {update.location}
            </CardDescription>
          )}
        </div>
        <SeverityBadge severity={update.severity} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {update.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{update.timestamp}</span>
          <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'weather':
      return <Cloud className="h-5 w-5 text-blue-500" />;
    case 'traffic':
      return <Truck className="h-5 w-5 text-orange-500" />;
    case 'regulatory':
      return <Info className="h-5 w-5 text-purple-500" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  }
}

function SeverityBadge({ severity }: { severity: string }) {
  switch (severity) {
    case 'high':
      return (
        <Badge variant="destructive">
          Critical
        </Badge>
      );
    case 'medium':
      return (
        <Badge variant="default" className="bg-yellow-500">
          Warning
        </Badge>
      );
    case 'info':
      return (
        <Badge variant="outline" className="text-blue-500 border-blue-500">
          Info
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary">
          Notice
        </Badge>
      );
  }
}
