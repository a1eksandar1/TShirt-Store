# ProdavnicaMajica


- [Kratak pregled](#kratak-pregled)
  * [Osnovne funkcionalnosti](#osnovne-funkcionalnosti)
  * [Dodatne funkcionalnosti](#dodatne-funkcionalnosti)
- [Programski jezici i tehnologije](#programski-jezici-i-tehnologije)
- [Instrukcije za koriscenje](#instrukcije-za-koriscenje)
- [Demo](#demo)
- [Dokumentacija](#dokumentacija)
  * [Default parametri](#default-parametri)
  * [Opisi dokumenata iz baze](#opisi-dokumenata-iz-baze)
- [Developers](#developers)


## Kratak pregled

ProdavnicaMajica je sajt za prodaju majica sa custom printovima.

### Osnovne funkcionalnosti

- pravljenje account-a (sign up)
- logovanje
- pregled store-a
- pregled lokacija radnji
- kupovina majice
- search
- sortiranje majica po ceni
- sortiranje majica po nazivu

### Dodatne funkcionalnosti

- dizajniranje majice
- izbor da li ce napravljen dizajn, odnosno majica biti dostupna drugima za narucivanje
- sortiranje majica po broju pregleda
- sortiranje majica po oceni
- dodavanje komentara
- davanje ocene majici
- dodavanje majice u wishlistu

## Programski jezici i tehnologije

Ovaj projekat je implementiran koriscenjem *Node.js* za backend i *Angular* za frontend. Za bazu podataka, koriscena je *MongoDB* (cloud resenje, odnosno *MongoDB Atlas*). Neke od dodatnih biblioteka, paketa i api-ja koriscenih za projekat su:
- *[multer](https://www.npmjs.com/package/multer)*
- *[bcrypt](https://www.npmjs.com/package/bcrypt)*
- *[express](https://www.npmjs.com/package/express)*
- *[mongoose](https://mongoosejs.com/)*
- *[bootstrap](https://getbootstrap.com/)*
- *[google maps](https://developers.google.com/maps)*
- *[nodemailer](https://nodemailer.com/about/)*

Nesto vise o samom pokretanju mozete procitati u narednom odeljku.

## Instrukcije za koriscenje 

1\. Klonirajte repozitorijum

```
git clone https://gitlab.com/matfpveb/projekti/2020-2021/21-ProdavnicaMajica.git
```

2\. Pokretanje

Treba da pokrenete *backend* i *frontend*

2.1. Backend

- Pozicionirajte se u *21-ProdavnicaMajica/backend/*
- pokrenite komandu **npm install**
- pokrenite komandu **npm start**

2.2. Frontend

- Pozicionirajte se u *21-ProdavnicaMajica/frontend/*
- pokrenite komandu **npm install**
- pokrenite komandu **ng serve**

3\. Koriscenje

U browser-u otvorite *http://localhost:4200/*.


## Demo



## Dokumentacija

Sva potrebna dokumentacija vezana za implementiran api se nalazi u *21-ProdavnicaMajica/backend/api/api.md*.

### Default parametri

Backend:
- *Url* - http://localhost:3000/

Frontend:
- *Url* - http://localhost:4200/

### Opisi dokumenata iz baze

*User*:
- _id: mongoose.Schema.Types.ObjectId
- email: String 
- username: String 
- password: String
- level: String
- wishlist:[mongoose.Schema.Types.ObjectId]

*Tshirt*:
- _id: mongoose.Schema.Types.ObjectId,
- tshirtName: String
- image: String
- price: Number
- ratingSum: Number
- numberOfRatings: Number
- agreeToShow: Boolean
- popularity: Number
- comments: [String]

*Order*:
- _id: mongoose.Schema.Types.ObjectId,
- tshirtId: mongoose.Schema.Types.ObjectId
- userId: mongoose.Schema.Types.ObjectId
- isCustomMade: Boolean
- size: String
- quantity: Number
- address: String
- phone: String

*Shop*:
- _id: mongoose.Schema.Types.ObjectId,
- name: String
- address: String
- lat: String
- lng: String
- email: String


## Developers

- [Ivan Pop-Jovanov, 85/2018](https://gitlab.com/ivanpopjovanov)
- [Aleksandar Lisov, 236/2017](https://gitlab.com/AleksandarLisov)
- [Matija Srećković, 167/2016](https://gitlab.com/m97s)
- [Lazar Perišić, 480/2018](https://gitlab.com/bambalic)
