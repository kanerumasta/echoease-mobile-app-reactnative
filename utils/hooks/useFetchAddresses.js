import { useState, useEffect } from 'react';

const useFetchAddresses = () => {
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const [provinceLoading, setProvinceLoading] = useState(false);
  const [municipalityLoading, setMunicipalityLoading] = useState(false);
  const [brgyLoading, setBrgyLoading] = useState(false);

  const fetchProvinces = async () => {
    setProvinceLoading(true);
    try {
      const response = await fetch('https://psgc.gitlab.io/api/provinces');
      const data = await response.json();
      if (Array.isArray(data)) {
        const sortedProvinces = data.sort((a, b) => a.name.localeCompare(b.name));
        setProvinces(sortedProvinces);
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
      setProvinces([]);
    } finally {
      setProvinceLoading(false);
    }
  };

  const fetchMunicipalities = async (provinceCode) => {
    setMunicipalityLoading(true);
    setBarangays([]);
    try {
      const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const sortedMunicipalities = data.sort((a, b) => a.name.localeCompare(b.name));
        setMunicipalities(sortedMunicipalities);
      }
    } catch (error) {
      console.error('Error fetching municipalities:', error);
    } finally {
      setMunicipalityLoading(false);
    }
  };

  const fetchBarangays = async (municipalityCode) => {
    setBrgyLoading(true);
    try {
      const response = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${municipalityCode}/barangays`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const sortedBarangays = data.sort((a, b) => a.name.localeCompare(b.name));
        setBarangays(sortedBarangays);
      }
    } catch (error) {
      console.error('Error fetching barangays:', error);
    } finally {
      setBrgyLoading(false);
    }
  };

  return {
    provinces,
    provinceLoading,
    municipalities,
    municipalityLoading,
    barangays,
    brgyLoading,
    fetchProvinces,
    fetchMunicipalities,
    fetchBarangays,
  };
};

export default useFetchAddresses;