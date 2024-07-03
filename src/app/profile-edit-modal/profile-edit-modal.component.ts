import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-profile-edit-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, MainPageComponent, ProfileComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-edit-modal.component.html',
  styleUrl: './profile-edit-modal.component.css'
})
export class ProfileEditModalComponent {
  @Input() displayName: string | null = null;
  @Input() profileImage: string | null = null;
  @Input() profileSummary: string | null = null;
  @Input() favoriteGame: string | null = null;
  @Input() newUsername: string | null = null;
  @Input() games: any[] = [];
  @Input() fileName: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveProfile = new EventEmitter<any>();
  @Output() profileImageChange = new EventEmitter<string>();

  @ViewChild('profileForm') profileForm!: NgForm;

  sortedGames: any[] = [];

  ngOnInit(): void {
    // Ordenar os jogos em ordem alfabética
    this.sortedGames = this.games.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  close() {
    this.closeModal.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file: File | null = (input.files && input.files.length > 0) ? input.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.profileImage = result;
        this.profileImageChange.emit(this.profileImage); // Emitindo o evento de mudança de imagem
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (this.profileForm.valid) { // Verifica se o formulário é válido
      const updatedProfile = {
        displayName: this.displayName,
        profileImage: this.profileImage,
        profileSummary: this.profileSummary,
        favoriteGame: this.favoriteGame,
        newUsername: this.newUsername
      };
      this.saveProfile.emit(updatedProfile);
      this.close();
    }
  }
}
