export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatPrix(prix: number, chargesIncluses = false) {
  return `${prix.toLocaleString('fr-FR')} €/mois${chargesIncluses ? ' CC' : ' HC'}`
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}
