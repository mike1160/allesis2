/** Black Friday-actie: gratis website bij overstap naar hosting (€20 p/m, min. 1 jaar). */
export const BLACK_FRIDAY_EINDE = new Date("2026-12-31T23:59:59+01:00").getTime();

export function blackFridayActief(nu = Date.now()): boolean {
  return nu <= BLACK_FRIDAY_EINDE;
}
