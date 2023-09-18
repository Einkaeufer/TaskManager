import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  currentStep: number = 1;
  step1: number = 1;
  step2: number = 2;
  step3: number = 3;
  step4: number = 4;

  constructor() { }

  ngOnInit(): void {
  }

  closeIntroduction(): void {
    localStorage.setItem('introductionSeen', 'true');
    const introductionModal = document.querySelector('.introduction-modal') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;
    if (introductionModal) {
      introductionModal.style.display = 'none';
    }
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  nextStep(): void {
    if (this.currentStep < this.step4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > this.step1) {
      this.currentStep--;
    }
  }
}
