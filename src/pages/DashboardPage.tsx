import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Settings, LogOut, User, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/20 glass">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SecureAuth
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button asChild variant="outline" className="glass">
                <Link to="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button onClick={handleSignOut} variant="outline" className="glass">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 animate-fade-in">
              Welcome back, {profile.display_name}!
            </h2>
            <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your account is secure and ready to use.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile
                  </CardTitle>
                  <Badge variant="secondary" className="glass">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Joined {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Authentication</span>
                  {profile.two_factor_enabled ? (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-destructive/20 border-destructive/30">
                      <XCircle className="h-3 w-3 mr-1" />
                      Disabled
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <Badge className="bg-success/20 text-success border-success/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full btn-glass justify-start">
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </Button>
                <Button asChild className="w-full btn-glass justify-start">
                  <Link to="/settings">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Security Recommendations */}
          {!profile.two_factor_enabled && (
            <Card className="glass-card border-0 mt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <Shield className="h-5 w-5" />
                  Security Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium mb-1">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account by enabling 2FA.
                    </p>
                  </div>
                  <Button asChild className="btn-primary-glass">
                    <Link to="/settings">
                      Enable Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card className="glass-card border-0 mt-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest account activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Successful login</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 glass rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Account created</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(profile.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;