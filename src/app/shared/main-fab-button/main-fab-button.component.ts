/**
 *  Este ion-fab-button cambia de posición según el dispositivo
 * en un mobile va abajo y en el resto arriba
 */
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-main-fab-button',
  templateUrl: './main-fab-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFabButtonComponent implements OnInit {
  @Input() icon: string;
  public isMobile: boolean;

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
  }
}
