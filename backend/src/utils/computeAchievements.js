export function computeAchievements(user) {
    if (!user || !user.ecoStats) return [];

    const { ecoStats } = user;

    const thresholds = [
        {
            name: "Eco Starter",
            description: "Completed your first ride",
            key: "totalRides",
            target: 1,
        },
        {
            name: "Tree Saver",
            description: "Saved 100kg of CO₂",
            key: "co2SavedKg",
            target: 100,
        },
        {
            name: "Planet Hero",
            description: "Saved 250kg of CO₂",
            key: "co2SavedKg",
            target: 250,
        },
        {
            name: "Eco Champion",
            description: "Saved 500kg of CO₂",
            key: "co2SavedKg",
            target: 500,
        },
    ];

    return thresholds.map((t) => {
        const current = ecoStats[t.key] || 0;
        const unlocked = current >= t.target;

        const stored = (user.achievements || []).find((a) => a.name === t.name);

        return {
            name: t.name,
            description: t.description,
            unlocked,
            unlockedAt: stored?.unlockedAt ?? (unlocked ? new Date() : null),
            progress: Math.min((current / t.target) * 100, 100),
            current,
            target: t.target,
        };
    });
}
