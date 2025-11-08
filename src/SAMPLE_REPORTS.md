# Sample Medical Reports for Testing

## Report 1: Device Interrogation with Alerts

```
CARDIAC DEVICE INTERROGATION REPORT

Patient: John Doe
Device: Medtronic ICD Model #12345
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
- Schedule follow-up for ERI evaluation
```

**Expected Terms Detected**: 10-12 terms
**Alert Count**: 2-3 alerts
**Good For**: Comprehensive demo showing multiple categories

---

## Report 2: Simple Follow-Up (No Alerts)

```
DEVICE CHECK SUMMARY

Patient: Jane Smith
Device: Medtronic Pacemaker
Date: November 8, 2025

STATUS: All parameters normal

Battery voltage: 2.9V (good)
Lead Impedance: 520 Ohms
Pacing threshold: 0.4V
R-wave amplitude: 10.2 mV

No arrhythmias detected since last check.

NEXT VISIT: 6 months
```

**Expected Terms Detected**: 4-5 terms
**Alert Count**: 0
**Good For**: Showing "good news" scenario, testing recommendation engine with normal results

---

## Report 3: Emergency Alert

```
URGENT DEVICE ALERT

Patient: Robert Johnson
Device: Medtronic ICD
Date: November 8, 2025

CRITICAL FINDINGS:
- Multiple VT episodes (5 in past 48 hours)
- ATP therapy delivered successfully (3 times)
- One shock delivered to terminate VT
- LVEF: 25% (decreased from previous 35%)
- Lead Impedance: 1800 Ohms (HIGH - possible lead fracture)

IMMEDIATE ACTION REQUIRED:
Contact cardiologist today.
```

**Expected Terms Detected**: 6-7 terms
**Alert Count**: 4-5 alerts
**Good For**: Demonstrating alert prioritization and urgent recommendations

---

## Report 4: Heart Failure Management

```
HEART FAILURE CLINIC NOTE

Patient: Maria Garcia
Diagnosis: Congestive Heart Failure
Date: November 8, 2025

CURRENT STATUS:
- LVEF: 40% (improved from 35%)
- BNP: 250 pg/mL (trending down)
- No recent Atrial Fibrillation episodes
- Ejection Fraction stable

MEDICATIONS:
- Beta Blocker: Metoprolol 50mg BID
- ACE Inhibitor: Lisinopril 10mg daily
- Diuretic: Furosemide 40mg daily

ASSESSMENT:
Responding well to therapy. Continue current regimen.
```

**Expected Terms Detected**: 8-9 terms
**Alert Count**: 0
**Good For**: Showing medication detection, positive progress, heart failure context

---

## Report 5: CRT Evaluation

```
CARDIAC RESYNCHRONIZATION THERAPY EVALUATION

Patient: David Lee
Device: Medtronic CRT-D
Date: November 8, 2025

PRE-CRT BASELINE:
- LVEF: 28%
- Cardiomyopathy diagnosis
- Frequent heart failure symptoms

POST-CRT (6 months):
- LVEF: 42% (improved!)
- BNP: 180 pg/mL (normalized)
- Bradycardia prevented by pacing
- Battery voltage: 2.8V

DEVICE FUNCTION:
- Pacing threshold: 0.6V
- R-wave amplitude: 11.8 mV
- Lead Impedance: 480 Ohms

Patient reports significant improvement in quality of life.
```

**Expected Terms Detected**: 9-10 terms
**Alert Count**: 0
**Good For**: Demonstrating CRT benefits, showing improvement over time

---

## Report 6: Medication-Focused

```
CARDIAC MEDICATION REVIEW

Patient: Susan Williams
Conditions: AFib, Heart Failure
Date: November 8, 2025

CURRENT MEDICATIONS:
- Beta Blocker for heart rate control
- ACE Inhibitor for blood pressure
- Diuretic for fluid management
- Anticoagulant for AFib stroke prevention

RECENT TESTS:
- BNP: 320 pg/mL
- LVEF: 45%
- No Tachycardia episodes

PLAN:
Continue current medications. Monitoring for side effects.
```

**Expected Terms Detected**: 7-8 terms
**Alert Count**: 0
**Good For**: Testing medication category detection, showing multi-condition management

---

## Report 7: Technical Device Issue

```
DEVICE TECHNICAL ALERT

Patient: Michael Brown
Device: Medtronic ICD
Date: November 8, 2025

ALERT REASON: ERI (Elective Replacement Indicator)

DETAILS:
- Battery voltage: 2.6V (replacement recommended)
- Device has functioned normally for 7 years
- No recent shocks or ATP therapy
- Lead Impedance: 650 Ohms (normal)
- R-wave amplitude: 12.1 mV (normal)
- Shock impedance: 48 Ohms (normal)

All sensing and pacing functions continue normally.

RECOMMENDATION:
Schedule elective device replacement within 3 months.
```

**Expected Terms Detected**: 6-7 terms
**Alert Count**: 1 alert (ERI)
**Good For**: Demonstrating technical but non-emergency alert

---

## Report 8: Arrhythmia Event

```
ARRHYTHMIA EVENT SUMMARY

Patient: Patricia Martinez
Device: Medtronic ICD
Event Date: November 5, 2025
Report Date: November 8, 2025

EVENT DETAILS:
- Ventricular Tachycardia detected at 180 bpm
- ATP (Anti-Tachycardia Pacing) attempted
- ATP successful - rhythm restored without shock
- No patient symptoms reported
- Interrogation shows stable LVEF: 38%

BACKGROUND:
- History of Cardiomyopathy
- Previous VT episodes (2 in past year)

FOLLOW-UP:
Medication adjustment considered. Next check in 1 month.
```

