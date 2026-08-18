"use client";

import { useCallback, useState } from "react";
import type { MasterItem } from "@/types";
import {
  type DeleteMasterResult,
  type MasterKey,
  useMasterData,
} from "@/contexts/MasterDataContext";
import { useToast } from "@/contexts/ToastContext";

export interface DeleteDialogContent {
  title: string;
  message: string;
}

const DELETE_DIALOG: Record<
  MasterKey,
  (item: MasterItem) => DeleteDialogContent
> = {
  states: (item) => ({
    title: "Delete State?",
    message: `Deleting ${item.name} will also remove its related city master records.\n\nExisting user profiles will not be deleted.`,
  }),
  cities: (item) => ({
    title: "Delete City?",
    message: `Are you sure you want to delete "${item.name}"?\n\nThis action will remove the city from the admin master list.`,
  }),
  surnames: (item) => ({
    title: "Delete Surname?",
    message: `Are you sure you want to delete "${item.name}" from the surname master?\n\nExisting profiles will not be deleted.`,
  }),
  gotras: (item) => ({
    title: "Delete Gotra?",
    message: `Are you sure you want to delete "${item.name}" from the gotra master?\n\nExisting profiles will not be deleted.`,
  }),
  communities: (item) => ({
    title: "Delete Community?",
    message: `Are you sure you want to delete "${item.name}" from the community master?\n\nExisting profiles will not be deleted.`,
  }),
  education: (item) => ({
    title: "Delete Education?",
    message: `Are you sure you want to delete "${item.name}" from the education master?\n\nExisting profiles will not be deleted.`,
  }),
  degrees: (item) => ({
    title: "Delete Degree?",
    message: `Are you sure you want to delete "${item.name}" from the degree master?\n\nExisting profiles will not be deleted.`,
  }),
  occupations: (item) => ({
    title: "Delete Occupation?",
    message: `Are you sure you want to delete "${item.name}" from the occupation master?\n\nExisting profiles will not be deleted.`,
  }),
  jobTypes: (item) => ({
    title: "Delete Job Type?",
    message: `Are you sure you want to delete "${item.name}" from the job type master?\n\nExisting profiles will not be deleted.`,
  }),
  maritalStatuses: (item) => ({
    title: "Delete Marital Status?",
    message: `Are you sure you want to delete "${item.name}" from the marital status master?\n\nExisting profiles will not be deleted.`,
  }),
  motherTongues: (item) => ({
    title: "Delete Mother Tongue?",
    message: `Are you sure you want to delete "${item.name}" from the mother tongue master?\n\nExisting profiles will not be deleted.`,
  }),
};

function getSuccessMessage(
  key: MasterKey,
  result: DeleteMasterResult,
): string {
  if (key === "states") {
    const cityCount = result.cascadeDeleted.cities?.length ?? 0;
    if (cityCount > 0) {
      return "State and related cities deleted successfully.";
    }
    return "State deleted successfully.";
  }
  if (key === "cities") return "City deleted successfully.";
  if (key === "surnames") return "Surname deleted successfully.";
  return "Record deleted successfully.";
}

export function useMasterDelete(masterKey: MasterKey) {
  const { deleteItem } = useMasterData();
  const { showToast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<MasterItem | null>(null);

  const dialog = deleteTarget
    ? DELETE_DIALOG[masterKey](deleteTarget)
    : null;

  const requestDelete = useCallback((item: MasterItem) => {
    setDeleteTarget(item);
  }, []);

  const cancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    const result = deleteItem(masterKey, deleteTarget.id);
    if (result) {
      showToast(getSuccessMessage(masterKey, result));
    }
    setDeleteTarget(null);
  }, [deleteTarget, deleteItem, masterKey, showToast]);

  return {
    deleteTarget,
    dialog,
    requestDelete,
    cancelDelete,
    confirmDelete,
    isOpen: Boolean(deleteTarget),
  };
}
