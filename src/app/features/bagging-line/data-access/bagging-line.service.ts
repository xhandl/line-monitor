import { httpResource } from '@angular/common/http';
import { computed, inject, Service } from '@angular/core';
import { LoggerService } from '@core/logging/logger.service';
import { Machine, MACHINE_STATUSES, MACHINE_TYPES } from '../models/machine.model';

export const MACHINES_URL = 'data/bagging-line.json';

function isOneOf<T>(values: readonly T[], value: unknown): value is T {
  return values.includes(value as T);
}

function isMachine(value: unknown): value is Machine {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const { id, type, name, status } = value as Record<string, unknown>;
  return (
    typeof id === 'string' &&
    typeof name === 'string' &&
    isOneOf(MACHINE_TYPES, type) &&
    isOneOf(MACHINE_STATUSES, status)
  );
}

@Service({ autoProvided: false })
export class BaggingLineService {
  private readonly logger = inject(LoggerService);

  private readonly machinesResource = httpResource(() => MACHINES_URL, {
    parse: (raw) => this.parseMachines(raw),
  });

  readonly machines = computed<Machine[]>(() =>
    this.machinesResource.hasValue() ? this.machinesResource.value() : [],
  );
  readonly loading = this.machinesResource.isLoading;
  readonly error = computed(() =>
    this.machinesResource.error() ? 'Machine data could not be loaded.' : null,
  );

  reload(): void {
    this.machinesResource.reload();
  }

  private parseMachines(raw: unknown): Machine[] {
    if (!Array.isArray(raw) || !raw.every(isMachine)) {
      const invalid = Array.isArray(raw) ? raw.filter((item) => !isMachine(item)) : raw;
      this.logger.error(`Invalid machine data received from ${MACHINES_URL}`, invalid);
      throw new Error('Unexpected machine data received from the server.');
    }
    return raw;
  }
}
