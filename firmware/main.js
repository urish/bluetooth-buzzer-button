/**
 * Bluetooth Buzzer Button Sample Firmware
 * Powered by Espruino JavaScript Engine (https://espruino.com/)
 * 
 * Copyright (C) 2017, Uri Shaked
 * License: MIT.
 */

const BUTTON_PIN = D2;
const INTERNAL_LED_PIN = D11;
const BUTTON_LED_PIN = D28;
DEVICE_NAME = 'buzzer';

function onClick(e) {
  const value = e.state ? 0 : 1;
  digitalWrite(INTERNAL_LED_PIN, value);
  NRF.updateServices({
    0xfeff: {
      0xfe01: {
        value: [value],
        notify: true
      },
    },
  });
}

function onInit() {
  const eirEntry = (type, data) => [data.length + 1, type].concat(data);
  NRF.setAdvertising([].concat(
    eirEntry(0x3, [0xff, 0xfe]),
    eirEntry(0x9, DEVICE_NAME)
  ), { name: DEVICE_NAME });

  // Internal LED
  digitalWrite(INTERNAL_LED_PIN, true);
  setTimeout(() => digitalWrite(INTERNAL_LED_PIN, false), 500);

  // Button
  pinMode(BUTTON_PIN, 'input_pullup');
  setWatch(onClick, BUTTON_PIN, { edge: 'both', repeat: true, debounce: 10 });

  // LED
  pinMode(BUTTON_LED_PIN, 'input');
  NRF.on('disconnect', () => pinMode(BUTTON_LED_PIN, 'input'));

  // Bluetooth
  NRF.setServices({
    0xfeff: {
      0xfe01: {
        readable: true, notify: true, value: [0]
      },
      0xfe02: {
        writable: true,
        onWrite: evt => {
          if (evt.data[0]) {
            pinMode(BUTTON_LED_PIN, 'output');
            digitalWrite(BUTTON_LED_PIN, LOW);
          } else {
            pinMode(BUTTON_LED_PIN, 'input');
          }
        }
      }
    }
  });
}
