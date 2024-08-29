import { Component } from '@angular/core';
import { createPlayerClient, PlayerClient } from '@reveldigital/client-sdk';
import { EventType } from '@reveldigital/client-sdk/dist/enums/event-types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sdk: PlayerClient;

  state: any;
  deviceName: any;
  localTime: any;
  deviceTime: any;
  TZName: any;
  TZId: any;
  TZOffset: any;
  langCode: any;
  deviceKey: any;
  revelRoot: any;
  remoteDeviceKey: any;
  commandMap: any;
  prefs: any;
  style: any;
  isPreviewMode: any;


  constructor() {
    this.sdk = createPlayerClient({
      useLegacyEventHandling: true
    });

    this.sdk.on(EventType.START, () => {
      this.state = 'Started'
    });

    this.sdk.on(EventType.STOP, () => {
      this.state = 'Stopped'
    });

    this.sdk.on(EventType.COMMAND, (data) => {
      console.log('Command received: ' + data);
    });

    this.sdk.isPreviewMode().then((isPreview) => {
      this.isPreviewMode = isPreview;
    });

    this.sdk.getDevice().then((device) => {
      this.deviceName = device?.name;
    })
  }

  ngOnInit(): void {

    setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {

    this.sdk.getDeviceTime().then((res) => {
      this.localTime = new Date();
      // @ts-ignore
      //todo fix
      this.deviceTime = new Date(res);
    });

    this.sdk.getDeviceTimeZoneName().then((res) => {
      this.TZName = res;
    });

    this.sdk.getDeviceTimeZoneID().then((res) => {
      this.TZId = res;
    })

    this.sdk.getDeviceTimeZoneOffset().then((res) => {
      this.TZOffset = res;
    });

    this.sdk.getLanguageCode().then((res) => {
      this.langCode = res;
    });

    this.sdk.getDeviceKey().then((res) => {
      this.deviceKey = res;
    });

    this.sdk.getRevelRoot().then((res) => {
      this.revelRoot = res;
    });

    this.sdk.getCommandMap().then((res) => {
      this.commandMap = res;
    });
  }

  sendCommand() {
    this.sdk.sendCommand('test', 'it');
  }

  sendRemoteCommand() {
    this.sdk.sendRemoteCommand([this.remoteDeviceKey], 'test', 'it');
  }

  trackEvent() {
    this.sdk.track('test', { 'a': 'b' });
  }

  callback() {
    this.sdk.callback('test');
  }

  finish() {
    this.sdk.finish();
  }
}
