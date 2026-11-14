import { useState, useEffect } from "react";
import { clinic as defaultClinic, fullAddress as defaultFullAddress, hours as defaultHours } from "./clinic";
import { DEFAULT_DOCTOR, BOOKING_CLINIC_SLUG } from "./appointment";

export interface ManagedClinicData {
  slug: string;
  clinic_name: string;
  doctor_name: string;
  specialization: string;
  qualification: string;
  consultation_fee: number;
  phone: string;
  email: string;
  address: string;
  theme_color: string;
  working_hours: {
    weekday: string;
    sunday: string;
  };
  dpdp_compliance: {
    enabled: boolean;
    officer_name: string;
    officer_email: string;
    officer_phone: string;
  };
  booking_config: {
    endpoint: string;
    modes: ("offline" | "online")[];
    morning_slots: string[];
    evening_slots: string[];
  };
}

const CACHE_KEY = `clinicx_config_${BOOKING_CLINIC_SLUG}`;

const INITIAL_DATA: ManagedClinicData = {
  slug: BOOKING_CLINIC_SLUG,
  clinic_name: defaultClinic.name,
  doctor_name: DEFAULT_DOCTOR.name,
  specialization: DEFAULT_DOCTOR.specialty,
  qualification: DEFAULT_DOCTOR.qualifications,
  consultation_fee: DEFAULT_DOCTOR.consultationFee,
  phone: defaultClinic.phoneDisplay,
  email: "contact@sanidhyawellness.com",
  address: defaultFullAddress,
  theme_color: "#0d9488",
  working_hours: {
    weekday: "10:00 AM – 9:30 PM",
    sunday: "10:00 AM – 2:00 PM",
  },
  dpdp_compliance: {
    enabled: true,
    officer_name: "Data Grievance Officer",
    officer_email: "grievance@sanidhyawellness.com",
    officer_phone: defaultClinic.phoneDisplay,
  },
  booking_config: {
    endpoint: "https://clinicx.digiwil.com/api/public/submit-booking",
    modes: ["offline", "online"],
    morning_slots: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"],
    evening_slots: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"],
  },
};

export async function fetchLiveClinicConfig(): Promise<ManagedClinicData> {
  try {
    const res = await fetch(`https://clinicx.digiwil.com/api/public/clinic-data?clinic=${BOOKING_CLINIC_SLUG}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return INITIAL_DATA;
    const json = await res.json();
    if (json && json.success) {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(json));
        } catch {}
      }
      return json;
    }
  } catch {}
  return INITIAL_DATA;
}

export function useClinicData(): ManagedClinicData {
  const [data, setData] = useState<ManagedClinicData>(INITIAL_DATA);

  useEffect(() => {
    let mounted = true;

    // Read cached data safely after client hydration completes
    try {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object") {
            setData(parsed);
          }
        }
      }
    } catch {}

    fetchLiveClinicConfig().then((live) => {
      if (mounted && live) {
        setData(live);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return data;
}
