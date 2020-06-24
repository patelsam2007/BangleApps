let menu = {
  "": { "title": "BLE Detector" },
  "RE-SCAN":  () => scan()
};

function showMainMenu() {
  menu["< Back"] =  () => load();
  return E.showMenu(menu);
}

function showDeviceInfo(device){
  const deviceMenu = {
    "": { "title": "Device Info" },
    "name": {
      value: device.name
    },
    "rssi": {
      value: device.rssi
    },
    "manufacturer": {
      value: device.manufacturer
    }
  };

  deviceMenu[device.id] = () => {};
  deviceMenu["< Back"] =  () => showMainMenu();

  return E.showMenu(deviceMenu);
}

function scan() {
  menu = {
    "": { "title": "BLE Detector" },
    "RE-SCAN":  () => scan()
  };

  waitMessage();

  NRF.findDevices(devices => {
    devices.forEach(device =>{
      let txPower = -69;
      let distance = Math.pow(10d, ((double) txPower - device.rssi) / (10 * 2));
      let deviceName = distance; 

      if (device.name) {
        deviceName = device.name;
      }

      menu[deviceName] = () => showDeviceInfo(device);
    });
    showMainMenu(menu);
  }, { active: true });
}

function waitMessage() {
  E.showMenu();
  E.showMessage("scanning");
}



scan();
waitMessage();
