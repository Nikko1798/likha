
export const fetchJson = async (filename: string) => {
    const response = await fetch(`/jsons/${filename}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}.json`);
    }
    return response.json();
  };
  
export const getRegionOptions = async () => {
    const regions = await fetchJson("regions");
    return regions.map((region: any) => ({
      value: region.code,
      name: region.name
    }));
  };

export const getProvinceOption = async (regionCode: string) => {
    const provinces = await fetchJson("provinces");
    return provinces
      .filter((province: any) => province.regionCode === regionCode)
      .map((province: any) => ({
        value: province.code,
        name: province.name
      }));
  };

// pass here either province or region, because some cities has no province tagging Ex. Cities in NCR brcause NCR region has no province

export const getCitiesOption = async (provinceCode: string) => {
    const cities = await fetchJson("cities");
    return cities
      .filter((city: any) => provinceCode ==="130000000" ? city.regionCode === provinceCode : city.provinceCode === provinceCode)
      .map((city: any) => ({
        value: city.code,
        name: city.name
      }));
  };

export const getBarangayOption = async (cityCode: string) => {
    const barangays = await fetchJson("barangay");
    return barangays
      .filter((barangay: any) => (barangay.cityCode === cityCode)||(barangay.municipalityCode===cityCode))
      .map((barangay: any) => ({
        value: barangay.code,
        name: barangay.name
      }));
  };