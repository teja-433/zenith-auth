import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Mail, Smartphone, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const otpSchema = z.object({
  code: z.string().min(6, 'Please enter the complete verification code'),
});

type OtpForm = z.infer<typeof otpSchema>;

const TwoFactorPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [activeTab, setActiveTab] = useState('email');

  const form = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: '',
    },
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Send initial email OTP
    sendEmailOTP();

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, navigate]);

  const sendEmailOTP = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.functions.invoke('generate-otp', {
        body: { userId: user.id, type: 'two_factor' }
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to send verification code. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyEmailOTP = async (code: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { userId: user.id, code, type: 'two_factor' }
      });

      if (error || !data.valid) {
        toast({
          title: "Invalid Code",
          description: "The verification code you entered is invalid or expired.",
          variant: "destructive"
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const verifyTOTP = async (code: string) => {
    if (!user || !profile?.totp_secret) return false;

    try {
      const { data, error } = await supabase.functions.invoke('verify-totp', {
        body: { userId: user.id, code }
      });

      if (error || !data.valid) {
        toast({
          title: "Invalid Code",
          description: "The authenticator code you entered is invalid.",
          variant: "destructive"
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verifying TOTP:', error);
      return false;
    }
  };

  const onSubmit = async (data: OtpForm) => {
    setIsLoading(true);
    
    try {
      let isValid = false;
      
      if (activeTab === 'email') {
        isValid = await verifyEmailOTP(data.code);
      } else {
        isValid = await verifyTOTP(data.code);
      }

      if (isValid) {
        toast({
          title: "Success!",
          description: "Two-factor authentication completed successfully.",
          variant: "default"
        });
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* 2FA Verification Form */}
      <Card className="glass-card border-0 w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl glass animate-glow">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
          <CardDescription>
            Please verify your identity to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 glass">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger 
                value="authenticator" 
                className="flex items-center gap-2"
                disabled={!profile?.totp_secret}
              >
                <Smartphone className="h-4 w-4" />
                App
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <div className="text-center p-4 glass rounded-lg">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  We've sent a verification code to your email
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Code expires in {formatTime(timeLeft)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="authenticator" className="space-y-4">
              <div className="text-center p-4 glass rounded-lg">
                <Smartphone className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Enter the code from your authenticator app
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center block">Verification Code</FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP 
                          maxLength={6} 
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="glass" />
                            <InputOTPSlot index={1} className="glass" />
                            <InputOTPSlot index={2} className="glass" />
                            <InputOTPSlot index={3} className="glass" />
                            <InputOTPSlot index={4} className="glass" />
                            <InputOTPSlot index={5} className="glass" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full btn-primary-glass"
                disabled={isLoading || form.watch('code').length < 6}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </Button>
            </form>
          </Form>

          {activeTab === 'email' && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                className="glass"
                onClick={sendEmailOTP}
                disabled={timeLeft > 240} // Can resend after 1 minute
              >
                Resend Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFactorPage;