import { ProcessedTerm } from '../App';
import { medicalDictionary } from './medicalDictionary';

/**
 * Simulates AI-powered medical term processing
 * In production, this would call an LLM API (Gemini, OpenAI, etc.)
 */
export function processTextWithAI(text: string): ProcessedTerm[] {
  const processedTerms: ProcessedTerm[] = [];
  const lowerText = text.toLowerCase();

  // Check each term in our dictionary
  Object.entries(medicalDictionary).forEach(([term, data]) => {
    // Create regex to find whole word matches (case insensitive)
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    
    if (regex.test(lowerText)) {
      // Find the actual term as it appears in text (preserve capitalization)
      const match = text.match(regex);
      
      processedTerms.push({
        term: match ? match[0] : term,
        meaning: data.meaning,
        whyItMatters: data.whyItMatters,
        category: data.category
      });
    }
  });

  // Sort by category priority (alerts first, then measurements, etc.)
  const categoryOrder = { 'alert': 0, 'condition': 1, 'measurement': 2, 'device': 3, 'medication': 4 };
  processedTerms.sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category]);

  return processedTerms;
}

/**
 * Get recommended actions based on detected terms
 */
export function getRecommendedActions(terms: ProcessedTerm[]): string[] {
  const actions: string[] = [];
  
  const hasAlert = terms.some(t => t.category === 'alert');
  const hasLowEjection = terms.some(t => t.term.toLowerCase().includes('lvef'));
  const hasAfib = terms.some(t => t.term.toLowerCase().includes('atrial fibrillation'));
  const hasElevatedBNP = terms.some(t => t.term.toLowerCase().includes('bnp'));

  if (hasAlert) {
    actions.push('Contact your doctor to discuss these alerts');
  }
  
  if (hasLowEjection) {
    actions.push('Monitor symptoms of fatigue or shortness of breath');
  }
  
  if (hasAfib) {
    actions.push('Keep track of any irregular heartbeat sensations');
  }
  
  if (hasElevatedBNP) {
    actions.push('Watch for swelling in legs or sudden weight gain');
  }

  if (actions.length === 0) {
    actions.push('Continue regular monitoring as scheduled');
  }

  return actions;
}
