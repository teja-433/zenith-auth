import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Shield, Lock, Smartphone, Eye } from 'lucide-react';
const HomePage: React.FC = () => {
  return <div className="min-h-screen bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{
      animationDelay: '2s'
    }} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> ACTION GUARDING SERVICES</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-fade-in">
              Secure Authentication
            </h2>
            
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
              <Button asChild size="lg" className="btn-primary-glass text-lg px-8 py-6">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass text-lg px-8 py-6">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          

          {/* CTA Section */}
          <div className="text-center mt-20">
            <Card className="glass-card border-0 max-w-2xl mx-auto animate-fade-in" style={{
            animationDelay: '1.4s'
          }}>
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Ready to get started?</CardTitle>
                
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" className="btn-primary-glass animate-glow">
                  <Link to="/register">Create Your Account</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default HomePage;