**Expected Terms Detected**: 8-9 terms
**Alert Count**: 1-2 alerts
**Good For**: Showing how device therapy works, ATP explanation

---

## Report 9: First Device Check

```
INITIAL DEVICE CHECK POST-IMPLANT

Patient: James Anderson
Device: Medtronic Pacemaker
Implant Date: October 15, 2025
Check Date: November 8, 2025

POST-IMPLANT ASSESSMENT:
- Pacing threshold: 0.5V @ 0.4ms (excellent)
- Lead Impedance: 580 Ohms (within range)
- R-wave amplitude: 13.2 mV (strong signal)
- Battery voltage: 3.1V (new device)

REASON FOR DEVICE: Bradycardia

FINDINGS:
Device functioning perfectly. Pacing when heart rate drops below 60 bpm.
Patient reports feeling more energetic.

PLAN:
Routine follow-up in 3 months.
```

**Expected Terms Detected**: 5-6 terms
**Alert Count**: 0
**Good For**: Showing new device, explaining why devices help, positive outcome

---

## Report 10: Complex Multi-Issue

```
COMPREHENSIVE CARDIAC DEVICE REPORT

Patient: Elizabeth Taylor
Device: Medtronic CRT-D
Date: November 8, 2025

CARDIAC STATUS:
- Diagnosis: Congestive Heart Failure, Atrial Fibrillation
- LVEF: 32%
- BNP: 425 pg/mL
- Cardiomyopathy (ischemic)

DEVICE PERFORMANCE:
- Battery voltage: 2.75V
- RV Lead Impedance: 690 Ohms
- Pacing threshold: 0.7V
- R-wave amplitude: 9.8 mV
- Shock impedance: 52 Ohms

RECENT EVENTS:
- AFib episodes: 12 in past month (average duration 45 min)
- No VT episodes
- CRT pacing 98% of time

MEDICATIONS:
- Beta Blocker
- ACE Inhibitor
- Diuretic
- Anticoagulant

ASSESSMENT:
Heart failure stable on current therapy. AFib burden increased.

PLAN:
- Continue Cardiac Resynchronization Therapy
- Discuss AFib ablation vs medication adjustment
- Monitor for symptoms of Tachycardia
- Next visit: 1 month
```

**Expected Terms Detected**: 15+ terms (most comprehensive)
**Alert Count**: 1-2 alerts
**Good For**: Full demo of all features, showing complex patient management

---

## Using These Reports in Your Demo

### Quick Copy-Paste
All reports above can be directly copied into the "Type or Paste Text" field in the app.

### Recommended Demo Flow
1. **Start with Report 1** (good balance of alerts and normal findings)
2. **Show Report 3** if asked about emergency handling
3. **End with Report 5** to show positive outcomes

### Creating Your Own Reports
Use this template:

```
[REPORT TITLE]

Patient: [Name]
Device: [Device Type]
Date: [Date]

[Include 3-5 of these terms for detection:]
- LVEF: [%]
- BNP: [value] pg/mL
- Battery voltage: [value]V
- Lead Impedance: [value] Ohms
- Atrial Fibrillation / Ventricular Tachycardia
- Pacing threshold: [value]
- R-wave amplitude: [value] mV

[Add context about patient condition]
[Add recommendations]
```

---

## Terms Coverage Matrix

| Report | LVEF | BNP | AFib | VT | ERI | CRT | Meds | Lead | Battery |
|--------|------|-----|------|----|----|-----|------|------|---------|
| 1      | ✅   | ✅  | ✅   | ✅ | ✅ | ✅  | ❌   | ✅   | ✅      |
| 2      | ❌   | ❌  | ❌   | ❌ | ❌ | ❌  | ❌   | ✅   | ✅      |
| 3      | ✅   | ❌  | ❌   | ✅ | ❌ | ❌  | ❌   | ✅   | ❌      |
| 4      | ✅   | ✅  | ✅   | ❌ | ❌ | ❌  | ✅   | ❌   | ❌      |
| 5      | ✅   | ✅  | ❌   | ❌ | ❌ | ✅  | ❌   | ✅   | ✅      |
| 6      | ✅   | ✅  | ✅   | ❌ | ❌ | ❌  | ✅   | ❌   | ❌      |
| 7      | ❌   | ❌  | ❌   | ❌ | ✅ | ❌  | ❌   | ✅   | ✅      |
| 8      | ✅   | ❌  | ❌   | ✅ | ❌ | ❌  | ❌   | ❌   | ❌      |
| 9      | ❌   | ❌  | ❌   | ❌ | ❌ | ❌  | ❌   | ✅   | ✅      |
| 10     | ✅   | ✅  | ✅   | ❌ | ❌ | ✅  | ✅   | ✅   | ✅      |

Use this matrix to choose reports that demonstrate specific features!

---

## Fun Easter Eggs to Add

Want to make your demo memorable? Add these patient names with backstories:

- **Sarah Chen** - "Inspired by my grandmother"
- **Dr. House** - "Even doctors need help understanding reports"
- **Flash Gordon** - "He's got a fast heartbeat problem" 😄
- **Tony Stark** - "Arc reactor → ICD, same thing right?"

---

**Pro Tip**: Print Report 1 on paper and show judges "this is what patients receive" then show them "this is what our app does with it" - powerful visual contrast!
