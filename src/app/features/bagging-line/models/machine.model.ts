export const MACHINE_STATUSES = ['running', 'alarm', 'warning'] as const;
export type MachineStatus = (typeof MACHINE_STATUSES)[number];

export const MACHINE_TYPES = ['scale', 'bagAttach', 'packer', 'bagCloser'] as const;
export type MachineType = (typeof MACHINE_TYPES)[number];

export interface Machine {
  id: string;
  type: MachineType;
  name: string;
  status: MachineStatus;
}

export const MACHINE_STATUS_LABELS: Record<MachineStatus, string> = {
  running: 'Running',
  alarm: 'Alarm',
  warning: 'Warning',
};

export type MachineStatusIcon = 'restart_alt' | 'error' | 'warning';

export const MACHINE_STATUS_ICONS: Record<MachineStatus, MachineStatusIcon> = {
  running: 'restart_alt',
  alarm: 'error',
  warning: 'warning',
};

export type MachineTypeIcon = 'move_to_inbox' | 'chrome_reader_mode' | 'call_to_action' | 'grid_on';

export const MACHINE_TYPE_ICONS: Record<MachineType, MachineTypeIcon> = {
  scale: 'move_to_inbox',
  bagAttach: 'chrome_reader_mode',
  packer: 'call_to_action',
  bagCloser: 'grid_on',
};
