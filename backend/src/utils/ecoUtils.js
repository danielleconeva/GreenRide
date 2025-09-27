export const EF_KG_PER_KM = 0.15;
export const AVG_SPEED_KMH = 70;

export function approxDistanceFromDuration(durationMin) {
    return durationMin > 0 ? (durationMin / 60) * AVG_SPEED_KMH : 0;
}

export function savedCo2PerPassenger(distanceKm) {
    return distanceKm > 0 ? distanceKm * EF_KG_PER_KM : 0;
}
