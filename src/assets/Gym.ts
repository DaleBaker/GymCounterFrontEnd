export class Gym {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  population: string[];


  constructor(id: number, name: string, address: string, city: string, country: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;

  }

  getId(): number {
    return this.id;
  }

  getAddress(): string {
    return this.address;
  }

  getName(): string {
    return this.name;
  }

  getPopulation(): string[] {
    return this.population;
  }

}
