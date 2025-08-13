// src/components/Fetch.jsx
import React, { useEffect, useCallback } from "react";
import axios from "axios";

export default function Fetch({ setPlaces, currentLocation }) {
  // אל תצהירי שוב על currentLocation בהמשך; זה ה-prop שהגיע מ-App
  // ברירת מחדל אם משום מה אין currentLocation:
  const loc = currentLocation ?? { lat: 32.0853, lng: 34.7818 }; // תל אביב

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const fetchSavedPlaces = useCallback(async () => {
    // guard: לא לרוץ אם אין קואורדינטות
    if (!Number.isFinite(loc?.lat) || !Number.isFinite(loc?.lng)) return;

    try {
      const res = await axios.get("http://localhost:5001/api/get-places");

      const list = Array.isArray(res.data?.data) ? res.data.data : [];

      const filtered = list
        .filter(
          (p) =>
            p?.location &&
            Number.isFinite(p.location.lat) &&
            Number.isFinite(p.location.lng)
        )
        .filter(
          (p) =>
            calculateDistance(
              loc.lat,
              loc.lng,
              p.location.lat,
              p.location.lng
            ) <= 5 // עד 5 ק"מ
        );

      setPlaces(filtered);
    } catch (err) {
      console.error("Error fetching places from database:", err);
    }
  }, [loc?.lat, loc?.lng, setPlaces]); // ✅ תלויות נכונות

  useEffect(() => {
    fetchSavedPlaces();
  }, [fetchSavedPlaces]); // ✅ אין אזהרת exhaustive-deps

  return null;
}
