import React, { useState } from "react";
import Select from "react-select";
import "./DropdownList.css"; // File CSS untuk styling

const DropdownList = () => {
  const [selectedProvince, setSelectedProvince] = useState(null); // State untuk menyimpan provinsi yang dipilih

  // Daftar provinsi Indonesia
  const provinces = [
    { value: "Aceh", label: "Aceh" },
    { value: "Bali", label: "Bali" },
    { value: "Bangka Belitung", label: "Bangka Belitung" },
    { value: "Banten", label: "Banten" },
    { value: "Bengkulu", label: "Bengkulu" },
    { value: "DI Yogyakarta", label: "DI Yogyakarta" },
    { value: "DKI Jakarta", label: "DKI Jakarta" },
    { value: "Gorontalo", label: "Gorontalo" },
    { value: "Jambi", label: "Jambi" },
    { value: "Jawa Barat", label: "Jawa Barat" },
    { value: "Jawa Tengah", label: "Jawa Tengah" },
    { value: "Jawa Timur", label: "Jawa Timur" },
    { value: "Kalimantan Barat", label: "Kalimantan Barat" },
    { value: "Kalimantan Selatan", label: "Kalimantan Selatan" },
    { value: "Kalimantan Tengah", label: "Kalimantan Tengah" },
    { value: "Kalimantan Timur", label: "Kalimantan Timur" },
    { value: "Kalimantan Utara", label: "Kalimantan Utara" },
    { value: "Kepulauan Bangka Belitung", label: "Kepulauan Bangka Belitung" },
    { value: "Kepulauan Riau", label: "Kepulauan Riau" },
    { value: "Lampung", label: "Lampung" },
    { value: "Maluku", label: "Maluku" },
    { value: "Maluku Utara", label: "Maluku Utara" },
    { value: "Nusa Tenggara Barat", label: "Nusa Tenggara Barat" },
    { value: "Nusa Tenggara Timur", label: "Nusa Tenggara Timur" },
    { value: "Papua", label: "Papua" },
    { value: "Papua Barat", label: "Papua Barat" },
    { value: "Riau", label: "Riau" },
    { value: "Sulawesi Barat", label: "Sulawesi Barat" },
    { value: "Sulawesi Selatan", label: "Sulawesi Selatan" },
    { value: "Sulawesi Tengah", label: "Sulawesi Tengah" },
    { value: "Sulawesi Tenggara", label: "Sulawesi Tenggara" },
    { value: "Sulawesi Utara", label: "Sulawesi Utara" },
    { value: "Sumatera Barat", label: "Sumatera Barat" },
    { value: "Sumatera Selatan", label: "Sumatera Selatan" },
    { value: "Sumatera Utara", label: "Sumatera Utara" },
  ];

  // Mengubah state saat memilih provinsi
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
  };

  return (
    <div className="dropdown-container">
      <Select className="dropdown-city" placeholder=" -- Daerah Kejadian --" value={selectedProvince} options={provinces} onChange={handleProvinceChange} isSearchable />
      {selectedProvince && <p>Anda memilih: {selectedProvince.label}</p>}
    </div>
  );
};

export default DropdownList;
