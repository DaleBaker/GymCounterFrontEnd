import {Camera} from './Camera'

export class Gym {
  get name(): string { return this._name; }
  get currentNumberOfPeople(): number { return this._currentNumberOfPeople; }
  get lastUpdated(): Date { return this._lastUpdated; }

  private id: number;
  private _name: string;
  private address: string;
  private city: string;
  private country: string;
  private populationData = new Array();
  private _currentNumberOfPeople = 0;
  private _lastUpdated: Date;
  public cameras;

  constructor(id: number, name: string, address: string, city: string, country: string, cameras: Camera[]) {
    this.id = id;
    this._name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    let camerasArray = [];
    console.log(cameras);
    for (let i = 0; i < cameras.length; i++) {
      if (cameras[i] !== null) {
        camerasArray.push(new Camera(cameras[i]['camera_id'], cameras[i]['name'], cameras[i]['currentpopulation'], cameras[i]['gymid'],));
      }
    }
    this.cameras = camerasArray;

  }

  getCameras() {
    return this.cameras;
  }

  parsePopulationArray(rawArray: string[]) {
    rawArray[0] = '0' + rawArray[0];
    for (let i = 0; i < rawArray.length; i++) { // "0/0/7/1/1/2017/20"
      const info = rawArray[i].split('/');
      const date = new Date(parseInt(info[5], 10), parseInt(info[4], 10), parseInt(info[3], 10),
                            parseInt(info[2], 10), parseInt(info[1], 10), parseInt(info[0], 10));
      const newTimeStamp = new Array();
      newTimeStamp.push(date);
      newTimeStamp.push(parseInt(info[6], 10));
      this.populationData.push(newTimeStamp);
    }
    this._currentNumberOfPeople = this.populationData[this.populationData.length - 1][1];
    this._lastUpdated = this.populationData[this.populationData.length - 1][0];
  }

  setPopulation(input: string[]) {
    this.parsePopulationArray(input);
  }

  getPopulationData(): Array<(Date|number)[]> {
    return this.populationData; // .slice(0, 1000);
  }

  getId(): number {
    return this.id;
  }

  getAddress(): string {
    return this.address;
  }

}
