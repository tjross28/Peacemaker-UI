# API Integration Guide - CardioGuide

## Overview
This guide explains how to integrate real medical APIs and AI services into CardioGuide for production use.

---

## 1. Medical Terminology API

### Recommended: NIH MedlinePlus Connect

**Why**: Free, government-backed, comprehensive medical information

**Endpoint**: `https://connect.medlineplus.gov/service`

**Example Request**:
```javascript
const getMedicalInfo = async (term: string) => {
  const response = await fetch(
    `https://connect.medlineplus.gov/service?mainSearchCriteria.v.c=${term}&knowledgeResponseType=application/json`
  );
  const data = await response.json();
  return data;
};
```

**Response Structure**:
```json
{
  "feed": {
    "entry": [{
      "title": { "$t": "Atrial Fibrillation" },
      "summary": { "$t": "Description of the condition..." },
      "link": [{ "href": "https://medlineplus.gov/..." }]
    }]
  }
}
```

### Alternative: UMLS (Unified Medical Language System)

**Setup**:
1. Get API key: https://uts.nlm.nih.gov/uts/signup-login
2. Use UMLS REST API for term lookups

**Example**:
```javascript
const UMLS_API_KEY = 'YOUR_API_KEY';

const searchUMLS = async (term: string) => {
  const response = await fetch(
    `https://uts-ws.nlm.nih.gov/rest/search/current?string=${term}&apiKey=${UMLS_API_KEY}`
  );
  return await response.json();
};
```

---

## 2. AI Translation Engine (LLM APIs)

### Option A: Google Gemini (Recommended for this project)

**Why**: Free tier available, excellent at medical explanations, multi-modal

**Setup**:
```bash
npm install @google/generative-ai
```

**Implementation**:
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');

export async function translateMedicalText(reportText: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
    You are a helpful medical assistant specializing in cardiac care.
    
    Analyze this medical report and extract cardiac-related medical terms.
    For each term, provide:
    1. The exact term as it appears
    2. A simple explanation (2-3 sentences) in patient-friendly language
    3. Why it matters for heart health (1-2 sentences)
    4. Category: measurement, condition, device, medication, or alert
    
    Report:
    ${reportText}
    
    Format your response as JSON:
    {
      "terms": [
        {
          "term": "LVEF",
          "meaning": "Left Ventricular Ejection Fraction measures...",
          "whyItMatters": "This number helps doctors...",
          "category": "measurement"
        }
      ]
    }
  `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  throw new Error('Failed to parse AI response');
}
```

**Update `medicalProcessor.ts`**:
```typescript
import { translateMedicalText } from './geminiAPI';

export async function processTextWithAI(text: string): Promise<ProcessedTerm[]> {
  try {
    // Use real AI instead of dictionary lookup
    const result = await translateMedicalText(text);
    return result.terms;
  } catch (error) {
    console.error('AI processing failed, falling back to dictionary:', error);
    // Fallback to existing dictionary-based processing
    return processTextWithDictionary(text);
  }
}

// Rename current function as fallback
function processTextWithDictionary(text: string): ProcessedTerm[] {
  // ... existing dictionary code ...
}
```

### Option B: OpenAI GPT-4

**Setup**:
```bash
npm install openai
```

**Implementation**:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY',
  dangerouslyAllowBrowser: true // Only for demo! Use backend in production
});

export async function translateWithGPT(reportText: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are a medical assistant helping cardiac device patients understand their reports. Explain terms simply and compassionately.'
      },
      {
        role: 'user',
        content: `Extract and explain all cardiac medical terms from this report:\n\n${reportText}\n\nFormat as JSON with fields: term, meaning, whyItMatters, category`
      }
    ],
    response_format: { type: 'json_object' }
  });
  
  return JSON.parse(completion.choices[0].message.content);
}
```

### Option C: Anthropic Claude

**Setup**:
```bash
npm install @anthropic-ai/sdk
```

**Implementation**:
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: 'YOUR_ANTHROPIC_API_KEY'
});

export async function translateWithClaude(reportText: string) {
  const message = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are a cardiac care specialist. Extract medical terms from this report and explain them in simple language:\n\n${reportText}`
    }]
  });
  
  return message.content;
}
```

---

## 3. Heart Failure Specific APIs

### American Heart Association (AHA) Resources

**Note**: AHA doesn't have a public API, but you can:
1. Scrape their educational content (with permission)
2. Build a static database from their guidelines
3. Link to their resources for "Learn More"

**Example Static Integration**:
```typescript
const AHA_RESOURCES = {
  'heart failure': 'https://www.heart.org/en/health-topics/heart-failure',
  'atrial fibrillation': 'https://www.heart.org/en/health-topics/atrial-fibrillation',
  // ... more mappings
};

export function getAHAResource(term: string): string | null {
  const lowerTerm = term.toLowerCase();
  return AHA_RESOURCES[lowerTerm] || null;
}
```

### Medtronic Developer API

**Check**: https://developer.medtronic.com (if available)

**Typical Use Cases**:
- Device model information
- Battery life calculations
- Alert type explanations
- Troubleshooting guides

**Example** (hypothetical):
```typescript
const getMedtronicDeviceInfo = async (deviceModel: string) => {
  const response = await fetch(
    `https://api.medtronic.com/devices/${deviceModel}`,
    {
      headers: {
        'Authorization': `Bearer ${MEDTRONIC_API_KEY}`
      }
    }
  );
  return await response.json();
};
```

### FDA Device Database API

**Free**: Access medical device information

**Endpoint**: `https://api.fda.gov/device/event.json`

