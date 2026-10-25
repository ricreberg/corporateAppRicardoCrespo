import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  imports: [
    CommonModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
  ]
})
export class NosotrosPage {
  distance: number | null = null;
  loading = false;
  errorMessage = '';

  // Coordenadas facilitadas en el enunciado para la práctica.
  private readonly officeLatitude = 40.4452;
  private readonly officeLongitude = -3.6115;

  constructor(private cdr: ChangeDetectorRef) {}

  async getLocation(): Promise<void> {
    if (this.loading) return;

    this.loading = true;
    this.errorMessage = '';
    this.distance = null;

    try {
      // En navegador, el permiso se solicita al obtener la ubicación.
      if (Capacitor.isNativePlatform()) {
        const permission = await Geolocation.requestPermissions();

        if (
          permission.location !== 'granted' &&
          permission.coarseLocation !== 'granted'
        ) {
          this.errorMessage =
            'Permite el acceso a la ubicación para calcular la distancia.';
          return;
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });

      this.distance = this.calculateDistance(
        position.coords.latitude,
        position.coords.longitude,
        this.officeLatitude,
        this.officeLongitude
      );
    } catch (error: unknown) {
      console.error('Error al obtener la ubicación:', error);
      this.errorMessage =
        'No se ha podido obtener la ubicación. Comprueba los permisos ' +
        'del navegador y que la ubicación del dispositivo esté activada. ' +
        'Después, vuelve a intentarlo.';
    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  private calculateDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number
  ): number {
    const earthRadius = 6371;
    const toRadians = (degrees: number): number =>
      degrees * Math.PI / 180;

    const latitudeDifference = toRadians(latitude2 - latitude1);
    const longitudeDifference = toRadians(longitude2 - longitude1);

    const a =
      Math.sin(latitudeDifference / 2) ** 2 +
      Math.cos(toRadians(latitude1)) *
      Math.cos(toRadians(latitude2)) *
      Math.sin(longitudeDifference / 2) ** 2;

    const boundedA = Math.min(1, Math.max(0, a));
    const angle = 2 * Math.atan2(
      Math.sqrt(boundedA),
      Math.sqrt(1 - boundedA)
    );

    return earthRadius * angle;
  }
}