# Interactive Thermostat - Live Wallpaper

This is an interactive thermostat interface that can be used as a live desktop wallpaper on Windows.

## Features

- 6 different weather scenes (Sun, Sunset, Moon/Night, Clouds, Storm, Snow)
- Animated weather effects (clouds, lightning, snowfall, stars)
- Temperature display with Celsius/Fahrenheit toggle
- Interactive controls - click the center dial to cycle through weather conditions
- Beautiful 3D-styled interface with realistic shadows and lighting

## Installation Instructions

### Using Lively Wallpaper (Recommended - FREE)

1. **Download Lively Wallpaper**

   - Visit: https://www.rocksdanister.com/lively/
   - Or install from Microsoft Store: https://apps.microsoft.com/store/detail/lively-wallpaper/9NTM2QC6QWS7
   - Or download from GitHub: https://github.com/rocksdanister/lively/releases
2. **Install Lively Wallpaper**

   - Run the installer and follow the setup wizard
3. **Add Your Wallpaper**

   - Open Lively Wallpaper
   - Click the **"+"** button (Add Wallpaper)
   - Select **"Choose File"**
   - Navigate to this folder: `d:\REPO\html_project\tempostat`
   - Select the `index.html` file
   - Click **"OK"**
4. **Set as Wallpaper**

   - The wallpaper will appear in your Lively library
   - Click on it to preview
   - Click **"Set as Wallpaper"** to apply it to your desktop
5. **Customize Settings** (Optional)

   - Right-click on your desktop
   - Select "Lively Wallpaper" → "Settings"
   - Adjust performance settings if needed

### Alternative: Wallpaper Engine (Paid - $3.99 USD)

If you prefer Wallpaper Engine (available on Steam):

1. **Purchase and Install Wallpaper Engine** from Steam
2. **Create Wallpaper**:
   - Open Wallpaper Engine
   - Click "Create Wallpaper"
   - Select "Web" type
   - Browse to `d:\REPO\html_project\tempostat\index.html`
   - Configure settings and save

## Usage

Once set as your wallpaper:

- **Click the center rotating dial** to cycle through 6 weather conditions
- **Temperature toggles** (C°/F°) are visible on the interface
- The wallpaper is fully interactive even as a desktop background!

## Performance Notes

- The wallpaper uses CSS animations and is optimized for performance
- If you experience lag, you can:
  - Lower the frame rate in Lively settings
  - Pause the wallpaper when running intensive applications
  - Use the "Pause on Fullscreen App" option in Lively

## Troubleshooting

**Wallpaper not interactive:**

- Make sure "Mouse Input" is enabled in Lively settings

**Performance issues:**

- Try lowering the quality settings in Lively
- Enable "Pause on Battery" if using a laptop

**Wallpaper not loading:**

- Ensure all files (index.html, script.js, style.css) are in the same folder
- Check that no antivirus is blocking the files

## Files Required

All these files must be in the same folder:

- `index.html` - Main HTML file
- `script.js` - JavaScript for interactions
- `style.css` - Styling and animations
- `LivelyProperties.json` - Lively Wallpaper configuration (auto-created)

Enjoy your interactive desktop wallpaper! 🌤️❄️⚡

## Credits and Contributions

@ Itz2ezybro 

### Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Animations, styling, and visual effects
- **JavaScript** - Interactive functionality and weather cycling
- **Lively Wallpaper** - Desktop wallpaper integration platform

### Special Thanks

- **Lively Wallpaper** by [rocksdanister](https://github.com/rocksdanister) - For providing an excellent free platform for live wallpapers
- The open-source community for inspiration and resources

## Contributing

Contributions are welcome! If you'd like to improve this project:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Add new weather effects
   - Improve animations
   - Optimize performance
   - Fix bugs
4. **Test thoroughly** - Ensure the wallpaper works in Lively Wallpaper
5. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with a clear description of your changes

### Ideas for Contributions

- Add more weather conditions (rain, fog, aurora, etc.)
- Implement time-based automatic weather changes
- Add sound effects (optional toggle)
- Create customization options via Lively properties
- Improve mobile/tablet responsiveness
- Add seasonal themes
- Optimize animations for better performance

### Reporting Issues

Found a bug or have a suggestion? Please open an issue on the repository with:

- A clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Your system specifications
- Screenshots if applicable

## License

This project is open source and available for personal and educational use. Feel free to modify and share!

---

**Made with ❤️ for the desktop customization community**
