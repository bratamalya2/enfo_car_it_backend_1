function calculatePrice(config, ride) {
    const { distance, rideTimeMins, waitingTimeMins, day } = ride;

    // Base Price
    const base = config.basePrices.find(bp => bp.days.includes(day));
    const baseKm = base?.upToKm || 0;
    const basePrice = base?.price || 0;

    const extraKm = Math.max(0, distance - baseKm);
    const dap = config.additionalPerKm * extraKm;

    // Time Factor
    let tmf = 1;
    for (const range of config.timeMultipliers) {
        const duration = rideTimeMins / 60;
        if (duration >= range.fromHour && duration < range.toHour) {
            tmf = range.multiplier;
            break;
        }
    }

    // Waiting Charges
    const waitMins = Math.max(0, waitingTimeMins - config.freeWaitingMins);
    const waitingCharges = Math.floor(waitMins / 3) * config.waitingChargePer3Min;

    return ((basePrice + dap) * tmf) + waitingCharges;
}

export { calculatePrice };
