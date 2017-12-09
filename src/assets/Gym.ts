export class Gym {
  id: number;
  name: string;
  address: string;
  population: string[];

  constructor(id: number, name: string, address: string, population: string[]) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.population = population;

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
