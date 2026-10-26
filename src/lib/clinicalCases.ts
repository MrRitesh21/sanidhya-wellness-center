import scoliosisSpineAlignment from "@/assets/scoliosis-spine-alignment-therapy.jpeg";
import lumbarSpineAdjustment from "@/assets/lumbar-spine-adjustment-treatment.jpeg";
import scoliosisLumbarPre from "@/assets/scoliosis-lumbar-curvature-pre-treatment.jpeg";
import scoliosisSevereListBefore from "@/assets/scoliosis-severe-spinal-list-before.jpeg";
import scoliosisSpinalAfter from "@/assets/scoliosis-spinal-alignment-after.jpeg";
import spineFlexibilityRehab from "@/assets/spine-flexibility-rehabilitation-exercise.jpeg";
import varicoseVeinsBeforeAfter from "@/assets/varicose-veins-before-after-15-days.jpeg";
import eyeHemorrhageHematoma from "@/assets/eye-hemorrhage-hematoma-recovery-case.jpeg";
import chronicVaricoseBilateral from "@/assets/chronic-varicose-spider-veins-bilateral.jpeg";
import clubfootCtevInversion from "@/assets/bilateral-clubfoot-ctev-inversion.jpeg";
import pediatricStrabismusSquint from "@/assets/pediatric-strabismus-squint-treatment.jpeg";
import clubfootNeuromuscularTherapy from "@/assets/clubfoot-neuromuscular-alignment-therapy.jpeg";

export interface CaseImage {
  src: string;
  title: string;
  stage: "before" | "after" | "procedure" | "progress";
  stageLabel: string;
  description: string;
  aspect?: string;
}

