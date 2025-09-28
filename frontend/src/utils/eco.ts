// src/utils/eco.ts
export const EF_KG_PER_KM = 0.15;
export const AVG_SPEED_KMH = 70;

export function approxDistanceFromDuration(durationMin: number, avg = AVG_SPEED_KMH) {
    return durationMin > 0 ? (durationMin / 60) * avg : 0;
}

function savingsFromOccupants(durationMin: number, occupants: number, ef = EF_KG_PER_KM, avg = AVG_SPEED_KMH) {
    const distanceKm = approxDistanceFromDuration(durationMin, avg);
    if (distanceKm <= 0 || occupants <= 1) return { perPersonKg: 0, totalKg: 0 };
    const total = ef * distanceKm * (occupants - 1);
    const perPerson = total / occupants;
    return { perPersonKg: Number(perPerson.toFixed(2)), totalKg: Number(total.toFixed(2)) };
}


export function incrementalBookingSavings(durationMin: number, selectedPassengers: number, ef = EF_KG_PER_KM, avg = AVG_SPEED_KMH) {
    const distanceKm = approxDistanceFromDuration(durationMin, avg);
    const inc = Math.max(0, selectedPassengers) * Math.max(0, distanceKm) * ef;
    return Number(inc.toFixed(2));
}


export function rideFullCapacitySavings(durationMin: number, existingPassengers: number, seatsAvailable: number) {
    const occupantsFull = 1 + Math.max(0, existingPassengers) + Math.max(0, seatsAvailable);
    const { totalKg } = savingsFromOccupants(durationMin, occupantsFull);
    return Number(totalKg.toFixed(2));
}
