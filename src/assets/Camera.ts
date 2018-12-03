
export class Camera {

	private name : String;
	private id: Number;
	private currentPopulation: Number;
	private gym_id: Number;
	private populationData;

  constructor(id: Number, name: String, currentPopulation: Number, gym_id: Number) {
    this.id = id;
    this.name = name;
    this.currentPopulation = currentPopulation;
    this.gym_id = gym_id;
  }

  setPopulationData(data) {
  	this.populationData = data;
  }

  getPopulationData() {

    var camera_id = this.id.toString();
    let object = {};
    object[camera_id] = this.populationData;
    return object;
  }

  getCameraID() : Number {
  	return this.id;
  }

}