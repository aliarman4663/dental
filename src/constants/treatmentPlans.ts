export interface TreatmentPlan {
    department: string;
    mainTreatments: Array<{
        name: string;
        subMethods: string[];
        costRange: string;
    }>;
    referralNotes?: string;
    generalCostNote?: string;
}

export const treatmentPlans: Record<string, TreatmentPlan> = {
    Pain: {
        department: "Oral Medicine / Oral Surgery",
        mainTreatments: [
            {
                name: "Diagnosis & Conservative Management",
                subMethods: [
                    "Clinical Examination",
                    "Medication (Analgesics + Antibiotics)",
                    "X-Ray (IOPA / OPG)",
                ],
                costRange: "₹100 – ₹500",
            },
            {
                name: "Root Canal Treatment (if pulp involved)",
                subMethods: [
                    "Access opening + Cleaning + Shaping",
                    "Obturation (single/multiple sitting)",
                    "Post-op restoration",
                ],
                costRange: "₹1000 – ₹4000 (base RCT) + crown extra",
            },
            {
                name: "Extraction (if non-restorable)",
                subMethods: [
                    "Simple extraction",
                    "Surgical extraction / disimpaction",
                ],
                costRange: "₹100 – ₹1500",
            },
            {
                name: "Incision & Drainage (if abscess/swelling)",
                subMethods: ["I&D + Medication"],
                costRange: "₹300 – ₹1000",
            },
        ],
        referralNotes: "Refer to Endo for RCT; Oral Surgery for extraction/I&D; Pedo if <15-18 yrs room 102 03",
        generalCostNote: "Depends on final diagnosis; meds/X-ray low cost",
    },

    Decay: {
        department: "Conservative Dentistry & Endodontics",
        mainTreatments: [
            {
                name: "Filling / Restoration",
                subMethods: [
                    "Caries removal + Cavity preparation",
                    "GIC filling (temporary/low-cost)",
                    "Composite filling (aesthetic)",
                ],
                costRange: "₹200 – ₹1000",
            },
            {
                name: "Root Canal Treatment (if deep decay/pulp involved)",
                subMethods: [
                    "Vital / Non-vital pulp extirpation",
                    "Cleaning & Shaping (hand/rotary)",
                    "Obturation + Sealing",
                    "Post-RCT restoration / Crown prep",
                ],
                costRange: "₹1000 – ₹12000 (incl. crown if needed)",
            },
            {
                name: "Crown Placement (post-RCT)",
                subMethods: [
                    "PFM (Porcelain Fused to Metal)",
                    "Zirconia / All-ceramic",
                ],
                costRange: "₹5000 – ₹15000",
            },
        ],
        referralNotes: "Refer to Endo for RCT Room no-03,102",
        generalCostNote: "GIC cheaper; composite/zirconia higher",
    },

    Extraction: {
        department: "Oral & Maxillofacial Surgery",
        mainTreatments: [
            {
                name: "Simple Extraction",
                subMethods: ["Forceps extraction + Suturing if needed"],
                costRange: "₹100 – ₹600",
            },
            {
                name: "Surgical / Traumatic Extraction",
                subMethods: ["Flap + Bone removal + Sectioning"],
                costRange: "₹800 – ₹1500",
            },
            {
                name: "Impaction / Wisdom Tooth Removal",
                subMethods: ["Surgical disimpaction + Meds"],
                costRange: "₹1000 – ₹3000",
            },
        ],
        referralNotes: "Direct to Oral Surgery room no.- 03",
        generalCostNote: "Higher for impacted/surgical cases",
    },

    "Gingival Problem": {
        department: "Periodontics",
        mainTreatments: [
            {
                name: "Scaling & Polishing",
                subMethods: [
                    "Manual scaling",
                    "Ultrasonic scaling",
                    "Air polishing",
                ],
                costRange: "₹200 – ₹800",
            },
            {
                name: "Root Planing (for pockets)",
                subMethods: ["Deep subgingival scaling per quadrant"],
                costRange: "₹1000 – ₹1500 per quadrant",
            },
            {
                name: "Advanced Perio Surgery",
                subMethods: [
                    "Gingivectomy / Flap surgery",
                    "Laser therapy (if available)",
                ],
                costRange: "₹2000 – ₹5000+",
            },
        ],
        referralNotes: "Refer to Periodontics room no 105",
        generalCostNote: "Basic scaling cheapest; surgery higher",
    },

    "Deposits / Cleaning": {
        department: "Periodontics",
        mainTreatments: [
            {
                name: "Oral Prophylaxis",
                subMethods: [
                    "Scaling (ultrasonic preferred)",
                    "Polishing",
                    "Oral hygiene instructions",
                ],
                costRange: "₹200 – ₹800",
            },
        ],
        referralNotes: "Refer to Periodontics",
        generalCostNote: "Ultrasonic often ₹600-800",
    },

    Swelling: {
        department: "Oral Surgery / Oral Medicine",
        mainTreatments: [
            {
                name: "Conservative Management",
                subMethods: ["Examination + Antibiotics + Analgesics + Hot fomentation"],
                costRange: "₹200 – ₹800",
            },
            {
                name: "Surgical Intervention",
                subMethods: ["Incision & Drainage + Extraction of cause tooth"],
                costRange: "₹500 – ₹2000",
            },
        ],
        referralNotes: "Oral Surgery for drainage; Endo if RCT needed room 105",
        generalCostNote: "Depends on cause (infection/abscess)",
    },

    Prosthesis: {
        department: "Prosthodontics",
        mainTreatments: [
            {
                name: "Crown",
                subMethods: [
                    "PFM crown",
                    "Zirconia crown",
                    "Metal crown",
                ],
                costRange: "₹5000 – ₹15000",
            },
            {
                name: "Bridge",
                subMethods: ["Fixed partial denture (multiple units)"],
                costRange: "₹10000 – ₹30000+",
            },
            {
                name: "Denture",
                subMethods: ["Partial / Complete removable denture"],
                costRange: "₹5000 – ₹20000",
            },
            {
                name: "Implant Supported",
                subMethods: ["Implant screw + Abutment + Crown"],
                costRange: "₹15000 – ₹50000+",
            },
        ],
        referralNotes: "Refer to Prosthodontics; Implant specialist if needed rm08",
        generalCostNote: "Zirconia/implant highest; metal cheapest",
    },

    "Food Lodgement / Pockets": {
        department: "Periodontics",
        mainTreatments: [
            {
                name: "Periodontal Therapy",
                subMethods: ["Scaling + Root planing + Pocket management"],
                costRange: "₹600 – ₹2000",
            },
        ],
        referralNotes: "Periodontics 102 ,105",
    },
    Sensitivity: {
        department: "Periodontics",
        mainTreatments: [
            {
                name: "Oral Hygiene Measures",
                subMethods: [
                    "Desensitizing toothpaste (as recommended by clinician)",
                    "Use twice daily for 2–4 weeks",
                    "Proper brushing technique (use soft brush)",
                ],
                costRange: "₹150 – ₹400 (toothpaste cost approx.)",
            },
            {
                name: "Topical Fluoride Application",
                subMethods: [
                    "Fluoride varnish",
                    "Fluoride gel application",
                ],
                costRange: "₹300 – ₹800",
            },
            {
                name: "Scaling & Root Planing",
                subMethods: [
                    "Ultrasonic scaling",
                ],
                costRange: "₹600 – ₹800",
            },
            {
                name: "Laser Therapy (if required)",
                subMethods: [
                    "Laser desensitization procedure",
                ],
                costRange: "₹1000 – ₹1500",
            },
        ],
        referralNotes: "Refer to Periodontics – Room 105",
        generalCostNote: "Initial management is conservative; laser only if needed",
    },
    Discoloration: {
        department: "Periodontics / Conservative Dentistry",
        mainTreatments: [
            {
                name: "Scaling (Ultrasonic)",
                subMethods: [
                    "Ultrasonic scaling for stain removal",
                ],
                costRange: "₹600 – ₹800",
            },
            {
                name: "Bleaching",
                subMethods: [
                    "In-office bleaching procedure",
                ],
                costRange: "₹1500 – ₹3000",
            },
        ],
        referralNotes: "Scaling – Periodontics (Room 105); Bleaching – Room 102",
        generalCostNote: "Scaling removes stains; bleaching for intrinsic discoloration",
    },
"Irregularly placed teeth": {
    department: "Orthodontics",
    mainTreatments: [
        {
            name: "Braces Treatment",
            subMethods: [
                "Metal brackets",
                "Ceramic brackets",
            ],
            costRange: "₹10000 – ₹25000",
        },
        {
            name: "Aligners",
            subMethods: [
                "Clear aligner therapy",
            ],
            costRange: "₹50000+",
        },
    ],
    referralNotes: "Refer to Orthodontics – Room 204",
    generalCostNote: "Aligners cost higher than conventional braces",
},
Spacing: {
    department: "Orthodontics",
    mainTreatments: [
        {
            name: "Braces Treatment",
            subMethods: [
                "Metal brackets",
                "Ceramic brackets",
            ],
            costRange: "₹10000 – ₹25000",
        },
        {
            name: "Aligners",
            subMethods: [
                "Clear aligner therapy",
            ],
            costRange: "₹50000+",
        },
    ],
    referralNotes: "Refer to Orthodontics – Room 204",
    generalCostNote: "Aligners cost higher than conventional braces",
},
Attrition: {
    department: "Conservative Dentistry / Prosthodontics",
    mainTreatments: [
        {
            name: "Laminates / Veneers",
            subMethods: [
                "Composite laminate veneers",
                "Porcelain veneers",
            ],
            costRange: "₹5000 – ₹15000 per tooth",
        },
    ],
    referralNotes: "Refer to Room 102",
    generalCostNote: "Porcelain veneers cost more than composite laminates",
},
Trauma: {
    department: "Oral Medicine & Diagnosis / Conservative Dentistry / Oral Surgery",
    mainTreatments: [
        {
            name: "Conservative & Diagnostic Management",
            subMethods: [
                "Clinical examination",
                "IOPAR",
                "OPG",
                "CBCT (if required)",
            ],
            costRange: "₹200 – ₹1500",
        },
        {
            name: "If Tooth Can Be Restored",
            subMethods: [
                "Composite restoration",
                "Veneers",
                "Crown restoration",
            ],
            costRange: "₹1000 – ₹15000 (depending on type)",
        },
        {
            name: "If Tooth Cannot Be Restored",
            subMethods: [
                "Extraction",
                "Surgical extraction (if required)",
            ],
            costRange: "₹500 – ₹2000",
        },
    ],
    referralNotes: "Diagnosis – OMDR; Restoration/Veneers – Dept 102; Extraction – Oral Surgery (OS)",
    generalCostNote: "Depends on fracture extent and pulp involvement",
},
Ulcer: {
    department: "Oral Medicine & Diagnosis",
    mainTreatments: [
        {
            name: "Clinical Evaluation & Diagnosis",
            subMethods: [
                "Clinical examination",
                "History taking",
                "Biopsy (if suspicious/non-healing)",
            ],
            costRange: "₹200 – ₹2000 (if biopsy required)",
        },
        {
            name: "Medical Management",
            subMethods: [
                "Topical medications",
                "Systemic medication (if required)",
                "Nutritional supplements",
            ],
            costRange: "₹200 – ₹1000",
        },
    ],
    referralNotes: "Refer to OMDR Department",
    generalCostNote: "Non-healing ulcers >2 weeks require further investigation",
},
Food_Lodgement: {
    department: "Oral Medicine & Diagnosis / Periodontics / Conservative Dentistry",
    mainTreatments: [
        {
            name: "Conservative & Diagnostic Management",
            subMethods: [
                "Clinical examination",
                "IOPAR",
                "OPG",
                "CBCT (if required)",
            ],
            costRange: "₹200 – ₹1500 (depending on imaging)",
        },
        {
            name: "Oral Hygiene Measures",
            subMethods: [
                "Scaling",
                "Oral hygiene instructions",
                "Flossing guidance",
            ],
            costRange: "₹200 – ₹800",
        },
        {
            name: "Restoration (if due to caries/open contact)",
            subMethods: [
                "Cavity preparation",
                "Composite restoration",
                "Contact correction",
            ],
            costRange: "₹500 – ₹2000",
        },
    ],
    referralNotes: "Diagnosis – OMDR; Oral hygiene – Dept 105; Restoration – Dept 102",
    generalCostNote: "Final treatment depends on cause (caries, pocket, open contact)",
},

        
};
