exports.decorateConfig = (config) => {

  const fs = require('fs');

  /**
   * Returns @fontface declaration if font exists else returns empty string.
   * @param  {object} single object argument with values for @fontface attributes
   * @return {string}
   */
  const createFontFace = ({ name, src, format, weight='normal', style='normal'}) => {
    try {
        fs.accessSync(src, fs.constants.R_OK);
    } catch (err) {
      if (config.debug) {
        console.warn(`hyper-sfmono: ${err}`);
      }
      return '';
    }

    return `@font-face {
        font-family: "${name}";
        src: url("file://${src}") format('${format}');
        font-weight: ${weight};
        font-style: ${style};
    }`;
  };

  return Object.assign({}, config, {
    termCSS: `
      ${config.termCSS || ''}
      ${[
          {
            name: 'SFMono-Light',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-Light.otf`,
            format: 'opentype'
          },
          {
            name: 'SFMono-Light',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-LightItalic.otf`,
            format: 'opentype',
            style: 'italic'
          },
          {
            name: 'SFMono-Regular',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-Regular.otf`,
            format: 'opentype'
          },
          {
            name: 'SFMono-Regular',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-RegularItalic.otf`,
            format: 'opentype',
            style: 'italic'
          },
          {
            name: 'SFMono-Medium',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-Medium.otf`,
            format: 'opentype'
          },
          {
            name: 'SFMono-Medium',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-MediumItalic.otf`,
            format: 'opentype',
            style: 'italic'
          },
          {
            name: 'SFMono-SemiBold',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-Semibold.otf`,
            format: 'opentype',
          },
          {
            name: 'SFMono-SemiBold',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-SemiboldItalic.otf`,
            format: 'opentype',
            style: 'italic'
          },
          {
            name: 'SFMono-Bold',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-Bold.otf`,
            format: 'opentype'
          },
          {
            name: 'SFMono-Bold',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-BoldItalic.otf`,
            format: 'opentype',
            style: 'italic'
          },
          {
            name: 'SFMono-Heavy',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-Heavy.otf`,
            format: 'opentype'
          },
          {
            name: 'SFMono-Heavy',
            src: `/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SFMono-HeavyItalic.otf`,
            format: 'opentype',
            style: 'italic'
          }
      ].map(createFontFace).join('\n')}
    `
  });
}