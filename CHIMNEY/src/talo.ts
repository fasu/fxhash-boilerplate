import p5 from "p5";

export class Talo {
  raput: Rappu[] = [];

  constructor(public rappujenMaara: number, public kerrostenMaara: number, public seinaMateriaali: any, public p: p5) {}
}

export class Rappu {
  kerrokset: Kerros[] = [];

  constructor(
    public kerrostenMaara: number,
    public ikkunoidenMaara: number,
    public alinKerros: boolean,
    public sisaankaynti: boolean,
    public p: p5
  ) {}
}

class Kerros {
  ikkunat: Ikkuna[] = [];

  constructor(
    public ikkunoidenMaara: number,
    public alinKerros: boolean,
    public ylinKerros: boolean,
    public sisaankaynti: boolean,
    public kerrosKorkeus: number,
    public p: p5
  ) {}
}

class Ikkuna {
  constructor(public verhot: boolean, public ikkunatyyppi: any, ikkunaLauta: boolean, karmiTyyppi: any, public p: p5) {}
}
