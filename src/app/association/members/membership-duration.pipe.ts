import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'membershipDuration' })
export class MembershipDurationPipe implements PipeTransform {

  private readonly years = new Intl.NumberFormat('es', { style: 'unit', unit: 'year', unitDisplay: 'long' });
  private readonly months = new Intl.NumberFormat('es', { style: 'unit', unit: 'month', unitDisplay: 'long' });
  private readonly conjunction = new Intl.ListFormat('es', { type: 'conjunction' });

  public transform(totalMonths: number | null | undefined): string {
    if (totalMonths === undefined || totalMonths === null) {
      return '—';
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts: string[] = [];

    if (years > 0) {
      parts.push(this.years.format(years));
    }
    if (months > 0 || years === 0) {
      parts.push(this.months.format(months));
    }

    return this.conjunction.format(parts);
  }

}
