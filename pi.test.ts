import { exec } from 'child_process';

describe('pi.ts コマンドラインテスト', () => {
    test('精度99.99%で計算できること', (done) => {
        exec('node dist/pi.js', (error, stdout, stderr) => {
            expect(error).toBeNull();
            expect(stderr).toBe('');
            const match = stdout.match(/円周率\(π\)の値は: ([\d.]+)/);
            expect(match && match[1]).toBeTruthy();
            const pi = parseFloat(match![1]);
            const diff = Math.abs(pi - Math.PI) / Math.PI;
            expect(diff).toBeLessThanOrEqual(0.0001);
            done();
        });
    });
});
