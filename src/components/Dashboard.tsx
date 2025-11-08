import { Heart, Upload, BookOpen, User, FileText, Calendar, AlertCircle, LogOut, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Screen, Report } from '../App';

interface DashboardProps {
  reports: Report[];
  userName: string;
  onNavigate: (screen: Screen) => void;
  onViewReport: (report: Report) => void;
  onDeleteReport: (reportId: string) => void;
  onLogout: () => void;
}

export function Dashboard({ 
  reports, 
  userName, 
  onNavigate, 
  onViewReport,
  onDeleteReport,
  onLogout 
}: DashboardProps) {
  // Get recent alerts from reports
  const recentAlerts = reports
    .flatMap(r => r.processedTerms.filter(t => t.category === 'alert'))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#0066CC]" fill="#0066CC" />
            </div>
            <div>
              <h1 className="text-white">PeaceMaker</h1>
              <p className="text-white/80">Welcome back</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/80 mb-1">Total Reports</p>
            <p className="text-white">{reports.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/80 mb-1">Active Alerts</p>
            <p className="text-white">{recentAlerts.length}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card 
            className="p-4 bg-white shadow-md border-0 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('upload')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-[#0066CC]/10 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#0066CC]" />
              </div>
              <p className="text-[#333]">Upload Report</p>
            </div>
          </Card>

          <Card 
            className="p-4 bg-white shadow-md border-0 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('dictionary')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-[#0066CC]/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#0066CC]" />
              </div>
              <p className="text-[#333]">Dictionary</p>
            </div>
          </Card>
        </div>

        {/* Alerts Section */}
        {recentAlerts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[#333] mb-3">Important Alerts</h3>
            <div className="space-y-2">
              {recentAlerts.map((alert, idx) => (
                <Card key={idx} className="p-4 bg-[#FFF4E6] border-l-4 border-[#FF9500]">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-[#FF9500] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#333] mb-1">{alert.term}</p>
                      <p className="text-[#666]">{alert.meaning}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recent Reports */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#333]">Your Reports</h3>
            {reports.length > 0 && (
              <button className="text-[#0066CC]">
                View All
              </button>
            )}
          </div>

          {reports.length === 0 ? (
            <Card className="p-8 bg-white border-2 border-dashed border-[#E0E0E0]">
              <div className="text-center">
                <FileText className="w-12 h-12 text-[#999] mx-auto mb-3" />
                <p className="text-[#666] mb-4">
                  No reports yet. Upload your first medical report to get started.
                </p>
                <Button
                  onClick={() => onNavigate('upload')}
                  className="bg-[#0066CC] hover:bg-[#0052A3] text-white"
                >
                  Upload Report
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {reports.slice().reverse().map((report) => (
                <Card
                  key={report.id}
                  className="p-4 bg-white shadow-sm border-0 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 bg-[#0066CC]/10 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer"
                      onClick={() => onViewReport(report)}
                    >
                      <FileText className="w-5 h-5 text-[#0066CC]" />
                    </div>
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onViewReport(report)}>
                      <p className="text-[#333] mb-1 truncate">{report.title}</p>
                      <div className="flex items-center gap-2 text-[#666]">
                        <Calendar className="w-4 h-4" />
                        <p>{report.date}</p>
                      </div>
                      <p className="text-[#999] mt-1">
                        {report.processedTerms.length} terms explained
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReport(report.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all"
                      aria-label="Delete report"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] px-6 py-3 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-[#0066CC]">
            <Heart className="w-6 h-6" fill="#0066CC" />
            <span className="text-[#0066CC]">Home</span>
          </button>
          <button 
            onClick={() => onNavigate('dictionary')}
            className="flex flex-col items-center gap-1 text-[#999]"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-[#999]">Learn</span>
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 text-[#999]"
          >
            <User className="w-6 h-6" />
            <span className="text-[#999]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}