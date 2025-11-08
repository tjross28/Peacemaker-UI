import { ArrowLeft, Calendar, AlertTriangle, CheckCircle, Info, Lightbulb } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Report } from '../App';
import { getRecommendedActions } from '../utils/medicalProcessor';

interface ReportViewProps {
  report: Report;
  onBack: () => void;
}

const categoryConfig = {
  measurement: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '' },
  condition: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: '' },
  device: { color: 'bg-green-100 text-green-700 border-green-200', icon: '' },
  medication: { color: 'bg-pink-100 text-pink-700 border-pink-200', icon: '' },
  alert: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: '' }
};

export function ReportView({ report, onBack }: ReportViewProps) {
  const alerts = report.processedTerms.filter(t => t.category === 'alert');
  const recommendedActions = getRecommendedActions(report.processedTerms);

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-white mb-1">{report.title}</h2>
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <p>{report.date}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/80 mb-1">Terms Found</p>
            <p className="text-white">{report.processedTerms.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/80 mb-1">Alerts</p>
            <p className="text-white">{alerts.length}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        {/* Alerts Section */}
        {alerts.length > 0 && (
          <Card className="p-5 bg-[#FFF4E6] border-l-4 border-[#FF9500]">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-[#FF9500] flex-shrink-0" />
              <div>
                <p className="text-[#333] mb-1">Important Alerts</p>
                <p className="text-[#666]">
                  {alerts.length} alert{alerts.length > 1 ? 's' : ''} detected in this report
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Recommended Actions */}
        {recommendedActions.length > 0 && (
          <Card className="p-5 bg-white shadow-md border-0">
            <div className="flex items-start gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-[#0066CC] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-[#333] mb-1">Recommended Actions</p>
                <p className="text-[#666]">Based on your report findings</p>
              </div>
            </div>
            <div className="space-y-2">
              {recommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[#F0F7FF] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5" />
                  <p className="text-[#333]">{action}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Medical Terms Explained */}
        <div>
          <h3 className="text-[#333] mb-3">Terms Explained</h3>
          <div className="space-y-3">
            {report.processedTerms.map((term, idx) => {
              const config = categoryConfig[term.category];
              
              return (
                <Card key={idx} className="p-5 bg-white shadow-sm border-0">
                  <div className="space-y-3">
                    {/* Term Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-[#333] mb-2">{term.term}</p>
                        <Badge className={`${config.color} border`}>
                          <span className="mr-1">{config.icon}</span>
                          {term.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Meaning */}
                    <div className="p-4 bg-[#F8F9FA] rounded-lg">
                      <div className="flex gap-2 mb-2">
                        <Info className="w-5 h-5 text-[#0066CC] flex-shrink-0" />
                        <p className="text-[#0066CC]">What it means</p>
                      </div>
                      <p className="text-[#333] ml-7">{term.meaning}</p>
                    </div>

                    {/* Why It Matters */}
                    <div className="p-4 bg-[#F0F7FF] rounded-lg">
                      <div className="flex gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-[#FF9500] flex-shrink-0" />
                        <p className="text-[#FF9500]">Why it matters</p>
                      </div>
                      <p className="text-[#333] ml-7">{term.whyItMatters}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Original Report */}
        <Card className="p-5 bg-white shadow-md border-0">
          <details>
            <summary className="cursor-pointer text-[#0066CC] mb-3">
              View Original Report Text
            </summary>
            <div className="p-4 bg-[#F8F9FA] rounded-lg">
              <pre className="whitespace-pre-wrap text-[#333] overflow-x-auto">
                {report.originalText}
              </pre>
            </div>
          </details>
        </Card>

        {/* Help Notice */}
        <Card className="p-4 bg-[#F0F7FF] border border-[#0066CC]/20">
          <p className="text-[#0066CC] text-center">
            💡 Questions about these terms? Check the Medical Dictionary or contact your care team
          </p>
        </Card>
      </div>
    </div>
  );
}