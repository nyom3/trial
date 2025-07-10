function calculatePi(targetPrecision: number = 0.9999): number {
    const tolerance = 1 - targetPrecision; // e.g. 0.0001 for 99.99%
    const targetError = Math.PI * tolerance;
    let estimate = 3;
    let sign = 1;
    let i = 2;
    while (Math.abs(estimate - Math.PI) > targetError) {
        const term = 4 / (i * (i + 1) * (i + 2));
        estimate += sign * term;
        sign *= -1;
        i += 2;
    }
    return estimate;
}

const piEstimate = calculatePi();
console.log(`精度99.99%で推定された円周率(π)の値は: ${piEstimate}`);
