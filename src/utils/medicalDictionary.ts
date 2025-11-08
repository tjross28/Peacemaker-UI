import { ProcessedTerm } from '../App';

/**
 * Comprehensive medical dictionary for cardiac/heart failure terms
 * Sources: NIH MedlinePlus, American Heart Association, Medtronic resources
 */

type DictionaryEntry = Omit<ProcessedTerm, 'term'>;

export const medicalDictionary: Record<string, DictionaryEntry> = {
  // MEASUREMENTS
  'LVEF': {
    meaning: 'Left Ventricular Ejection Fraction - A measurement of how much blood your heart pumps out with each beat. Normal is 55-70%.',
    whyItMatters: 'Lower numbers mean your heart isn\'t pumping as effectively. Below 40% indicates reduced heart function and may require treatment adjustments.',
    category: 'measurement'
  },
  'Ejection Fraction': {
    meaning: 'The percentage of blood that leaves your heart each time it beats. Think of it like how full your heart "empties" with each pump.',
    whyItMatters: 'This number helps your doctor understand how well your heart is working and guide your treatment plan.',
    category: 'measurement'
  },
  'BNP': {
    meaning: 'B-type Natriuretic Peptide - A protein your heart releases when it\'s working too hard. Normal is below 100 pg/mL.',
    whyItMatters: 'High levels (over 400) suggest your heart is stressed and you may be at risk for heart failure symptoms getting worse.',
    category: 'measurement'
  },
  'Lead Impedance': {
    meaning: 'Measures the resistance in the wires connecting your device to your heart. Normal is 300-1500 Ohms.',
    whyItMatters: 'Abnormal readings could mean a wire problem. Your device checks this to ensure it\'s working properly.',
    category: 'measurement'
  },
  'R-wave': {
    meaning: 'The electrical signal your device senses when your heart beats naturally. Measured in millivolts (mV).',
    whyItMatters: 'A strong R-wave (typically >5mV) means your device can properly detect your heartbeat and deliver therapy when needed.',
    category: 'measurement'
  },
  'Battery voltage': {
    meaning: 'How much power is left in your device battery. Measured in volts (V).',
    whyItMatters: 'Your doctor tracks this to know when your device needs replacing. Low voltage triggers scheduled replacement.',
    category: 'measurement'
  },
  'Shock impedance': {
    meaning: 'The resistance when your ICD delivers a shock. Normal range is 30-90 Ohms.',
    whyItMatters: 'Ensures your device can deliver effective shocks to correct dangerous heart rhythms if needed.',
    category: 'measurement'
  },
  'Pacing threshold': {
    meaning: 'The minimum electrical energy needed to make your heart beat. Lower numbers are better.',
    whyItMatters: 'Low thresholds mean your device uses less battery to pace your heart, making the battery last longer.',
    category: 'measurement'
  },

  // CONDITIONS & ARRHYTHMIAS
  'Atrial Fibrillation': {
    meaning: 'AFib - An irregular, often rapid heart rhythm in the upper chambers of your heart. Instead of beating steadily, the atria quiver.',
    whyItMatters: 'Can cause blood clots, stroke, and heart failure. You may need blood thinners and should watch for palpitations or dizziness.',
    category: 'condition'
  },
  'AFib': {
    meaning: 'Short for Atrial Fibrillation - an irregular heartbeat in your heart\'s upper chambers.',
    whyItMatters: 'Increases stroke risk and can make you feel tired or dizzy. Your device monitors this and your doctor may prescribe medications.',
    category: 'condition'
  },
  'Ventricular Tachycardia': {
    meaning: 'V-Tach - A fast, abnormal heart rhythm starting in the lower chambers. Your heart beats over 100 times per minute.',
    whyItMatters: 'This is serious and can lead to sudden cardiac arrest. Your ICD is designed to detect and stop these episodes.',
    category: 'alert'
  },
  'VT': {
    meaning: 'Ventricular Tachycardia - A dangerously fast heartbeat from your heart\'s lower chambers.',
    whyItMatters: 'Your device monitors for this and can deliver therapy to restore normal rhythm. Report any episodes to your doctor.',
    category: 'alert'
  },
  'Congestive Heart Failure': {
    meaning: 'CHF - When your heart can\'t pump enough blood to meet your body\'s needs. Fluid can build up in lungs and legs.',
    whyItMatters: 'Requires medication and lifestyle changes. Watch for swelling, shortness of breath, and sudden weight gain.',
    category: 'condition'
  },
  'Heart Failure': {
    meaning: 'A chronic condition where your heart muscle is weakened and can\'t pump blood efficiently throughout your body.',
    whyItMatters: 'Requires ongoing treatment and monitoring. Small changes in symptoms should be reported to your care team.',
    category: 'condition'
  },

  // DEVICE TERMS
  'ICD': {
    meaning: 'Implantable Cardioverter Defibrillator - A device that monitors your heart rhythm and can deliver shocks to correct dangerous rhythms.',
    whyItMatters: 'Protects you from sudden cardiac arrest by detecting and treating life-threatening arrhythmias automatically.',
    category: 'device'
  },
  'CRT': {
    meaning: 'Cardiac Resynchronization Therapy - A special pacemaker that helps both lower chambers of your heart beat together.',
    whyItMatters: 'Improves heart function and symptoms in people with heart failure by making the heart pump more efficiently.',
    category: 'device'
  },
  'Cardiac Resynchronization Therapy': {
    meaning: 'A treatment using a special device to coordinate the beating of your heart\'s chambers, making your heart work better.',
    whyItMatters: 'Can reduce symptoms, improve quality of life, and help you feel less tired and short of breath.',
    category: 'device'
  },
  'Pacemaker': {
    meaning: 'A small device implanted in your chest that sends electrical signals to keep your heart beating at a regular pace.',
    whyItMatters: 'Prevents your heart from beating too slowly and helps maintain adequate blood flow to your body.',
    category: 'device'
  },
  'ERI': {
    meaning: 'Elective Replacement Indicator - A signal that your device battery is getting low and should be replaced soon.',
    whyItMatters: 'Not an emergency, but means you should schedule a device replacement within the next few months.',
    category: 'alert'
  },
  'RV Lead': {
    meaning: 'Right Ventricular Lead - The wire that connects your device to the right lower chamber of your heart.',
    whyItMatters: 'This wire delivers pacing or shock therapy. Regular checks ensure it\'s working properly.',
    category: 'device'
  },

  // MEDICATIONS (Common in HF reports)
  'Beta Blocker': {
    meaning: 'Medication that slows your heart rate and reduces blood pressure by blocking certain stress hormones.',
    whyItMatters: 'Helps your heart work less hard, improves survival in heart failure. Don\'t stop suddenly without talking to your doctor.',
    category: 'medication'
  },
  'ACE Inhibitor': {
    meaning: 'Medication that relaxes blood vessels and lowers blood pressure, making it easier for your heart to pump.',
    whyItMatters: 'Proven to help people with heart failure live longer. May cause dry cough in some people.',
    category: 'medication'
  },
  'Diuretic': {
    meaning: 'Water pill - Helps your body get rid of extra fluid through urination.',
    whyItMatters: 'Reduces swelling and shortness of breath. You may need to urinate more often after taking it.',
    category: 'medication'
  },

  // ALERTS & IMPORTANT EVENTS
  'Shock': {
    meaning: 'An electrical pulse delivered by your ICD to stop a dangerous heart rhythm.',
    whyItMatters: 'If you receive a shock, contact your doctor immediately. Even if you feel fine, they need to check your device and heart rhythm.',
    category: 'alert'
  },
  'ATP': {
    meaning: 'Anti-Tachycardia Pacing - Painless rapid pacing your device delivers to stop fast heart rhythms without shocking.',
    whyItMatters: 'Your device tries this first before shocking. Most patients don\'t feel it, but it effectively treats many arrhythmias.',
    category: 'device'
  },
  'Interrogation': {
    meaning: 'A check-up where your device is wirelessly scanned to download data about your heart and device function.',
    whyItMatters: 'Lets your doctor review your heart activity since the last visit and adjust settings if needed.',
    category: 'device'
  },

  // ADDITIONAL CARDIAC TERMS
  'Arrhythmia': {
    meaning: 'Any abnormal heart rhythm - your heart may beat too fast, too slow, or irregularly.',
    whyItMatters: 'Your device monitors for these and can treat them. Some are harmless, others are serious.',
    category: 'condition'
  },
  'Bradycardia': {
    meaning: 'A slow heart rate, typically below 60 beats per minute.',
    whyItMatters: 'Can make you feel tired or dizzy. Your pacemaker prevents this by pacing when your rate drops too low.',
    category: 'condition'
  },
  'Tachycardia': {
    meaning: 'A fast heart rate, typically over 100 beats per minute at rest.',
    whyItMatters: 'Can be normal during exercise, but at rest may indicate a problem your device monitors.',
    category: 'condition'
  },
  'Cardiomyopathy': {
    meaning: 'Disease of the heart muscle that makes it harder for your heart to pump blood.',
    whyItMatters: 'Often the underlying reason you need a cardiac device. Requires ongoing treatment and monitoring.',
    category: 'condition'
  }
};

// Category descriptions for the dictionary view
export const categoryDescriptions = {
  measurement: {
    title: 'Measurements & Values',
    description: 'Numbers and readings from your device and tests',
    icon: ''
  },
  condition: {
    title: 'Heart Conditions',
    description: 'Medical conditions related to your heart',
    icon: ''
  },
  device: {
    title: 'Device Terms',
    description: 'Information about your cardiac device',
    icon: ''
  },
  medication: {
    title: 'Medications',
    description: 'Common heart failure medications',
    icon: ''
  },
  alert: {
    title: 'Important Alerts',
    description: 'Critical findings that need attention',
    icon: ''
  }
};