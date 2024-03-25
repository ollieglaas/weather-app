// converts country codes to their respective names (eg SE => Sweden)
import countries from "i18n-iso-countries";

function getCountryName(code: string) {
  try {
    return countries.getName(code, "en");
  } catch (error) {
    console.log("Error getting country name: ", error);
    return null;
  }
}

export default getCountryName;
