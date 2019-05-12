const chalk = require('chalk');

const formatData = (data, filterMode, patterns) => {
    let i;
    let match;
    let matchColor = '';
    let matchBkg = '';

    for(i=0;i<patterns.length && !matchColor;i++) {
        const highlight = patterns[i];
        if(highlight.re === true) {
            const re = new RegExp(highlight.pattern);
            match = data.match(re);
        } else {
            match = data.indexOf(highlight.pattern) >= 0;
        }
        if(match) {
            // console.log(highlight.pattern, match);
            matchColor = highlight.color;
            matchBkg = highlight.bkg;
        }
    }

    let fg = chalk.white;
    let format;
    if(matchColor) {
        fg = chalk[matchColor];
    }
    if(matchBkg) {
        format = fg[matchBkg];
    } else {
        format = fg;
    }

    if(filterMode && !match) {
        return undefined;
    }

    return format(data);
}

module.exports=formatData;
