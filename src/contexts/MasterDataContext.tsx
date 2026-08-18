"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MasterItem } from "@/types";
import {
  masterCities,
  masterCommunities,
  masterDegrees,
  masterEducation,
  masterGotras,
  masterJobTypes,
  masterMaritalStatuses,
  masterMotherTongues,
  masterOccupations,
  masterStates,
  masterSurnames,
} from "@/data/masters";

export type MasterKey =
  | "states"
  | "cities"
  | "surnames"
  | "gotras"
  | "communities"
  | "education"
  | "degrees"
  | "occupations"
  | "jobTypes"
  | "maritalStatuses"
  | "motherTongues";

export type MasterDataStore = Record<MasterKey, MasterItem[]>;

const STORAGE_KEY = "admin-master-data";

const INITIAL_MASTERS: MasterDataStore = {
  states: structuredClone(masterStates),
  cities: structuredClone(masterCities),
  surnames: structuredClone(masterSurnames),
  gotras: structuredClone(masterGotras),
  communities: structuredClone(masterCommunities),
  education: structuredClone(masterEducation),
  degrees: structuredClone(masterDegrees),
  occupations: structuredClone(masterOccupations),
  jobTypes: structuredClone(masterJobTypes),
  maritalStatuses: structuredClone(masterMaritalStatuses),
  motherTongues: structuredClone(masterMotherTongues),
};

export interface DeleteMasterResult {
  deleted: MasterItem;
  cascadeDeleted: Partial<Record<MasterKey, MasterItem[]>>;
}

interface MasterDataContextValue {
  masters: MasterDataStore;
  getItems: (key: MasterKey) => MasterItem[];
  setItems: (key: MasterKey, items: MasterItem[]) => void;
  addItem: (key: MasterKey, item: Omit<MasterItem, "id">) => MasterItem;
  updateItem: (key: MasterKey, id: number, patch: Partial<MasterItem>) => void;
  deleteItem: (key: MasterKey, id: number) => DeleteMasterResult | null;
  resetMasters: () => void;
}

const MasterDataContext = createContext<MasterDataContextValue | null>(null);

function loadStoredMasters(): MasterDataStore | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MasterDataStore;
    const keys = Object.keys(INITIAL_MASTERS) as MasterKey[];
    if (!keys.every((key) => Array.isArray(parsed[key]))) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function MasterDataProvider({ children }: { children: React.ReactNode }) {
  const [masters, setMasters] = useState<MasterDataStore>(INITIAL_MASTERS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStoredMasters();
    if (stored) setMasters(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(masters));
  }, [masters, hydrated]);

  const getItems = useCallback(
    (key: MasterKey) => masters[key],
    [masters],
  );

  const setItems = useCallback((key: MasterKey, items: MasterItem[]) => {
    setMasters((prev) => ({ ...prev, [key]: items }));
  }, []);

  const addItem = useCallback(
    (key: MasterKey, item: Omit<MasterItem, "id">) => {
      let created!: MasterItem;
      setMasters((prev) => {
        const nextId = Math.max(0, ...prev[key].map((i) => i.id)) + 1;
        created = { ...item, id: nextId };
        return { ...prev, [key]: [created, ...prev[key]] };
      });
      return created;
    },
    [],
  );

  const updateItem = useCallback(
    (key: MasterKey, id: number, patch: Partial<MasterItem>) => {
      setMasters((prev) => ({
        ...prev,
        [key]: prev[key].map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }));
    },
    [],
  );

  const deleteItem = useCallback(
    (key: MasterKey, id: number): DeleteMasterResult | null => {
      let result: DeleteMasterResult | null = null;

      setMasters((prev) => {
        const target = prev[key].find((item) => item.id === id);
        if (!target) return prev;

        const cascadeDeleted: Partial<Record<MasterKey, MasterItem[]>> = {};
        const next = {
          ...prev,
          [key]: prev[key].filter((item) => item.id !== id),
        };

        if (key === "states") {
          const removedCities = prev.cities.filter(
            (city) => city.meta === target.name,
          );
          if (removedCities.length > 0) {
            cascadeDeleted.cities = removedCities;
            next.cities = prev.cities.filter((city) => city.meta !== target.name);
          }
        }

        result = { deleted: target, cascadeDeleted };
        return next;
      });

      return result;
    },
    [],
  );

  const resetMasters = useCallback(() => {
    setMasters(structuredClone(INITIAL_MASTERS));
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      masters,
      getItems,
      setItems,
      addItem,
      updateItem,
      deleteItem,
      resetMasters,
    }),
    [masters, getItems, setItems, addItem, updateItem, deleteItem, resetMasters],
  );

  return (
    <MasterDataContext.Provider value={value}>
      {children}
    </MasterDataContext.Provider>
  );
}

export function useMasterData() {
  const ctx = useContext(MasterDataContext);
  if (!ctx) {
    throw new Error("useMasterData must be used within MasterDataProvider");
  }
  return ctx;
}
