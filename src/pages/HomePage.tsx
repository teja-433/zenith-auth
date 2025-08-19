import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Shield, Lock, Smartphone, Eye } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SecureAuth
            </h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-fade-in">
              Secure Authentication
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Advanced 2-Factor Authentication with modern glassmorphism design. 
              Protect your accounts with email OTP and TOTP authenticator support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="btn-primary-glass text-lg px-8 py-6">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass text-lg px-8 py-6">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Secure Login</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Industry-standard authentication with advanced security measures
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <CardHeader className="text-center">
                <Lock className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>2FA Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Email OTP and TOTP authenticator app support for maximum security
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '1s' }}>
              <CardHeader className="text-center">
                <Smartphone className="h-12 w-12 text-primary-glow mx-auto mb-4" />
                <CardTitle>Mobile Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Responsive design that works perfectly on all devices
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Modern UI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Beautiful glassmorphism design with smooth animations
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <Card className="glass-card border-0 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Ready to get started?</CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of users who trust SecureAuth for their authentication needs.
                </CardDescription>
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
    </div>
  );
};

export default HomePage;