import { ArrowLeft, User, Bell, Shield, HelpCircle, LogOut, Mail, Phone, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ProfileSettingsProps {
  userName: string;
  onBack: () => void;
  onLogout: () => void;
}

export function ProfileSettings({ userName, onBack, onLogout }: ProfileSettingsProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white p-6 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">Profile & Settings</h2>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-[#0066CC]" />
          </div>
          <div>
            <p className="text-white mb-1">{userName}</p>
            <p className="text-white/80">Patient Profile</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8 space-y-4">
        {/* Account Settings */}
        <Card className="p-5 bg-white shadow-md border-0">
          <p className="text-[#333] mb-4">Account Settings</p>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#F8F9FA] rounded-lg transition-all">
              <Mail className="w-5 h-5 text-[#0066CC]" />
              <div className="flex-1 text-left">
                <p className="text-[#333]">Email Preferences</p>
                <p className="text-[#666]">Manage notification emails</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#F8F9FA] rounded-lg transition-all">
              <Bell className="w-5 h-5 text-[#0066CC]" />
              <div className="flex-1 text-left">
                <p className="text-[#333]">Notifications</p>
                <p className="text-[#666]">Alert preferences</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#F8F9FA] rounded-lg transition-all">
              <Shield className="w-5 h-5 text-[#0066CC]" />
              <div className="flex-1 text-left">
                <p className="text-[#333]">Privacy & Security</p>
                <p className="text-[#666]">Manage your data</p>
              </div>
            </button>
          </div>
        </Card>

        {/* Device Information */}
        <Card className="p-5 bg-white shadow-md border-0">
          <p className="text-[#333] mb-4">My Device</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg">
              <Heart className="w-5 h-5 text-[#0066CC]" fill="#0066CC" />
              <div className="flex-1">
                <p className="text-[#333]">Medtronic ICD</p>
                <p className="text-[#666]">Last checked: 2 weeks ago</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-5 bg-white shadow-md border-0">
          <p className="text-[#333] mb-4">Help & Support</p>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#F8F9FA] rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5 text-[#0066CC]" />
              <div className="flex-1 text-left">
                <p className="text-[#333]">Help Center</p>
                <p className="text-[#666]">FAQs and guides</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#F8F9FA] rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-[#0066CC]" />
              <div className="flex-1 text-left">
                <p className="text-[#333]">Contact Support</p>
                <p className="text-[#666]">Get help from our team</p>
              </div>
            </button>
          </div>
        </Card>

        {/* App Information */}
        <Card className="p-5 bg-white shadow-md border-0">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[#666]">Version</p>
              <p className="text-[#333]">1.0.0</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#666]">Data Storage</p>
              <p className="text-[#333]">Local (Offline-enabled)</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#666]">Terms & Privacy</p>
              <button className="text-[#0066CC]">View</button>
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          className="w-full h-12 bg-white text-red-600 border-2 border-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>

        {/* HIPAA Notice */}
        <Card className="p-4 bg-[#F0F7FF] border border-[#0066CC]/20">
          <p className="text-[#0066CC] text-center">
            🔒 HIPAA Compliant Design • Your data is encrypted and secure
          </p>
        </Card>
      </div>
    </div>
  );
}