const fs = require('fs');
const {join} = require('path');
const glob = require('glob');
const {execSync} = require('child_process');

const coveragePath = join(__dirname, '..', '.nyc_output', 'coverage');

if (!fs.existsSync(coveragePath)) {
    fs.mkdirSync(coveragePath, {recursive: true});
}

const coverageReports = glob('./{libs,apps}/*/coverage/coverage-final.json', {sync: true});

for (const report of coverageReports) {
    const reportName = report.split('/')[2]; // {libs,apps}
    fs.copyFileSync(report, join(coveragePath, reportName + '.json'));
}

execSync('pnpm nyc merge .nyc_output/coverage');

fs.renameSync('coverage.json', join(__dirname, '..', '.nyc_output' ,'out.json'));

execSync('pnpm nyc report --reporter=lcov');
