import {requestService} from "src/services/RequestService";
import {City} from "src/services/algorithm/City";

export default class GoogleApi {

    static KEY = "";

    static async getDetails(addresses) {
        const promises = addresses.map((address) => this.getAddressDetail(address));
        const result = await Promise.all(promises);
        return result;
    }

    static async getAddressDetail(address) {
        const response = await requestService.get("https://maps.googleapis.com/maps/api/geocode/json?region=pl&key" + GoogleApi.KEY + "=&address=" + address);
        const body = await response.json();
        const {lat, lng} = body.results[0].geometry.location;
        const name = body.results[0].formatted_address;
        return new City(name, lat, lng);
    }

//

}