import { Component, computed, input } from '@angular/core';
import {
  Machine,
  MACHINE_STATUS_ICONS,
  MACHINE_STATUS_LABELS,
  MACHINE_TYPE_ICONS,
} from '../../models/machine.model';

export type MachineTileVariant = 'compact' | 'detailed';

@Component({
  selector: 'app-machine-tile',
  styleUrl: './machine-tile.scss',
  templateUrl: './machine-tile.html',
  host: {
    '[class]': 'hostClass()',
  },
})
export class MachineTile {
  readonly machine = input.required<Machine>();
  readonly variant = input<MachineTileVariant>('compact');

  protected readonly hostClass = computed(
    () => `status-${this.machine().status} variant-${this.variant()}`,
  );
  protected readonly statusIcon = computed(() => MACHINE_STATUS_ICONS[this.machine().status]);
  protected readonly statusLabel = computed(
    () => `Status: ${MACHINE_STATUS_LABELS[this.machine().status]}`,
  );
  protected readonly typeIcon = computed(() => MACHINE_TYPE_ICONS[this.machine().type]);
}
