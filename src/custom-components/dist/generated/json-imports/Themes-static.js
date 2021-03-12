import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import sap_fiori_3_dark from "../assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import sap_fiori_3_hcb from "../assets/themes/sap_fiori_3_hcb/parameters-bundle.css.json";

const themeUrlsByName = {
sap_fiori_3_dark,
sap_fiori_3_hcb
};
const isInlined = obj => typeof (obj) === "object";

const loadThemeProperties = async (themeName) => {
	if (typeof themeUrlsByName[themeName] === "object") {
		// inlined from build
		throw new Error("[themes] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs");
	}
	return (await fetch(themeUrlsByName[themeName])).json();
}

["sap_fiori_3_dark", "sap_fiori_3_hcb"]
  .forEach(themeName => registerThemePropertiesLoader("custom-components", themeName, loadThemeProperties));
