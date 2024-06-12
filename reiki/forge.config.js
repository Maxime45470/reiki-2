module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'img/reiki',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        icon: './img/reiki.ico',
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: "Reiki",
        icon: './img/reiki.ico',
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        icon: './img/reiki.ico',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: './img/reiki.ico',
      }
    },
    
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './img/reiki.ico',
      } 
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
