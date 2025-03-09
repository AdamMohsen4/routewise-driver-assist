
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Truck, FileText, Settings, Shield } from 'lucide-react';

const Profile = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-truckwise-blue flex items-center justify-center text-white text-3xl">
                    JS
                  </div>
                </div>
                <CardTitle>Johan Svensson</CardTitle>
                <CardDescription>Professional Driver</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Volvo FH16</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>License: ABC12345</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>5 Years Experience</span>
                  </div>
                  <Button className="w-full mt-4">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="personal">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal">
                  <User className="h-4 w-4 mr-2" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="vehicle">
                  <Truck className="h-4 w-4 mr-2" />
                  Vehicle
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">Johan Svensson</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">johan.svensson@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">+46 70 123 4567</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">Sveavägen 42, Stockholm</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Commercial Driver's License</p>
                        <p className="text-sm text-muted-foreground">Category CE</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">Valid until: </span>
                        <span>10/12/2025</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">ADR Certificate</p>
                        <p className="text-sm text-muted-foreground">Dangerous Goods Transport</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">Valid until: </span>
                        <span>03/28/2024</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Driver CPC</p>
                        <p className="text-sm text-muted-foreground">Professional Competence</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">Valid until: </span>
                        <span>06/15/2026</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="vehicle" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Model</p>
                        <p className="font-medium">Volvo FH16</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-medium">2021</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">License Plate</p>
                        <p className="font-medium">ABC 123</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">VIN</p>
                        <p className="font-medium">YV2RT40A8MB123456</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Oil Change</p>
                        <p className="text-sm text-muted-foreground">Every 30,000 km</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-amber-600 font-medium">Due in: </span>
                        <span>2,450 km</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Brake Inspection</p>
                        <p className="text-sm text-muted-foreground">Every 20,000 km</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">Due in: </span>
                        <span>12,830 km</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Annual Service</p>
                        <p className="text-sm text-muted-foreground">Full inspection</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-red-600 font-medium">Due: </span>
                        <span>Overdue by 2 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>App Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-muted-foreground">Enable push notifications</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Light</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Data Usage</p>
                        <p className="text-sm text-muted-foreground">Use mobile data for updates</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">WiFi Only</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Location Sharing</p>
                        <p className="text-sm text-muted-foreground">Share your location with your company</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Data Collection</p>
                        <p className="text-sm text-muted-foreground">Allow anonymous usage data collection</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Disabled</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
