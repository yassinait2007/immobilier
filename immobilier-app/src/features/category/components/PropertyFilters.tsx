import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/utils/formaters";
import type { Category, Etat } from "@/types/property";
import type { City } from "@/types/Address";

interface PropertyFiltersProps {
  categories: Category[];
  cities: City[];
  propertyStates: Etat[];
  selectedCategory: string;
  selectedCity: string;
  selectedState: string;
  checkinDate: Date | undefined;
  checkoutDate: Date | undefined;
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCheckinChange: (date: Date | undefined) => void;
  onCheckoutChange: (date: Date | undefined) => void;
  onApplyFilters: () => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  categories,
  cities,
  propertyStates,
  selectedCategory,
  selectedCity,
  selectedState,
  checkinDate,
  checkoutDate,
  onCategoryChange,
  onCityChange,
  onStateChange,
  onCheckinChange,
  onCheckoutChange,
  onApplyFilters,
}) => {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");

  const filteredCities = useMemo(() => {
    if (!locationSearch.trim()) return cities;
    return cities.filter(city => 
      city.name.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [cities, locationSearch]);

  const handleLocationOpenChange = (open: boolean) => {
    setLocationOpen(open);
    if (!open) {
      setLocationSearch("");
    }
  };

  return (
    <div className="bg-white md:border border-gray-300 md:p-2 mb-8 max-w-5xl mx-auto md:rounded-full rounded-2xl border-0 p-0">
      <div className="flex flex-col md:flex-row md:items-center md:divide-x md:divide-gray-300 divide-y md:divide-y-0 divide-gray-200">
        <div className="flex-1 min-w-0">
          <Popover open={locationOpen} onOpenChange={handleLocationOpenChange}>
            <PopoverTrigger asChild>
              <button className="w-full px-4 md:px-6 py-4 text-left hover:bg-gray-50 md:rounded-full rounded-t-2xl md:rounded-t-full transition-colors">
                <div className="text-xs font-semibold text-gray-900 mb-1">Où</div>
                <div className="text-sm text-gray-500 truncate">
                  {selectedCity !== "all"
                    ? cities.find(c => c.id.toString() === selectedCity)?.name
                    : "Rechercher des destinations"
                  }
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-0 bg-white rounded-xl border border-gray-200">
              <div className="p-4">
                <div className="mb-3">
                  <Input
                    placeholder="Rechercher une ville..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      onCityChange("all");
                      setLocationOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg transition-colors ${
                      selectedCity === "all" ? "bg-primary/10 text-primary font-bold" : "text-gray-700"
                    }`}
                  >
                    Toutes les villes
                  </button>
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onCityChange(city.id.toString());
                          setLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg transition-colors ${
                          selectedCity === city.id.toString() ? "bg-primary/10 text-primary font-bold" : "text-gray-700"
                        }`}
                      >
                        {city.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <p>Aucune ville trouvée</p>
                      <p className="text-sm mt-1">Essayez un autre terme de recherche</p>
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 min-w-0">
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <button className="w-full px-4 md:px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                <div className="text-xs font-semibold text-gray-900 mb-1">Arrivée</div>
                <div className="text-sm text-gray-500">
                  {checkinDate ? formatDate(checkinDate) : "Ajouter des dates"}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white rounded-xl border border-gray-200">
              <CalendarComponent
                mode="single"
                selected={checkinDate}
                onSelect={(date) => {
                  onCheckinChange(date);
                  setCheckInOpen(false);
                }}
                initialFocus
                disabled={(date) =>
                  date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 min-w-0">
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <button className="w-full px-4 md:px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                <div className="text-xs font-semibold text-gray-900 mb-1">Départ</div>
                <div className="text-sm text-gray-500">
                  {checkoutDate ? formatDate(checkoutDate) : "Ajouter des dates"}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white rounded-xl border border-gray-200">
              <CalendarComponent
                mode="single"
                selected={checkoutDate}
                onSelect={(date) => {
                  onCheckoutChange(date);
                  setCheckOutOpen(false);
                }}
                initialFocus
                disabled={(date) =>
                  checkinDate
                    ? date.setHours(0, 0, 0, 0) <= checkinDate.setHours(0, 0, 0, 0)
                    : date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 min-w-0">
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <button className="w-full px-4 md:px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                <div className="text-xs font-semibold text-gray-900 mb-1">Type</div>
                <div className="text-sm text-gray-500 truncate">
                  {selectedCategory !== "all"
                    ? categories.find(c => c.value === selectedCategory)?.name
                    : "Tous les types"
                  }
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-0 bg-white rounded-xl border border-gray-200">
              <div className="p-2">
                <div className="max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      onCategoryChange("all");
                      setCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg transition-colors ${
                      selectedCategory === "all" ? "bg-primary/10 text-primary font-bold" : "text-gray-700"
                    }`}
                  >
                    Toutes les catégories
                  </button>
                  {categories?.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        onCategoryChange(category.value);
                        setCategoryOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg transition-colors ${
                        selectedCategory === category.value ? "bg-primary/10 text-primary font-bold" : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 min-w-0">
          <Popover open={stateOpen} onOpenChange={setStateOpen}>
            <PopoverTrigger asChild>
              <button className="w-full px-4 md:px-6 py-4 text-left hover:bg-gray-50 transition-colors md:rounded-none rounded-b-2xl">
                <div className="text-xs font-semibold text-gray-900 mb-1">État</div>
                <div className="text-sm text-gray-500 truncate">
                  {selectedState !== "all"
                    ? propertyStates.find(s => s.value === selectedState)?.name
                    : "Tous les états"
                  }
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-0 bg-white rounded-xl border border-gray-200">
              <div className="p-2">
                <div className="max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      onStateChange("all");
                      setStateOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg transition-colors ${
                      selectedState === "all" ? "bg-primary/10 text-primary font-bold" : "text-gray-700"
                    }`}
                  >
                    Tous les états
                  </button>
                  {propertyStates?.map((state) => (
                    <button
                      key={state.value}
                      onClick={() => {
                        onStateChange(state.value);
                        setStateOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg transition-colors ${
                        selectedState === state.value ? "bg-primary/10 text-primary font-bold" : "text-gray-700"
                      }`}
                    >
                      {state.name}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:pl-2 p-4 md:p-0">
          <Button
            onClick={onApplyFilters}
            className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary shadow-lg shadow-primary/20 text-white md:p-6 p-4 md:rounded-full rounded-xl w-full md:w-auto flex items-center justify-center gap-2 transform transition-transform hover:scale-105 active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span className="md:hidden">Rechercher</span>
          </Button>
        </div>
      </div>
    </div>
  )
}