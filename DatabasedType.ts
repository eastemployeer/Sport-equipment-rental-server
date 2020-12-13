/* eslint-disable camelcase */

// export enum Tables {
//   Klient = 'klient',
//   Naprawa = 'naprawa',
//   Pracownik = 'pracownik',
//   RodzajSprzetu = 'rodzaj_sprzetu',
//   Sprzet = 'sprzet',
//   UslugaSerwisowa = 'usluga_serwisowa',
//   WykonanaUslugaSerwisowa = 'wykonana_usluga_serwisowa',
//   Wypozyczenie = 'wypozyczenie',
//   WypozyczonySprzet = 'wypozyczony_sprzet',
// }

export const Tables = {
  Klient: 'klient',
  Naprawa: 'naprawa',
  Pracownik: 'pracownik',
  RodzajSprzetu: 'rodzaj_sprzetu',
  Sprzet: 'sprzet',
  UslugaSerwisowa: 'usluga_serwisowa',
  WykonanaUslugaSerwisowa: 'wykonana_usluga_serwisowa',
  Wypozyczenie: 'wypozyczenie',
  WypozyczonySprzet: 'wypozyczony_sprzet',
};

export interface Klient {
  id: number;
  imie: string;
  nazwisko: string;
  email: string;
  haslo: string;
  telefon: string;
}
export interface Naprawa {
  id: number;
  // eslint-disable-next-line camelcase
  sprzet_id: number;
  koszt: string;
  data: Date;
  opis: string;
  status: string;
}
export interface Pracownik {
  id: number;
  typ_konta: 'KIEROWNIK' | 'PRACOWNIK' | ' SERWISANT';
  imie: string;
  nazwisko: string;
  login: string;
  haslo: string;
  blokada: boolean;
}
export interface RodzajSprzetu {
  nazwa: string;
  rodzaj_sezonu: string;
}
export interface Sprzet {
  id: number;
  rodzaj_sprzetu: string;
  przeznaczenie: string;
  cecha_1_label: string;
  cecha_1_value: string;
  cecha_2_label: string;
  cecha_2_value: string;
  cecha_3_label: string;
  cecha_3_value: string;
  cecha_4_label: string;
  cecha_4_value: string;
  cena_wypozyczenia_dzien: number;
  blokada: 'dostepny' | 'zablokowano przez serwisanta' | 'wypozyczony';
  rocznik: string;
  wartosc_sprzetu: number;
}
export interface UslugaSerwisowa {
  id: number;
  nazwa: string;
  szacowany_czas_wykonania: number;
  cena: number;
  usuniete: boolean;
}
export interface WykonanaUslugaSerwisowa {
  id: number;
  klient_id: number;
  usluga_serwisowa_id: number;
  nazwa_sprzetu: string;
  opis: string;
  data_wykonania: string;
  status: 'Zakończony' | 'W trakcie' | 'Zakończony (sprzęt nie odebrany)';
}
export interface Wypozyczenie {
  id: number;
  klient_id: number;
  poczatek: Date;
  koniec: Date;
  koszt: number;
  naliczona_kaucja: number;
  status: 'Zakończony' | 'Zakończony (sprzet nie oddany)' | 'W trakcie wypożyczenia' | 'Rezerwacja' | 'Rezerwacja (nowa)';
}
export interface WypozyczonySprzet {
  id: number;
  sprzet_id: number;
  wypozyczenie_id: number;
  kara: number;
  opis_kary: string;
}
