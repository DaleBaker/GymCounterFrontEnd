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

  getNumberOfCameras() : Number {
    return this.cameras.length;
  }


  getPopulationData() {
    let populationData = [];
    for (let i = 0; i < this.cameras.length; i++) {
      populationData.push(this.cameras[i].getPopulationData());
    }
    return populationData; 
  }

  getId(): number {
    return this.id;
  }

  getAddress(): string {
    return this.address;
  }

}
