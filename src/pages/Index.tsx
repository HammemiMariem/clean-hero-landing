import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* Hero image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={heroImage} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Build Something
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into reality with our cutting-edge platform. 
            Simple, powerful, and designed for creators who think big.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-xl animate-pulse hidden lg:block"></div>
      </div>
    </div>
  );
};

export default Index;
