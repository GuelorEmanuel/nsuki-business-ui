import moment from "moment";

interface StorageObj {
  expiry: moment.Moment;
}

export default class LocalS {

  public static save(key: string, data: any) {
      let obj;
      const expiryObj = { expiry: moment().add(7, "days") };
      obj = data instanceof Object ? { ...data, ...expiryObj } : { value: data, ...expiryObj };
      const dataString = JSON.stringify(obj);
      localStorage.setItem(key, dataString);
      return Promise.resolve();
  }

  public static load(key: string) {
      const dataString = localStorage.getItem(key);
      return new Promise((resolve) => {
          if (dataString) {
              const dataObj: StorageObj = JSON.parse(dataString);
              if (dataObj.expiry && moment(dataObj.expiry).isAfter(moment())) {
                  delete dataObj.expiry;
                  resolve(dataObj);
              }
          }
          resolve();
      });
  }
}