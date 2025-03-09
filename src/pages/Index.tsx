
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Truck, Map, AlertTriangle, Gauge, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-truckwise-blue-800 to-truckwise-blue-600 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
                TruckWise
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl animate-slide-down">
                The comprehensive tool for truck drivers to optimize routes, 
                track compliance, and receive real-time updates.
              </p>
              <div className="pt-4 animate-slide-up">
                <Button 
                  size="lg" 
                  className="bg-truckwise-orange hover:bg-truckwise-orange-700 text-white"
                  onClick={handleGetStarted}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img 
                src="/images/truckwise-logo.svg" 
                alt="TruckWise Logo"
                className="w-64 h-64 animate-fade-in" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Map className="h-10 w-10 text-truckwise-blue" />}
              title="Route Optimization"
              description="AI-powered route calculation based on traffic, weather, and road conditions."
            />
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-truckwise-blue" />}
              title="Compliance Tracking"
              description="Automatic logging of driving hours and rest periods to ensure regulatory compliance."
            />
            <FeatureCard 
              icon={<AlertTriangle className="h-10 w-10 text-truckwise-orange" />}
              title="Real-Time Updates"
              description="Instant notifications about road conditions, accidents, and weather changes."
            />
            <FeatureCard 
              icon={<Gauge className="h-10 w-10 text-truckwise-blue" />}
              title="Fuel Efficiency"
              description="Track consumption and get suggestions to improve fuel efficiency."
            />
            <FeatureCard 
              icon={<Truck className="h-10 w-10 text-truckwise-blue" />}
              title="Vehicle Management"
              description="Monitor vehicle status, maintenance schedules, and performance metrics."
            />
            <FeatureCard 
              icon={<AlertTriangle className="h-10 w-10 text-truckwise-orange" />}
              title="Document Management"
              description="Store and organize important documents securely with blockchain technology."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-truckwise-grey-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to optimize your routes?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of truck drivers already using TruckWise to increase efficiency and compliance.
          </p>
          <Button 
            size="lg" 
            className="bg-truckwise-orange hover:bg-truckwise-orange-700 text-white"
            onClick={handleGetStarted}
          >
            Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="truckwise-card p-6 flex flex-col items-center text-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
