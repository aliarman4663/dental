// Utility functions to find images and videos from Chief complain folder

// Map complaint names from the app to folder names in "Chief complain"
const complaintToFolderMap: Record<string, string> = {
    "Pain": "Pain and swelling",
    "Decay": "Decay",
    "Extraction": "Extraction",
    "Gingival Problem": "Problems of gingiva",
    "Deposits / Cleaning": "Cleaning",
    "Swelling": "Pain and swelling",
    "Prosthesis": "Prosthesis",
    "Food Lodgement / Pockets": "Food lodgement",
    "Irregularly placed teeth": "Irregularly placed teeth",
    "Spacing": "Spacing",
    "Discoloration": "Discoloration",
    "Sensitivity": "Sensitivity",
    "Attrition": "Attrition",
    "Others": "Others"
};

// Known image files for each complaint
const complaintImages: Record<string, string[]> = {
    "Pain and swelling": ["Screenshot_20260108-222959__02__02.jpg"],
    "Decay": ["Screenshot_20260108-230641__01.jpg"],
    "Extraction": ["Screenshot_20260108-230825__01.jpg"],
    "Problems of gingiva": ["Screenshot_20260108-230045.jpg"],
    "Cleaning": ["Screenshot_20260108-222959__02__01.jpg"],
    "Prosthesis": ["Screenshot_20260108-222959__03__01.jpg"],
    "Food lodgement": ["IMG-20260212-WA0040.jpg"],
    "Irregularly placed teeth": ["Screenshot_20260108-230057.jpg"],
    "Spacing": ["IMG-20260213-WA0035.jpg"],
    "Discoloration": ["IMG-20260213-WA0034.jpg"],
    "Sensitivity": [],
    "Attrition": ["IMG-20260213-WA0019.jpg"],
    "Others": []
};

