import InteractiveMap from './interactiveMap';

export default class GeoRewiew {
    constructor() {
        this.map = new InteractiveMap('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
    }

    async onInit() {

    }

    onClick(coords) {
        
    }
}