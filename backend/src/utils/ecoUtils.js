export const EF_KG_PER_KM = 0.15;
export const AVG_SPEED_KMH = 70;

export function approxDistanceFromDuration(durationMin, avg = AVG_SPEED_KMH) {
    return durationMin > 0 ? (durationMin / 60) * avg : 0;
}

export function ecoFromOccupants(distanceKm, occupants, ef = EF_KG_PER_KM) {
    if (distanceKm <= 0 || occupants <= 1) {
        return { perPersonKg: 0, totalKg: 0 };
    }
    const total = ef * distanceKm * (occupants - 1);
    const perPerson = total / occupants;
    return {
        perPersonKg: Number(perPerson.toFixed(2)),
        totalKg: Number(total.toFixed(2)),
    };
}
