import { exec } from 'child_process';

describe('pi.ts コマンドラインテスト', () => {
    test('正常系: 正の整数を引数に指定', (done) => {
        exec('node dist/pi.js 100000', (error, stdout, stderr) => {
            expect(error).toBeNull();
            expect(stderr).toBe('');
            // Expected output format: 推定された円周率(π)の値は: <number>
            const match = stdout.match(
                new RegExp(`推定された円周率\\(π\\)の値は: ([\\d.]+)`)
            );
            expect(match && match[1]).toBeTruthy();
            const pi = parseFloat(match![1]);
            expect(isNaN(pi)).toBeFalsy();
            expect(pi).toBeGreaterThan(2.0);
            expect(pi).toBeLessThan(4.0);

            // done() の前に出力
            console.log('推定された円周率(π)の値:', pi);

            done(); // これより後に console.log を置かない
        });
    });

    test('異常系: 引数なし', (done) => {
        exec('node dist/pi.js', (error, stdout, stderr) => {
            expect(error).not.toBeNull();
            expect(stderr).toContain('エラー: 試行回数が指定されていません。');
            done();
        });
    });

    test('異常系: 負の数を引数に指定', (done) => {
        exec('node dist/pi.js -100', (error, stdout, stderr) => {
            expect(error).not.toBeNull();
            expect(stderr).toContain('エラー: 試行回数には正の整数を指定してください。');
            done();
        });
    });

    test('異常系: 文字列を引数に指定', (done) => {
        exec('node dist/pi.js foobar', (error, stdout, stderr) => {
            expect(error).not.toBeNull();
            expect(stderr).toContain('エラー: 試行回数には正の整数を指定してください。');
            done();
        });
    });
});
