/**
 * Nilakantha級数を使用して円周率 (π) の近似値を計算します。
 * @param targetPrecision - 目標とする計算精度。デフォルトは 0.9999 (99.99%) です。
 * @returns 円周率 (π) の推定値。
 */
function calculatePi(targetPrecision: number = 0.9999): number {
    // 許容誤差を計算します (例: 99.99%の精度の場合、0.0001)。
    const tolerance = 1 - targetPrecision;
    // Math.PI に基づいて目標誤差を計算します。
    const targetError = Math.PI * tolerance;

    // Nilakantha級数の最初の項で推定値を初期化します。
    let estimate = 3;
    // 項の符号を追跡します (+ または -)。
    let sign = 1;
    // 級数の分母の計算を開始する数。
    let i = 2;

    // 推定値と実際のπの差が目標誤差より大きい間、ループを続けます。
    while (Math.abs(estimate - Math.PI) > targetError) {
        // 級数の次の項を計算します。
        const term = 4 / (i * (i + 1) * (i + 2));
        // 現在の推定値に項を加算または減算します。
        estimate += sign * term;
        // 次の項のために符号を反転させます。
        sign *= -1;
        // 次の項の分母の計算に進みます。
        i += 2;
    }

    // 計算された推定値を返します。
    return estimate;
}

// 円周率を計算します。
const piEstimate = calculatePi();
// 結果をコンソールに出力します。
console.log(`精度99.99%で推定された円周率(π)の値は: ${piEstimate}`);