**Example**:
```typescript
const searchFDADevice = async (deviceName: string) => {
  const response = await fetch(
    `https://api.fda.gov/device/510k.json?search=device_name:"${deviceName}"&limit=5`
  );
  return await response.json();
};
```

---

## 4. PDF Text Extraction

### For File Uploads

**Recommended: PDF.js**

```bash
npm install pdfjs-dist
```

**Implementation**:
```typescript
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
}
```

**Update `UploadReport.tsx`**:
```typescript
import { extractTextFromPDF } from '../utils/pdfExtractor';

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  setFileName(file.name);
  setReportTitle(file.name.replace(/\.[^/.]+$/, ''));
  
  if (file.type === 'application/pdf') {
    const text = await extractTextFromPDF(file);
    setReportText(text);
  } else {
    // Handle text files
    const reader = new FileReader();
    reader.onload = (event) => {
      setReportText(event.target?.result as string);
    };
    reader.readAsText(file);
  }
};
```

---

## 5. Backend Integration with Supabase

### Setup Supabase (Recommended for MVP)

**Why**: Free tier, built-in auth, PostgreSQL, file storage

**Steps**:

1. **Create Supabase Project**: https://supabase.com

2. **Install Client**:
```bash
npm install @supabase/supabase-js
```

3. **Initialize**:
```typescript
// /utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

4. **Database Schema**:
```sql
-- Users table (handled by Supabase Auth)

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  original_text TEXT NOT NULL,
  processed_terms JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own reports
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

5. **Update Auth**:
```typescript
// /utils/auth.ts
import { supabase } from './supabase';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
```

6. **Update Report Storage**:
```typescript
// /utils/reportStorage.ts
import { supabase } from './supabase';
import { Report } from '../App';

export async function saveReport(report: Omit<Report, 'id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('reports')
    .insert({
      user_id: user.id,
      title: report.title,
      original_text: report.originalText,
      processed_terms: report.processedTerms
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserReports(): Promise<Report[]> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data.map(row => ({
    id: row.id,
    title: row.title,
    date: new Date(row.created_at).toLocaleDateString(),
    originalText: row.original_text,
    processedTerms: row.processed_terms
  }));
}
```

---

## 6. Environment Variables

Create `.env.local`:
```env
# AI APIs
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Medical APIs
NEXT_PUBLIC_UMLS_API_KEY=your_umls_key
NEXT_PUBLIC_MEDTRONIC_API_KEY=your_medtronic_key
```

**⚠️ Security Note**: 
- NEVER commit API keys to git
- Add `.env.local` to `.gitignore`
- Use backend API routes to hide keys in production

---

## 7. Production Security Checklist

### Before Deploying with Real Patient Data:

- [ ] Move API calls to backend (Next.js API routes or separate server)
- [ ] Implement proper authentication (Supabase Auth or Auth0)
- [ ] Enable HTTPS everywhere
- [ ] Add rate limiting
- [ ] Implement audit logging
- [ ] Add data encryption at rest
- [ ] Set up PHI de-identification
- [ ] Get HIPAA compliance review
- [ ] Add consent forms
- [ ] Implement data retention policies
- [ ] Set up backup systems
- [ ] Add monitoring and alerts
- [ ] Conduct security penetration testing
- [ ] Get legal review

---

## 8. Cost Estimates (Monthly)

### Free Tier Usage:
- **Gemini API**: 60 requests/min free
- **Supabase**: 500MB database, 1GB storage
- **Vercel Hosting**: Free for hobby projects

### Paid Tier (1000 users):
- **Gemini API**: ~$20/month
- **Supabase Pro**: $25/month
- **Vercel Pro**: $20/month
- **Total**: ~$65/month

---

## Need Help?

**AI API Documentation**:
- Gemini: https://ai.google.dev/docs
- OpenAI: https://platform.openai.com/docs
- Claude: https://docs.anthropic.com

**Medical APIs**:
- MedlinePlus: https://medlineplus.gov/connect
- UMLS: https://uts.nlm.nih.gov/uts/umls
- FDA: https://open.fda.gov

**Backend**:
- Supabase: https://supabase.com/docs

---

**Remember**: For this hackathon, the current dictionary-based approach is sufficient! These APIs are for production deployment.
