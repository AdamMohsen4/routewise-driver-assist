
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';

const Compliance = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Compliance Tracker</h1>
        
        <Tabs defaultValue="daily">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Daily Driving Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Driving Time</span>
                      <span className="font-medium">7h 30m / 9h</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Break Time</span>
                      <span className="font-medium">30m / 45m</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-sm">
                      You need to take a 15-minute break within the next hour to comply with regulations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Rest Periods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Morning Break</p>
                      <p className="text-sm text-muted-foreground">10:15 - 10:30</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Completed</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Lunch Break</p>
                      <p className="text-sm text-muted-foreground">13:00 - 13:45</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Completed</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Afternoon Break</p>
                      <p className="text-sm text-muted-foreground">16:00 - 16:15</p>
                    </div>
                    <span className="text-amber-600 text-sm font-medium">Upcoming</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Driving Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Weekly Driving Time</span>
                      <span className="font-medium">42h / 56h</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                      <div key={day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">{day}</div>
                        <div 
                          className="bg-primary/10 rounded-full h-16 relative" 
                          style={{ opacity: i > 4 ? 0.3 : 1 }}
                        >
                          <div 
                            className="absolute bottom-0 w-full bg-primary rounded-full"
                            style={{ 
                              height: `${[75, 85, 60, 90, 55, 0, 0][i]}%`, 
                            }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium mt-1">
                          {[8.5, 9, 7, 9.5, 8, 0, 0][i]}h
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">Compliance Rate</p>
                  <div className="text-4xl font-bold">98.5%</div>
                  <p className="text-sm text-muted-foreground mt-2">Based on 22 working days this month</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Driving Hours Compliance</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Break Time Compliance</span>
                    <span className="font-medium text-green-600">96%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rest Period Compliance</span>
                    <span className="font-medium text-amber-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Documentation Compliance</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Compliance;
