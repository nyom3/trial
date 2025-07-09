// コマンドライン引数から試行回数を取得します。
// process.argv[0] は 'ts-node', process.argv[1] はスクリプト名です。
const numIterationsStr = process.argv[2];

// 引数が渡されなかった場合のバリデーション
if (!numIterationsStr) {
    console.error("エラー: 試行回数が指定されていません。");
    console.error("使い方: ts-node pi.ts <試行回数>");
    process.exit(1);
}

const numIterations = parseInt(numIterationsStr, 10);

// 入力が正の整数であるかを検証します。
if (isNaN(numIterations) || numIterations <= 0) {
    console.error("エラー: 試行回数には正の整数を指定してください。");
    console.error("使い方: ts-node pi.ts <試行回数>");
    process.exit(1);
}

// 円の内側に入った点の数を数えるカウンターを初期化します。
let pointsInsideCircle = 0;

// このループは、正方形の的にダーツを投げるシミュレーションです。
// 的は x=0 から 1、y=0 から 1 の範囲に広がっています。
// この正方形には半径1の円の4分の1が内接しています。
for (let i = 0; i < numIterations; i++) {
    // 正方形内にランダムな点 (x, y) を生成します。
    // Math.random() は 0 (含む) から 1 (含まない) までの値を返します。
    const x = Math.random();
    const y = Math.random();

    // 原点 (0,0) からの距離を計算します。
    // 円の方程式は x^2 + y^2 = r^2 です。
    // 半径 (r) は 1 なので、x^2 + y^2 が 1 以下であるかを確認します。
    const distanceSquared = x * x + y * y;

    // 点の原点からの距離が1以下の場合、その点は円の内部にあると判断します。
    if (distanceSquared <= 1) {
        pointsInsideCircle++;
    }
}

// 円の面積と正方形の面積の比は π/4 です。
// (円の面積 = π * r^2)
// (正方形の面積 = 1 * 1 = 1)
// このシミュレーションでは第1象限のみを扱うため、円の面積は π/4 となります。
// したがって、π ≈ 4 * (円の内側の点の数 / 総試行回数) となります。
const piEstimate = 4 * (pointsInsideCircle / numIterations);

// 最終的に推定された円周率の値を出力します。
console.log(`${numIterations}回の試行の結果、推定された円周率(π)の値は: ${piEstimate}`);

// --- 実行コマンドの例 ---
// このプログラムを実行するには、pi.ts として保存し、ターミナルで以下のコマンドを実行してください:
// ts-node pi.ts 1000000