
const agreements = [
  {
    id: 1,
    label: 'Regulamin',
    is_required: true,
    description: 'Akceptuję regulamin serwisu oraz zasady świadczenia usług.',
  },
  {
    id: 2,
    label: 'Polityka prywatności',
    is_required: true,
    description: 'Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności.',
  },
  {
    id: 3,
    label: 'Zgoda marketingowa',
    is_required: false,
    description: 'Wyrażam zgodę na kontakt marketingowy w celu przesyłania ofert i promocji.',
  },
  {
    id: 4,
    label: 'E-mail do faktury',
    is_required: false,
    description: 'Proszę wysyłać faktury na wskazany adres e-mail. Zaznaczenie tej opcji aktywuje pole do wpisania adresu e-mail do faktury.',
  },
];

export default agreements;
