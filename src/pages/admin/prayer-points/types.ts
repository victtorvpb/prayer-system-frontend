export interface PrayerPoint {
  id: string;
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  active: boolean;
}

export interface PrayerPointFormData {
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  active: boolean;
} 