// Map treatment names to video paths
// Format: "Complaint|Treatment Name" -> "video path relative to Tt folder"
const treatmentVideos: Record<string, string[]> = {
    // Decay treatments
    "Decay|Filling / Restoration": ["Tt/Filling - restoration/Composite/Copy of VIDEO-2025-12-28-19-15-08.mp4", "Tt/Filling - restoration/Gic/Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    "Decay|Root Canal Treatment (if deep decay/pulp involved)": ["Tt/Rct/Copy of Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    "Decay|Crown Placement (post-RCT)": ["Tt/Crown placement post rct/VID-20260213-WA0023.mp4"],
    
    // Extraction treatments
    "Extraction|Simple Extraction": ["T-t/Simple extraction/VID-20251224-WA0086.mp4"],
    "Extraction|Surgical / Traumatic Extraction": ["T-t/Surgical - traumatic extraction/VID-20260213-WA0037.mp4"],
    "Extraction|Impaction / Wisdom Tooth Removal": ["T-t/Disimpaction- wisdom tooth removal/VID-20251224-WA0091.mp4"],
    
    // Pain and swelling treatments
    // Note: "Diagnosis & Conservative Management" and "Incision & Drainage" folders are empty, so no media
    "Pain and swelling|Root Canal Treatment (if pulp involved)": ["Tt/Rct/Copy of Copy of Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    "Pain and swelling|Extraction (if non-restorable)": ["Tt/Extraction/VID-20251224-WA0086.mp4"],
    
    // Pain treatments (same as Pain and swelling)
    "Pain|Root Canal Treatment (if pulp involved)": ["Tt/Rct/Copy of Copy of Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    "Pain|Extraction (if non-restorable)": ["Tt/Extraction/VID-20251224-WA0086.mp4"],
    
    // Swelling treatments (same as Pain and swelling)
    "Swelling|Surgical Intervention": ["Tt/Extraction/VID-20251224-WA0086.mp4"],
    "Swelling|Conservative Management": ["Tt/Extraction/VID-20251224-WA0086.mp4"], // Using extraction as placeholder
    
    // Cleaning treatments
    "Deposits / Cleaning|Oral Prophylaxis": ["Treatment/Oral prophylaxis/VID-20260213-WA0016.mp4"],
    
    // Gingival Problem treatments
    "Problems of gingiva|Scaling & Polishing": ["Tt/Scaling and polishing/VID-20260213-WA0016.mp4"],
    "Gingival Problem|Scaling & Polishing": ["Tt/Scaling and polishing/VID-20260213-WA0016.mp4"],
    "Gingival Problem|Root Planing (for pockets)": ["Tt/Scaling and polishing/VID-20260213-WA0016.mp4"],
    "Gingival Problem|Advanced Perio Surgery": ["Tt/Scaling and polishing/VID-20260213-WA0016.mp4"], // Using scaling as placeholder
    
    // Discoloration treatments
    "Discoloration|Bleaching": ["Tt/Bleaching/VID-20251228-WA0409(1).mp4"],
    "Discoloration|Scaling": ["Tt/Scaling/VID-20260213-WA0016.mp4"],
    "Discoloration|Scaling (Ultrasonic)": ["Tt/Scaling/VID-20260213-WA0016.mp4"],
    
    // Irregularly placed teeth treatments
    "Irregularly placed teeth|Braces Treatment": ["Tt/Brackets/Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    "Irregularly placed teeth|Brackets": ["Tt/Brackets/Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    "Irregularly placed teeth|Aligners": ["Tt/Aligners/Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    
    // Spacing treatments
    "Spacing|Brackets": ["Tt/Brackets/Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    "Spacing|Aligners": ["Tt/Aligners/Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    
    // Prosthesis treatments
    "Prosthesis|Crown": ["Tt/Crown/IMG-20260213-WA0029.jpg"],
    "Prosthesis|Denture": ["Tt/Denture/Rpd/VID-20260213-WA0020.mp4", "Tt/Denture/Cd/VID_20260213221454.mp4"],
    "Prosthesis|Bridge": ["Tt/Fpd- bridge/VID-20260213-WA0022.mp4"],
    "Prosthesis|Implant Supported": ["Tt/Implants/Copy of VIDEO-2025-12-28-19-15-08.mp4"],
    
    // Food lodgement
    "Food lodgement|Periodontal Therapy": ["Tt/VID-20260213-WA0016.mp4"],
    
    // Sensitivity
    "Sensitivity|Scaling": ["Tt/Scaling/VID-20260213-WA0016.mp4"],
    "Sensitivity|Scaling & Root Planing": ["Tt/Scaling/VID-20260213-WA0016.mp4"],
    "Sensitivity|Topical Fluoride Application": ["Tt/Scaling/VID-20260213-WA0016.mp4"], // Using scaling as placeholder
    "Sensitivity|Laser Therapy (if required)": ["Tt/Scaling/VID-20260213-WA0016.mp4"], // Using scaling as placeholder
    "Sensitivity|Oral Hygiene Measures": ["Tt/Scaling/VID-20260213-WA0016.mp4"], // Using scaling as placeholder
    
    // Attrition
    "Attrition|Treatment": ["Tt/VID-20251228-WA0422.mp4"]
};

// Find image for a complaint
export const getComplaintImage = (complaint: string): string | null => {
    const folderName = complaintToFolderMap[complaint] || complaint;
    const images = complaintImages[folderName];
    
    if (!images || images.length === 0) {
        return null;
    }
    
    // Return the first available image (relative path for Electron production)
    return `Chief complain/${folderName}/${images[0]}`;
};

// Find media (video or image/GIF) for a specific treatment
export const getTreatmentVideo = (complaint: string, treatmentName: string): { path: string; type: 'video' | 'image' | 'gif' } | null => {
    const folderName = complaintToFolderMap[complaint] || complaint;
    
    // Try exact match first with both folder name and complaint name
    let key = `${folderName}|${treatmentName}`;
    let videos = treatmentVideos[key];
    
    // Also try with original complaint name
    if (!videos && complaint !== folderName) {
        key = `${complaint}|${treatmentName}`;
        videos = treatmentVideos[key];
    }
    
    // If no exact match, try partial matching
    if (!videos) {
        for (const [mapKey, videoPaths] of Object.entries(treatmentVideos)) {
            const [mapComplaint, mapTreatment] = mapKey.split("|");
            // Try matching with folder name or original complaint name
            const complaintMatches = mapComplaint === folderName || mapComplaint === complaint;
            if (complaintMatches) {
                // Check if treatment names match (handle parentheses)
                const mapTreatmentBase = mapTreatment.split("(")[0].trim().toLowerCase();
                const treatmentBase = treatmentName.split("(")[0].trim().toLowerCase();
                if (treatmentName.toLowerCase().includes(mapTreatmentBase) || 
                    mapTreatment.toLowerCase().includes(treatmentBase)) {
                    videos = videoPaths;
                    break;
                }
            }
        }
    }
    
    // Also try matching by keywords
    if (!videos) {
        const treatmentLower = treatmentName.toLowerCase();
        
        // Check for brackets/braces
        if (treatmentLower.includes("bracket") || treatmentLower.includes("braces")) {
            videos = treatmentVideos[`${folderName}|Braces Treatment`] ||
                     treatmentVideos[`${folderName}|Brackets`] || 
                     treatmentVideos[`Irregularly placed teeth|Braces Treatment`] ||
                     treatmentVideos[`Irregularly placed teeth|Brackets`] ||
                     treatmentVideos[`Spacing|Brackets`];
        }
        // Check for RCT
        else if (treatmentLower.includes("root canal") || treatmentLower.includes("rct")) {
            // Try exact match first, then fallback
            videos = treatmentVideos[`${folderName}|Root Canal Treatment (if pulp involved)`] ||
                     treatmentVideos[`${folderName}|Root Canal Treatment (if deep decay/pulp involved)`] ||
                     treatmentVideos[`Decay|Root Canal Treatment (if deep decay/pulp involved)`] ||
                     treatmentVideos[`Pain and swelling|Root Canal Treatment (if pulp involved)`];
        }
        // Check for extraction
        else if (treatmentLower.includes("extraction")) {
            if (treatmentLower.includes("simple")) {
                videos = treatmentVideos[`Extraction|Simple Extraction`];
            } else if (treatmentLower.includes("surgical") || treatmentLower.includes("traumatic")) {
                videos = treatmentVideos[`Extraction|Surgical / Traumatic Extraction`];
            } else if (treatmentLower.includes("impaction") || treatmentLower.includes("wisdom")) {
                videos = treatmentVideos[`Extraction|Impaction / Wisdom Tooth Removal`];
            } else {
                videos = treatmentVideos[`Pain and swelling|Extraction (if non-restorable)`] ||
                         treatmentVideos[`Extraction|Simple Extraction`];
            }
        }
        // Check for scaling
        else if (treatmentLower.includes("scaling") || treatmentLower.includes("root planing")) {
            videos = treatmentVideos[`${folderName}|Scaling & Root Planing`] ||
                     treatmentVideos[`${folderName}|Scaling & Polishing`] ||
                     treatmentVideos[`${folderName}|Scaling`] ||
                     treatmentVideos[`${folderName}|Scaling (Ultrasonic)`] ||
                     treatmentVideos[`Gingival Problem|Scaling & Polishing`] ||
                     treatmentVideos[`Discoloration|Scaling`] ||
                     treatmentVideos[`Sensitivity|Scaling`];
        }
        // Check for root planing
        else if (treatmentLower.includes("root planing")) {
            videos = treatmentVideos[`${folderName}|Root Planing (for pockets)`] ||
                     treatmentVideos[`${folderName}|Scaling & Root Planing`] ||
                     treatmentVideos[`Gingival Problem|Root Planing (for pockets)`];
        }
        // Check for laser therapy
        else if (treatmentLower.includes("laser")) {
            videos = treatmentVideos[`${folderName}|Laser Therapy (if required)`] ||
                     treatmentVideos[`Sensitivity|Laser Therapy (if required)`];
        }
        // Check for fluoride
        else if (treatmentLower.includes("fluoride")) {
            videos = treatmentVideos[`${folderName}|Topical Fluoride Application`] ||
                     treatmentVideos[`Sensitivity|Topical Fluoride Application`];
        }
        // Check for oral hygiene
        else if (treatmentLower.includes("oral hygiene") || treatmentLower.includes("hygiene measures")) {
            videos = treatmentVideos[`${folderName}|Oral Hygiene Measures`] ||
                     treatmentVideos[`Sensitivity|Oral Hygiene Measures`];
        }
        // Check for conservative management
        else if (treatmentLower.includes("conservative management")) {
            videos = treatmentVideos[`${folderName}|Conservative Management`] ||
                     treatmentVideos[`Swelling|Conservative Management`];
        }
        // Check for advanced perio surgery
        else if (treatmentLower.includes("advanced perio") || treatmentLower.includes("perio surgery")) {
            videos = treatmentVideos[`${folderName}|Advanced Perio Surgery`] ||
                     treatmentVideos[`Gingival Problem|Advanced Perio Surgery`];
        }
        // Check for filling/restoration
        else if (treatmentLower.includes("filling") || treatmentLower.includes("restoration")) {
            videos = treatmentVideos[`Decay|Filling / Restoration`];
        }
        // Check for crown
        else if (treatmentLower.includes("crown")) {
            // Check for Prosthesis Crown (which has a JPG file)
            if (folderName === "Prosthesis") {
                videos = ["Tt/Crown/IMG-20260213-WA0029.jpg"];
            } else {
                videos = treatmentVideos[`Decay|Crown Placement (post-RCT)`];
            }
        }
        // Check for denture
        else if (treatmentLower.includes("denture")) {
            videos = treatmentVideos[`Prosthesis|Denture`];
        }
        // Check for bridge
        else if (treatmentLower.includes("bridge")) {
            videos = treatmentVideos[`Prosthesis|Bridge`];
        }
        // Check for implant
        else if (treatmentLower.includes("implant")) {
            videos = treatmentVideos[`Prosthesis|Implant Supported`];
        }
        // Check for oral prophylaxis
        else if (treatmentLower.includes("oral prophylaxis") || treatmentLower.includes("prophylaxis")) {
            videos = treatmentVideos[`Deposits / Cleaning|Oral Prophylaxis`];
        }
        // Check for bleaching
        else if (treatmentLower.includes("bleaching")) {
            videos = treatmentVideos[`Discoloration|Bleaching`];
        }
        // Check for aligners
        else if (treatmentLower.includes("aligner")) {
            videos = treatmentVideos[`Irregularly placed teeth|Aligners`] ||
                     treatmentVideos[`Spacing|Aligners`];
        }
    }
    
    if (!videos || videos.length === 0) {
        return null;
    }
    
    // Filter out paths that are just folders (no file extension)
    const validMediaFiles = videos.filter(path => {
        const hasExtension = /\.(mp4|webm|ogg|gif|jpg|jpeg|png|webp)$/i.test(path);
        return hasExtension;
    });
    
    if (validMediaFiles.length === 0) {
        return null;
    }
    
    // Get the first available media file
    const folderNameForPath = complaintToFolderMap[complaint] || complaint;
    // Construct full path - validMediaFiles[0] contains relative path from Tt folder
    // Use relative path for Electron production (no leading slash)
    const mediaPath = `Chief complain/${folderNameForPath}/${validMediaFiles[0]}`;
    
    // Determine if it's a video or image based on file extension
    const fileExtension = mediaPath.toLowerCase().split('.').pop();
    const isVideo = fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg';
    const isGif = fileExtension === 'gif';
    const isImage = fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'webp';
    
    if (isVideo) {
        return { path: mediaPath, type: 'video' };
    } else if (isGif) {
        return { path: mediaPath, type: 'gif' };
    } else if (isImage) {
        return { path: mediaPath, type: 'image' };
    }
    
    // Default to video if extension is unknown
    return { path: mediaPath, type: 'video' };
};
