import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
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
  IonInput,
  IonItem,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

interface ContactMessage {
  email: string;
  message: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTextarea,
    IonTitle,
    IonToolbar
  ]
})
export class ContactoPage implements OnInit {
  email = '';
  message = '';
  savedMessage: ContactMessage | null = null;
  saving = false;
  loading = true;
  statusMessage = '';
  errorMessage = '';

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    try {
      const { value } = await Preferences.get({
        key: 'ultimoMensaje'
      });

      if (value !== null) {
        const data = JSON.parse(value);

        if (
          typeof data?.email !== 'string' ||
          typeof data?.message !== 'string'
        ) {
          throw new Error('Formato del mensaje no válido');
        }

        this.savedMessage = {
          email: data.email,
          message: data.message
        };
        this.statusMessage = 'Mensaje recuperado del almacenamiento local.';
      }
    } catch (error: unknown) {
      console.error('Error al recuperar el mensaje:', error);
      this.errorMessage = 'No se ha podido recuperar el mensaje guardado.';
    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  async saveMessage(form: NgForm): Promise<void> {
    if (this.saving || this.loading) return;

    this.statusMessage = '';
    this.errorMessage = '';

    if (form.invalid || !this.email.trim() || !this.message.trim()) {
      form.control.markAllAsTouched();
      this.errorMessage = 'Introduce un correo válido y un mensaje.';
      return;
    }

    this.saving = true;

    const data: ContactMessage = {
      email: this.email.trim(),
      message: this.message.trim()
    };

    try {
      await Preferences.set({
        key: 'ultimoMensaje',
        value: JSON.stringify(data)
      });

      this.savedMessage = data;
      this.statusMessage = 'Mensaje guardado correctamente en este dispositivo.';
      form.resetForm({ email: '', message: '' });
    } catch (error: unknown) {
      console.error('Error al guardar el mensaje:', error);
      this.errorMessage = 'No se ha podido guardar el mensaje. Inténtalo de nuevo.';
    } finally {
      this.saving = false;
      this.cdr.markForCheck();
    }
  }
}