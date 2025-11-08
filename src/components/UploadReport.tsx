import { useState } from 'react';
import { ArrowLeft, Upload, FileText, Camera, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Report, ProcessedTerm } from '../App';
import { processTextWithAI } from '../utils/medicalProcessor';

interface UploadReportProps {
  onBack: () => void;
  onUpload: (report: Report) => void;
}

export function UploadReport({ onBack, onUpload }: UploadReportProps) {
  const [uploadMethod, setUploadMethod] = useState<'text' | 'file' | null>(null);
  const [reportText, setReportText] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setReportTitle(file.name.replace(/\.[^/.]+$/, ''));
      
      // For demo: simulate PDF text extraction
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setReportText(text || 'Uploaded file content will be extracted here...');
      };
      reader.readAsText(file);
    }
  };

  const handleProcess = async () => {
    if (!reportText || !reportTitle) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const processedTerms = processTextWithAI(reportText);
    
    const newReport: Report = {
      id: Date.now().toString(),
      title: reportTitle,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalText: reportText,
      processedTerms
    };
    
    onUpload(newReport);
    setIsProcessing(false);
  };

  const insertSampleText = () => {
    const sampleReport = `CARDIAC DEVICE INTERROGATION REPORT

Patient: John Doe
Device: Medtronic ICD
Date: November 8, 2025

FINDINGS:
- LVEF: 35%
- Atrial Fibrillation episodes detected (3 in past month)
- Battery voltage: 2.7V (ERI threshold approaching)
- RV Lead Impedance: 650 Ohms (normal)
- Ventricular Tachycardia episode on 11/1/2025
- BNP levels elevated at 450 pg/mL

DEVICE PARAMETERS:
- Pacing threshold: 0.5V @ 0.4ms
- R-wave amplitude: 12.5 mV
- Shock impedance: 45 Ohms

RECOMMENDATIONS:
- Monitor for Congestive Heart Failure symptoms
- Consider Cardiac Resynchronization Therapy
- Schedule follow-up for ERI evaluation`;

    setReportText(sampleReport);
    setReportTitle('Cardiac Device Report - Nov 2025');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white">Upload Report</h2>
        </div>
        <p className="text-white/80 ml-14">
          Upload or type your medical report
        </p>
      </div>

      <div className="px-6 -mt-4">
        {!uploadMethod ? (
          /* Method Selection */
          <div className="space-y-4">
            <Card
              className="p-6 bg-white shadow-md border-0 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setUploadMethod('text')}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#0066CC]/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-[#0066CC]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#333] mb-1">Type or Paste Text</p>
                  <p className="text-[#666]">
                    Enter your report text manually
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 bg-white shadow-md border-0 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setUploadMethod('file')}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#0066CC]/10 rounded-xl flex items-center justify-center">
                  <Upload className="w-7 h-7 text-[#0066CC]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#333] mb-1">Upload PDF or Image</p>
                  <p className="text-[#666]">
                    Upload a file from your device
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-[#F0F7FF] border border-[#0066CC]/20">
              <div className="flex gap-3">
                <p className="text-[#0066CC]">
                  Our AI will automatically identify and explain medical terms in your report
                </p>
              </div>
            </Card>
          </div>
        ) : uploadMethod === 'text' ? (
          /* Text Input */
          <div className="space-y-4">
            <Card className="p-6 bg-white shadow-md border-0">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-[#333] mb-2">Report Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Device Check - Nov 2025"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="h-12 border-2 border-[#E0E0E0] focus:border-[#0066CC]"
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-[#333] mb-2">Report Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste or type your medical report here..."
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    className="min-h-[300px] border-2 border-[#E0E0E0] focus:border-[#0066CC] resize-none"
                  />
                </div>

                <Button
                  onClick={insertSampleText}
                  variant="outline"
                  className="w-full border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC]/5"
                >
                  Load Sample Report
                </Button>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setUploadMethod(null)}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-[#E0E0E0]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleProcess}
                    disabled={!reportText || !reportTitle || isProcessing}
                    className="flex-1 h-12 bg-[#0066CC] hover:bg-[#0052A3] text-white disabled:bg-[#999]"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      'Analyze Report'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          /* File Upload */
          <div className="space-y-4">
            <Card className="p-6 bg-white shadow-md border-0">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-[#333] mb-2">Report Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Device Check - Nov 2025"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="h-12 border-2 border-[#E0E0E0] focus:border-[#0066CC]"
                  />
                </div>

                <div>
                  <Label className="text-[#333] mb-2">Upload File</Label>
                  <div className="border-2 border-dashed border-[#E0E0E0] rounded-lg p-8 text-center hover:border-[#0066CC] transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.txt,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 bg-[#0066CC]/10 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-[#0066CC]" />
                      </div>
                      <div>
                        <p className="text-[#333] mb-1">
                          {fileName || 'Tap to upload file'}
                        </p>
                        <p className="text-[#666]">
                          PDF, image, or text file
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setUploadMethod(null)}
                    variant="outline"
                    className="flex-1 h-12 border-2 border-[#E0E0E0]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleProcess}
                    disabled={!reportText || !reportTitle || isProcessing}
                    className="flex-1 h-12 bg-[#0066CC] hover:bg-[#0052A3] text-white disabled:bg-[#999]"
                  >
                    {isProcessing ? 'Processing...' : 'Analyze Report'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Privacy Notice */}
        <Card className="mt-4 p-4 bg-[#F0F7FF] border border-[#0066CC]/20">
          <p className="text-[#0066CC] text-center">
            🔒 All data is stored securely and encrypted
          </p>
        </Card>
      </div>
    </div>
  );
}