import { useState } from "react";
import { z } from "zod";

const provinceSchema = z.object({
  code: z.string(),
  name: z.string(),
});

const cityMunicipalitySchema = z.object({
  code: z.string(),
  name: z.string(),
});

const barangaySchema = z.object({
  code: z.string(),
  name: z.string(),
});

export default function useFetchAddresses() {
  const [provinces, setProvinces] = useState<
    z.infer<typeof provinceSchema>[] | []
  >([]);
  const [municipalities, setMunicipalities] = useState<
    z.infer<typeof cityMunicipalitySchema>[] | []
  >();
  const [barangays, setBarangays] =
    useState<z.infer<typeof barangaySchema>[]>();

  const [pronvinceLoading, setProvinceLoading] = useState(false);
  const [municipalityLoading, setMunicipalityLoading] = useState(false);
  const [brgyLoading, setBrgyLoading] = useState(false);

  const fetchProvinces = async () => {
    setProvinceLoading(true);

    const provinces = await fetch("https://psgc.gitlab.io/api/provinces");

    provinces
      .json()
      .then((res) => {
        const validatedResult = z.array(provinceSchema).safeParse(res);

        if (validatedResult.success) {
          const sortedProvinces = validatedResult.data.sort((a, b) =>
            a.name.localeCompare(b.name),
          );

          setProvinces(sortedProvinces);
        }
      })
      .catch((err) => setProvinces([]))
      .finally(() => setProvinceLoading(false));
  };

  const fetchMunicipalities = async (provinceCode: string) => {
    setMunicipalityLoading(true);
    setBarangays([]);
    const municipalities = await fetch(
      `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities`,
    );

    municipalities
      .json()
      .then((res) => {
        console.log(res);
        const validatedResult = z.array(cityMunicipalitySchema).safeParse(res);

        console.log(validatedResult.data);
        if (validatedResult.success) {
          const sortedMunicipalities = validatedResult.data.sort((a, b) =>
            a.name.localeCompare(b.name),
          );

          setMunicipalities(sortedMunicipalities);
          console.log(sortedMunicipalities);
        } else {
          console.log("not success");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setMunicipalityLoading(false));
  };

  const fetchBarangays = async (municipalityCode: string) => {
    setBrgyLoading(true);
    const barangays = await fetch(
      `https://psgc.gitlab.io/api/cities-municipalities/${municipalityCode}/barangays`,
    );

    barangays
      .json()
      .then((res) => {
        const validatedResult = z.array(barangaySchema).safeParse(res);

        if (validatedResult.success) {
          const sortedBarangays = validatedResult.data.sort((a, b) =>
            a.name.localeCompare(b.name),
          );

          setBarangays(sortedBarangays);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setBrgyLoading(false));
  };

  return {
    provinces,
    pronvinceLoading,
    municipalities,
    municipalityLoading,
    barangays,
    brgyLoading,
    fetchProvinces,
    fetchMunicipalities,
    fetchBarangays,
  };
}
