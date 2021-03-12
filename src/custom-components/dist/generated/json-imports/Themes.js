import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

const loadThemeProperties = async (themeName) => {
	switch (themeName) {
		case "sap_fiori_3": return (await import("../assets/themes/sap_fiori_3/parameters-bundle.css.json")).default;
		case "sap_fiori_3_dark": return (await import("../assets/themes/sap_fiori_3_dark/parameters-bundle.css.json")).default;
		case "sap_fiori_3_hcb": return (await import("../assets/themes/sap_fiori_3_hcb/parameters-bundle.css.json")).default;
		default: throw "unknown theme"
	}
}

const loadAndCheck = async (themeName) => {
	const data = await loadThemeProperties(themeName);
	if (typeof data === "string" && data.endsWith(".json")) {
		throw new Error(`[themes] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use 'import ".../Assets-static.js"'. Check the "Assets" documentation for more information.`);
	}
	return data;
}

["sap_fiori_3", "sap_fiori_3_dark", "sap_fiori_3_hcb"]
  .forEach(themeName => registerThemePropertiesLoader("custom-components", themeName, loadAndCheck));