export interface ClinicalCase {
  id: string;
  category: "spine" | "veins" | "pediatric" | "trauma";
  categoryLabel: string;
  title: string;
  hindiTitle: string;
  summary: string;
  problem: string;
  therapyApproach: string;
  resultsKey: string[];
  timeline: string;
  images: CaseImage[];
  enquiryMessage: string;
}

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: "scoliosis-spine-correction",
    category: "spine",
    categoryLabel: "Spine & Posture",
    title: "Severe Sciatic Scoliosis & Lumbar Curvature Realignment",
    hindiTitle: "रीढ़ की हड्डी का गंभीर टेढ़ापन व साइटिका दर्द निवारण",
    summary:
      "A young adult presented with extreme lateral spinal tilt (sciatic scoliosis), uneven pelvic alignment, and severe back pain. Fully corrected through non-surgical naturopathic spine adjustments, acupressure, and corrective exercises.",
    problem:
      "Marked right-sided trunk tilt with lateral spinal displacement, muscle spasm, and severe functional restriction preventing normal upright walking.",
    therapyApproach:
      "Naturopathic manual spinal alignment, Sujok acupressure reflex stimulation, therapeutic spinal traction, and personalized corrective yoga asanas.",
    resultsKey: [
      "Natural vertical posture restored without surgery",
      "Complete relief from sciatic nerve compression",
      "Full active spinal flexion and mobility regained",
    ],
    timeline: "Structured In-Clinic Sessions",
    enquiryMessage:
      "Hello Sanidhya Naturopathy Center, I would like to consult the doctor regarding Scoliosis / Spine Alignment & Back Pain treatment.",
    images: [
      {
        src: scoliosisSevereListBefore,
        title: "Initial Standing Posture (Before)",
        stage: "before",
        stageLabel: "Before Treatment",
        description:
          "Severe lateral trunk deviation to the right with prominent lumbar spinal curvature and pelvic tilt.",
      },
      {
        src: scoliosisSpinalAfter,
        title: "Standing Realignment (After)",
        stage: "after",
        stageLabel: "After Realignment",
        description:
          "Significant spinal straightening achieved — trunk is centered squarely over the pelvis with balanced shoulders.",
      },
      {
        src: scoliosisLumbarPre,
        title: "Lumbar Curvature Pre-Assessment",
        stage: "progress",
        stageLabel: "Pre-Assessment",
        description:
          "Oblique view capturing deep lumbar distortion and asymmetrical paraspinal muscle contraction.",
      },
      {
        src: scoliosisSpineAlignment,
        title: "Spinal Adjustment Session",
        stage: "procedure",
        stageLabel: "Doctor Therapy Session",
        description:
          "Doctor administering targeted spinal mobilization and therapeutic pressure along affected vertebrae.",
      },
      {
        src: lumbarSpineAdjustment,
        title: "Lower Spine Decompression",
        stage: "procedure",
        stageLabel: "Lumbar Adjustment",
        description:
          "Gentle non-invasive decompression technique restoring segmental lumbar mobility and reducing disc strain.",
      },
      {
        src: spineFlexibilityRehab,
        title: "Flexibility & Rehab Forward Bend",
        stage: "progress",
        stageLabel: "Rehabilitation Assessment",
        description:
          "Patient demonstrating restored forward spinal flexion and balanced paraspinal muscular symmetry on yoga mat.",
      },
    ],
  },
  {
    id: "varicose-spider-veins",
    category: "veins",
    categoryLabel: "Circulation & Veins",
    title: "Varicose Veins & Reticular Spider Vein Clearance (15 Days)",
    hindiTitle: "वेरिकोज़ वेंस व नसों का नीलापन (15 दिनों में चमत्कारिक सुधार)",
    summary:
      "Visible engorged reticular spider veins and chronic venous insufficiency treated with hydrotherapy, natural detox packs, and circulatory stimulation, showing remarkable fading within 15 days.",
    problem:
      "Prominent purple/blue spider web veins on the calves, heavy legs, persistent aching, and poor microcirculation.",
    therapyApproach:
      "Targeted alternating hot & cold Hydrotherapy (Jal Chikitsa), therapeutic mud wraps to reduce vascular heat, and natural herbal circulation enhancers.",
    resultsKey: [
      "Significant visible clearance of spider veins in 15 days",
      "Relief from chronic leg heaviness, cramps, and throbbing",
      "100% natural, non-invasive — avoided laser / surgery",
    ],
    timeline: "Rapid 15-Day Improvement",
    enquiryMessage:
      "Hello Sanidhya Naturopathy Center, I am looking for non-surgical natural treatment for Varicose Veins / Spider Veins.",
    images: [
      {
        src: varicoseVeinsBeforeAfter,
        title: "Clinical 15-Day Before & After",
        stage: "after",
        stageLabel: "15-Day Direct Comparison",
        description:
          "Left: Dark engorged spider veins before treatment. Right: Tremendous clearance and restoration of clear skin tone after 15 days of natural therapy.",
      },
      {
        src: chronicVaricoseBilateral,
        title: "Chronic Bilateral Presentation",
        stage: "before",
        stageLabel: "Bilateral Clinical Case",
        description:
          "Elderly patient with extensive bilateral reticular venous congestion undergoing the clinic's venous recovery protocol.",
      },
    ],
  },
  {
    id: "pediatric-clubfoot-ctev",
    category: "pediatric",
    categoryLabel: "Pediatric & Orthopedic",
    title: "Pediatric Bilateral Clubfoot (CTEV) Neuromuscular Mobilization",
    hindiTitle: "बच्चों में पैर का मुड़ना (Clubfoot / CTEV) प्राकृतिक सुधार",
    summary:
      "Young patient with congenital inward foot turning (talipes equinovarus) treated through gentle, non-surgical neuromuscular adjustments, tendon stretching, and reflex therapy.",
    problem:
      "Bilateral rigid inward inversion of the feet and equinus deformity preventing normal plantigrade foot placement.",
    therapyApproach:
      "Doctor-guided gentle manual joint alignment, soft tissue release of tight medial structures, Sujok reflexology, and progressive passive mobilization.",
    resultsKey: [
      "Gradual natural correction of foot angle and flexibility",
      "Gentle and completely tear-free technique for children",
      "Avoidance of harsh surgical tendon lengthening",
    ],
    timeline: "Progressive Rehabilitation",
    enquiryMessage:
      "Hello Sanidhya Naturopathy Center, I would like to consult the doctor regarding pediatric Clubfoot (CTEV) natural therapy.",
    images: [
      {
        src: clubfootCtevInversion,
        title: "Bilateral Inward Inversion (CTEV)",
        stage: "before",
        stageLabel: "Clinical Presentation",
        description:
          "Severe bilateral inward turning and inversion of both feet prior to manual therapy.",
      },
      {
        src: clubfootNeuromuscularTherapy,
        title: "Doctor Mobilization Session",
        stage: "procedure",
        stageLabel: "Doctor Manual Therapy",
        description:
          "Doctor performing precise neuromuscular alignment and ankle joint mobilization on the clinic bed.",
      },
    ],
  },
  {
    id: "subconjunctival-hematoma-recovery",
    category: "trauma",
    categoryLabel: "Trauma & Tissue Healing",
    title: "Subconjunctival Eye Hemorrhage & Facial Hematoma Healing",
    hindiTitle: "आंख की लालिमा (खून जमना) व चेहरे की चोट/सूजन की त्वरित रिकवरी",
    summary:
      "Severe accidental facial trauma causing deep eye scleral hemorrhage and dark cheek hematoma. Accelerated natural healing achieved through cooling compresses, Jal Chikitsa, and tissue detox.",
    problem:
      "Blood collection in the sclera (red eye), painful facial contusion, dark purple hematoma, and localized tissue swelling.",
    therapyApproach:
      "Natural anti-inflammatory herbal hydro-compresses, gentle lymphatic drainage, Jal Chikitsa, and metabolic cell-repair guidance.",
    resultsKey: [
      "Accelerated blood reabsorption without residual redness",
      "Complete dissipation of facial bruising and swelling",
      "Protected clear eyesight with zero long-term scarring",
    ],
    timeline: "Rapid Tissue Regeneration",
    enquiryMessage:
      "Hello Sanidhya Naturopathy Center, I would like to enquire about natural trauma recovery and anti-inflammatory therapies.",
    images: [
      {
        src: eyeHemorrhageHematoma,
        title: "Before & After Recovery",
        stage: "after",
        stageLabel: "Healing Progression",
        description:
          "Left: Acute trauma showing deep red ocular hemorrhage and dark cheek bruise. Right: Cleared sclera, healed cheek tissue, and restored natural appearance.",
      },
    ],
  },
  {
    id: "pediatric-strabismus-squint",
    category: "pediatric",
    categoryLabel: "Pediatric & Neuro",
    title: "Pediatric Strabismus (Squint Eye) Holistic Coordination",
    hindiTitle: "बच्चों में भेंगापन / आंखों का तिरछापन (Squint) प्राकृतिक उपचार",
    summary:
      "Holistic non-surgical management of ocular muscular misalignment and squint through targeted acupressure, neuro-reflex therapy, and yogic eye coordination exercises (Trataka).",
    problem:
      "Ocular divergence / misaligned visual axes affecting binocular single vision and eye coordination in a young patient.",
    therapyApproach:
      "Periorbital acupressure points, Sujok correspondence therapy for cranial nerve balance, and guided Trataka (gaze fixation) practices.",
    resultsKey: [
      "Strengthened extraocular muscles naturally",
      "Enhanced binocular tracking and visual focus",
      "Child-friendly holistic approach without surgery",
    ],
    timeline: "Holistic Eye Muscle Care",
    enquiryMessage:
      "Hello Sanidhya Naturopathy Center, I would like to consult the doctor regarding natural treatment for Squint / Strabismus.",
    images: [
      {
        src: pediatricStrabismusSquint,
        title: "Strabismus Clinical Assessment",
        stage: "before",
        stageLabel: "Clinical Assessment",
        description:
          "Pediatric patient presenting with ocular divergence being evaluated for naturopathic neuro-ocular therapy.",
      },
    ],
  },
];
