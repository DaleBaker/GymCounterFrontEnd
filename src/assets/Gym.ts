export class Gym {
  name: string;
  address: string;
  population: number;

  constructor(name: string, address: string, population: number) {
    this.name = name;
    this.address = address;
    this.population = population;

  }

  getAddress(): string {
    return this.address;
  }

  getName(): string {
    return this.name;
  }

  getPopulation(): number {
    return this.population;
  }

}
